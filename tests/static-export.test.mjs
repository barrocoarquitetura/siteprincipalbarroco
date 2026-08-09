import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve("ftp-static");
const pages = [
  "index.html",
  "projetos-page.html",
  "projetos-de-apartamentos.html",
  "projetos-de-casas.html",
  "reformas-residenciais.html",
  "projetos-e-obras-comerciais.html",
  "projetos/apartamento-com-ambientes-integrados.html",
  "projetos/casa-contemporanea-com-piscina.html",
  "projetos/escritorio-com-recepcao-e-jardim-vertical.html",
  "projetos/reforma-de-apartamento-com-cozinha-e-varanda.html",
  "blog.html",
  "blog/projeto-de-interiores-para-apartamento-o-que-inclui.html",
  "blog/reforma-de-apartamento-por-onde-comecar.html",
  "blog/projeto-executivo-de-interiores-o-que-e.html",
  "blog/quanto-tempo-dura-reforma-de-apartamento.html",
  "blog/projeto-de-interiores-antes-das-chaves.html",
  "blog/como-escolher-escritorio-de-arquitetura.html",
];

test("exports all indexable pages without the Vinext runtime", async () => {
  for (const page of pages) {
    const html = await readFile(path.join(root, page), "utf8");
    assert.doesNotMatch(html, /__VINEXT|modulepreload|data-rsc-/i, page);
    assert.match(html, /<script defer src="\/assets\/site-static\.js"><\/script>/i, page);
    assert.match(html, /googletagmanager\.com\/gtag\/js\?id=AW-614157022/i, page);
    assert.match(html, /gtag\('config','AW-614157022'\)/i, page);
    assert.match(html, /<link rel="canonical" href="https:\/\/www\.barrocoarquitetura\.com\.br/i, page);
    assert.equal((html.match(/<h1\b/gi) || []).length, 1, page);
  }
});

test("ships the qualified lead and WhatsApp conversion events", async () => {
  const runtime = await readFile(path.join(root, "assets", "site-static.js"), "utf8");
  assert.match(runtime, /AW-614157022\/KLJACJyUorQDEN6V7aQC/);
  assert.match(runtime, /AW-614157022\/bWIoCP-morQDEN6V7aQC/);
  assert.match(runtime, /event_callback:\s*redirectToWhatsApp/);
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
  const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
  const imageSitemap = await readFile(path.join(root, "sitemap-images.xml"), "utf8");
  const rss = await readFile(path.join(root, "rss.xml"), "utf8");
  const htaccess = await readFile(path.join(root, ".htaccess"), "utf8");
  assert.match(robots, /sitemap\.xml/i);
  assert.match(sitemap, /<urlset/i);
  assert.match(imageSitemap, /<image:image>/i);
  assert.match(rss, /<rss version="2\.0">/i);
  assert.match(htaccess, /archived-2\/\?\$ - \[R=410,L\]/i);
  assert.match(htaccess, /max-age=31536000, immutable/i);
  assert.match(htaccess, /AddType image\/webp \.webp/i);
});
