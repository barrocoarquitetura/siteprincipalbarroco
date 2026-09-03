import { copyFile, cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "ftp-static");
const clientRoot = path.join(projectRoot, "dist", "client");
const runtimeSource = path.join(projectRoot, "scripts", "static-site-runtime.js");
const runtimeVersion = createHash("sha256").update(await readFile(runtimeSource)).digest("hex").slice(0, 12);
const productionOrigin = "https://www.barrocoarquitetura.com.br";
const googleAdsId = "AW-614157022";
const googleTagGatewayPath = "/metrics/";
const googleTagLoader = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${googleAdsId}');(function(){var firstPartyPath='${googleTagGatewayPath}';var googleScript='https://www.googletagmanager.com/gtag/js?id=${googleAdsId}';var loaded=false;function load(src,isFirstParty){if(loaded)return;loaded=true;var script=document.createElement('script');script.async=true;script.src=src;if(isFirstParty)script.onerror=function(){loaded=false;load(googleScript,false)};document.head.appendChild(script)}if(!window.fetch){load(googleScript,false);return}Promise.race([fetch(firstPartyPath+'healthy',{cache:'no-store',credentials:'same-origin'}).then(function(response){if(!response.ok)return false;return response.text().then(function(text){return text.trim()==='ok'})}).catch(function(){return false}),new Promise(function(resolve){setTimeout(function(){resolve(false)},1200)})]).then(function(healthy){load(healthy?firstPartyPath:googleScript,healthy)})})();`;
const googleTagHead = `<script>${googleTagLoader}</script>`;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function outputFileForRoute(route) {
  if (route === "/") return path.join(outputRoot, "index.html");
  if (route === "/projetos") return path.join(outputRoot, "projetos-page.html");
  return path.join(outputRoot, `${route.slice(1)}.html`);
}

function addHeroAltText(html) {
  return html.replace(/<figure\b[^>]*class="[^"]*\bhero-carousel\b[^"]*"[\s\S]*?<\/figure>/gi, (figure) => {
    const captions = [...figure.matchAll(/<button\b[^>]*aria-label="Mostrar imagem \d+:\s*([^"]+)"[^>]*>/gi)].map((match) => match[1]);
    let index = 0;
    return figure.replace(/<img\b[^>]*>/gi, (image) => {
      const caption = captions[index++];
      return caption ? image.replace(/\balt="[^"]*"/i, `alt="${caption}"`) : image;
    });
  });
}

