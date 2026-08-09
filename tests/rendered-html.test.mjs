import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };

function request(path, host = "www.barrocoarquitetura.com.br", protocol = "https") {
  return worker.fetch(new Request(`${protocol}://${host}${path}`, { headers: { accept: "text/html" } }), env, ctx);
}

const canonicalPaths = [
  "/",
  "/projetos",
  "/projetos-de-apartamentos",
  "/projetos-de-casas",
  "/reformas-residenciais",
  "/projetos-e-obras-comerciais",
  "/projetos/apartamento-com-ambientes-integrados",
  "/projetos/casa-contemporanea-com-piscina",
  "/projetos/escritorio-com-recepcao-e-jardim-vertical",
  "/projetos/reforma-de-apartamento-com-cozinha-e-varanda",
  "/blog",
  "/blog/projeto-de-interiores-para-apartamento-o-que-inclui",
  "/blog/reforma-de-apartamento-por-onde-comecar",
  "/blog/projeto-executivo-de-interiores-o-que-e",
  "/blog/quanto-tempo-dura-reforma-de-apartamento",
  "/blog/projeto-de-interiores-antes-das-chaves",
  "/blog/como-escolher-escritorio-de-arquitetura",
];

test("renders production SEO metadata on the home page", async () => {
  const response = await request("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.doesNotMatch(html, /codex-preview/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.barrocoarquitetura\.com\.br\/?"/i);
  assert.match(html, /ProfessionalService/);
  assert.match(html, /FAQPage/);
  assert.match(html, /data-reveal/);
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=AW-614157022/i);
  assert.match(html, /gtag\('config','AW-614157022'\)/i);
});

test("renders indexable project case studies", async () => {
  const response = await request("/projetos/apartamento-com-ambientes-integrados");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Apartamento com estar, jantar e varanda integrados/i);
  assert.match(html, /CreativeWork/);
  assert.match(html, /BreadcrumbList/);
  assert.match(html, /<meta name="robots" content="index, follow/i);
});

test("renders first-hand technical articles with article schema", async () => {
  const response = await request("/blog/reforma-de-apartamento-por-onde-comecar");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Reforma de apartamento: por onde começar/i);
  assert.match(html, /BlogPosting/);
  assert.match(html, /BreadcrumbList/);
  assert.match(html, /Barroco Arquitetura/);
  assert.match(html, /Resposta direta/i);
});

test("keeps every canonical page indexable and uniquely described", async () => {
  const titles = new Set();
  const descriptions = new Set();

  for (const path of canonicalPaths) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const expectedCanonical = `https://www.barrocoarquitetura.com.br${path === "/" ? "/" : path}`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${expectedCanonical.replaceAll("/", "\\/")}"`, "i"), path);
    assert.match(html, /<meta name="robots" content="index, follow/i, path);
    assert.match(html, /<meta property="og:image" content="https:\/\/www\.barrocoarquitetura\.com\.br\/images\//i, path);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"/i, path);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${path} deve ter um único H1`);

    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
    assert.ok(title && !titles.has(title), `${path} deve ter título único`);
    assert.ok(description && !descriptions.has(description), `${path} deve ter descrição única`);
    titles.add(title);
    descriptions.add(description);
  }
});

test("redirects relevant legacy pages permanently", async () => {
  const portfolio = await request("/portfolio");
  assert.ok([301, 308].includes(portfolio.status));
  assert.match(portfolio.headers.get("location") ?? "", /\/projetos\/?$/);

  const budget = await request("/orcamento");
  assert.ok([301, 308].includes(budget.status));
  assert.match(budget.headers.get("location") ?? "", /\/#contato$/);
});

test("consolidates protocol and hostname on the canonical www domain", async () => {
  const apex = await request("/blog", "barrocoarquitetura.com.br");
  assert.ok([301, 308].includes(apex.status));
  assert.equal(apex.headers.get("location"), "https://www.barrocoarquitetura.com.br/blog");

  const insecure = await request("/projetos?origem=teste", "www.barrocoarquitetura.com.br", "http");
  assert.ok([301, 308].includes(insecure.status));
  assert.equal(insecure.headers.get("location"), "https://www.barrocoarquitetura.com.br/projetos?origem=teste");
});

test("returns 410 for the removed spam URL", async () => {
  const response = await request("/archived-2");
  assert.equal(response.status, 410);
  assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/i);
});

test("publishes clean discovery files for Google", async () => {
  const robots = await request("/robots.txt");
  assert.equal(robots.status, 200);
  const robotsText = await robots.text();
  assert.match(robotsText, /Sitemap: https:\/\/www\.barrocoarquitetura\.com\.br\/sitemap\.xml/i);
  assert.match(robotsText, /Sitemap: https:\/\/www\.barrocoarquitetura\.com\.br\/sitemap-images\.xml/i);
  assert.match(robotsText, /OAI-SearchBot/i);
  assert.match(robotsText, /PerplexityBot/i);
  assert.doesNotMatch(robotsText, /^Host:/im);

  const sitemap = await request("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const sitemapText = await sitemap.text();
  assert.match(sitemapText, /https:\/\/www\.barrocoarquitetura\.com\.br\/projetos\/apartamento-com-ambientes-integrados/i);
  assert.match(sitemapText, /https:\/\/www\.barrocoarquitetura\.com\.br\/blog\/projeto-de-interiores-antes-das-chaves/i);
  assert.doesNotMatch(sitemapText, /\/portfolio|\/orcamento|\/archived-2/i);

  const imageSitemap = await request("/sitemap-images.xml");
  assert.equal(imageSitemap.status, 200);
  const imageSitemapText = await imageSitemap.text();
  for (const path of [
    "/projetos-de-apartamentos",
    "/projetos-de-casas",
    "/reformas-residenciais",
    "/projetos-e-obras-comerciais",
  ]) {
    assert.match(imageSitemapText, new RegExp(`https:\\/\\/www\\.barrocoarquitetura\\.com\\.br${path}`));
  }
  assert.match(imageSitemapText, /https:\/\/www\.barrocoarquitetura\.com\.br\/blog\/reforma-de-apartamento-por-onde-comecar/i);
  assert.doesNotMatch(imageSitemapText, /<image:(caption|title|geo_location|license)>/i);

  const rss = await request("/rss.xml");
  assert.equal(rss.status, 200);
  assert.match(rss.headers.get("content-type") ?? "", /^application\/rss\+xml\b/i);
  const rssText = await rss.text();
  assert.match(rssText, /<rss version="2\.0">/i);
  assert.match(rssText, /projeto-de-interiores-para-apartamento-o-que-inclui/i);
});
