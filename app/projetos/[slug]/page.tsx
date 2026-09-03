/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "../../components/LeadForm";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { caseStudies, getCaseStudy } from "../caseStudies";

const baseUrl = "https://www.barrocoarquitetura.com.br";

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  const canonical = `/projetos/${caseStudy.slug}`;
  return {
    title: { absolute: caseStudy.metaTitle },
    description: caseStudy.description,
    alternates: { canonical },
    openGraph: {
      title: caseStudy.metaTitle,
      description: caseStudy.description,
      type: "article",
      url: canonical,
      images: [{ url: caseStudy.heroImage, alt: caseStudy.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.metaTitle,
      description: caseStudy.description,
      images: [caseStudy.heroImage],
    },
  };
}

export default async function ProjectCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();
  const relatedProjects = caseStudies.filter((item) => item.slug !== caseStudy.slug).slice(0, 2);

  const pageUrl = `${baseUrl}/projetos/${caseStudy.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#projeto`,
        name: caseStudy.title,
        headline: caseStudy.title,
        description: caseStudy.description,
        url: pageUrl,
        dateModified: caseStudy.modified,
        mainEntityOfPage: `${pageUrl}#pagina`,
        inLanguage: "pt-BR",
        creator: { "@id": `${baseUrl}/#empresa` },
        about: caseStudy.keywords,
        image: caseStudy.gallery.map(([src, title, description]) => ({
          "@type": "ImageObject",
          contentUrl: `${baseUrl}${src}`,
          name: title,
          caption: description,
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#pagina`,
        name: caseStudy.title,
        description: caseStudy.description,
        url: pageUrl,
        dateModified: caseStudy.modified,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${pageUrl}#projeto` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: `${baseUrl}${caseStudy.heroImage}`,
          caption: caseStudy.heroAlt,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Projetos", item: `${baseUrl}/projetos` },
          { "@type": "ListItem", position: 3, name: caseStudy.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />
      <main>
        <article>
          <header className="case-hero page-shell">
            <nav className="case-breadcrumb" aria-label="Navegação estrutural">
              <Link href="/">Início</Link><span aria-hidden="true">/</span><Link href="/projetos">Projetos</Link>
            </nav>
            <div className="case-hero__grid">
              <div className="case-hero__copy" data-reveal>
                <p className="eyebrow">{caseStudy.category}</p>
                <h1>{caseStudy.title}</h1>
                <p className="hero-lead">{caseStudy.intro}</p>
                <Link className="button button--primary" href={caseStudy.serviceHref}>{caseStudy.serviceLabel}</Link>
              </div>
              <figure className="case-hero__figure">
                <img src={caseStudy.heroImage} alt={caseStudy.heroAlt} fetchPriority="high" loading="eager" />
              </figure>
            </div>
          </header>

          <section className="section case-story page-shell">
            <div data-reveal>
              <p className="eyebrow">O desafio</p>
              <h2>{caseStudy.challengeTitle}</h2>
              <p>{caseStudy.challenge}</p>
            </div>
            <div data-reveal>
              <p className="eyebrow">A solução</p>
              <h2>{caseStudy.solutionTitle}</h2>
              <p>{caseStudy.solution}</p>
            </div>
          </section>

          <section className="section case-decisions">
            <div className="page-shell">
              <div className="section-heading section-heading--split" data-reveal>
                <div><p className="eyebrow eyebrow--light">Decisões de projeto</p><h2>Soluções que organizam o espaço.</h2></div>
                <p>Projeto, materiais e execução pensados como partes de uma mesma experiência.</p>
              </div>
              <ul>
                {caseStudy.decisions.map((decision, index) => <li key={decision}><span>0{index + 1}</span><strong>{decision}</strong></li>)}
              </ul>
            </div>
          </section>

          <section className="section page-shell case-gallery">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Galeria do projeto</p>
              <h2>Ambientes e detalhes.</h2>
            </div>
            <div className="service-gallery__grid">
              {caseStudy.gallery.map(([image, title, text], index) => (
                <figure className={`service-gallery__item service-gallery__item--${index + 1}`} key={image}>
                  <a
                    className="service-gallery__zoom"
                    href={image}
                    data-project-lightbox
                    data-lightbox-title={title}
                    data-lightbox-description={text}
                    aria-label={`Ampliar imagem: ${title}`}
                    aria-haspopup="dialog"
                  >
                    <img src={image} alt={`${caseStudy.category}: ${title}. ${text}`} loading="lazy" decoding="async" />
                    <span className="service-gallery__zoom-label" aria-hidden="true">Ampliar <b>↗</b></span>
                  </a>
                  <figcaption><strong>{title}</strong><span>{text}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="section section--sand featured-cases related-projects">
            <div className="page-shell">
              <div className="section-heading section-heading--split" data-reveal>
                <div><p className="eyebrow">Outros projetos</p><h2>Arquitetura em diferentes escalas e usos.</h2></div>
                <p>Conheça outras soluções residenciais e comerciais desenvolvidas pela Barroco Arquitetura.</p>
              </div>
              <div className="featured-cases__grid">
                {relatedProjects.map((project) => (
                  <Link className="featured-case" href={`/projetos/${project.slug}`} key={project.slug}>
                    <span className="featured-case__image"><img src={project.heroImage} alt={project.heroAlt} loading="lazy" decoding="async" /></span>
                    <span className="featured-case__body"><small>{project.category}</small><strong>{project.title}</strong><span>Ver projeto <b aria-hidden="true">→</b></span></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </article>

        <section className="section contact-section" id="contato">
          <div className="page-shell contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow eyebrow--light">Seu projeto</p>
              <h2>Vamos conversar sobre o seu espaço.</h2>
              <p>Compartilhe as informações iniciais para avaliarmos o escopo mais adequado.</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
