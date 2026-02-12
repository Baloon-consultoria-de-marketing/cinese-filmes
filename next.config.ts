/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <--- ESSA LINHA É OBRIGATÓRIA PARA GERAR A PASTA 'out'
  images: {
    unoptimized: true, // <--- OBRIGATÓRIO PARA IMAGENS NO NEXT STATIC EXPORT
  },
};

export default nextConfig;
