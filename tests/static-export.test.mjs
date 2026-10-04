import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve("ftp-static");
const sitemapXml = await readFile(path.join(root, "sitemap.xml"), "utf8");
const canonicalUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, location]) => location);
const pages = canonicalUrls.map((location) => {
  const pathname = new URL(location).pathname;
  if (pathname === "/") return "index.html";
  if (pathname === "/projetos") return "projetos-page.html";
  return `${pathname.slice(1)}.html`;
});
const requiredCommercialGuides = [
  "blog/quanto-custa-projeto-de-interiores.html",
  "blog/reforma-de-apartamento-nbr-16280.html",
];

test("keeps the complete indexable route inventory", () => {
  assert.equal(canonicalUrls.length, 19, "o sitemap deve conter as 19 páginas indexáveis aprovadas");
  assert.equal(new Set(canonicalUrls).size, canonicalUrls.length, "o sitemap não deve conter URLs duplicadas");
  for (const page of requiredCommercialGuides) assert.ok(pages.includes(page), `${page} deve permanecer no sitemap`);
});

test("exports all indexable pages without the Vinext runtime", async () => {
  for (const [index, page] of pages.entries()) {
    const html = await readFile(path.join(root, page), "utf8");
    const expectedCanonical = new URL(canonicalUrls[index]).href;
    assert.doesNotMatch(html, /__VINEXT|modulepreload|data-rsc-/i, page);
    assert.match(html, /<script defer src="\/assets\/site-static\.js\?v=[0-9a-f]{12}"><\/script>/i, page);
    assert.match(html, /googletagmanager\.com\/gtag\/js\?id=AW-614157022/i, page);
    assert.match(html, /firstPartyPath='\/metrics\/'/i, page);
    assert.match(html, /fetch\(firstPartyPath\+'healthy'/i, page);
    assert.match(html, /script\.onerror=function\(\)\{loaded=false;load\(googleScript,false\)\}/i, page);
    assert.match(html, /gtag\('config','AW-614157022'\)/i, page);
    assert.match(html, new RegExp(`<link rel="canonical" href="${expectedCanonical.replaceAll("/", "\\/")}"`, "i"), page);
    assert.equal((html.match(/<h1\b/gi) || []).length, 1, page);
  }
  const home = await readFile(path.join(root, "index.html"), "utf8");
  assert.match(home, /data-lead-endpoint="https:\/\/barroco-arquitetura-residencial\.luizcontatoarquiteto\.chatgpt\.site\/api\/leads"/i);
  assert.match(home, /<input(?=[^>]*name="consent")(?=[^>]*type="checkbox")[^>]*>/i);
});

test("ships the qualified lead and WhatsApp conversion events", async () => {
  const runtime = await readFile(path.join(root, "assets", "site-static.js"), "utf8");
  assert.match(runtime, /AW-614157022\/KLJACJyUorQDEN6V7aQC/);
  assert.match(runtime, /AW-614157022\/bWIoCP-morQDEN6V7aQC/);
  assert.match(runtime, /G-YED0X4J78V/);
  assert.match(runtime, /"lead_form_whatsapp"/);
  assert.match(runtime, /"phone_click"/);
  assert.match(runtime, /"email_click"/);
  assert.match(runtime, /event_callback:\s*redirectToWhatsApp/);
  assert.match(runtime, /submitLead\(form\.dataset\.leadEndpoint/);
  assert.match(runtime, /"set",\s*"user_data"/);
  assert.match(runtime, /phone_number:\s*normalizedPhone/);
  assert.match(runtime, /"event",\s*"form_submit"/);
  assert.match(runtime, /send_to:\s*googleAdsId/);
  assert.match(runtime, /transaction_id:\s*result\.lead\.id/);
  assert.match(runtime, /gclid:\s*params\.get\("gclid"\)/);
});

test("keeps every referenced local asset in the package", async () => {
  for (const page of pages) {
    const html = await readFile(path.join(root, page), "utf8");
    const references = [...html.matchAll(/(?:src|href)="(\/(?:assets|images)\/[^"?#]+|\/favicon\.svg)"/gi)].map((match) => match[1]);
    for (const reference of references) await access(path.join(root, reference.slice(1)));
  }
});

test("ships discovery, routing, caching and removal rules", async () => {
  const robots = await readFile(path.join(root, "robots.txt"), "utf8");
  const imageSitemap = await readFile(path.join(root, "sitemap-images.xml"), "utf8");
  const rss = await readFile(path.join(root, "rss.xml"), "utf8");
  const htaccess = await readFile(path.join(root, ".htaccess"), "utf8");
  assert.match(robots, /sitemap\.xml/i);
  assert.match(sitemapXml, /<urlset/i);
  assert.match(sitemapXml, /blog\/quanto-custa-projeto-de-interiores/i);
  assert.match(sitemapXml, /blog\/reforma-de-apartamento-nbr-16280/i);
  assert.match(imageSitemap, /<image:image>/i);
  assert.match(rss, /<rss version="2\.0">/i);
  assert.match(htaccess, /archived-2\/\?\$ - \[R=410,L\]/i);
  assert.match(htaccess, /RewriteRule \^blog\/\?\$ blog\.html \[L\]/i);
  assert.ok(
    htaccess.indexOf("RewriteRule ^blog/?$ blog.html [L]") < htaccess.indexOf("RewriteCond %{REQUEST_URI} ^(.+)/+$"),
    "the blog rewrite must run before trailing-slash normalization",
  );
  assert.match(htaccess, /max-age=31536000, immutable/i);
  assert.match(htaccess, /AddType image\/webp \.webp/i);
});

test("responsive image candidates exist, have truthful widths and preserve original zoom targets", async () => {
  const { default: sharp } = await import('sharp');
  const manifest = JSON.parse(await readFile('app/lib/responsive-images.json', 'utf8'));
  for (const [original, entry] of Object.entries(manifest)) {
    for (const candidate of entry.candidates) {
      const file = await readFile(path.join(root, candidate.src));
      const metadata = await sharp(file).metadata();
      assert.equal(metadata.width, candidate.width, candidate.src);
      assert.ok(candidate.width < entry.width, 'never enlarge originals');
      assert.ok(file.length < entry.bytes, 'each candidate must save bytes');
      assert.ok(Math.abs(metadata.height / metadata.width - entry.height / entry.width) < .005, 'preserve aspect ratio');
    }
    await access(path.join(root, original));
  }
  for (const page of pages) {
    const html = await readFile(path.join(root, page), 'utf8');
    let count = 0;
    for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
      const src = tag.match(/\bsrc="([^"]+)"/i)?.[1];
      if (!manifest[src]?.candidates.length) continue;
      assert.match(tag, /\bsrcset="[^"]+"/i, page);
      assert.match(tag, /\bsizes="[^"]+"/i, page);
      count++;
    }
    assert.ok(count > 0, `responsive photos on ${page}`);
    assert.doesNotMatch(html, /<a\b[^>]*href="\/images\/responsive\//i, 'zoom must use originals');
  }
});
