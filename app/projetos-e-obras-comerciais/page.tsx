import type { Metadata } from "next";
import { ServicePage } from "../components/ServicePage";
import { commercialImages } from "../projetos/projectData";

export const metadata: Metadata = {
  title: { absolute: "Arquitetura Comercial em Santo André e SP | Barroco" },
  description: "Arquitetura comercial e reforma de escritórios em Santo André e São Paulo, do layout e projeto executivo ao gerenciamento e à obra.",
  alternates: { canonical: "/projetos-e-obras-comerciais" },
  openGraph: {
    title: "Arquitetura Comercial em Santo André e SP | Barroco",
    description: "Projeto de interiores, executivo e obra para escritórios, lojas e espaços comerciais em Santo André e São Paulo.",
    url: "/projetos-e-obras-comerciais",
    images: [{
      url: "/images/comercial-recepcao-jardim-vertical.webp",
      width: 1195,
      height: 1600,
      alt: "Projeto de escritório corporativo com recepção, iluminação linear e jardim vertical",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arquitetura Comercial em Santo André e SP | Barroco Arquitetura",
    description: "Projeto de interiores, executivo e obra para escritórios, lojas e espaços comerciais em Santo André e São Paulo.",
    images: ["/images/comercial-recepcao-jardim-vertical.webp"],
  },
};

export default function ComercialPage() {
  return <ServicePage
    canonicalPath="/projetos-e-obras-comerciais"
    eyebrow="Projetos e obras comerciais"
    title="Arquitetura comercial para espaços que trabalham a favor do negócio."
    intro="Projeto de interiores, executivo e obra para lojas, espaços de atendimento e escritórios, conectando operação, experiência e identidade."
    image="/images/comercial-recepcao-jardim-vertical.webp"
    imageAlt="Ambiente de trabalho com marcenaria planejada, iluminação técnica e divisórias de vidro"
    highlights={[
      ["Operação bem resolvida", "Fluxos, postos de trabalho, atendimento e apoio pensados para o uso real."],
      ["Identidade no espaço", "Materiais, cores e soluções alinhados à presença da empresa."],
      ["Projeto e execução", "Detalhamento, orçamento, gerenciamento e obra organizados em um mesmo processo."],
    ]}
    gallery={commercialImages}
    featuredProjects={[
      ["/projetos/escritorio-com-recepcao-e-jardim-vertical", "/images/comercial-recepcao-jardim-vertical.webp", "Escritório com recepção e jardim vertical", "Arquitetura comercial, layout e interiores corporativos"],
    ]}
    sectionTitle="Do estudo do espaço à entrega da obra."
    sectionIntro="O escopo é estruturado conforme o tipo de negócio, o imóvel, a operação e o prazo disponível para implantação."
    deliverables={[
      ["Briefing e diagnóstico", "Entendimento da operação, equipe, público, marca, imóvel e objetivos."],
      ["Layout e fluxos", "Organização de atendimento, circulação, postos, apoio, armazenamento e acessibilidade aplicável."],
      ["Conceito e imagens 3D", "Visualização de materiais, cores, iluminação, mobiliário e identidade do ambiente."],
      ["Projeto executivo", "Desenhos e detalhes para orientar fornecedores, instalações, marcenaria e execução."],
      ["Especificações e orçamentos", "Definições de materiais, equipamentos e referências para contratação."],
      ["Gerenciamento e obra", "Planejamento, coordenação de equipes, acompanhamento e execução conforme o escopo contratado."],
    ]}
    idealFor={[
      "Empresas que vão implantar ou reformar um escritório.",
      "Lojas e espaços comerciais que precisam alinhar ambiente, operação e marca.",
      "Negócios que precisam reorganizar atendimento, equipe e áreas de apoio.",
      "Clientes que desejam contratar projeto, orçamento, gerenciamento e obra com uma visão integrada.",
    ]}
    faqs={[
      ["Vocês fazem projeto e reforma de escritórios e salas comerciais?", "Sim. O escopo pode incluir projeto de interiores, executivo, orçamentos, gerenciamento e execução da obra."],
      ["Atendem lojas e outros espaços comerciais?", "Sim. A proposta é preparada conforme a operação, o imóvel e as necessidades específicas do negócio."],
      ["É possível trabalhar com prazo de inauguração ou mudança?", "Sim. O prazo é considerado desde o diagnóstico e orienta escopo, decisões, compras e planejamento da execução."],
      ["Como o orçamento é definido?", "Consideramos área, complexidade, instalações, nível de detalhamento, prazo e escopo de obra ou marcenaria."],
      ["Onde a Barroco desenvolve projetos comerciais?", "O escritório está localizado em Santo André e desenvolve projetos e obras para escritórios, lojas e espaços comerciais em diferentes regiões do estado de São Paulo."],
    ]}
    defaultService="Projeto ou obra comercial / escritório"
  />;
}
