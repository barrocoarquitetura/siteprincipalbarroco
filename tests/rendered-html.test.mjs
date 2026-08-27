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

function createLeadDatabase() {
  const leads = new Map();
  return {
    leads,
    prepare(query) {
      return {
        bind(...parameters) {
          return { query, parameters };
        },
      };
    },
    async batch(statements) {
      return statements.map((statement) => {
        if (/INSERT OR IGNORE INTO leads/i.test(statement.query)) {
          const [id, reference] = statement.parameters;
          if (!leads.has(id)) {
            leads.set(id, {
              id,
              reference,
              createdAt: "2026-08-26 12:00:00",
              gclid: statement.parameters[13],
            });
          }
          return { success: true, results: [] };
        }
        if (/SELECT id, reference, created_at AS createdAt FROM leads/i.test(statement.query)) {
          const lead = leads.get(statement.parameters[0]);
          return { success: true, results: lead ? [lead] : [] };
        }
        throw new Error(`Unexpected SQL in test: ${statement.query}`);
      });
    },
  };
}

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
  assert.match(html, /data-lead-endpoint="https:\/\/barroco-arquitetura-residencial\.luizcontatoarquiteto\.chatgpt\.site\/api\/leads"/i);
  assert.match(html, /<input(?=[^>]*name="consent")(?=[^>]*type="checkbox")[^>]*>/i);
  assert.match(html, /data-form-status/i);
});

test("persists a validated lead before confirming the conversion", async () => {
  const database = createLeadDatabase();
  const id = "1f1f1111-2222-4333-8444-555555555555";
  const payload = {
    clientSubmissionId: id,
    name: "Cliente Teste",
    email: "cliente@example.com",
    phone: "(11) 99999-9999",
    location: "Santo André, SP",
    property: "Apartamento",
    area: 120,
    service: "Projeto de interiores para apartamento",
    timeline: "Nos próximos 3 meses",
    message: "Reforma completa.",
    consent: true,
    website: "",
    attribution: {
      gclid: "teste-gclid",
      landingPage: "https://www.barrocoarquitetura.com.br/projetos-de-apartamentos?gclid=teste-gclid",
      pageUrl: "https://www.barrocoarquitetura.com.br/projetos-de-apartamentos",
    },
  };
  const response = await worker.fetch(new Request("https://www.barrocoarquitetura.com.br/api/leads", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      origin: "https://www.barrocoarquitetura.com.br",
    },
    body: JSON.stringify(payload),
  }), { ...env, DB: database }, ctx);

  assert.equal(response.status, 201);
  assert.equal(response.headers.get("access-control-allow-origin"), "https://www.barrocoarquitetura.com.br");
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.equal(body.lead.id, id);
  assert.match(body.lead.reference, /^BA-\d{8}-1F1F11$/);
  assert.equal(database.leads.get(id).gclid, "teste-gclid");
});

test("rejects untrusted origins and incomplete lead submissions", async () => {
  const database = createLeadDatabase();
  const untrusted = await worker.fetch(new Request("https://www.barrocoarquitetura.com.br/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://example.com" },
    body: "{}",
  }), { ...env, DB: database }, ctx);
  assert.equal(untrusted.status, 403);

  const incomplete = await worker.fetch(new Request("https://www.barrocoarquitetura.com.br/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://www.barrocoarquitetura.com.br" },
    body: JSON.stringify({ clientSubmissionId: "1f1f1111-2222-4333-8444-555555555555" }),
  }), { ...env, DB: database }, ctx);
  assert.equal(incomplete.status, 422);
  assert.equal(database.leads.size, 0);
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
