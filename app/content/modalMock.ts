export interface Tab {
  id: string;
  label: string;
}

export interface ModalData {
  category: string;
  title: string;
  description: string;
  solutionStrong?: string[];
  solutions?: string[];
  benefits: string[];
  videoSrc: string;
  tabs: Tab[];
  carouselItems: {
    type: string;
    thumbnail: string;
    duration: string;
    title: string;
    description: string;
  }[];
}

export interface GalleryModalData {
  title: string;
  subtitle: string;
  images: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
}

export const galleryModalData: GalleryModalData = {
  title: "EVENTOS ETC",
  subtitle: "Sua reprodução e seu maior programa de beneficiamento veio as melhores talentos.",
  images: [
    { src: "/teste.mp4", alt: "Imagem 1", width: 300, height: 400 },
    { src: "/teste.mp4", alt: "Imagem 2", width: 300, height: 300 },
    { src: "/teste.mp4", alt: "Imagem 3", width: 300, height: 500 },
    { src: "/teste.mp4", alt: "Imagem 4", width: 300, height: 300 },
    { src: "/teste.mp4", alt: "Imagem 5", width: 300, height: 400 },
    { src: "/teste.mp4", alt: "Imagem 6", width: 300, height: 300 },
    { src: "/teste.mp4", alt: "Imagem 7", width: 300, height: 350 },
    { src: "/teste.mp4", alt: "Imagem 8", width: 300, height: 300 },
  ],
};

export const modalDataMap: Record<string, ModalData> = {
  treinamento: {
    category: "EFICIÊNCIA, PADRONIZAÇÃO E ENGAJAMENTO",
    title: "EAD VÍDEOS DE TREINAMENTO",
    description: "Centralização de treinamentos e formações em um canal de fácil acesso, reduzindo custos e promovendo padronização de informações.",
    benefits: ["Formação de gerações de colaboradores.", "Comunicação clara das diretrizes corporativas.", "Redução de custos com treinamentos presenciais."],
    videoSrc: "/teste.mp4",
    tabs: [
      { id: "reels", label: "Reels" },
      { id: "shorts", label: "Shorts" },
    ],
    carouselItems: [
      {
        type: "reels",
        thumbnail: "/public/portfolio/amem.png",
        duration: "4:31",
        title: "Vídeo 1",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "shorts",
        thumbnail: "/public/portfolio/cinese.png",
        duration: "5:01",
        title: "Vídeo 2",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "reels",
        thumbnail: "/public/portfolio/fair-price.png",
        duration: "2:44",
        title: "Vídeo 3",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
    ],
  },
  cultura: {
    category: "MEIO DO FUNIL",
    title: "CONSIDERAÇÃO",
    description: "Obejtivo: Nutrir leads com informações relevantes, mostrando como sua solução resolve problemas específicos.",
    solutionStrong: ["Animações Explicativas:", "Video institucional:", "Branded Content:", "Vídeos Explicativos:"],
    solutions: [
      " Simplificação de conceitos complexos, mostrando soluções de forma didática e visual",
      " Video institucional: Reforça a identidade da marca e comunica valores e diferenciais.",
      "Storytelling opu documentário que emociona e iinforma, criando impacto social.",
      "Detlaham produtos, serviços ou processos, promovendo tranquilidade e clareza.",
    ],
    benefits: ["Melhora o entendimento sobre os serviços ou produtos.", "Fortalece a confiança na marca como solução ideal.", "Posiciona a empresa como autoridade no segmento."],
    videoSrc: "/teste.mp4",
    tabs: [
      { id: "animacoes", label: "Animações Explicativas" },
      { id: "institucional", label: "Vídeo Institucional" },
      { id: "explicativos", label: "Vídeos Explicativos" },
      { id: "branded", label: "Branded Content" },
    ],
    carouselItems: [
      {
        type: "animacoes",
        thumbnail: "/public/portfolio/amem.png",
        duration: "4:31",
        title: "Cultura 1",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "institucional",
        thumbnail: "/public/portfolio/cinese.png",
        duration: "5:01",
        title: "Cultura 2",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "explicativos",
        thumbnail: "/public/portfolio/fair-price.png",
        duration: "2:44",
        title: "Cultura 3",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "branded",
        thumbnail: "/public/portfolio/cinese.png",
        duration: "5:01",
        title: "Cultura 4",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
    ],
  },
  proposito: {
    category: "FUNDO DO FUNIL",
    title: "DECISÃO",
    description:
      "Objetivo: Converter leads em clientes, incentivando a tomada de decisão com base em confiança e prova social.\n\nSoluções Indicadas:\n• Videocases: Mostram resultados reais e histórias de sucesso, encurtando a jornada de compra.\n• Vídeos Publicitários: Comunicação focada em conversão, com apelo direto e criativo.\n• Campanhas de Retargeting: Vídeos curtos e segmentados para públicos que já demonstraram interesse na marca.",
    solutionStrong: ["Videocases:", "Vídeos Publicitários:", "Campanhas de Retargeting:"],
    solutions: [
      " Mostram resultados reais e histórias de sucesso, encurtando a jornada de compra.",
      " Comunicação focada em conversão, com apelo direto e criativo.",
      " Vídeos curtos e segmentados para públicos que já demonstraram interesse na marca.",
    ],
    benefits: ["Reduz o tempo para fechamento de negócios.", "Prova de confiabilidade com cases reais.", "Geração de clientes satisfeitos e fidelizados."],
    videoSrc: "/teste.mp4",
    tabs: [
      { id: "videocases", label: "Videocases" },
      { id: "publicitarios", label: "Vídeos Publicitários" },
      { id: "retargeting", label: "Campanhas de Retargeting" },
    ],
    carouselItems: [
      {
        type: "videocases",
        thumbnail: "/public/portfolio/amem.png",
        duration: "4:31",
        title: "Propósito 1",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "publicitarios",
        thumbnail: "/public/portfolio/cinese.png",
        duration: "5:01",
        title: "Propósito 2",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "retargeting",
        thumbnail: "/public/portfolio/fair-price.png",
        duration: "2:44",
        title: "Propósito 3",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "videocases",
        thumbnail: "/public/portfolio/cinese.png",
        duration: "5:01",
        title: "Propósito 4",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
    ],
  },
  "saiba-mais": {
    category: "EMPLOYER BRANDING",
    title: "CONTEÚDOS INSTITUCIONAIS",
    description: "Materiais estratégicos para fortalecer a imagem da sua empresa no mercado e atrair os melhores talentos.",
    benefits: ["Atração de talentos qualificados.", "Fortalecimento da reputação corporativa.", "Aumento da visibilidade da marca."],
    videoSrc: "/teste.mp4",
    tabs: [
      { id: "apresentacao", label: "Apresentação" },
      { id: "cases", label: "Cases" },
    ],
    carouselItems: [
      {
        type: "apresentacao",
        thumbnail: "/public/portfolio/amem.png",
        duration: "4:31",
        title: "Institucional 1",
        description: "Apresente sua empresa de forma profissional.",
      },
      {
        type: "cases",
        thumbnail: "/public/portfolio/cinese.png",
        duration: "5:01",
        title: "Institucional 2",
        description: "Conte a história da sua marca.",
      },
      {
        type: "apresentacao",
        thumbnail: "/public/portfolio/fair-price.png",
        duration: "2:44",
        title: "Institucional 3",
        description: "Conheça nossa equipe.",
      },
    ],
  },
};
