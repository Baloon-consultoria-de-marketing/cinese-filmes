export interface Tab {
  id: string;
  label: string;
}

export interface ModalData {
  category: string;
  title: string;
  description: string;
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
        thumbnail: "/teste.mp4",
        duration: "4:41",
        title: "Vídeo 1",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "shorts",
        thumbnail: "/teste.mp4",
        duration: "5:01",
        title: "Vídeo 2",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "reels",
        thumbnail: "/teste.mp4",
        duration: "11:20",
        title: "Vídeo 3",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "shorts",
        thumbnail: "/teste.mp4",
        duration: "5:01",
        title: "Vídeo 4",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "reels",
        thumbnail: "/teste.mp4",
        duration: "3:30",
        title: "Vídeo 5",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "shorts",
        thumbnail: "/teste.mp4",
        duration: "4:15",
        title: "Vídeo 6",
        description: "Conteúdo educativo para seus colaboradores.",
      },
      {
        type: "reels",
        thumbnail: "/teste.mp4",
        duration: "6:30",
        title: "Vídeo 7",
        description: "Treinamento corporativo eficiente.",
      },
    ],
  },
  cultura: {
    category: "ENGAJAMENTO E IDENTIDADE",
    title: "VÍDEOS DE CULTURA ORGANIZACIONAL",
    description: "Fortaleça a identidade da sua empresa com conteúdos que promovem valores, missão e visão de forma clara e inspiradora.",
    benefits: ["Alinhamento de valores corporativos.", "Aumento do engajamento dos colaboradores.", "Fortalecimento da marca empregadora."],
    videoSrc: "/teste.mp4",
    tabs: [
      { id: "videos", label: "Vídeos" },
      { id: "animacoes", label: "Animações" },
      { id: "documentarios", label: "Documentários" },
    ],
    carouselItems: [
      {
        type: "videos",
        thumbnail: "/teste.mp4",
        duration: "3:20",
        title: "Cultura 1",
        description: "Construa uma cultura forte e engajadora.",
      },
      {
        type: "animacoes",
        thumbnail: "/teste.mp4",
        duration: "2:45",
        title: "Cultura 2",
        description: "Valores que transformam equipes.",
      },
      {
        type: "documentarios",
        thumbnail: "/teste.mp4",
        duration: "5:15",
        title: "Cultura 3",
        description: "História e valores da empresa.",
      },
      {
        type: "videos",
        thumbnail: "/teste.mp4",
        duration: "4:00",
        title: "Cultura 4",
        description: "Depoimentos de colaboradores.",
      },
      {
        type: "animacoes",
        thumbnail: "/teste.mp4",
        duration: "3:10",
        title: "Cultura 5",
        description: "Animação explicativa dos valores.",
      },
      {
        type: "documentarios",
        thumbnail: "/teste.mp4",
        duration: "7:25",
        title: "Cultura 6",
        description: "Jornada da empresa ao longo dos anos.",
      },
      {
        type: "videos",
        thumbnail: "/teste.mp4",
        duration: "3:45",
        title: "Cultura 7",
        description: "Missão e visão da organização.",
      },
    ],
  },
  proposito: {
    category: "PROPÓSITO E IMPACTO",
    title: "VÍDEOS DE PROPÓSITO",
    description: "Comunique o propósito da sua marca de forma autêntica e conecte-se emocionalmente com seu público interno e externo.",
    benefits: ["Conexão emocional com stakeholders.", "Clareza sobre o impacto social da empresa.", "Diferenciação no mercado."],
    videoSrc: "/teste.mp4",
    tabs: [
      { id: "institucional", label: "Institucional" },
      { id: "storytelling", label: "Storytelling" },
      { id: "depoimentos", label: "Depoimentos" },
      { id: "impacto", label: "Impacto Social" },
    ],
    carouselItems: [
      {
        type: "institucional",
        thumbnail: "/teste.mp4",
        duration: "4:15",
        title: "Propósito 1",
        description: "Compartilhe o propósito que move sua marca.",
      },
      {
        type: "institucional",
        thumbnail: "/teste.mp4",
        duration: "4:45",
        title: "Propósito 5",
        description: "Nossa missão e valores essenciais.",
      },
      {
        type: "storytelling",
        thumbnail: "/teste.mp4",
        duration: "5:20",
        title: "Propósito 6",
        description: "Narrativas que inspiram mudanças.",
      },
      {
        type: "depoimentos",
        thumbnail: "/teste.mp4",
        duration: "4:30",
        title: "Propósito 7",
        description: "Vozes que ecoam nossa missão.",
      },
      {
        type: "impacto",
        thumbnail: "/teste.mp4",
        duration: "7:10",
        title: "Propósito 8",
        description: "Resultados tangíveis na sociedade.",
      },
      {
        type: "storytelling",
        thumbnail: "/teste.mp4",
        duration: "3:50",
        title: "Propósito 2",
        description: "Inspire através do seu propósito.",
      },
      {
        type: "depoimentos",
        thumbnail: "/teste.mp4",
        duration: "5:30",
        title: "Propósito 3",
        description: "Histórias reais de transformação.",
      },
      {
        type: "impacto",
        thumbnail: "/teste.mp4",
        duration: "6:00",
        title: "Propósito 4",
        description: "Mudando vidas e comunidades.",
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
        thumbnail: "/teste.mp4",
        duration: "5:30",
        title: "Institucional 1",
        description: "Apresente sua empresa de forma profissional.",
      },
      {
        type: "cases",
        thumbnail: "/teste.mp4",
        duration: "4:20",
        title: "Institucional 2",
        description: "Conte a história da sua marca.",
      },
      {
        type: "apresentacao",
        thumbnail: "/teste.mp4",
        duration: "3:45",
        title: "Institucional 3",
        description: "Conheça nossa equipe.",
      },
    ],
  },
};
