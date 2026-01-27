# Cinese Filmes

Um site corporativo moderno e responsivo para a Cinese Filmes, uma agência especializada em produção de conteúdo visual e vídeos para marketing corporativo. O projeto apresenta soluções de comunicação para diferentes estratégias: Inbound Marketing, Endomarketing e Employer Branding.

## 🎬 Sobre o Projeto

A Cinese Filmes é uma parceira estratégica na construção de conexões autênticas entre marcas, colaboradores e público-alvo através de histórias visuais impactantes. Este site showcas suas soluções de conteúdo divididas em três pilares principais:

- **Inbound Marketing**: Soluções para atrair (Topo), considerar (Meio) e converter (Fundo) clientes
- **Endomarketing**: Conteúdos para engajamento interno, treinamento, cultura e propósito
- **Employer Branding**: Estratégias de marca empregadora para atração e retenção de talentos

## 🚀 Tecnologias Utilizadas

### Frontend

- **[Next.js 16.1.1](https://nextjs.org/)** - Framework React com renderização estática (export)
- **[React 19.2.3](https://react.dev/)** - Biblioteca UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework de utilitários CSS
- **[PostCSS 4](https://postcss.org/)** - Processador de CSS

### Bibliotecas

- **[SweetAlert2 11.26.17](https://sweetalert2.github.io/)** - Alertas e modais personalizados
- **[Next/Image](https://nextjs.org/docs/app/api-reference/components/image)** - Otimização de imagens

### Desenvolvimento

- **[ESLint 9](https://eslint.org/)** - Linter de código
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[TypeScript Config](tsconfig.json)** - Configuração rigorosa com modo strict

## 📁 Estrutura do Projeto

```
cinese-filmes/
├── app/
│   ├── components/              # Componentes reutilizáveis
│   │   ├── Button.tsx           # Botões estilizados
│   │   ├── Header.tsx           # Header com navegação
│   │   ├── Footer.tsx           # Footer com informações de contato
│   │   ├── Modal.tsx            # Modal de soluções com carrossel
│   │   ├── SectionNav.tsx       # Navegação de seções (side nav)
│   │   └── whatsapp-button.tsx  # Botão flutuante WhatsApp
│   ├── content/                 # Página de conteúdo
│   │   ├── page.tsx             # Página principal de soluções
│   │   ├── layout.tsx           # Layout da seção content
│   │   ├── modalMock.ts         # Dados dos modais (mock)
│   │   └── mockImages.ts        # Lista de logos de clientes
│   ├── page.tsx                 # Homepage (landing page)
│   ├── layout.tsx               # Layout raiz
│   └── globals.css              # Estilos globais e variáveis CSS
├── public/                      # Arquivos estáticos
│   ├── *.png                    # Imagens (logos, backgrounds)
│   └── *.mp4                    # Vídeos
├── next.config.ts              # Configuração Next.js (export estático)
├── tsconfig.json               # Configuração TypeScript
├── postcss.config.mjs          # Configuração PostCSS
├── eslint.config.mjs           # Configuração ESLint
├── tailwind.config.js          # Configuração Tailwind CSS
├── package.json                # Dependências e scripts
└── README.md                   # Este arquivo
```

## 🎨 Componentes Principais

### [`Header`](app/components/Header.tsx)

Navegação fixa com logo e links para as páginas principais. Adapta cores baseado na visibilidade do fundo.

### [`Modal`](app/components/Modal.tsx)

Componente modal responsivo que exibe:

- Descrição da solução
- Vídeo demonstrativo
- Carrossel de casos/soluções com múltiplas abas
- Galeria de imagens para campanhas

### [`Button`](app/components/Button.tsx)

Botões estilizados com suporte a 3 cores (blue, yellow, gray) com animações de escala.

### [`SectionNav`](app/components/SectionNav.tsx)

Navegação visual de seções fixada no lado direito, permitindo pular entre seções.

### [`WhatsappButton`](app/components/whatsapp-button.tsx)

Botão flutuante com tooltip para contato via WhatsApp. Suporta customização de posição, telefone e mensagem.

## 🎯 Páginas

### [Homepage](app/page.tsx)

- 4 seções fullscreen com vídeos do YouTube em autoplay
- Navegação por scroll (mouse wheel e touch)
- Animações e efeitos visuais
- Footer com informações de contato

### [Página de Conteúdo](app/content/page.tsx)

- Hero com vídeo
- Carrossel infinito de logos de clientes
- Seção "HUB de comunicação corporativa"
- 3 seções de soluções (Inbound, Endomarketing, Employer Branding)
- Formulário de contato
- Integração com Web3Forms para envio de emails

## ⚙️ Configuração & Deploy

### Variáveis Importantes

**next.config.ts** configura:

- `output: "export"` - Exportação estática (sem servidor Node.js)
- `images.unoptimized: true` - Desativa otimização de imagens (necessário para export)
- `trailingSlash: true` - Adiciona `/` ao final das URLs

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Inicia servidor de desenvolvimento em localhost:3000

# Build
npm run build        # Compila o projeto
npm run export       # Exporta como site estático

# Deploy
npm run deploy       # Build + export (prepara para deploy)

# Outros
npm start           # Inicia servidor de produção
npm run lint        # Executa ESLint
```

### Deploy

O projeto está configurado para exportação estática, ideal para:

- **Vercel** (recomendado)
- GitHub Pages
- Netlify
- Qualquer servidor de arquivos estáticos

Veja a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-implementation/deploying) para mais detalhes.

## 🎨 Tema & Variáveis CSS

Cores definidas em [`globals.css`](app/globals.css):

- `--color-blue-light`: #b5d5e3
- `--color-yellow-soft`: #fee38a
- `--color-gray-light`: #cbcbcb
- `--color-dark-obsidian`: #010a0f
- `--color-white`: #ffffff

Fontes:

- **Raleway** - Headings e títulos
- **Inter** - Corpo de texto
- **Roboto** - Textos secundários

## 📝 Dados Mock

Os dados das soluções são organizados em [`modalMock.ts`](app/content/modalMock.ts):

- `modalDataMapInbound` - Soluções Inbound Marketing
- `modalsDataMapEndomarketing` - Soluções Endomarketing
- `modalsDataMapEmployer` - Soluções Employer Branding

Cada solução contém:

- Título, descrição e benefícios
- Vídeo demonstrativo
- Abas com diferentes tipos de conteúdo
- Itens do carrossel com thumbnails, duração e descrições

## 🤝 Contato

Para mais informações sobre os serviços da Cinese Filmes:

- **Email**: atendimento@cinesefilmes.com
- **WhatsApp**: +55 (11) 9 8247-7229 (São Paulo) | +55 (48) 9 9115-1793 (Florianópolis)
- **Instagram**: [@cinese_content](https://www.instagram.com/cinese_content)
- **LinkedIn**: [Cinese Filmes](https://www.linkedin.com/company/cinesefilmes/)

---

**© 2024 Cinese Filmes. Todos os direitos reservados.**
