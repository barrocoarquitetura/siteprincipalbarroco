import type { Metadata } from "next";
import { ServicePage } from "../components/ServicePage";

export const metadata: Metadata = {
  title: { absolute: "Projeto de Casas em Santo André e SP | Barroco" },
  description: "Projeto arquitetônico e de interiores para casas em Santo André e São Paulo, com implantação, layout, imagens 3D, executivo e especificações.",
  alternates: { canonical: "/projetos-de-casas" },
  openGraph: {
    title: "Projeto de Casas em Santo André e SP | Barroco Arquitetura",
    description: "Arquitetura e interiores para casas novas ou existentes em Santo André e diferentes regiões de São Paulo.",
    url: "/projetos-de-casas",
    images: [{
      url: "/images/casa-patio-piscina.webp",
      width: 1600,
      height: 1195,
      alt: "Projeto de casa contemporânea térrea com pátio, piscina, jardim e área social integrada",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projeto de Casas em Santo André e SP | Barroco Arquitetura",
    description: "Arquitetura e interiores para casas novas ou existentes em Santo André e diferentes regiões de São Paulo.",
    images: ["/images/casa-patio-piscina.webp"],
  },
};

export default function CasasPage() {
  return <ServicePage
    canonicalPath="/projetos-de-casas"
    eyebrow="Projetos de casas"
    title="Projeto arquitetônico para casas em Santo André e São Paulo."
    intro="Arquitetura e interiores para casas novas ou existentes, conectando espaços, rotina, conforto e identidade em uma solução coerente."
    image="/images/casa-patio-piscina.webp"
    imageAlt="Casa térrea contemporânea com piscina e área de lazer"
    gallery={[
      ["/images/portfolio-casa-pedra.webp", "Casa térrea — fachada em pedra", "Projeto de casa, pedra e paisagismo"],
      ["/images/portfolio-casa-corten.webp", "Casa contemporânea — fachada em corten", "Projeto arquitetônico e fachada contemporânea"],
      ["/images/casa-piscina-deck.webp", "Casa contemporânea — piscina e deck", "Casa com piscina, deck e paisagismo"],
      ["/images/casa-area-gourmet.webp", "Casa contemporânea — área gourmet", "Área gourmet integrada e espaço de convivência"],
      ["/images/portfolio-circulacao-pedra.webp", "Circulação", "Textura, luz natural e conexão visual"],
      ["/images/portfolio-hall-madeira.webp", "Hall de entrada", "Madeira contínua e iluminação pontual"],
      ["/images/casa-sala-jantar.webp", "Sala de jantar", "Integração e luz natural"],
      ["/images/casa-terrea-concreto-madeira.webp", "Casa térrea contemporânea", "Concreto, madeira e relação com o jardim"],
      ["/images/portfolio-lavabo-travertino.webp", "Lavabo", "Acabamento natural e desenho sob medida"],
      ["/images/portfolio-jantar-madeira.webp", "Área social", "Jantar e marcenaria integrados"],
      ["/images/casa-estar-vista-piscina.webp", "Estar conectado ao exterior", "Amplitude e vista para a piscina"],
      ["/images/casa-patio-piscina.webp", "Pátio de lazer", "Piscina e ambientes sociais conectados"],
    ]}
    featuredProjects={[
      ["/projetos/casa-contemporanea-com-piscina", "/images/casa-patio-piscina.webp", "Casa contemporânea com piscina", "Projeto residencial, pátio e área gourmet"],
    ]}
    highlights={[
      ["Arquitetura personalizada", "O ponto de partida são as pessoas, o imóvel e as prioridades reais."],
      ["Dentro e fora conectados", "Fluxos e ambientes são pensados como uma experiência contínua."],
      ["Detalhamento para executar", "O executivo transforma intenção em informação para a obra."],
    ]}
    sectionTitle="Arquitetura e interiores pensados em conjunto."
    sectionIntro="Cada casa pede um escopo próprio. Organizamos as decisões essenciais para que forma, função e materialidade avancem na mesma direção."
    deliverables={[
      ["Diagnóstico do imóvel", "Leitura das condições, necessidades, referências e prioridades."],
      ["Estudos de implantação e layout", "Relação entre ambientes, acessos, circulação, luz e usos."],
      ["Conceito arquitetônico", "Linguagem, volumetria e experiência espacial da casa."],
      ["Imagens 3D", "Visualização das principais decisões antes do detalhamento."],
      ["Projeto executivo", "Desenhos e definições para orientar a execução do escopo."],
      ["Interiores e especificações", "Acabamentos, iluminação, mobiliário e marcenaria, quando contratados."],
    ]}
    idealFor={[
      "Quem tem um terreno e quer desenvolver uma casa alinhada à sua rotina.",
      "Quem comprou uma casa existente e precisa adaptar espaços e linguagem.",
      "Quem quer tratar arquitetura e interiores como um projeto único.",
      "Quem precisa visualizar e organizar decisões antes de iniciar a obra.",
    ]}
    faqs={[
      ["O que inclui um projeto arquitetônico para casa?", "O escopo pode reunir estudos de implantação e layout, conceito arquitetônico, imagens 3D, projeto executivo e definições de interiores e materiais."],
      ["Vocês fazem projetos para casas novas?", "Sim. O escopo é definido após a leitura do terreno, das necessidades e do estágio atual do projeto."],
      ["Também fazem o projeto de interiores da casa?", "Sim. Arquitetura e interiores podem ser contratados juntos ou em etapas, conforme o escopo."],
      ["Vocês fazem reformas de casas existentes?", "Sim. Para reformas com execução, conheça também a página de reformas residenciais."],
      ["Como o preço é definido?", "Consideramos área, complexidade, disciplinas envolvidas, detalhamento e prazo, usando projetos semelhantes como referência."],
      ["Onde vocês desenvolvem projetos de casas?", "O escritório está localizado em Santo André e desenvolve projetos de casas em diferentes regiões do estado de São Paulo."],
    ]}
    defaultService="Projeto arquitetônico ou de interiores para casa"
  />;
}
