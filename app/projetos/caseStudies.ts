export type CaseStudy = {
  slug: string;
  modified: string;
  category: string;
  title: string;
  metaTitle: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  intro: string;
  challengeTitle: string;
  challenge: string;
  solutionTitle: string;
  solution: string;
  decisions: string[];
  gallery: ReadonlyArray<readonly [string, string, string]>;
  serviceHref: string;
  serviceLabel: string;
  keywords: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "apartamento-com-ambientes-integrados",
    modified: "2026-07-20",
    category: "Interiores de apartamento",
    title: "Apartamento com estar, jantar e varanda integrados.",
    metaTitle: "Apartamento com Ambientes Integrados | Barroco",
    description: "Projeto de interiores para apartamento com sala, jantar e varanda integrados, marcenaria planejada, iluminação e cozinha funcional.",
    heroImage: "/images/portfolio-integracao-varanda.webp",
    heroAlt: "Projeto de interiores de apartamento com sala de estar, jantar e varanda integrados",
    intro: "A área social foi concebida como uma sequência contínua de usos. Madeira clara, iluminação delicada e mobiliário bem proporcionado conectam jantar, estar e varanda sem apagar a identidade de cada ambiente.",
    challengeTitle: "Integrar sem perder organização",
    challenge: "O desafio foi criar amplitude visual e, ao mesmo tempo, preservar apoios, armazenamento e percursos confortáveis para a rotina. A integração precisava funcionar tanto nos momentos cotidianos quanto ao receber convidados.",
    solutionTitle: "Unidade visual e funções bem definidas",
    solution: "A marcenaria estabelece uma linguagem comum, enquanto a disposição do mobiliário organiza os diferentes usos. A varanda passa a participar da área social, a cozinha ganha eficiência e a iluminação reforça a continuidade do conjunto.",
    decisions: [
      "Layout integrado entre estar, jantar e varanda",
      "Marcenaria planejada como elemento de unidade",
      "Iluminação funcional e decorativa coordenada",
      "Materiais claros para valorizar a luz natural",
    ],
    gallery: [
      ["/images/portfolio-integracao-varanda.webp", "Área social integrada — vista geral", "Estar, jantar e varanda em continuidade visual"],
      ["/images/apartamento-cozinha-corredor-arte.webp", "Cozinha planejada", "Marcenaria, bancada e circulação funcional"],
      ["/images/apartamento-varanda-jardim.webp", "Varanda com jardim", "Paisagismo e área de descanso conectados ao estar"],
      ["/images/apartamento-estar-painel-tv.webp", "Sala de estar", "Painel contínuo e organização visual"],
      ["/images/apartamento-jantar-cristaleira.webp", "Sala de jantar", "Cristaleira, transparência e iluminação integrada"],
    ],
    serviceHref: "/projetos-de-apartamentos",
    serviceLabel: "Conhecer projetos de apartamentos",
    keywords: ["projeto de interiores", "apartamento integrado", "marcenaria planejada", "reforma de apartamento"],
  },
  {
    slug: "casa-contemporanea-com-piscina",
    modified: "2026-07-20",
    category: "Projeto de casa",
    title: "Casa contemporânea organizada ao redor do lazer.",
    metaTitle: "Casa Contemporânea com Piscina | Barroco",
    description: "Projeto de casa contemporânea com piscina, pátio, área gourmet, paisagismo e ambientes sociais conectados ao exterior.",
    heroImage: "/images/casa-patio-piscina.webp",
    heroAlt: "Projeto de casa contemporânea térrea com pátio, piscina, jardim e área social integrada",
    intro: "O pátio com piscina funciona como centro da experiência da casa. Grandes aberturas aproximam os ambientes sociais do jardim e criam uma arquitetura térrea luminosa, reservada e preparada para convivência.",
    challengeTitle: "Transformar o pátio no coração da casa",
    challenge: "A implantação precisava equilibrar privacidade, entrada de luz natural e conexão entre os espaços internos e o lazer. O desenho também deveria manter percursos diretos e uma leitura arquitetônica serena.",
    solutionTitle: "Arquitetura voltada para o exterior",
    solution: "Os ambientes se abrem para a piscina por meio de grandes esquadrias. Volumes horizontais, pedra natural, madeira e paisagismo compõem uma linguagem contemporânea, enquanto a área gourmet amplia as possibilidades de uso da casa.",
    decisions: [
      "Implantação térrea conectada ao pátio central",
      "Grandes aberturas para luz e integração visual",
      "Área gourmet próxima aos espaços de convivência",
      "Pedra, madeira e paisagismo em composição contínua",
    ],
    gallery: [
      ["/images/casa-patio-piscina.webp", "Pátio com piscina", "Lazer central e ambientes sociais conectados"],
      ["/images/casa-piscina-deck.webp", "Piscina e deck", "Paisagismo e espaço de descanso"],
      ["/images/casa-estar-vista-piscina.webp", "Estar voltado ao exterior", "Grandes aberturas aproximam sala e jardim"],
      ["/images/casa-area-gourmet.webp", "Área gourmet", "Convivência e preparo integrados"],
      ["/images/casa-terrea-concreto-madeira.webp", "Arquitetura térrea", "Volumes contemporâneos e materialidade natural"],
    ],
    serviceHref: "/projetos-de-casas",
    serviceLabel: "Conhecer projetos de casas",
    keywords: ["projeto de casa", "casa contemporânea", "casa com piscina", "arquitetura residencial"],
  },
  {
    slug: "escritorio-com-recepcao-e-jardim-vertical",
    modified: "2026-07-20",
    category: "Arquitetura comercial",
    title: "Escritório com recepção, iluminação técnica e jardim vertical.",
    metaTitle: "Projeto de Escritório Corporativo | Barroco",
    description: "Projeto de escritório corporativo com recepção, jardim vertical, iluminação linear, copa de apoio, marcenaria e estações de trabalho.",
    heroImage: "/images/comercial-recepcao-jardim-vertical.webp",
    heroAlt: "Projeto de escritório corporativo com recepção, iluminação linear e jardim vertical",
    intro: "O espaço corporativo combina uma chegada marcante com áreas de trabalho e apoio bem organizadas. A iluminação linear orienta o percurso, enquanto o jardim vertical e a marcenaria traduzem uma presença contemporânea e acolhedora.",
    challengeTitle: "Representar a marca e apoiar a operação",
    challenge: "A arquitetura precisava causar uma boa primeira impressão sem comprometer circulação, concentração e rotina da equipe. Recepção, espera, trabalho e apoio deveriam formar um conjunto claro e eficiente.",
    solutionTitle: "Identidade aplicada ao espaço",
    solution: "Tons grafite criam uma base sóbria para a iluminação e o verde. Marcenaria sob medida organiza equipamentos e armazenamento, enquanto a distribuição dos ambientes facilita deslocamentos e separa atividades com diferentes níveis de privacidade.",
    decisions: [
      "Recepção com percurso intuitivo",
      "Iluminação linear como elemento de identidade",
      "Jardim vertical para acolhimento e presença de marca",
      "Marcenaria e estações dimensionadas para a operação",
    ],
    gallery: [
      ["/images/comercial-recepcao-jardim-vertical.webp", "Recepção corporativa — área de espera", "Jardim vertical, mobiliário e identidade"],
      ["/images/comercial-recepcao-iluminacao.webp", "Recepção corporativa — percurso", "Iluminação linear conduz a chegada"],
      ["/images/escritorio-estacao-trabalho.webp", "Estações de trabalho", "Layout, ergonomia e circulação"],
      ["/images/comercial-copa-atendimento.webp", "Copa de apoio", "Marcenaria funcional para a equipe"],
      ["/images/portfolio-varanda-preta.webp", "Circulação do escritório", "Divisórias de vidro e apoio integrado"],
    ],
    serviceHref: "/projetos-e-obras-comerciais",
    serviceLabel: "Conhecer projetos comerciais",
    keywords: ["projeto de escritório", "arquitetura comercial", "reforma de escritório", "interiores corporativos"],
  },
  {
    slug: "reforma-de-apartamento-com-cozinha-e-varanda",
    modified: "2026-07-20",
    category: "Reforma residencial",
    title: "Reforma de apartamento com cozinha e varanda planejadas.",
    metaTitle: "Reforma de Apartamento Planejada | Barroco",
    description: "Reforma de apartamento com cozinha planejada, varanda gourmet, banheiro, marcenaria sob medida, projeto executivo e gerenciamento de obra.",
    heroImage: "/images/portfolio-cozinha-verde.webp",
    heroAlt: "Reforma de apartamento com cozinha compacta, marcenaria verde e estrutura metálica",
    intro: "A reforma articula ambientes compactos, marcenaria sob medida e soluções de uso cotidiano. Cozinha, varanda e banheiro recebem decisões específicas, mas compartilham uma mesma lógica de funcionalidade e acabamento.",
    challengeTitle: "Aproveitar melhor a área disponível",
    challenge: "O projeto precisava ampliar a capacidade de armazenamento e tornar os ambientes mais práticos sem criar excesso visual. Cada medida deveria responder ao espaço existente e antecipar a execução.",
    solutionTitle: "Projeto executivo antes da obra",
    solution: "Layout, marcenaria, iluminação, revestimentos e equipamentos são coordenados antes do início dos serviços. A definição antecipada reduz improvisos e permite que cozinha, varanda gourmet e áreas de apoio funcionem como partes do mesmo apartamento.",
    decisions: [
      "Marcenaria sob medida para áreas compactas",
      "Compatibilização entre equipamentos e instalações",
      "Varanda gourmet preparada para receber",
      "Projeto executivo, orçamento e obra coordenados",
    ],
    gallery: [
      ["/images/portfolio-cozinha-verde.webp", "Cozinha compacta", "Marcenaria verde e estrutura metálica"],
      ["/images/portfolio-varanda-pedra.webp", "Varanda gourmet", "Churrasqueira, bancada e pedra natural"],
      ["/images/portfolio-varanda-gourmet-cinza.webp", "Marcenaria da varanda", "Adega, cristaleira e equipamentos integrados"],
      ["/images/portfolio-banheiro-verde.webp", "Banheiro reformado", "Revestimento e marcenaria planejada"],
      ["/images/portfolio-cozinha-ilha.webp", "Cozinha com ilha", "Bancada central e apoio para convivência"],
    ],
    serviceHref: "/reformas-residenciais",
    serviceLabel: "Conhecer reformas residenciais",
    keywords: ["reforma de apartamento", "cozinha planejada", "varanda gourmet", "gerenciamento de obra"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
