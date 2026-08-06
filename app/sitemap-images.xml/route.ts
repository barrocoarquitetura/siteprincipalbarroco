import { apartmentImages, commercialImages, houseImages } from "../projetos/projectData";
import { caseStudies } from "../projetos/caseStudies";
import { blogPosts } from "../blog/posts";

const baseUrl = "https://www.barrocoarquitetura.com.br";

const homeImages = [
  "/images/hero-lavabo-geometrico.webp",
  "/images/hero-hall-iluminacao-linear.webp",
  "/images/hero-escritorio-jardim-vertical.webp",
  "/images/hero-cozinha-cinza.webp",
  "/images/hero-apartamento-integrado.webp",
  "/images/hero-casa-terrea-contemporanea.webp",
  "/images/mayara-cimino-luiz-faria.webp",
];

const apartmentServiceImages = [
  "/images/portfolio-integracao-varanda.webp",
  "/images/apartamento-cozinha-corredor-arte.webp",
  "/images/apartamento-varanda-jardim.webp",
  "/images/apartamento-lavabo-botanico.webp",
  "/images/apartamento-estar-painel-tv.webp",
  "/images/portfolio-cozinha-ilha.webp",
  "/images/portfolio-quarto-infantil-rosa.webp",
  "/images/apartamento-quarto-infantil-casinha.webp",
  "/images/portfolio-quarto-beliche.webp",
  "/images/apartamento-banheiro-claro.webp",
  "/images/portfolio-cozinha-verde.webp",
  "/images/portfolio-lavabo-travertino.webp",
  "/images/apartamento-sala-cortinas.webp",
  "/images/apartamento-jantar-cristaleira.webp",
  "/images/apartamento-varanda-noturna.webp",
];

const houseServiceImages = [
  "/images/portfolio-casa-pedra.webp",
  "/images/portfolio-casa-corten.webp",
  "/images/casa-piscina-deck.webp",
  "/images/casa-area-gourmet.webp",
  "/images/portfolio-circulacao-pedra.webp",
  "/images/portfolio-hall-madeira.webp",
  "/images/casa-sala-jantar.webp",
  "/images/casa-terrea-concreto-madeira.webp",
  "/images/portfolio-lavabo-travertino.webp",
  "/images/portfolio-jantar-madeira.webp",
  "/images/casa-estar-vista-piscina.webp",
  "/images/casa-patio-piscina.webp",
];

const reformServiceImages = [
  "/images/portfolio-cozinha-cinza.webp",
  "/images/portfolio-varanda-gourmet-cinza.webp",
  "/images/portfolio-varanda-pedra.webp",
  "/images/portfolio-integracao-varanda.webp",
  "/images/portfolio-banheiro-verde.webp",
  "/images/portfolio-quarto-beliche.webp",
  "/images/portfolio-cozinha-ilha.webp",
  "/images/portfolio-varanda.webp",
];

const imageGroups: Array<{ page: string; images: string[] }> = [
  { page: "/", images: homeImages },
  {
    page: "/projetos",
    images: [...apartmentImages, ...houseImages, ...commercialImages].map(([src]) => src),
  },
  { page: "/projetos-de-apartamentos", images: apartmentServiceImages },
  { page: "/projetos-de-casas", images: houseServiceImages },
  { page: "/reformas-residenciais", images: reformServiceImages },
  { page: "/projetos-e-obras-comerciais", images: commercialImages.map(([src]) => src) },
  ...caseStudies.map((caseStudy) => ({
    page: `/projetos/${caseStudy.slug}`,
    images: caseStudy.gallery.map(([src]) => src),
  })),
  ...blogPosts.map((post) => ({
    page: `/blog/${post.slug}`,
    images: [post.image],
  })),
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const urls = imageGroups
    .map(({ page, images }) => {
      const imageEntries = images
        .map((src) => `
    <image:image>
      <image:loc>${escapeXml(`${baseUrl}${src}`)}</image:loc>
    </image:image>`)
        .join("");

      return `<url>
    <loc>${escapeXml(`${baseUrl}${page}`)}</loc>${imageEntries}
  </url>`;
    })
    .join("\n  ");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
