import type { Metadata } from "next";
import { ServicePage } from "../components/ServicePage";

export const metadata: Metadata = {
  title: { absolute: "Reforma de Apartamentos e Casas em SP | Barroco" },
  description: "Reforma de apartamentos e casas em São Paulo, com projeto, orçamento, gerenciamento de obra, execução e marcenaria coordenados pela Barroco.",
  alternates: { canonical: "/reformas-residenciais" },
  openGraph: {
    title: "Reformas Residenciais com Projeto e Obra | Barroco",
    description: "Projeto, gerenciamento, execução e marcenaria para reformas de apartamentos e casas.",
    url: "/reformas-residenciais",
    images: [{
      url: "/images/portfolio-cozinha-verde.webp",
      width: 1344,
      height: 1800,
      alt: "Reforma de apartamento com cozinha compacta, marcenaria verde e estrutura metálica",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reformas Residenciais com Projeto e Obra | Barroco Arquitetura",
    description: "Projeto, gerenciamento, execução e marcenaria para reformas de apartamentos e casas.",
    images: ["/images/portfolio-cozinha-verde.webp"],
  },
};

export default function ReformasPage() {
  return <ServicePage
    canonicalPath="/reformas-residenciais"
    eyebrow="Reformas residenciais"
    title="Reforma de apartamentos e casas, do projeto à execução."
    intro="Reformas de casas e apartamentos com planejamento, orçamento, gerenciamento e execução, mantendo decisões, fornecedores e etapas conectados."
    image="/images/portfolio-cozinha-verde.webp"
    imageAlt="Cozinha reformada com marcenaria verde e estrutura metálica"
    gallery={[
      ["/images/portfolio-cozinha-cinza.webp", "Reforma de cozinha", "Novo layout, acabamentos e marcenaria"],
      ["/images/portfolio-varanda-gourmet-cinza.webp", "Varanda gourmet — marcenaria", "Reforma de apartamento e marcenaria planejada"],
      ["/images/portfolio-varanda-pedra.webp", "Varanda gourmet — churrasqueira", "Churrasqueira, pedra e fechamento em vidro"],
      ["/images/portfolio-integracao-varanda.webp", "Apartamento — área social integrada", "Reforma de apartamento e ambientes integrados"],
      ["/images/portfolio-banheiro-verde.webp", "Reforma de banheiro", "Revestimentos e marcenaria sob medida"],
      ["/images/portfolio-quarto-beliche.webp", "Quarto infantil", "Aproveitamento vertical e organização"],
      ["/images/portfolio-cozinha-ilha.webp", "Cozinha integrada", "Ilha central e apoio gourmet"],
      ["/images/portfolio-varanda.webp", "Varanda residencial", "Banco planejado, jardim vertical e iluminação natural"],
    ]}
    featuredProjects={[
      ["/projetos/reforma-de-apartamento-com-cozinha-e-varanda", "/images/portfolio-cozinha-verde.webp", "Reforma com cozinha e varanda planejadas", "Projeto executivo, marcenaria e gerenciamento"],
      ["/projetos/apartamento-com-ambientes-integrados", "/images/portfolio-integracao-varanda.webp", "Apartamento com área social integrada", "Layout, iluminação e ambientes conectados"],
    ]}
    highlights={[
      ["Planejamento antes da obra", "Escopo, orçamento e sequência de serviços organizados com antecedência."],
      ["Gestão integrada", "Acompanhamento de cronograma, fornecedores e decisões durante a execução."],
      ["Entrega coerente", "Projeto, obra e marcenaria avançam com a mesma intenção."],
    ]}
    sectionTitle="Uma reforma com responsabilidades bem definidas."
    sectionIntro="O escopo da execução é montado a partir do projeto e das condições do imóvel, com orçamento detalhado e etapas claras."
    deliverables={[
      ["Diagnóstico e escopo", "Leitura do imóvel, serviços necessários, prioridades e restrições."],
      ["Planejamento", "Sequência de atividades, cronograma e decisões críticas."],
      ["Orçamento da execução", "Composição dos serviços, materiais e fornecedores previstos."],
      ["Gerenciamento", "Coordenação de equipes, cronograma, compras e acompanhamento."],
      ["Execução", "Mão de obra especializada conforme os serviços contratados."],
      ["Marcenaria", "Orçamento, produção e instalação integrados ao projeto, quando contratados."],
    ]}
    idealFor={[
      "Quem deseja reformar casa ou apartamento com um plano antes de começar.",
      "Quem não quer coordenar sozinho equipes, fornecedores e cronograma.",
      "Quem já tem projeto e precisa avaliar a viabilidade de execução.",
      "Quem quer contratar projeto, obra e marcenaria com responsabilidades claras.",
    ]}
    faqs={[
      ["A reforma residencial inclui projeto e gerenciamento de obra?", "Sim. A contratação pode integrar projeto, planejamento, orçamento, gerenciamento, execução e marcenaria, de acordo com o escopo definido."],
      ["Vocês reformam casas e apartamentos?", "Sim. O orçamento e o planejamento são preparados conforme projeto, condições do imóvel e serviços necessários."],
      ["É possível contratar somente a obra?", "A viabilidade depende da qualidade e do nível de detalhamento do projeto existente. A equipe faz uma avaliação inicial."],
      ["A marcenaria pode entrar no mesmo orçamento?", "Sim. A marcenaria pode ser integrada à proposta de execução conforme o projeto e o cronograma."],
      ["Quanto tempo dura uma reforma?", "O prazo depende do escopo, aprovações, fornecedores e condições do imóvel. O cronograma é apresentado antes da contratação da execução."],
      ["Onde a Barroco realiza reformas residenciais?", "O escritório está localizado em Santo André e realiza reformas de casas e apartamentos em diferentes regiões do estado de São Paulo."],
    ]}
    defaultService="Reforma residencial completa"
  />;
}
