/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "../components/LeadForm";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { apartmentImages, commercialImages, houseImages } from "./projectData";
import { caseStudies } from "./caseStudies";

export const metadata: Metadata = {
  title: { absolute: "Projetos de Arquitetura em Santo André e SP | Barroco" },
  description: "Conheça projetos de apartamentos, casas, reformas e espaços comerciais desenvolvidos pela Barroco Arquitetura em Santo André e São Paulo.",
  alternates: { canonical: "/projetos" },
  openGraph: {
    title: "Projetos de Arquitetura em Santo André e SP | Barroco Arquitetura",
    description: "Portfólio de projetos residenciais e comerciais, interiores, reformas e obras.",
    url: "/projetos",
    images: [{
      url: "/images/portfolio-integracao-varanda.webp",
      width: 1800,
      height: 1800,
      alt: "Projeto de interiores de apartamento com sala, jantar e varanda integrados",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projetos de Arquitetura em Santo André e SP | Barroco Arquitetura",
    description: "Portfólio de projetos residenciais e comerciais, interiores, reformas e obras.",
    images: ["/images/portfolio-integracao-varanda.webp"],
  },
};

const categories = [
  {
    id: "apartamentos",
    eyebrow: "Apartamentos",
    title: "Interiores que aproveitam cada escolha e cada metro.",
    description: "Integração, marcenaria, iluminação e materiais pensados para transformar a rotina e dar unidade aos ambientes.",
    keyword: "Projeto de interiores",
    href: "/projetos-de-apartamentos",
    linkLabel: "Conhecer projetos de apartamentos",
    images: apartmentImages,
  },
  {
    id: "casas",
    eyebrow: "Casas",
    title: "Arquitetura que aproxima espaços, paisagem e modos de viver.",
    description: "Casas novas e existentes desenvolvidas com atenção à implantação, aos fluxos, à materialidade e à relação entre interior e exterior.",
    keyword: "Projeto arquitetônico",
    href: "/projetos-de-casas",
    linkLabel: "Conhecer projetos de casas",
    images: houseImages,
  },
  {
    id: "comerciais",
    eyebrow: "Comercial e escritórios",
    title: "Espaços que traduzem a identidade e apoiam a operação.",
    description: "Projetos para ambientes de trabalho, atendimento e varejo, conciliando experiência, fluxos, técnica e presença de marca.",
    keyword: "Arquitetura comercial",
    href: "/projetos-e-obras-comerciais",
    linkLabel: "Conhecer projetos comerciais",
    images: commercialImages,
  },
];

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projetos de Arquitetura e Interiores | Barroco Arquitetura",
  url: "https://www.barrocoarquitetura.com.br/projetos",
  description: "Portfólio de projetos residenciais e comerciais, interiores, reformas e obras.",
  inLanguage: "pt-BR",
  isPartOf: { "@id": "https://www.barrocoarquitetura.com.br/#website" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://www.barrocoarquitetura.com.br/images/portfolio-integracao-varanda.webp",
    width: 1800,
    height: 1800,
    caption: "Projeto de interiores de apartamento com ambientes integrados",
  },
  about: categories.map((category) => ({
    "@type": "Service",
    name: category.eyebrow,
    url: `https://www.barrocoarquitetura.com.br${category.href}`,
  })),
  hasPart: caseStudies.map((caseStudy) => ({
    "@type": "CreativeWork",
    name: caseStudy.title,
    url: `https://www.barrocoarquitetura.com.br/projetos/${caseStudy.slug}`,
  })),
};

export default function ProjetosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <SiteHeader />
      <main>
        <section className="projects-hero page-shell">
          <p className="eyebrow">Portfólio selecionado</p>
          <h1>Projetos de arquitetura e interiores em Santo André e São Paulo.</h1>
          <p className="projects-hero__lead">Residências, interiores e ambientes comerciais concebidos com identidade, precisão técnica e atenção à experiência de quem ocupa cada espaço.</p>
          <nav className="projects-jump" aria-label="Categorias de projetos">
            {categories.map((category) => <a href={`#${category.id}`} key={category.id}>{category.eyebrow}</a>)}
          </nav>
        </section>

        <section className="section section--sand featured-cases">
          <div className="page-shell">
            <div className="section-heading section-heading--split" data-reveal>
              <div><p className="eyebrow">Projetos em destaque</p><h2>Soluções explicadas além das imagens.</h2></div>
              <p>Conheça decisões de layout, materialidade, iluminação, marcenaria e execução em projetos residenciais e comerciais.</p>
            </div>
            <div className="featured-cases__grid">
              {caseStudies.map((caseStudy) => (
                <Link className="featured-case" href={`/projetos/${caseStudy.slug}`} key={caseStudy.slug}>
                  <span className="featured-case__image"><img src={caseStudy.heroImage} alt={caseStudy.heroAlt} loading="lazy" decoding="async" /></span>
                  <span className="featured-case__body"><small>{caseStudy.category}</small><strong>{caseStudy.title}</strong><span>Ver projeto <b aria-hidden="true">→</b></span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {categories.map((category) => (
          <section className={`section page-shell projects-category projects-category--${category.id}`} id={category.id} key={category.id}>
            <div className="section-heading projects-category__heading">
              <div>
                <p className="eyebrow">{category.eyebrow}</p>
                <h2>{category.title}</h2>
              </div>
              <div>
                <p>{category.description}</p>
                <Link className="text-link" href={category.href}>{category.linkLabel} <span aria-hidden="true">→</span></Link>
              </div>
            </div>
            <div className="service-gallery__grid">
              {category.images.map(([src, title, description], index) => (
                <figure className={`service-gallery__item service-gallery__item--${index + 1}`} key={src}>
                  <a
                    className="service-gallery__zoom"
                    href={src}
                    data-project-lightbox
                    data-lightbox-title={title}
                    data-lightbox-description={description}
                    aria-label={`Ampliar imagem: ${title}`}
                    aria-haspopup="dialog"
                  >
                    <img src={src} alt={`${category.keyword}: ${title}. ${description}`} loading="lazy" decoding="async" />
                    <span className="service-gallery__zoom-label" aria-hidden="true">Ampliar <b>↗</b></span>
                  </a>
                  <figcaption><strong>{title}</strong><span>{category.keyword} · {description}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}

        <section className="section contact-section" id="contato">
          <div className="page-shell contact-section__grid">
            <div>
              <p className="eyebrow">Seu projeto</p>
              <h2>Conte-nos o que você deseja transformar.</h2>
              <p>Compartilhe o tipo de imóvel, a área aproximada e o momento do projeto. Nossa equipe dará continuidade pelo WhatsApp.</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
