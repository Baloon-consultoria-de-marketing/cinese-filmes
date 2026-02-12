export interface Tab {
  id: string;
  label: string;
}

export interface CarouselItem {
  type: string;
  thumbnail: string;
  duration: string;
  description: string;
  format?: "reels" | "video"; // NOVO: identifica o formato
}

export interface ModalData {
  category: string;
  title: string;
  description: string;
  solutionStrong?: string[];
  solutions?: string[];
  benefits: string[];
  videoSrc: string;
  tabs?: Tab[];
  carouselItems: CarouselItem[];
}

export const modalDataMapInbound: Record<string, ModalData> = {
  topo: {
    category: "TOPO DE FUNIL",
    title: "ATRAÇÃO",
    solutionStrong: ["Reels e Shorts:", ""],
    solutions: ["Videos curtos, criativos e dinamicos que utilizam tendências para engajamento.", "Tiktok - Instagram - YouTube"],
    description: "Objetivo: Atrair a atenção do público, gerar reconhecimento e despertar interesse inicial.",
    benefits: ["Aumento do alcance da marca.", "Criação de uma primeira impressão forte e memorável.", "Atração de leads qualificados para avançar o funil."],
    videoSrc: "cHRPmNrrYeg",
    tabs: [
      { id: "reels", label: "Reels/Shorts" },
      { id: "videos", label: "Eventos Corporativos" },
    ],
    carouselItems: [
      {
        type: "reels",
        thumbnail: "gFffM31hhl0",
        duration: "0:26",
        description: "Fair Price - Como eu não pensei nisso antes?",
        format: "reels",
      },
      {
        type: "reels",
        thumbnail: "ee5JWsPKjUU",
        duration: "0:43",
        description: "Fair price - Relacionamento Tóxico",
        format: "reels", // NOVO
      },
      {
        type: "videos",
        thumbnail: "a6f_BVS5cqM",
        duration: "0:33",
        description: "BUNZL EPI - TOP OF MIND",
        format: "video", // NOVO
      },
    ],
  },
  meio: {
    category: "MEIO DO FUNIL",
    title: "CONSIDERAÇÃO",
    description: "Obejtivo: Nutrir leads com informações relevantes, mostrando como sua solução resolve problemas específicos.",
    solutionStrong: ["Animações:", "Video institucional:", "Vídeos de Produtos:", "Branded Content:"],
    solutions: [
      " Simplificação de conceitos complexos, mostrando soluções de forma didática e visual",
      " Video institucional: Reforça a identidade da marca e comunica valores e diferenciais.",
      "Detalham produtos, serviços ou processos, promovendo tranquilidade e clareza.",
      "Storytelling opu documentário que emociona e iinforma, criando impacto social.",
    ],
    benefits: ["Melhora o entendimento sobre os serviços ou produtos.", "Fortalece a confiança na marca como solução ideal.", "Posiciona a empresa como autoridade no segmento."],
    videoSrc: "cHRPmNrrYeg",
    tabs: [
      { id: "animacoes", label: "Animações " },
      { id: "institucional", label: "Vídeo Institucional" },
      { id: "explicativos", label: "Vídeos Explicativos" },
      { id: "branded", label: "Branded Content" },
    ],
    carouselItems: [
      // Animacoes videos
      {
        type: "animacoes",
        thumbnail: "l6vFK9gtDI4",
        duration: "1:24",
        description: "Skyone - Portal do Fornecedor",
        format: "video", // NOVO
      },
      {
        type: "animacoes",
        thumbnail: "_7hfvr27r28",
        duration: "2:24",
        description: "Skyone - Risco Sacado",
        format: "video", // NOVO
      },
      {
        type: "animacoes",
        thumbnail: "BvCkDnc2pFc",
        duration: "1:26",
        description: "Skyone  Sky Security",
        format: "video", // NOVO
      },
      {
        type: "animacoes",
        thumbnail: "OLRU9NePZGU",
        duration: "1:00",
        description: "Skyone",
        format: "video", // NOVO
      },
      // Institucional videos
      {
        type: "institucional",
        thumbnail: "CktpWcoAbXU",
        duration: "2:36",
        description: "Manifesto BUNZL EPI",
        format: "video", // NOVO
      },
      {
        type: "institucional",
        thumbnail: "vDD4QhjJmNE",
        duration: "2:44",
        description: "Institucional Fair Price",
        format: "video", // NOVO
      },
      {
        type: "institucional",
        thumbnail: "0rjKuwDnoqk",
        duration: "2:36",
        description: "Institucional Colégio Objetivo São Sebastião",
        format: "video", // NOVO
      },
      {
        type: "institucional",
        thumbnail: "jmC6k5t6ILs",
        duration: "2:13",
        description: "Institucional Colégio Objetivo Salto",
        format: "video", // NOVO
      },
      {
        type: "institucional",
        thumbnail: "M0kOZTYsdbs",
        duration: "2:27",
        description: "Institucional Colégio Cruzeiro do Sul",
        format: "video", // NOVO
      },
      // Explicativos videos
      {
        type: "explicativos",
        thumbnail: "QLbuquAFB6s",
        duration: "1:13",
        description: "A Revolução da Segurança - Mob Controle.",
        format: "video", // NOVO
      },
      {
        type: "explicativos",
        thumbnail: "p4ECZ7ra1RU",
        duration: "1:19",
        description: "A Revolução da Segurança - Mob Inspeção.",
        format: "video", // NOVO
      },
      {
        type: "explicativos",
        thumbnail: "KiEAXYEUp18",
        duration: "0:51",
        description: "A Revolução da Segurança - Mob Consulta.",
        format: "video", // NOVO
      },
      {
        type: "explicativos",
        thumbnail: "WvlCthMu2fw",
        duration: "1:09",
        description: "A Revolução da Segurança - Bepi Service.",
        format: "video", // NOVO
      },
      {
        type: "explicativos",
        thumbnail: "Nil9rtGdPGY",
        duration: "0:59",
        description: "Fair Price - Como vender seu precatório?",
        format: "reels", // NOVO
      },
      {
        type: "explicativos",
        thumbnail: "-a3AUU9ehSU",
        duration: "0:46",
        description: "Franco Guimarães | O que preciso para um investimento.",
        format: "reels", // NOVO
      },
      {
        type: "explicativos",
        thumbnail: "voTtBqDKTs8",
        duration: "0:23",
        description: "PRA QUEM POSSO VENDER MEU PRECATÓRIO COM SEGURANÇA?",
        format: "reels", // NOVO
      },
      // Branded Content videos
      {
        type: "branded",
        thumbnail: "UnQgzYXY4c0",
        duration: "4:15",
        description: "Além do Guarda Roupa - HBO",
        format: "video", // NOVO
      },
      {
        type: "branded",
        thumbnail: "jt7VVmUZHtE",
        duration: "2:30",
        description: "VIVO - Histórias de Ouro - Triatlo",
        format: "video", // NOVO
      },
      {
        type: "branded",
        thumbnail: "OfDME7TyS70",
        duration: "1:55",
        description: "VIVO - Histórias de Ouro - Judô",
        format: "video", // NOVO
      },
      {
        type: "branded",
        thumbnail: "fNeJzgxSrGA",
        duration: "2:28",
        description: "VIVO - Histórias de Ouro - Maratona",
        format: "video", // NOVO
      },
      {
        type: "branded",
        thumbnail: "wAWLSDTbCrs",
        duration: "2:52",
        description: "NETSHOES | Convocados(São Paulo)",
        format: "video", // NOVO
      },
      {
        type: "branded",
        thumbnail: "Yx-DLvomTVk",
        duration: "3:03",
        description: "NETSHOES | Convocados(Cuiabá)",
        format: "video", // NOVO
      },
      {
        type: "branded",
        thumbnail: "08fXnmLtY-Y",
        duration: "2:41",
        description: "NETSHOES | Convocados(Iraquara)",
        format: "video", // NOVO
      },
    ],
  },
  fundo: {
    category: "FUNDO DO FUNIL",
    title: "DECISÃO",
    description: "Objetivo: Converter leads em clientes, incentivando a tomada de decisão com base em confiança e prova social.",
    solutionStrong: ["Videocases:", "Vídeos Publicitários:", "Campanhas de Retargeting:"],
    solutions: [
      " Mostram resultados reais e histórias de sucesso, encurtando a jornada de compra.",
      " Comunicação focada em conversão, com apelo direto e criativo.",
      " Vídeos curtos e segmentados para públicos que já demonstraram interesse na marca.",
    ],
    benefits: ["Reduz o tempo para fechamento de negócios.", "Prova de confiabilidade com cases reais.", "Geração de clientes satisfeitos e fidelizados."],
    videoSrc: "cHRPmNrrYeg",
    tabs: [
      { id: "videocases", label: "Videocases" },
      { id: "publicitarios", label: "Vídeos Publicitários" },
      { id: "retargeting", label: "Campanhas de Retargeting" },
    ],
    carouselItems: [
      // Videocases videos
      {
        type: "videocases",
        thumbnail: "0FEuDL2acY4",
        duration: "2:27",
        description: "Cloud Target - Case Ypê",
        format: "video", // NOVO
      },
      {
        type: "videocases",
        thumbnail: "z68FHjbbq_Q",
        duration: "1:21",
        description: "Vivo - Videocase Bullla",
        format: "video", // NOVO
      },
      {
        type: "videocases",
        thumbnail: "KTZUvg4rWzY",
        duration: "3:00",
        description: "Plano - Minhas Finanças",
        format: "video", // NOVO
      },
      {
        type: "videocases",
        thumbnail: "wAWLSDTbCrs",
        duration: "2:52",
        description: "NETSHOES | Convocados(São Paulo)",
        format: "video", // NOVO
      },
      {
        type: "videocases",
        thumbnail: "Yx-DLvomTVk",
        duration: "3:03",
        description: "NETSHOES | Convocados(Cuiabá)",
        format: "video", // NOVO
      },
      // Publicitarios videos
      {
        type: "publicitarios",
        thumbnail: "Ibpp5trYmps",
        duration: "0:16",
        description: "Fair Prica - Campanha JN",
        format: "reels", // NOVO
      },
      {
        type: "publicitarios",
        thumbnail: "ypdenoIfGBs",
        duration: "0:13",
        description: "Fair Price - Receba seu precatório",
        format: "reels", // NOVO
      },
      // Retargeting videos
      {
        type: "retargeting",
        thumbnail: "mSX6upid_8Y",
        duration: "0:40",
        description: "Odontorani - Campanha de Retargeting",
        format: "reels", // NOVO
      },
      {
        type: "retargeting",
        thumbnail: "hNMVkY-owH8",
        duration: "0:13",
        description: "Fair price - Retargeting",
        format: "reels", // NOVO
      },
    ],
  },
};