function toStaticHtml(source) {
  let html = source
    .replace(/<link\b(?=[^>]*\brel="modulepreload")[^>]*>/gi, "")
    .replace(/<script\b(?![^>]*\btype="application\/ld\+json")[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\sdata-rsc-[\w-]+="[^"]*"/gi, "")
    .replace(/\sdata-precedence="[^"]*"/gi, "")
    .replace("<html ", "<html data-static-export=\"true\" ");
  html = addHeroAltText(html);
  return html
    .replace("</head>", `${googleTagHead}</head>`)
    .replace("</body>", `<script defer src="/assets/site-static.js?v=${runtimeVersion}"></script></body>`);
}

async function assetsFetch(request) {
  const pathname = decodeURIComponent(new URL(request.url).pathname).replace(/^\/+/, "");
  const candidate = path.resolve(clientRoot, pathname);
  if (!candidate.startsWith(`${clientRoot}${path.sep}`)) return new Response("Not found", { status: 404 });
  try {
    if (!(await stat(candidate)).isFile()) return new Response("Not found", { status: 404 });
    const body = await readFile(candidate);
    const type = mimeTypes[path.extname(candidate).toLowerCase()] || "application/octet-stream";
    return new Response(body, { status: 200, headers: { "content-type": type } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

async function render(worker, pathname, accept) {
  const response = await worker.fetch(
    new Request(`${productionOrigin}${pathname}`, { headers: { accept } }),
    { ASSETS: { fetch: assetsFetch } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  if (!response.ok) throw new Error(`Falha ao renderizar ${pathname}: HTTP ${response.status}`);
  return response.text();
}

function indexableRoutesFromSitemap(sitemapXml) {
  const routes = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, location]) => {
    const url = new URL(location.replaceAll("&amp;", "&"));
    if (url.origin !== productionOrigin) throw new Error(`URL externa inesperada no sitemap: ${url.href}`);
    return url.pathname || "/";
  });
  if (routes.length === 0) throw new Error("O sitemap não contém URLs indexáveis");
  if (new Set(routes).size !== routes.length) throw new Error("O sitemap contém URLs duplicadas");
  return routes;
}

const htaccess = `Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html
ErrorDocument 410 /410.html

AddType image/webp .webp
AddType image/svg+xml .svg
AddType application/xml .xml

<IfModule mod_rewrite.c>
  RewriteEngine On

  RewriteRule ^archived-2/?$ - [R=410,L]
  RewriteRule ^portfolio/?$ https://www.barrocoarquitetura.com.br/projetos [R=301,L,NE]
  RewriteRule ^orcamento/?$ https://www.barrocoarquitetura.com.br/#contato [R=301,L,NE]

  RewriteCond %{HTTPS} !=on [OR]
  RewriteCond %{HTTP_HOST} !^www\\.barrocoarquitetura\\.com\\.br$ [NC]
  RewriteRule ^ https://www.barrocoarquitetura.com.br%{REQUEST_URI} [R=301,L,NE]

  RewriteRule ^blog/?$ blog.html [L]

  RewriteCond %{REQUEST_URI} ^(.+)/+$
  RewriteRule ^(.+)/$ /$1 [R=301,L,NE]

  RewriteRule ^projetos/?$ projetos-page.html [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.+?)/?$ $1.html [L]
</IfModule>

<IfModule mod_setenvif.c>
  SetEnvIf Request_URI "^/archived-2/?$" BARROCO_GONE=1
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set X-Robots-Tag "noindex, nofollow, noarchive" env=BARROCO_GONE

  <FilesMatch "\\.(?:css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(?:webp|svg|jpg|jpeg|png|gif|ico)$">
    Header set Cache-Control "public, max-age=2592000, stale-while-revalidate=604800"
  </FilesMatch>
  <FilesMatch "\\.(?:html|xml|txt)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml
</IfModule>
`;

const readme = `BARROCO ARQUITETURA — PACOTE PARA HOSPEDAGEM FTP
====================================================

Este pacote contém a versão estática otimizada e independente do site aprovado.
O site público atual não precisa ser desligado durante a preparação.

PUBLICAÇÃO
1. Faça um backup da pasta pública atual da hospedagem.
2. Envie todo o conteúdo deste pacote para a raiz pública do domínio (normalmente public_html, www ou htdocs).
3. Confirme que o arquivo oculto .htaccess também foi enviado.
4. Mantenha o domínio apontado para a hospedagem atual até concluir os testes no endereço temporário fornecido pelo provedor.
5. Depois dos testes, altere o DNS conforme as instruções da hospedagem.

VALIDAÇÃO APÓS O UPLOAD
- Página inicial: /
- Projetos: /projetos
- Apartamentos: /projetos-de-apartamentos
- Casas: /projetos-de-casas
- Reformas: /reformas-residenciais
- Comercial: /projetos-e-obras-comerciais
- Conteúdo técnico: /blog
- Sitemap: /sitemap.xml
- Sitemap de imagens: /sitemap-images.xml
- RSS: /rss.xml
- Robots: /robots.txt
- Redirecionamento antigo: /portfolio deve ir para /projetos
- URL removida: /archived-2 deve responder HTTP 410

DESEMPENHO
As imagens estão em WebP, os arquivos visuais têm cache prolongado e CSS/JavaScript usam cache imutável.
O HTML permanece revalidável para que futuras atualizações apareçam imediatamente.

REQUISITOS DA HOSPEDAGEM
- Servidor Apache ou LiteSpeed com suporte a .htaccess e mod_rewrite.
- HTTPS ativo para www.barrocoarquitetura.com.br.
- PHP e banco de dados não são necessários.

ATUALIZAÇÕES FUTURAS
O projeto-fonte permanece separado deste pacote. Após cada edição, uma nova exportação substitui os arquivos publicados.
`;

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(clientRoot, outputRoot, { recursive: true });
await mkdir(path.join(outputRoot, "assets"), { recursive: true });
for (const file of await readdir(path.join(outputRoot, "assets"))) {
  if (file.endsWith(".js")) await rm(path.join(outputRoot, "assets", file));
}
await rm(path.join(outputRoot, ".vite"), { recursive: true, force: true });
await rm(path.join(outputRoot, ".assetsignore"), { force: true });
await rm(path.join(outputRoot, "_headers"), { force: true });
await copyFile(runtimeSource, path.join(outputRoot, "assets", "site-static.js"));

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("static-export", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const sitemapXml = await render(worker, "/sitemap.xml", "application/xml");
const routes = indexableRoutesFromSitemap(sitemapXml);

for (const route of routes) {
  const html = toStaticHtml(await render(worker, route, "text/html"));
  const destination = outputFileForRoute(route);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

const missingResponse = await worker.fetch(
  new Request(`${productionOrigin}/pagina-nao-encontrada-exportacao`, { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: assetsFetch } },
  { waitUntil() {}, passThroughOnException() {} },
);
await writeFile(path.join(outputRoot, "404.html"), toStaticHtml(await missingResponse.text()));
await writeFile(path.join(outputRoot, "410.html"), "<!doctype html><html lang=\"pt-BR\"><head><meta charset=\"utf-8\"><meta name=\"robots\" content=\"noindex,nofollow,noarchive\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Conteúdo removido</title></head><body><h1>Conteúdo removido</h1><p>Esta página não está mais disponível.</p></body></html>");

for (const discoveryPath of ["/robots.txt", "/sitemap.xml", "/sitemap-images.xml", "/rss.xml"]) {
  const accept = discoveryPath.endsWith(".xml") ? "application/xml" : "text/plain";
  const content = discoveryPath === "/sitemap.xml" ? sitemapXml : await render(worker, discoveryPath, accept);
  await writeFile(path.join(outputRoot, discoveryPath.slice(1)), content);
}

await writeFile(path.join(outputRoot, ".htaccess"), htaccess);
await writeFile(path.join(outputRoot, "LEIA-ME-INSTALACAO.txt"), readme);
console.log(`Exportação FTP criada em ${outputRoot} com ${routes.length} páginas indexáveis`);
