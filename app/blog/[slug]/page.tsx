/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { blogPosts, getBlogPost } from "../posts";

const baseUrl = "https://www.barrocoarquitetura.com.br";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const canonical = `/blog/${post.slug}`;
  return {
    title: { absolute: post.metaTitle },
    description: post.description,
    alternates: { canonical },
    authors: [{ name: "Barroco Arquitetura", url: baseUrl }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonical,
      publishedTime: post.published,
      modifiedTime: post.modified,
      authors: [baseUrl],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" }).format(new Date(`${date}T12:00:00-03:00`));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const pageUrl = `${baseUrl}/blog/${post.slug}`;
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#artigo`,
        url: pageUrl,
        headline: post.title,
        description: post.description,
        datePublished: post.published,
        dateModified: post.modified,
        inLanguage: "pt-BR",
        mainEntityOfPage: { "@id": `${pageUrl}#pagina` },
        author: { "@type": "Organization", "@id": `${baseUrl}/#empresa`, name: "Barroco Arquitetura", url: baseUrl },
        publisher: { "@id": `${baseUrl}/#empresa` },
        image: { "@type": "ImageObject", url: `${baseUrl}${post.image}`, contentUrl: `${baseUrl}${post.image}`, caption: post.imageAlt },
        keywords: post.keywords.join(", "),
        about: post.keywords.map((name) => ({ "@type": "Thing", name })),
        citation: post.sources?.map((source) => ({ "@type": "CreativeWork", name: source.title, url: source.url })),
        isPartOf: { "@id": `${baseUrl}/blog#blog` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#pagina`,
        url: pageUrl,
        name: post.title,
        description: post.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${baseUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#artigo` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Conteúdo", item: `${baseUrl}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />
      <main>
        <article className="article-page">
          <header className="article-hero page-shell">
            <nav className="case-breadcrumb" aria-label="Navegação estrutural">
              <Link href="/">Início</Link><span aria-hidden="true">/</span><Link href="/blog">Conteúdo</Link>
            </nav>
            <div className="article-hero__copy" data-reveal>
              <p className="eyebrow">{post.category}</p>
              <h1>{post.title}</h1>
              <p className="hero-lead">{post.excerpt}</p>
              <div className="article-meta">
                <span>Por Barroco Arquitetura</span>
                <span>Publicado em {formatDate(post.published)}</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
            <figure className="article-hero__image"><img src={post.image} alt={post.imageAlt} fetchPriority="high" loading="eager" /></figure>
          </header>

          <div className="article-layout page-shell">
            <aside className="article-aside">
              <strong>Neste guia</strong>
              <nav aria-label="Seções do artigo">
                {post.sections.map((section, index) => <a href={`#secao-${index + 1}`} key={section.title}>{section.title}</a>)}
              </nav>
              <Link className="text-link" href={post.relatedService.href}>{post.relatedService.label} <span aria-hidden="true">→</span></Link>
            </aside>

            <div className="article-content">
              <section className="article-answer" aria-label="Resposta direta">
                <span>Resposta direta</span>
                <p>{post.answer}</p>
              </section>

              {post.sections.map((section, index) => (
                <section id={`secao-${index + 1}`} className="article-section" key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (section.ordered ? (
                    <ol>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ol>
                  ) : (
                    <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
                  ))}
                  {section.highlight && <aside className="article-highlight">{section.highlight}</aside>}
                </section>
              ))}

              {post.sources && post.sources.length > 0 && (
                <section className="article-section article-sources">
                  <h2>Fontes técnicas consultadas</h2>
                  <p>Referências institucionais utilizadas para conferir as informações técnicas deste guia.</p>
                  <ul>
                    {post.sources.map((source) => (
                      <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="article-author">
                <div><span>Conteúdo técnico</span><h2>Barroco Arquitetura</h2></div>
                <p>Desde 2013, o escritório desenvolve projetos residenciais e comerciais, interiores, reformas, obras e marcenaria. Mayara Cimino e Luiz Faria conduzem os projetos com participação direta nas decisões criativas e técnicas.</p>
                <Link className="text-link" href="/#sobre">Conhecer a Barroco <span aria-hidden="true">→</span></Link>
              </section>

              <section className="article-service-cta">
                <p className="eyebrow eyebrow--light">Próximo passo</p>
                <h2>{post.relatedService.title}</h2>
                <p>Compartilhe as informações iniciais do imóvel para avaliarmos o escopo mais adequado.</p>
                <Link className="button button--light" href={post.relatedService.href}>{post.relatedService.label}</Link>
              </section>
            </div>
          </div>
        </article>

        <section className="section section--sand related-posts">
          <div className="page-shell">
            <div className="section-heading"><p className="eyebrow">Continue pesquisando</p><h2>Outras decisões antes da obra.</h2></div>
            <div className="related-posts__grid">
              {related.map((item) => (
                <article key={item.slug}><span>{item.category}</span><h3><Link href={`/blog/${item.slug}`}>{item.title}</Link></h3><Link className="text-link" href={`/blog/${item.slug}`}>Ler guia <b aria-hidden="true">→</b></Link></article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
