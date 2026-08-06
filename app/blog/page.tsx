/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { blogPosts } from "./posts";

export const metadata: Metadata = {
  title: { absolute: "Blog de Arquitetura, Interiores e Reformas | Barroco" },
  description: "Guias técnicos da Barroco Arquitetura sobre projetos de interiores, reformas, obra, marcenaria, orçamento e planejamento de apartamentos e casas.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Conteúdo técnico | Barroco Arquitetura",
    description: "Orientações para planejar projetos de interiores, reformas e obras com mais clareza.",
    url: "/blog",
    images: [{
      url: "/images/portfolio-integracao-varanda.webp",
      width: 1600,
      height: 1195,
      alt: "Projeto de interiores da Barroco Arquitetura",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conteúdo técnico | Barroco Arquitetura",
    description: "Guias sobre projetos de interiores, reformas e obras.",
    images: ["/images/portfolio-integracao-varanda.webp"],
  },
};

const baseUrl = "https://www.barrocoarquitetura.com.br";

export default function BlogPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${baseUrl}/blog#blog`,
        url: `${baseUrl}/blog`,
        name: "Conteúdo técnico da Barroco Arquitetura",
        description: "Guias sobre projetos de interiores, reformas, execução e planejamento.",
        inLanguage: "pt-BR",
        publisher: { "@id": `${baseUrl}/#empresa` },
        blogPost: blogPosts.map((post) => ({ "@id": `${baseUrl}/blog/${post.slug}#artigo` })),
      },
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/blog#pagina`,
        url: `${baseUrl}/blog`,
        name: "Blog da Barroco Arquitetura",
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: { "@id": `${baseUrl}/blog#blog` },
        inLanguage: "pt-BR",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/blog#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Conteúdo", item: `${baseUrl}/blog` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />
      <main>
        <header className="blog-hero page-shell">
          <nav className="case-breadcrumb" aria-label="Navegação estrutural">
            <Link href="/">Início</Link><span aria-hidden="true">/</span><span>Conteúdo</span>
          </nav>
          <div className="blog-hero__grid">
            <div data-reveal>
              <p className="eyebrow">Conteúdo técnico Barroco</p>
              <h1>Informação para decidir melhor antes do projeto e da obra.</h1>
            </div>
            <p>
              Guias produzidos a partir da prática do escritório para esclarecer escopo, etapas,
              orçamento, prazo e responsabilidades — sem transformar arquitetura em uma lista de dicas genéricas.
            </p>
          </div>
        </header>

        <section className="section section--sand blog-index">
          <div className="page-shell blog-grid">
            {blogPosts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <Link className="blog-card__image" href={`/blog/${post.slug}`} aria-label={`Ler: ${post.title}`}>
                  <img src={post.image} alt={post.imageAlt} loading="lazy" decoding="async" />
                </Link>
                <div className="blog-card__body">
                  <div className="blog-card__meta"><span>{post.category}</span><span>{post.readingTime}</span></div>
                  <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                  <p>{post.excerpt}</p>
                  <Link className="text-link" href={`/blog/${post.slug}`}>Ler guia <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section blog-cta">
          <div className="page-shell blog-cta__grid">
            <div><p className="eyebrow eyebrow--light">Seu projeto</p><h2>Tem uma dúvida ligada ao seu imóvel?</h2></div>
            <div><p>Conte o contexto do apartamento, casa ou espaço comercial. Assim conseguimos indicar o próximo passo mais adequado.</p><Link className="button button--light" href="/#contato">Avaliar meu projeto</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
