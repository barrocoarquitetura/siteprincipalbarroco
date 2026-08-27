export type BlogSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: boolean;
  highlight?: string;
};

export type BlogPost = {
  slug: string;
  category: string;
  intent: "Informativa" | "Comercial" | "Transacional";
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  answer: string;
  published: string;
  modified: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  sections: BlogSection[];
  relatedService: { href: string; label: string; title: string };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "projeto-de-interiores-para-apartamento-o-que-inclui",
    category: "Projeto de interiores",
    intent: "Comercial",
    title: "Projeto de interiores para apartamento: o que inclui e o que precisa estar definido antes da obra",
    metaTitle: "Projeto de Interiores: O Que Inclui | Barroco",
    description: "Entenda as etapas e entregáveis de um projeto de interiores para apartamento, do briefing e layout ao executivo, especificações e orçamentos.",
    excerpt: "Um guia para comparar propostas com clareza e entender quais decisões devem sair do campo das ideias antes do início da obra.",
    answer: "Um projeto de interiores para apartamento pode reunir briefing, levantamento, estudo de layout, conceito, imagens 3D, projeto executivo, iluminação, marcenaria, especificações e apoio aos orçamentos. O escopo exato varia, mas precisa transformar escolhas estéticas e funcionais em informações que fornecedores e equipes consigam executar.",
    published: "2026-08-06",
    modified: "2026-08-06",
    readingTime: "8 min de leitura",
    image: "/images/apartamento-estar-jantar-integrados.webp",
    imageAlt: "Projeto de interiores para apartamento com estar, jantar e varanda integrados",
    keywords: ["projeto de interiores para apartamento", "projeto executivo", "layout de apartamento", "marcenaria planejada"],
    sections: [
      {
        title: "O projeto não é apenas a imagem em 3D",
        paragraphs: [
          "A imagem 3D ajuda o cliente a visualizar materiais, proporções e atmosfera. Ela é importante para aprovar o conceito, mas não substitui os desenhos e especificações usados na obra.",
          "Quando uma proposta oferece somente layout e imagens, ainda podem faltar definições de elétrica, iluminação, forro, paginação, pedras, marcenaria e encontros entre materiais. É nessa passagem do conceito para o executivo que grande parte das dúvidas de execução precisa ser resolvida.",
        ],
        highlight: "Na prática da Barroco, o valor do projeto está na coordenação: a bancada afeta hidráulica e tomadas; a marcenaria afeta iluminação, equipamentos e circulação; o revestimento afeta níveis, recortes e quantitativos.",
      },
      {
        title: "As etapas mais comuns de um projeto completo",
        ordered: true,
        bullets: [
          "Briefing e diagnóstico: rotina, necessidades, referências, prioridades, prazo e faixa de investimento.",
          "Levantamento: medidas, condições do imóvel e informações do condomínio ou da construtora.",
          "Estudo de layout: distribuição dos ambientes, circulação, mobiliário e possibilidades de integração.",
          "Conceito e imagens 3D: materiais, cores, iluminação, marcenaria e percepção do conjunto.",
          "Projeto executivo: desenhos e detalhes que orientam fornecedores e equipes.",
          "Especificações e apoio aos orçamentos: referências de materiais, equipamentos e itens necessários para contratar e comprar.",
        ],
      },
      {
        title: "O que precisa estar definido antes de pedir orçamento de obra",
        paragraphs: [
          "Orçamentos comparáveis dependem de um escopo comparável. Se cada empresa interpretar o projeto de uma forma, os valores podem parecer diferentes porque não incluem os mesmos serviços, materiais ou responsabilidades.",
        ],
        bullets: [
          "O que será demolido, construído ou mantido.",
          "Quais instalações serão alteradas.",
          "Quais acabamentos e padrões de aplicação foram escolhidos.",
          "Quais itens pertencem à obra, à marcenaria ou ao cliente.",
          "Quais projetos complementares e aprovações serão necessários.",
        ],
      },
      {
        title: "Como comparar propostas de arquitetura",
        paragraphs: [
          "Compare entregáveis, número de etapas, limites de revisão, reuniões, visitas, responsabilidade sobre compatibilização e apoio durante a execução. Duas propostas com nomes semelhantes podem oferecer profundidades muito diferentes.",
          "Também confirme se obra e marcenaria são parte da contratação, opções futuras ou serviços de terceiros. Essa distinção evita expectativas erradas desde o início.",
        ],
      },
      {
        title: "Quando o projeto está pronto para avançar",
        paragraphs: [
          "O projeto está maduro quando as principais decisões que alteram custo, prazo e execução foram registradas e podem ser compreendidas por quem vai orçar. Ajustes de compra ainda podem acontecer, mas não devem mudar continuamente a lógica do imóvel.",
        ],
      },
    ],
    relatedService: { href: "/projetos-de-apartamentos", label: "Conhecer projetos de apartamentos", title: "Vai planejar um apartamento?" },
  },
  {
    slug: "reforma-de-apartamento-por-onde-comecar",
    category: "Reforma residencial",
    intent: "Comercial",
    title: "Reforma de apartamento: por onde começar para reduzir improvisos e decisões de última hora",
    metaTitle: "Reforma de Apartamento: Por Onde Começar | Barroco",
    description: "Veja a sequência recomendada para planejar uma reforma de apartamento: diagnóstico, projeto, orçamento, cronograma, compras e execução.",
    excerpt: "A obra começa muito antes da demolição. Organizar escopo, projeto, orçamento e responsabilidades é o que torna a execução previsível.",
    answer: "Uma reforma de apartamento deve começar pelo diagnóstico do imóvel e pela definição do escopo, não pela contratação isolada de mão de obra. Depois vêm levantamento, projeto, aprovações, orçamento detalhado, cronograma, plano de compras e somente então a execução.",
    published: "2026-08-06",
    modified: "2026-08-06",
    readingTime: "8 min de leitura",
    image: "/images/portfolio-cozinha-verde.webp",
    imageAlt: "Cozinha de apartamento reformada com marcenaria verde e estrutura metálica",
    keywords: ["reforma de apartamento", "planejamento de obra", "gerenciamento de reforma", "orçamento de reforma"],
    sections: [
      {
        title: "Comece pelo que precisa mudar — e pelo que pode permanecer",
        paragraphs: [
          "Antes de escolher acabamentos, registre os problemas que a reforma precisa resolver: circulação ruim, falta de armazenamento, instalações antigas, ambientes desconectados ou inadequados à rotina.",
          "Separar necessidades de desejos ajuda a proteger o investimento. Também evita demolir ou substituir elementos que poderiam ser aproveitados com uma solução de projeto mais precisa.",
        ],
      },
      {
        title: "Uma sequência segura para organizar a reforma",
        ordered: true,
        bullets: [
          "Diagnóstico do apartamento, da rotina e das restrições existentes.",
          "Levantamento e consulta às regras do condomínio e aos documentos disponíveis.",
          "Projeto de layout, conceito e detalhamento executivo.",
          "Definição do escopo e coleta de orçamentos equivalentes.",
          "Cronograma de execução e mapa de compras com prazos de entrega.",
          "Contratações, aprovações e preparação do imóvel.",
          "Execução acompanhada por decisões e responsabilidades registradas.",
        ],
      },
      {
        title: "O erro de orçar cedo demais",
        paragraphs: [
          "Um orçamento feito antes das definições costuma depender de estimativas e ressalvas. Conforme o projeto avança, itens antes invisíveis aparecem e o valor muda — não necessariamente porque alguém aumentou o preço, mas porque o escopo finalmente ficou claro.",
          "Uma estimativa preliminar pode orientar viabilidade. Para contratar, porém, é melhor trabalhar com desenhos, memoriais e limites de responsabilidade definidos.",
        ],
        highlight: "Preço sem escopo não é comparável. A pergunta correta não é apenas “quanto custa?”, mas “o que exatamente está incluído e quem responde por cada etapa?”.",
      },
      {
        title: "Decisões que não deveriam ficar para o canteiro",
        bullets: [
          "Posição de pontos elétricos, hidráulicos e equipamentos.",
          "Alturas, alinhamentos e encontros entre acabamentos.",
          "Medidas críticas de pedras, marcenaria e eletrodomésticos.",
          "Sequência de serviços e dependências entre fornecedores.",
          "Critérios de aprovação, alteração e aceite de cada etapa.",
        ],
      },
      {
        title: "Projeto, obra e marcenaria precisam conversar",
        paragraphs: [
          "Mesmo quando são contratados separadamente, esses três núcleos compartilham medidas, instalações e prazos. Uma alteração tardia na marcenaria pode exigir mudança elétrica; uma pedra sem medida compatibilizada pode atrasar instalação; um equipamento comprado fora de hora pode travar o fechamento de um ambiente.",
          "Por isso, a Barroco organiza projeto, orçamento, execução e marcenaria como decisões conectadas, com o escopo adaptado a cada imóvel.",
        ],
      },
    ],
    relatedService: { href: "/reformas-residenciais", label: "Conhecer reformas residenciais", title: "Precisa organizar uma reforma?" },
  },
  {
    slug: "projeto-executivo-de-interiores-o-que-e",
    category: "Projeto executivo",
    intent: "Informativa",
    title: "Projeto executivo de interiores: o que é, o que deve mostrar e por que reduz retrabalho",
    metaTitle: "Projeto Executivo de Interiores: O Que É | Barroco",
    description: "Entenda o que compõe um projeto executivo de interiores e como ele orienta obra, marcenaria, iluminação, pedras e fornecedores.",
    excerpt: "O executivo traduz o conceito aprovado em desenhos, medidas e especificações que as equipes conseguem orçar e executar.",
    answer: "O projeto executivo de interiores é o conjunto de desenhos, detalhes e especificações que transforma o conceito aprovado em informação para a obra. Ele pode incluir demolição e construção, pisos, forros, iluminação, elétrica, hidráulica, pedras, marcenaria e acabamentos, conforme o escopo.",
    published: "2026-08-06",
    modified: "2026-08-06",
    readingTime: "7 min de leitura",
    image: "/images/portfolio-cozinha-ilha.webp",
    imageAlt: "Cozinha com ilha central, marcenaria planejada e iluminação integrada",
    keywords: ["projeto executivo de interiores", "detalhamento de interiores", "projeto de marcenaria", "projeto de iluminação"],
    sections: [
      {
        title: "A diferença entre aprovar uma ideia e conseguir executá-la",
        paragraphs: [
          "No conceito, o cliente entende a proposta espacial e visual. No executivo, essa proposta ganha cotas, níveis, eixos, referências de material e detalhes suficientes para orientar quem vai construir, instalar ou fabricar.",
          "Uma boa perspectiva pode mostrar onde haverá um painel. O executivo precisa explicar medidas, modulação, encontros, pontos elétricos, iluminação e relação com os elementos próximos.",
        ],
      },
      {
        title: "Quais desenhos podem fazer parte do executivo",
        bullets: [
          "Plantas de demolição, construção e layout cotado.",
          "Paginação de pisos e revestimentos.",
          "Forro, iluminação e comandos.",
          "Pontos elétricos, dados, hidráulica e equipamentos.",
          "Elevações internas de ambientes.",
          "Detalhes de pedras, bancadas, serralheria e elementos especiais.",
          "Marcenaria e especificações de acabamentos, ferragens e acessórios.",
        ],
        highlight: "Nem todo projeto precisa de todas as pranchas. O conteúdo deve responder ao que realmente será executado e às responsabilidades contratadas.",
      },
      {
        title: "Compatibilizar é encontrar conflitos antes da obra",
        paragraphs: [
          "Compatibilização significa conferir se decisões de disciplinas diferentes ocupam o mesmo espaço de forma possível. Um ponto de iluminação não pode conflitar com uma porta de armário; uma tubulação precisa respeitar a bancada; um rebaixo de forro deve considerar equipamentos e alturas livres.",
          "O objetivo não é prometer uma obra sem imprevistos. É reduzir dúvidas previsíveis e registrar critérios para que novas condições sejam resolvidas com mais rapidez.",
        ],
      },
      {
        title: "Como saber se o material entregue é suficiente",
        bullets: [
          "Os desenhos possuem escala, cotas e identificação claras.",
          "Os ambientes e detalhes fazem referência uns aos outros.",
          "Materiais e equipamentos têm especificação ou critério de escolha.",
          "As equipes conseguem levantar quantitativos e formular dúvidas objetivas.",
          "Alterações aprovadas foram incorporadas à versão utilizada na obra.",
        ],
      },
      {
        title: "O executivo também melhora o orçamento",
        paragraphs: [
          "Quanto mais claro o material de consulta, menor a margem para cada fornecedor imaginar uma solução diferente. Isso não elimina variações de preço, mas torna a comparação mais coerente e ajuda a identificar itens ausentes.",
        ],
      },
    ],
    relatedService: { href: "/projetos-de-apartamentos", label: "Ver escopo para apartamentos", title: "Quer um projeto preparado para executar?" },
  },
  {
    slug: "quanto-tempo-dura-reforma-de-apartamento",
    category: "Planejamento de obra",
    intent: "Comercial",
    title: "Quanto tempo dura uma reforma de apartamento? Os fatores que realmente definem o prazo",
    metaTitle: "Quanto Tempo Dura uma Reforma de Apartamento?",
    description: "Entenda o que define o prazo de uma reforma de apartamento: escopo, projeto, condomínio, compras, fornecedores, marcenaria e sequência da obra.",
    excerpt: "O prazo não depende apenas da área. Complexidade, decisões pendentes, aprovações e itens sob medida podem alterar o caminho crítico da obra.",
    answer: "A duração de uma reforma de apartamento depende do escopo, da maturidade do projeto, das aprovações, da disponibilidade de materiais e equipes e dos prazos de itens sob medida. Um cronograma confiável só pode ser fechado depois que serviços, dependências e compras críticas estiverem definidos.",
    published: "2026-08-06",
    modified: "2026-08-06",
    readingTime: "7 min de leitura",
    image: "/images/portfolio-varanda-pedra.webp",
    imageAlt: "Varanda gourmet reformada com bancada em pedra e marcenaria planejada",
    keywords: ["quanto tempo dura reforma de apartamento", "cronograma de reforma", "prazo de obra", "planejamento de reforma"],
    sections: [
      {
        title: "A área do imóvel é só uma das variáveis",
        paragraphs: [
          "Dois apartamentos com áreas semelhantes podem ter prazos muito diferentes. Trocar acabamentos sem alterar instalações é um cenário; integrar ambientes, refazer elétrica e hidráulica e instalar marcenaria completa é outro.",
          "O número de ambientes afetados, a complexidade técnica e o nível de personalização costumam explicar melhor o prazo do que a metragem isolada.",
        ],
      },
      {
        title: "Os fatores que mais alteram o cronograma",
        bullets: [
          "Projeto incompleto ou alterações depois da contratação.",
          "Regras, horários e aprovações do condomínio.",
          "Descobertas em instalações ou elementos existentes.",
          "Materiais importados, especiais ou com estoque instável.",
          "Pedras, esquadrias, vidros e marcenaria produzidos sob medida.",
          "Dependência entre equipes e tempo de cura, secagem ou teste.",
          "Velocidade de aprovação e compra por parte do cliente.",
        ],
      },
      {
        title: "O que é caminho crítico da obra",
        paragraphs: [
          "Caminho crítico é a sequência de atividades que determina a data final. Se uma delas atrasa, as próximas não conseguem avançar. Medição de marcenaria, produção de pedras ou liberação de um equipamento podem ocupar essa posição em diferentes momentos.",
          "Um cronograma útil não é apenas uma lista de datas. Ele mostra dependências, responsáveis e o momento limite para decidir ou comprar.",
        ],
        highlight: "Acelerar uma equipe isolada nem sempre antecipa a entrega. O ganho real vem de eliminar esperas entre etapas e proteger as decisões críticas.",
      },
      {
        title: "O que pode acontecer em paralelo",
        paragraphs: [
          "Enquanto o projeto executivo é concluído, itens de longo prazo já definidos podem ser cotados. Durante etapas iniciais da obra, marcenaria e pedras podem avançar em detalhamento, desde que as medidas de referência estejam confirmadas.",
          "Antecipar sem informação, porém, transfere risco para a execução. A ordem correta é adiantar o que está decidido e manter dependências visíveis.",
        ],
      },
      {
        title: "Como receber uma previsão responsável",
        bullets: [
          "Peça que o prazo esteja associado a um escopo definido.",
          "Confirme quais compras e aprovações dependem do cliente.",
          "Verifique se marcenaria e outros itens sob medida estão dentro ou fora do período informado.",
          "Entenda como alterações e condições ocultas serão incorporadas ao cronograma.",
          "Acompanhe marcos e decisões, não apenas uma data final.",
        ],
      },
    ],
    relatedService: { href: "/reformas-residenciais", label: "Conhecer planejamento e execução", title: "Quer avaliar prazo e escopo da reforma?" },
  },
  {
    slug: "projeto-de-interiores-antes-das-chaves",
    category: "Apartamento novo",
    intent: "Transacional",
    title: "Projeto de interiores antes das chaves: quando começar a planejar um apartamento novo",
    metaTitle: "Projeto de Interiores Antes das Chaves | Barroco",
    description: "Saiba quando começar o projeto de interiores de um apartamento novo, o que pode ser definido com a planta e o que depende da medição após as chaves.",
    excerpt: "Começar antes da entrega pode adiantar layout, orçamento e compras — desde que as decisões sejam confirmadas com os documentos e medidas corretos.",
    answer: "O projeto de interiores pode começar antes das chaves quando já existem planta, memorial, manual técnico e uma previsão razoável de entrega. Layout, conceito e planejamento podem avançar; medidas finais, interferências e itens sob medida devem ser confirmados após o acesso ao imóvel.",
    published: "2026-08-06",
    modified: "2026-08-06",
    readingTime: "6 min de leitura",
    image: "/images/portfolio-integracao-varanda.webp",
    imageAlt: "Apartamento com sala de estar, jantar e varanda integradas",
    keywords: ["projeto de interiores antes das chaves", "apartamento novo", "projeto para apartamento na planta", "planejamento de apartamento"],
    sections: [
      {
        title: "O que pode avançar antes da entrega",
        bullets: [
          "Briefing e organização das prioridades do casal ou da família.",
          "Estudos preliminares de layout com base na planta disponível.",
          "Conceito de materiais, cores, iluminação e linguagem dos ambientes.",
          "Mapeamento de itens que poderão ser mantidos ou alterados.",
          "Previsão de investimento e estratégia de contratação.",
          "Pesquisa de fornecedores e identificação de prazos longos.",
        ],
      },
      {
        title: "O que precisa ser confirmado no imóvel",
        paragraphs: [
          "Plantas comerciais e materiais de venda nem sempre registram todas as medidas ou interferências da unidade entregue. Pilares, prumadas, quadros, pontos, desníveis e tolerâncias de execução podem afetar o detalhamento.",
          "Marcenaria, pedras, vidros e elementos encaixados exigem conferência de campo antes da produção. O projeto pode estar conceitualmente pronto e ainda depender dessa validação técnica.",
        ],
      },
      {
        title: "Por que começar antes pode valer a pena",
        paragraphs: [
          "A antecedência distribui decisões que, depois das chaves, costumam se concentrar. Com mais tempo, o cliente consegue comparar opções, organizar orçamento e definir prioridades sem transformar cada compra em uma urgência.",
          "Também é possível preparar o processo de aprovação do condomínio e alinhar equipes para o período permitido, respeitando o que só poderá ser concluído após o levantamento definitivo.",
        ],
        highlight: "Começar cedo não significa comprar tudo cedo. Significa saber o que decidir agora, o que reservar e o que só pode ser confirmado depois.",
      },
      {
        title: "Quando ainda é cedo demais",
        paragraphs: [
          "Se a construtora não disponibilizou plantas confiáveis, memoriais ou previsão de entrega, detalhar itens sob medida pode gerar retrabalho. Nessa fase, vale trabalhar com briefing, referências e planejamento financeiro, preservando flexibilidade.",
        ],
      },
      {
        title: "Documentos úteis para a primeira conversa",
        bullets: [
          "Planta da unidade e opções de personalização contratadas.",
          "Memorial descritivo e manual técnico, quando disponíveis.",
          "Imagens e vídeos da unidade, decorado ou visita técnica.",
          "Previsão de entrega e regras já informadas pelo condomínio.",
          "Lista de móveis, equipamentos e objetos que irão para o novo imóvel.",
        ],
      },
    ],
    relatedService: { href: "/projetos-de-apartamentos", label: "Planejar meu apartamento", title: "Seu apartamento ainda não foi entregue?" },
  },
  {
    slug: "como-escolher-escritorio-de-arquitetura",
    category: "Contratação",
    intent: "Comercial",
    title: "Como escolher um escritório de arquitetura para o seu projeto ou reforma",
    metaTitle: "Como Escolher um Escritório de Arquitetura | Barroco",
    description: "Critérios para escolher um escritório de arquitetura: portfólio, escopo, método, entregáveis, comunicação, orçamento e experiência com obra.",
    excerpt: "Portfólio importa, mas a contratação também precisa considerar método, profundidade técnica, responsabilidades e compatibilidade com o seu momento.",
    answer: "Para escolher um escritório de arquitetura, avalie projetos semelhantes ao seu, clareza do escopo, profundidade dos entregáveis, participação dos responsáveis, método de comunicação, experiência de execução e forma de organizar orçamento, prazo e alterações. Não compare apenas imagens ou o valor final da proposta.",
    published: "2026-08-06",
    modified: "2026-08-06",
    readingTime: "8 min de leitura",
    image: "/images/mayara-cimino-luiz-faria.webp",
    imageAlt: "Arquiteta Mayara Cimino e arquiteto Luiz Faria, responsáveis pela Barroco Arquitetura",
    keywords: ["como escolher escritório de arquitetura", "contratar arquiteto", "proposta de arquitetura", "escritório de arquitetura em Santo André"],
    sections: [
      {
        title: "Procure experiência compatível com o seu problema",
        paragraphs: [
          "Um portfólio bonito demonstra repertório, mas é importante observar projetos com escala, uso e complexidade próximos ao que você pretende contratar. Um apartamento ocupado, uma casa nova e um escritório em funcionamento exigem processos diferentes.",
          "Veja se o escritório explica decisões e desafios, e não apenas publica imagens finais. Isso revela como a equipe pensa quando surgem restrições de espaço, orçamento, prazo ou execução.",
        ],
      },
      {
        title: "Compare escopo, não apenas preço",
        bullets: [
          "Quais etapas e ambientes estão incluídos.",
          "Quais desenhos, imagens e especificações serão entregues.",
          "Quantas revisões e reuniões estão previstas.",
          "Como funcionam orçamento, visitas e apoio durante a obra.",
          "O que pertence ao projeto, à execução, à marcenaria ou a terceiros.",
          "Quem toma decisões e quem será o contato cotidiano.",
        ],
        highlight: "Uma proposta mais barata pode atender perfeitamente a um escopo menor. O problema surge quando o cliente espera uma entrega que não foi contratada.",
      },
      {
        title: "Entenda quem estará à frente do trabalho",
        paragraphs: [
          "Pergunte como os arquitetos responsáveis participam das reuniões, aprovações e momentos críticos. Equipes maiores e menores podem funcionar bem; o essencial é saber quem decide, quem registra e quem responde por cada fase.",
          "Na Barroco, Mayara Cimino e Luiz Faria permanecem à frente dos projetos, conectando direção criativa, detalhamento e acompanhamento próximo.",
        ],
      },
      {
        title: "Observe o processo de comunicação",
        bullets: [
          "As próximas etapas são explicadas com antecedência.",
          "Aprovações e alterações ficam registradas.",
          "Prazos de resposta e responsabilidades são compreensíveis.",
          "A equipe faz perguntas sobre rotina, prioridades e investimento antes de propor soluções.",
          "Dúvidas técnicas são respondidas com critérios, não apenas com preferências estéticas.",
        ],
      },
      {
        title: "Experiência com obra muda a qualidade do projeto",
        paragraphs: [
          "Quem acompanha execução aprende a identificar detalhes que causam dúvida, desperdício ou conflito. Mesmo que você contrate somente o projeto, essa experiência tende a aparecer na forma de especificar, compatibilizar e conversar com fornecedores.",
          "Se pretende contratar projeto e obra com a mesma equipe, confirme como serão separados orçamento, responsabilidades, aprovações e eventuais alterações de escopo.",
        ],
      },
      {
        title: "Sinais de alerta durante a contratação",
        bullets: [
          "Promessas de prazo ou preço definitivo sem leitura do imóvel e do escopo.",
          "Entregáveis descritos apenas como “projeto completo”, sem detalhamento.",
          "Ausência de processo para revisar e aprovar decisões.",
          "Portfólio sem contexto, autoria ou relação clara com o serviço oferecido.",
          "Dificuldade para explicar o que não está incluído na proposta.",
        ],
      },
    ],
    relatedService: { href: "/#contato", label: "Contar sobre meu projeto", title: "Quer comparar um escopo para o seu imóvel?" },
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
