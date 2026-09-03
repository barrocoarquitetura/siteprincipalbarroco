/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { HeroCarousel, PortfolioCarousel, TestimonialCarousel } from "./components/HomeCarousels";
import { LeadForm } from "./components/LeadForm";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { blogPosts } from "./blog/posts";
import { testimonials } from "./content/testimonials";

export const metadata: Metadata = {
  title: { absolute: "Escritório de Arquitetura em Santo André e SP | Barroco" },
  description:
    "Escritório de arquitetura em Santo André para projetos de casas, apartamentos, interiores, reformas e obras comerciais no estado de São Paulo.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Escritório de Arquitetura em Santo André e SP | Barroco Arquitetura",
    description:
      "Projetos de casas, apartamentos, interiores, reformas e obras comerciais em diferentes regiões do estado de São Paulo.",
    url: "/",
    images: [{
      url: "/images/hero-apartamento-integrado.webp",
      width: 1800,
      height: 1800,
      alt: "Projeto residencial com ambientes integrados da Barroco Arquitetura",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Escritório de Arquitetura em Santo André e SP | Barroco Arquitetura",
    description:
      "Projetos de casas, apartamentos, interiores, reformas e obras comerciais em diferentes regiões do estado de São Paulo.",
    images: ["/images/hero-apartamento-integrado.webp"],
  },
};

const services = [
  {
    title: "Apartamentos",
    text: "Interiores, detalhamento executivo, especificações e orçamento para aproveitar o imóvel com inteligência.",
    href: "/projetos-de-apartamentos",
    linkLabel: "Conhecer projetos de apartamentos",
    image: "/images/apartamento-estar-jantar-integrados.webp",
    alt: "Projeto de interiores para apartamento com sala de estar e jantar integradas",
  },
  {
    title: "Casas",
    text: "Arquitetura e interiores concebidos a partir do terreno, da rotina e da relação com a paisagem.",
    href: "/projetos-de-casas",
    linkLabel: "Conhecer projetos de casas",
    image: "/images/casa-patio-piscina.webp",
    alt: "Projeto de casa contemporânea com pátio, piscina e integração dos ambientes",
  },
  {
    title: "Reformas",
    text: "Planejamento, orçamento, gerenciamento, execução e marcenaria coordenados em uma mesma visão.",
    href: "/reformas-residenciais",
    linkLabel: "Conhecer reformas residenciais",
    image: "/images/portfolio-cozinha-verde.webp",
    alt: "Reforma residencial concluída pela Barroco Arquitetura",
  },
  {
    title: "Comercial e escritórios",
    text: "Projetos e obras que articulam operação, experiência, identidade de marca e viabilidade técnica.",
    href: "/projetos-e-obras-comerciais",
    linkLabel: "Conhecer arquitetura comercial",
    image: "/images/comercial-recepcao-jardim-vertical.webp",
    alt: "Projeto comercial com recepção, iluminação técnica e jardim vertical",
  },
];

const projects = [
  ["/images/portfolio-integracao-varanda.webp", "Apartamento integrado", "Projeto de interiores · ambientes integrados"],
  ["/images/casa-piscina-deck.webp", "Casa com lazer", "Projeto de casa · piscina e paisagismo"],
  ["/images/comercial-recepcao-jardim-vertical.webp", "Recepção comercial", "Arquitetura comercial · recepção e marca"],
  ["/images/portfolio-cozinha-verde.webp", "Cozinha compacta", "Reforma de apartamento · marcenaria planejada"],
  ["/images/portfolio-casa-corten.webp", "Casa contemporânea", "Projeto arquitetônico · fachada em aço corten"],
  ["/images/apartamento-lavabo-botanico.webp", "Lavabo autoral", "Projeto de interiores · marcenaria e iluminação"],
  ["/images/portfolio-quarto-infantil-rosa.webp", "Quarto infantil", "Interiores de apartamento · marcenaria sob medida"],
  ["/images/casa-area-gourmet.webp", "Área gourmet residencial", "Projeto de casa · área gourmet integrada"],
  ["/images/portfolio-varanda-pedra.webp", "Varanda gourmet", "Reforma de apartamento · varanda gourmet"],
  ["/images/comercial-restaurante.webp", "Espaço comercial", "Arquitetura comercial · fachada e atendimento"],
  ["/images/portfolio-lavabo-travertino.webp", "Lavabo", "Projeto de interiores · pedra e iluminação"],
  ["/images/portfolio-cozinha-ilha.webp", "Cozinha com ilha", "Interiores de apartamento · cozinha planejada"],
  ["/images/portfolio-casa-pedra.webp", "Casa térrea", "Projeto arquitetônico · fachada e paisagismo"],
  ["/images/apartamento-estar-painel-tv.webp", "Estar contemporâneo", "Projeto de interiores · painel e marcenaria"],
  ["/images/portfolio-jantar-madeira.webp", "Sala de jantar", "Interiores residenciais · marcenaria planejada"],
  ["/images/portfolio-circulacao-pedra.webp", "Circulação residencial", "Projeto de casa · pedra e luz natural"],
  ["/images/portfolio-banheiro-verde.webp", "Banheiro", "Reforma de apartamento · banheiro planejado"],
  ["/images/escritorio-estacao-trabalho.webp", "Escritório", "Projeto de escritório · ergonomia e layout"],
];

const heroSlides = [
  {
    image: "/images/hero-lavabo-geometrico.webp",
    alt: "Lavabo contemporâneo com revestimento geométrico, espelho vertical e bancada em pedra",
    caption: "Interiores residenciais · lavabo",
  },
  {
    image: "/images/hero-hall-iluminacao-linear.webp",
    alt: "Hall residencial em madeira com iluminação linear integrada ao teto e às paredes",
    caption: "Interiores residenciais · iluminação",
  },
  {
    image: "/images/hero-escritorio-jardim-vertical.webp",
    alt: "Escritório contemporâneo com copa, área de espera, iluminação linear e jardim vertical",
    caption: "Arquitetura comercial · escritório",
  },
  {
    image: "/images/hero-cozinha-cinza.webp",
    alt: "Cozinha de apartamento com marcenaria cinza, bancada em pedra clara e eletrodomésticos embutidos",
    caption: "Interiores de apartamentos · cozinha",
  },
  {
    image: "/images/hero-apartamento-integrado.webp",
    alt: "Sala de estar e jantar integradas à varanda, com marcenaria clara e cadeiras verdes",
    caption: "Interiores de apartamentos · integração",
  },
  {
    image: "/images/hero-casa-terrea-contemporanea.webp",
    alt: "Casa térrea contemporânea com fachada em pedra, madeira, jardim e ampla cobertura",
    caption: "Arquitetura residencial · casas",
  },
];

const homeFaqs = [
  {
    question: "Quais serviços a Barroco Arquitetura oferece?",
    answer:
      "A Barroco desenvolve projetos de arquitetura e interiores para casas, apartamentos, comércios e escritórios. Conforme o escopo contratado, também realiza projeto executivo, especificações, orçamentos, reforma, gerenciamento de obra, execução e marcenaria.",
  },
  {
    question: "Onde a Barroco Arquitetura atende?",
    answer:
      "O escritório está localizado em Santo André e desenvolve projetos e obras em diferentes regiões do estado de São Paulo.",
  },
  {
    question: "É possível contratar o projeto e a obra com a mesma equipe?",
    answer:
      "Sim. A contratação pode começar apenas pelo projeto ou incluir planejamento, orçamento, gerenciamento, execução da reforma e marcenaria. O escopo é definido de acordo com o imóvel, o prazo e as necessidades do cliente.",
  },
  {
    question: "A Barroco faz projetos comerciais e para escritórios?",
    answer:
      "Sim. A Barroco projeta e executa espaços comerciais, corporativos e escritórios com foco em fluxo, funcionalidade, experiência de clientes e equipe, identidade da marca e viabilidade de execução.",
  },
  {
    question: "O projeto inclui executivo, especificações e orçamentos?",
    answer:
      "O projeto completo pode incluir layout, imagens 3D, detalhamento executivo, iluminação, marcenaria, especificação de materiais e apoio na organização dos orçamentos necessários para a obra.",
  },
];

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.barrocoarquitetura.com.br/#pagina",
    url: "https://www.barrocoarquitetura.com.br",
    name: "Escritório de Arquitetura em Santo André e SP | Barroco",
    description: "Projetos de arquitetura e interiores, reformas, obras e marcenaria para casas, apartamentos, comércios e escritórios.",
    inLanguage: "pt-BR",
    isPartOf: { "@id": "https://www.barrocoarquitetura.com.br/#website" },
    about: { "@id": "https://www.barrocoarquitetura.com.br/#empresa" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://www.barrocoarquitetura.com.br/images/hero-apartamento-integrado.webp",
      width: 1800,
      height: 1800,
      caption: "Projeto de interiores de apartamento com ambientes integrados da Barroco Arquitetura",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.barrocoarquitetura.com.br/#perguntas-frequentes",
    url: "https://www.barrocoarquitetura.com.br",
    inLanguage: "pt-BR",
    mainEntity: homeFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }} />
      <SiteHeader />
      <main>
        <section className="home-hero">
          <div className="page-shell home-hero__grid">
            <div className="home-hero__copy" data-reveal>
              <p className="eyebrow">Arquitetura, interiores e execução</p>
              <h1>Arquitetura e interiores com identidade, do projeto à obra.</h1>
              <p className="hero-lead">
                Arquitetura residencial e comercial conduzida com método, clareza técnica e atenção a cada
                escolha — do conceito ao detalhamento, à obra e à marcenaria.
              </p>
              <div className="button-row">
                <a className="button button--primary" href="#contato">
                  Avaliar meu projeto
                </a>
                <a className="button button--ghost" href="#servicos">
                  Conhecer serviços
                </a>
              </div>
            </div>
            <HeroCarousel slides={heroSlides} />
          </div>
        </section>

        <section className="trust-strip" aria-label="Diferenciais da Barroco Arquitetura">
          <div className="page-shell trust-strip__grid">
            <div><strong>Desde 2013</strong><span>arquitetura com repertório e método</span></div>
            <div><strong>Atendimento direto</strong><span>Mayara e Luiz à frente dos projetos</span></div>
            <div><strong>Projeto à execução</strong><span>decisões coordenadas em cada etapa</span></div>
            <div><strong>Soluções integradas</strong><span>arquitetura, obra e marcenaria</span></div>
          </div>
        </section>

        <section className="section page-shell intro-section" id="sobre">
          <div data-reveal>
            <p className="eyebrow">Sobre a Barroco Arquitetura</p>
            <h2>Arquitetura que traduz pessoas, rotinas e negócios.</h2>
            <figure className="about-team-photo">
              <img
                src="/images/mayara-cimino-luiz-faria.webp"
                alt="Arquiteta Mayara Cimino e arquiteto Luiz Faria, à frente da Barroco Arquitetura"
                loading="lazy"
              />
            </figure>
          </div>
          <div className="intro-section__text" data-reveal>
            <p>
              Desde 2013, a Barroco Arquitetura desenvolve projetos residenciais e comerciais em que
              estética, uso e viabilidade caminham juntos. Cada espaço nasce da escuta e de uma leitura
              cuidadosa do contexto.
            </p>
            <p>
              Para casas, apartamentos, comércios e escritórios, articulamos layout, materiais, iluminação,
              marcenaria, imagens 3D, detalhamento executivo e especificações em uma solução coerente.
            </p>
            <p>
              Projeto, reforma, gerenciamento, execução e marcenaria podem ser conduzidos pela mesma equipe,
              preservando a intenção arquitetônica em todas as etapas.
            </p>
            <p className="about-team-intro">
              À frente do escritório estão a arquiteta Mayara Cimino e o arquiteto Luiz Faria, que
              conduzem cada projeto com olhar criativo, detalhamento técnico e acompanhamento próximo.
            </p>
            <div className="about-team-names" aria-label="Arquitetos à frente da Barroco Arquitetura">
                <div id="mayara-cimino"><strong>Mayara Cimino</strong><span>Arquiteta</span></div>
                <div id="luiz-faria"><strong>Luiz Faria</strong><span>Arquiteto</span></div>
            </div>
          </div>
        </section>

        <section className="section section--sand" id="servicos">
          <div className="page-shell">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Serviços</p>
              <h2>Arquitetura para diferentes formas de viver e trabalhar.</h2>
            </div>
            <div className="service-grid">
              {services.map((service, index) => (
                <article className="service-card" key={service.title}>
                  <Link href={service.href} className="service-card__image" aria-label={`Conhecer ${service.title}`}>
                    <img src={service.image} alt={service.alt} loading="lazy" decoding="async" />
                  </Link>
                  <div className="service-card__body">
                    <span>0{index + 1}</span>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <Link href={service.href} className="text-link">
                      {service.linkLabel} <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="page-shell process-grid">
            <div className="process-intro" data-reveal>
              <p className="eyebrow eyebrow--light">Método Barroco</p>
              <h2>Clareza em cada decisão, consistência até a entrega.</h2>
              <p>
                Um processo organizado para alinhar expectativas, antecipar escolhas
                e transformar o projeto em realidade com segurança.
              </p>
            </div>
            <ol className="process-list">
              <li><span>01</span><div><strong>Diagnóstico</strong><p>Imóvel, rotina, necessidades, prazo e investimento.</p></div></li>
              <li><span>02</span><div><strong>Conceito e layout</strong><p>Fluxos, usos e identidade dos ambientes.</p></div></li>
              <li><span>03</span><div><strong>Desenvolvimento</strong><p>Imagens 3D, materiais, iluminação e marcenaria.</p></div></li>
              <li><span>04</span><div><strong>Executivo e orçamentos</strong><p>Detalhes técnicos e apoio para contratar com clareza.</p></div></li>
              <li><span>05</span><div><strong>Obra e marcenaria</strong><p>Planejamento, gerenciamento e execução coordenada.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="section page-shell" id="projetos">
          <div className="section-heading section-heading--split" data-reveal>
            <div>
              <p className="eyebrow">Portfólio</p>
              <h2>Espaços com identidade, técnica e intenção.</h2>
            </div>
            <div>
              <p>Uma seleção de projetos residenciais e comerciais desenvolvidos pelo escritório.</p>
              <Link className="text-link" href="/projetos">Ver mais projetos <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <PortfolioCarousel projects={projects.map(([image, title, text]) => ({ image, title, text }))} />
        </section>

        <section className="section section--sand home-insights">
          <div className="page-shell">
            <div className="section-heading section-heading--split" data-reveal>
              <div><p className="eyebrow">Conteúdo técnico</p><h2>Dúvidas importantes antes do projeto e da obra.</h2></div>
              <div><p>Orientações baseadas na prática do escritório para comparar escopos, antecipar decisões e planejar com mais clareza.</p><Link className="text-link" href="/blog">Ver todos os guias <span aria-hidden="true">→</span></Link></div>
            </div>
            <div className="blog-grid blog-grid--home">
              {blogPosts.slice(0, 3).map((post) => (
                <article className="blog-card" key={post.slug}>
                  <Link className="blog-card__image" href={`/blog/${post.slug}`} aria-label={`Ler: ${post.title}`}>
                    <img src={post.image} alt={post.imageAlt} loading="lazy" decoding="async" />
                  </Link>
                  <div className="blog-card__body">
                    <div className="blog-card__meta"><span>{post.category}</span><span>{post.readingTime}</span></div>
                    <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                    <p>{post.excerpt}</p>
                    <Link className="text-link" href={`/blog/${post.slug}`}>Ler guia <span aria-hidden="true">→</span></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
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

        <section className="section page-shell faq-section">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2>Informação clara para decisões seguras.</h2>
          </div>
          <div className="faq-list">
            {homeFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contato">
          <div className="page-shell contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow eyebrow--light">Conte sobre o seu projeto</p>
              <h2>Conte-nos o que você deseja transformar.</h2>
              <p>
                Responda algumas perguntas. Ao finalizar, você será direcionado
                ao WhatsApp da Barroco com as informações organizadas.
              </p>
              <div className="contact-meta">
                <a href="mailto:contato@barrocoarquitetura.com.br">contato@barrocoarquitetura.com.br</a>
                <div className="contact-meta__line">
                  <a href="tel:+551127630517">(11) 2763-0517</a>
                  <span>· Santo André · SP</span>
                </div>
              </div>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
