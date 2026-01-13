export interface ModalData {
  category: string;
  title: string;
  description: string;
  benefits: string[];
  videoSrc: string;
  carouselItems: {
    type: "reel" | "short";
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
    carouselItems: [
      {
        type: "reel",
        thumbnail: "/carousel-1.jpg",
        duration: "4:41",
        title: "Vídeo 1",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "short",
        thumbnail: "/carousel-2.jpg",
        duration: "5:01",
        title: "Vídeo 2",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "reel",
        thumbnail: "/carousel-3.jpg",
        duration: "11:201:3803",
        title: "Vídeo 3",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "short",
        thumbnail: "/carousel-4.jpg",
        duration: "5:01",
        title: "Vídeo 4",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "reel",
        thumbnail: "/carousel-5.jpg",
        duration: "3:30",
        title: "Vídeo 5",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
    ],
  },
  cultura: {
    category: "ENGAJAMENTO E IDENTIDADE",
    title: "VÍDEOS DE CULTURA ORGANIZACIONAL",
    description: "Fortaleça a identidade da sua empresa com conteúdos que promovem valores, missão e visão de forma clara e inspiradora.",
    benefits: ["Alinhamento de valores corporativos.", "Aumento do engajamento dos colaboradores.", "Fortalecimento da marca empregadora."],
    videoSrc: "/teste.mp4",
    carouselItems: [
      {
        type: "reel",
        thumbnail: "/carousel-1.jpg",
        duration: "3:20",
        title: "Cultura 1",
        description: "Construa uma cultura forte e engajadora.",
      },
      {
        type: "short",
        thumbnail: "/carousel-2.jpg",
        duration: "2:45",
        title: "Cultura 2",
        description: "Valores que transformam equipes.",
      },
    ],
  },
  proposito: {
    category: "PROPÓSITO E IMPACTO",
    title: "VÍDEOS DE PROPÓSITO",
    description: "Comunique o propósito da sua marca de forma autêntica e conecte-se emocionalmente com seu público interno e externo.",
    benefits: ["Conexão emocional com stakeholders.", "Clareza sobre o impacto social da empresa.", "Diferenciação no mercado."],
    videoSrc: "/teste.mp4",
    carouselItems: [
      {
        type: "reel",
        thumbnail: "/carousel-1.jpg",
        duration: "4:15",
        title: "Propósito 1",
        description: "Compartilhe o propósito que move sua marca.",
      },
      {
        type: "short",
        thumbnail: "/carousel-2.jpg",
        duration: "3:50",
        title: "Propósito 2",
        description: "Inspire através do seu propósito.",
      },
    ],
  },
  "saiba-mais": {
    category: "EMPLOYER BRANDING",
    title: "CONTEÚDOS INSTITUCIONAIS",
    description: "Materiais estratégicos para fortalecer a imagem da sua empresa no mercado e atrair os melhores talentos.",
    benefits: ["Atração de talentos qualificados.", "Fortalecimento da reputação corporativa.", "Aumento da visibilidade da marca."],
    videoSrc: "/teste.mp4",
    carouselItems: [
      {
        type: "reel",
        thumbnail: "/carousel-1.jpg",
        duration: "5:30",
        title: "Institucional 1",
        description: "Apresente sua empresa de forma profissional.",
      },
      {
        type: "short",
        thumbnail: "/carousel-2.jpg",
        duration: "4:20",
        title: "Institucional 2",
        description: "Conte a história da sua marca.",
      },
    ],
  },
};
