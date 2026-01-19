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
    description: string;
  }[];
}

export const modalDataMapInbound: Record<string, ModalData> = {
  treinamento: {
    category: "EFICIÊNCIA, PADRONIZAÇÃO E ENGAJAMENTO",
    title: "EAD VÍDEOS DE TREINAMENTO",
    description: "Centralização de treinamentos e formações em um canal de fácil acesso, reduzindo custos e promovendo padronização de informações.",
    benefits: ["Formação de gerações de colaboradores.", "Comunicação clara das diretrizes corporativas.", "Redução de custos com treinamentos presenciais."],
    videoSrc: "/videoHorizontal.mp4",
    tabs: [
      { id: "reels", label: "Reels" },
      { id: "shorts", label: "Shorts" },
    ],
    carouselItems: [
      {
        type: "reels",
        thumbnail: "/videoHorizontal.mp4",
        duration: "4:31",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "shorts",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "shorts",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "reels",
        thumbnail: "/videoHorizontal.mp4",
        duration: "2:44",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "reels",
        thumbnail: "/videoHorizontal.mp4",
        duration: "2:44",
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
    videoSrc: "/videoHorizontal.mp4",
    tabs: [
      { id: "animacoes", label: "Animações Explicativas" },
      { id: "institucional", label: "Vídeo Institucional" },
      { id: "explicativos", label: "Vídeos Explicativos" },
      { id: "branded", label: "Branded Content" },
    ],
    carouselItems: [
      {
        type: "animacoes",
        thumbnail: "/videoHorizontal.mp4",
        duration: "4:31",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "institucional",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "explicativos",
        thumbnail: "/videoHorizontal.mp4",
        duration: "2:44",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "branded",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
    ],
  },
  proposito: {
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
    videoSrc: "/videoHorizontal.mp4",
    tabs: [
      { id: "videocases", label: "Videocases" },
      { id: "publicitarios", label: "Vídeos Publicitários" },
      { id: "retargeting", label: "Campanhas de Retargeting" },
    ],
    carouselItems: [
      {
        type: "videocases",
        thumbnail: "/videoHorizontal.mp4",
        duration: "4:31",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "publicitarios",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "retargeting",
        thumbnail: "/videoHorizontal.mp4",
        duration: "2:44",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "videocases",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
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
    videoSrc: "/videoHorizontal.mp4",
    tabs: [
      { id: "reels", label: "Reels" },
      { id: "shorts", label: "Shorts" },
    ],
    carouselItems: [
      {
        type: "reels",
        thumbnail: "/videoHorizontal.mp4",
        duration: "4:31",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "shorts",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "reels",
        thumbnail: "/videoHorizontal.mp4",
        duration: "2:44",
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
    videoSrc: "/videoHorizontal.mp4",
    tabs: [
      { id: "animacoes", label: "Animações Explicativas" },
      { id: "institucional", label: "Vídeo Institucional" },
      { id: "explicativos", label: "Vídeos Explicativos" },
      { id: "branded", label: "Branded Content" },
    ],
    carouselItems: [
      {
        type: "animacoes",
        thumbnail: "/videoHorizontal.mp4",
        duration: "4:31",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "institucional",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "explicativos",
        thumbnail: "/videoHorizontal.mp4",
        duration: "2:44",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "branded",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
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
    videoSrc: "/videoHorizontal.mp4",
    tabs: [
      { id: "videocases", label: "Videocases" },
      { id: "publicitarios", label: "Vídeos Publicitários" },
      { id: "retargeting", label: "Campanhas de Retargeting" },
    ],
    carouselItems: [
      {
        type: "videocases",
        thumbnail: "/videoHorizontal.mp4",
        duration: "4:31",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "publicitarios",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "retargeting",
        thumbnail: "/videoHorizontal.mp4",
        duration: "2:44",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "videocases",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
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
    videoSrc: "/videoHorizontal.mp4",
    tabs: [
      { id: "branded", label: "Branded Content" },
      { id: "recrutamento", label: "Recrutamento" },
      { id: "campanhas", label: "Campanhas" },
    ],
    carouselItems: [
      {
        type: "branded",
        thumbnail: "/videoHorizontal.mp4",
        duration: "4:31",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "recrutamento",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "campanhas",
        thumbnail: "/videoHorizontal.mp4",
        duration: "2:41",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
      {
        type: "branded",
        thumbnail: "/videoHorizontal.mp4",
        duration: "5:01",
        description: "Quem não instrui o cliente em sua jornada de compra, acaba perdendo ele para o concorrente.",
      },
    ],
  },
};