export const modalsDataMapEndomarketing: Record<string, ModalData> = {
  treinamento: {
    category: "EFICIÊNCIA, PADRONIZAÇÃO E ENGAJAMENTO",
    title: "EAD VÍDEOS DE TREINAMENTO",
    description: "Centralização de treinamentos e formações em um canal de fácil acesso, reduzindo custos e promovendo padronização de informações.",
    benefits: ["Formação de gerações de colaboradores.", "Comunicação clara das diretrizes corporativas.", "Redução de custos com treinamentos presenciais."],
    videoSrc: "cHRPmNrrYeg",
    tabs: [{ id: "reels", label: "Reels" }],
    carouselItems: [
      {
        type: "reels",
        thumbnail: "OkBbNz_bNIg",
        duration: "2:12",
        description: "Fair Price - Cálculo de Crédito Alimentar.",
        format: "video", // NOVO
      },
      {
        type: "reels",
        thumbnail: "LmK2cSdfqCs",
        duration: "2:14",
        description: "ARAMIS | Armários",
        format: "video", // NOVO
      },
      {
        type: "reels",
        thumbnail: "OPR-JfxOzg0",
        duration: "2:10",
        description: "ARAMIS - Experiência de compra",
        format: "video", // NOVO
      },
      {
        type: "reels",
        thumbnail: "7KvZlzZlGx4",
        duration: "2:14",
        description: "Aramis | Conceito de Visual Merchandising",
        format: "video", // NOVO
      },
      {
        type: "reels",
        thumbnail: "2mtHblO6B0Y",
        duration: "3:55",
        description: "Aramis | Montagem de Armário",
        format: "video", // NOVO
      },
      {
        type: "reels",
        thumbnail: "rdyiTTv6Wps",
        duration: "2:36",
        description: "Controle Financeiro | Inttrodução",
        format: "video", // NOVO
      },
    ],
  },
  cultura: {
    category: "RECONHECIMENTO, ORGULHO E PROPÓSITO",
    title: "VIDEOS MOTIVACIONAIS",
    description: "Conteúdos emocionantes que destacam os valores da empresa e reconhecem o impacto dos colaboradores.",
    benefits: ["Reforço do orgulho de fazer parte da organização.", "Alinhamento da equipe à missão da empresa.", "Criação de um ambiente de trabalho mais positivo e colaborativo."],
    videoSrc: "cHRPmNrrYeg",
    tabs: [{ id: "animacoes", label: "Animações Explicativas" }],
    carouselItems: [
      {
        type: "animacoes",
        thumbnail: "eSlxV7SRpE0",
        duration: "11:07",
        description: "ARAMIS - Juntos Somando Histórias",
        format: "video", // NOVO
      },
      {
        type: "animacoes",
        thumbnail: "oVUmlVC2fow",
        duration: "5:01",
        description: "Aramis - Vulnerabilidade",
        format: "video", // NOVO
      },
      {
        type: "animacoes",
        thumbnail: "eSeFNmZRTkM",
        duration: "7:41",
        description: "Aramis | Gestão da Mudança",
        format: "video", // NOVO
      },
      {
        type: "animacoes",
        thumbnail: "13P7Fq6tTCA",
        duration: "4:37",
        description: "Aramis | Cultura",
        format: "video", // NOVO
      },
    ],
  },
  proposito: {
    category: "CULTURA ORGANIZACIONAL, PROCESSOS",
    title: "VIDEOS INFORMATIVOS",
    description: "Conteúdos informativos que alinham posicionamentos, metas e culturas organizacional para um grande número de colaboradores.",
    benefits: ["Reduz o tempo para fechamento de negócios.", "Prova de confiabilidade com cases reais.", "Geração de clientes satisfeitos e fidelizados."],
    videoSrc: "cHRPmNrrYeg",
    tabs: [{ id: "videocases", label: "Videocases" }],
    carouselItems: [
      {
        type: "videocases",
        thumbnail: "GCzZrRnQIUA",
        duration: "3:47",
        description: "Renault | Novo posicionamento de vendas",
        format: "video", // NOVO
      },
      {
        type: "videocases",
        thumbnail: "rwgk3Wt7Grs",
        duration: "1:55",
        description: "FCamara - Do Open Banking ao Open Finance",
        format: "video", // NOVO
      },
    ],
  },
};

