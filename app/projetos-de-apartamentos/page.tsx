import type { Metadata } from "next";
import { ServicePage } from "../components/ServicePage";

export const metadata: Metadata = {
  title: { absolute: "Projeto de Interiores em Santo André e SP | Barroco" },
  description: "Projeto de interiores para apartamentos em Santo André e São Paulo, com layout, imagens 3D, executivo, iluminação, marcenaria e especificações.",
  alternates: { canonical: "/projetos-de-apartamentos" },
  openGraph: {
    title: "Projeto de Interiores em Santo André e SP | Barroco Arquitetura",
    description: "Projeto de interiores para apartamentos com layout, executivo, iluminação, marcenaria e especificações em Santo André e São Paulo.",
    url: "/projetos-de-apartamentos",
    images: [{
      url: "/images/apartamento-estar-jantar-integrados.webp",
      width: 1600,
      height: 1195,
      alt: "Projeto de interiores para apartamento com sala de estar, jantar e varanda integradas",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projeto de Interiores em Santo André e SP | Barroco Arquitetura",
    description: "Projeto de interiores para apartamentos com layout, executivo, iluminação, marcenaria e especificações em Santo André e São Paulo.",
    images: ["/images/apartamento-estar-jantar-integrados.webp"],
  },
};

export default function ApartamentosPage() {
  return <ServicePage
    canonicalPath="/projetos-de-apartamentos"
    eyebrow="Projeto de interiores para apartamentos"
    title="Projeto de interiores para apartamentos em Santo André e São Paulo."
    intro="Layout, imagens 3D, projeto executivo, especificações e orçamentos para transformar apartamentos com clareza, funcionalidade e identidade."
    image="/images/apartamento-estar-jantar-integrados.webp"
    imageAlt="Apartamento com sala de estar, jantar e varanda integradas"
    gallery={[
      ["/images/portfolio-integracao-varanda.webp", "Apartamento integrado — vista geral", "Projeto de interiores e ambientes integrados"],
      ["/images/apartamento-cozinha-corredor-arte.webp", "Apartamento integrado — cozinha", "Cozinha planejada, marcenaria e iluminação"],
      ["/images/apartamento-varanda-jardim.webp", "Apartamento integrado — varanda", "Varanda, paisagismo e área de descanso"],
      ["/images/apartamento-lavabo-botanico.webp", "Lavabo autoral", "Marcenaria, iluminação e composição botânica"],
      ["/images/apartamento-estar-painel-tv.webp", "Sala de estar", "Painel contínuo e organização visual"],
      ["/images/portfolio-cozinha-ilha.webp", "Cozinha com ilha", "Bancada central e marcenaria planejada"],
      ["/images/portfolio-quarto-infantil-rosa.webp", "Quarto infantil — bancada de estudos", "Interiores e marcenaria sob medida"],
      ["/images/apartamento-quarto-infantil-casinha.webp", "Quarto infantil — marcenaria lúdica", "Nicho casinha e armazenamento planejado"],
      ["/images/portfolio-quarto-beliche.webp", "Quarto infantil — beliche", "Beliche, gavetas e aproveitamento vertical"],
      ["/images/apartamento-banheiro-claro.webp", "Banheiro contemporâneo", "Bancada, iluminação natural e tons claros"],
      ["/images/portfolio-cozinha-verde.webp", "Cozinha compacta", "Estrutura metálica e marcenaria verde"],
      ["/images/portfolio-lavabo-travertino.webp", "Lavabo", "Pedra natural e iluminação indireta"],
      ["/images/apartamento-sala-cortinas.webp", "Estar acolhedor", "Luz filtrada, madeira e tons naturais"],
      ["/images/apartamento-jantar-cristaleira.webp", "Jantar integrado", "Cristaleira, transparência e continuidade visual"],
      ["/images/apartamento-varanda-noturna.webp", "Varanda gourmet", "Iluminação cênica e marcenaria planejada"],
    ]}
    featuredProjects={[
      ["/projetos/apartamento-com-ambientes-integrados", "/images/portfolio-integracao-varanda.webp", "Apartamento com ambientes integrados", "Interiores, marcenaria e iluminação"],
      ["/projetos/reforma-de-apartamento-com-cozinha-e-varanda", "/images/portfolio-cozinha-verde.webp", "Apartamento com cozinha e varanda planejadas", "Reforma residencial e marcenaria sob medida"],
    ]}
    highlights={[
      ["Visão completa", "Ambientes, materiais e marcenaria pensados como um conjunto."],
      ["Decisões antecipadas", "Definições técnicas antes da obra reduzem improvisos e retrabalho."],
      ["Escopo sob medida", "O projeto acompanha área, necessidades e momento de cada cliente."],
    ]}
    sectionTitle="O que está incluído no projeto do apartamento."
    sectionIntro="O escopo é ajustado ao imóvel, mas parte de uma base completa para orientar execução, fornecedores e compras."
    deliverables={[
      ["Levantamento e briefing", "Leitura do imóvel, rotina, necessidades e referências."],
      ["Estudo de layout", "Distribuição, circulação, usos e melhor aproveitamento da área."],
      ["Conceito e imagens 3D", "Materiais, cores, iluminação e percepção dos ambientes."],
      ["Projeto executivo", "Desenhos e detalhes necessários para orientar a execução."],
      ["Especificações", "Acabamentos, louças, metais, iluminação, mobiliário e marcenaria."],
      ["Orçamentos", "Organização de referências comerciais para apoiar as decisões."],
    ]}
    idealFor={[
      "Quem comprou um apartamento novo e quer planejar tudo antes das chaves.",
      "Quem vai reformar um apartamento usado e precisa reorganizar os ambientes.",
      "Quem quer integrar projeto, obra e marcenaria com uma única visão.",
      "Quem valoriza personalização, mas precisa manter decisões e custos organizados.",
    ]}
    faqs={[
      ["O que inclui um projeto de interiores para apartamento?", "O escopo pode incluir briefing, estudo de layout, imagens 3D, projeto executivo, especificações de materiais e apoio à organização de orçamentos."],
      ["Vocês fazem apenas o projeto?", "Sim. O projeto pode ser contratado de forma independente. Obra e marcenaria são opções adicionais."],
      ["Atendem apartamentos novos e usados?", "Sim. O processo é adaptado tanto para imóveis novos quanto para reformas de apartamentos existentes."],
      ["O projeto inclui orçamento da obra?", "Inclui apoio a orçamentos dentro do escopo contratado. A execução é apresentada separadamente."],
      ["Onde vocês atendem?", "O escritório está localizado em Santo André e desenvolve projetos de apartamentos em diferentes regiões do estado de São Paulo."],
    ]}
    defaultService="Projeto de interiores para apartamento"
  />;
}
