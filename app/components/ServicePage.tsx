/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { testimonials } from "../content/testimonials";
import { TestimonialCarousel } from "./HomeCarousels";
import { LeadForm } from "./LeadForm";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type ServicePageProps = {
  canonicalPath: string;
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  gallery?: ReadonlyArray<readonly [string, string, string]>;
  featuredProjects?: ReadonlyArray<readonly [string, string, string, string]>;
  highlights: Array<[string, string]>;
  sectionTitle: string;
  sectionIntro: string;
  deliverables: Array<[string, string]>;
  idealFor: string[];
  faqs: Array<[string, string]>;
  defaultService: string;
};

const relatedServices = [
  { href: "/projetos-de-apartamentos", title: "Projetos de apartamentos", text: "Interiores, executivo, especificações e orçamentos." },
  { href: "/projetos-de-casas", title: "Projetos de casas", text: "Arquitetura e interiores conectados ao modo de viver." },
  { href: "/reformas-residenciais", title: "Reformas residenciais", text: "Projeto, planejamento, gerenciamento, obra e marcenaria." },
  { href: "/projetos-e-obras-comerciais", title: "Comercial e escritórios", text: "Espaços alinhados à operação, à marca e à experiência." },
];

export function ServicePage(props: ServicePageProps) {
  const pageUrl = `https://www.barrocoarquitetura.com.br${props.canonicalPath}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#pagina`,
      name: props.title,
      description: props.intro,
      url: pageUrl,
      inLanguage: "pt-BR",
      isPartOf: { "@id": "https://www.barrocoarquitetura.com.br/#website" },
      about: { "@id": `${pageUrl}#servico` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        contentUrl: `https://www.barrocoarquitetura.com.br${props.image}`,
        caption: props.imageAlt,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#servico`,
      name: props.eyebrow,
      serviceType: props.eyebrow,
      description: props.intro,
      url: pageUrl,
      image: `https://www.barrocoarquitetura.com.br${props.image}`,
      inLanguage: "pt-BR",
      mainEntityOfPage: pageUrl,
      provider: { "@id": "https://www.barrocoarquitetura.com.br/#empresa" },
      areaServed: [
        { "@type": "City", name: "Santo André" },
        { "@type": "City", name: "São Bernardo do Campo" },
        { "@type": "City", name: "São Caetano do Sul" },
        { "@type": "AdministrativeArea", name: "Estado de São Paulo" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#perguntas-frequentes`,
      url: pageUrl,
      inLanguage: "pt-BR",
      mainEntity: props.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://www.barrocoarquitetura.com.br" },
        { "@type": "ListItem", position: 2, name: props.eyebrow, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />
      <main>
        <section className="service-hero">
          <div className="page-shell service-hero__grid">
            <div className="service-hero__copy" data-reveal>
              <p className="eyebrow">{props.eyebrow}</p>
              <h1>{props.title}</h1>
              <p className="hero-lead">{props.intro}</p>
              <div className="button-row">
                <a className="button button--primary" href="#contato">Quero avaliar meu projeto</a>
                <a className="button button--ghost-dark" href="#escopo">Ver o que está incluído</a>
              </div>
              <div className="service-hero__context" aria-label="Informações do atendimento">
                <span>Projeto personalizado</span>
                <span>Executivo e especificações</span>
                <span>Projeto, obra e marcenaria</span>
              </div>
            </div>
            <figure className="service-hero__figure">
              <img src={props.image} alt={props.imageAlt} fetchPriority="high" loading="eager" />
              <figcaption><strong>Barroco Arquitetura</strong><span>Projeto · Interiores · Obra</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="service-highlights">
          <div className="page-shell service-highlights__grid">
            {props.highlights.map(([title, text], index) => (
              <article key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></article>
            ))}
          </div>
        </section>

        {props.gallery && props.gallery.length > 0 && (
          <section className="section page-shell service-gallery" id="portfolio">
            <div className="section-heading section-heading--split" data-reveal>
              <div>
                <p className="eyebrow">Seleção de projetos</p>
                <h2>Decisões de projeto vistas de perto.</h2>
              </div>
              <p>Uma seleção de ambientes em que layout, materiais, iluminação e marcenaria trabalham em conjunto.</p>
            </div>
            <div className="service-gallery__grid">
              {props.gallery.map(([image, title, text], index) => (
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
                    <img src={image} alt={`${title} — ${text}`} loading="lazy" decoding="async" />
                    <span className="service-gallery__zoom-label" aria-hidden="true">Ampliar <b>↗</b></span>
                  </a>
                  <figcaption><strong>{title}</strong><span>{text}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {props.featuredProjects && props.featuredProjects.length > 0 && (
          <section className="section section--sand featured-cases">
            <div className="page-shell">
              <div className="section-heading section-heading--split" data-reveal>
                <div><p className="eyebrow">Projetos em destaque</p><h2>Veja as decisões por trás dos ambientes.</h2></div>
                <p>Projetos apresentados com contexto, soluções de layout, materiais, iluminação e detalhamento.</p>
              </div>
              <div className="featured-cases__grid featured-cases__grid--compact">
                {props.featuredProjects.map(([href, image, title, text]) => (
                  <Link className="featured-case" href={href} key={href}>
                    <span className="featured-case__image"><img src={image} alt={`${title} — ${text}`} loading="lazy" decoding="async" /></span>
                    <span className="featured-case__body"><small>Projeto Barroco</small><strong>{title}</strong><span>Conhecer projeto <b aria-hidden="true">→</b></span></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section page-shell scope-section" id="escopo">
          <div className="scope-intro" data-reveal>
            <p className="eyebrow">Escopo completo</p>
            <h2>{props.sectionTitle}</h2>
            <p>{props.sectionIntro}</p>
          </div>
          <div className="deliverable-grid">
            {props.deliverables.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section fit-section">
          <div className="page-shell fit-grid">
            <div data-reveal>
              <p className="eyebrow eyebrow--light">Para quem é</p>
              <h2>Um processo feito para tomar decisões com mais clareza.</h2>
              <a className="button button--light fit-section__cta" href="#contato">Conversar sobre o escopo</a>
            </div>
            <ul>
              {props.idealFor.map((item) => <li key={item}><span aria-hidden="true">→</span>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="section page-shell service-process">
          <div className="section-heading section-heading--split" data-reveal>
            <div><p className="eyebrow">Como funciona</p><h2>Do diagnóstico ao executivo.</h2></div>
            <p>Cada etapa é validada antes de avançarmos, mantendo decisões e investimento sob controle.</p>
          </div>
          <ol>
            <li><span>01</span><strong>Conversa inicial</strong><p>Entendemos imóvel, rotina, escopo, prazo e prioridades.</p></li>
            <li><span>02</span><strong>Levantamento</strong><p>Organizamos as informações necessárias para projetar.</p></li>
            <li><span>03</span><strong>Conceito</strong><p>Apresentamos layout, linguagem e principais soluções.</p></li>
            <li><span>04</span><strong>Desenvolvimento</strong><p>Detalhamos materiais, iluminação, marcenaria e sistemas.</p></li>
            <li><span>05</span><strong>Executivo</strong><p>Entregamos desenhos, especificações e apoio aos orçamentos.</p></li>
          </ol>
        </section>

        <section className="section section--sand">
          <div className="page-shell">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Relatos de clientes</p>
              <h2>Relações de confiança, resultados que permanecem.</h2>
            </div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>

        <section className="section page-shell faq-section" id="perguntas-frequentes">
          <div className="faq-section__grid">
            <div className="section-heading" data-reveal><p className="eyebrow">Dúvidas frequentes</p><h2>Antes de começar.</h2></div>
            <div className="faq-list">
              {props.faqs.map(([question, answer]) => (
                <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="section related-services">
          <div className="page-shell">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Outros serviços</p>
              <h2>Uma visão integrada para diferentes tipos de espaço.</h2>
            </div>
            <div className="related-services__grid">
              {relatedServices
                .filter((service) => service.href !== props.canonicalPath)
                .slice(0, 3)
                .map((service) => (
                  <Link className="related-services__card" href={service.href} key={service.href}>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <span>Conhecer serviço <b aria-hidden="true">→</b></span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contato">
          <div className="page-shell contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow eyebrow--light">Próximo passo</p>
              <h2>Conte sobre o seu projeto.</h2>
              <p>Com algumas informações iniciais conseguimos avaliar o tipo de escopo mais adequado para a sua necessidade.</p>
              <Link href="/" className="text-link text-link--light">Conhecer toda a Barroco <span aria-hidden="true">↗</span></Link>
            </div>
            <LeadForm defaultService={props.defaultService} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