export const modalsDataMapEmployer: Record<string, ModalData> = {
  marcaEmpregadora: {
    category: "CULTURA, ENGAJAMENTO, TALENTOS",
    title: "MARCA EMPREGADORA",
    description: "Objetivo: Construir e fortalecer a percepção da empresa como um excelente lugar para se trabalhar.",
    benefits: ["Aumentar o engajamento interno.", "Retenção de talentos.", "Atração de talentos qualificados.", "Difundir valores e cultura da organização."],
    videoSrc: "cHRPmNrrYeg",
    tabs: [
      { id: "branded", label: "Branded Content" },
      { id: "recrutamento", label: "Recrutamento" },
      { id: "campanhas", label: "Campanhas" },
    ],
    carouselItems: [
      // Branded Content videos
      {
        type: "branded",
        thumbnail: "a6f_BVS5cqM",
        duration: "0:33",
        description: "BUNZL EPI - TPO OF MIND",
        format: "video", // NOVO
      },
      {
        type: "branded",
        thumbnail: "eSlxV7SRpE0",
        duration: "11:07",
        description: "ARAMIS - Juntos Somando Histórias",
        format: "video", // NOVO
      },
      // Recrutamento videos
      {
        type: "recrutamento",
        thumbnail: "li8pIKDL4CA",
        duration: "1:12",
        description: "FCamara - Novos Colaboradores",
        format: "video", // NOVO
      },
      {
        type: "recrutamento",
        thumbnail: "woZnzXyL9Jg",
        duration: "1:53",
        description: "FCamara - Cultura Laranja",
        format: "video", // NOVO
      },
    ],
  },
};
