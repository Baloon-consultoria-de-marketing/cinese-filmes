import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col gap-10 pt-12 mt-4">
      {/* Container Principal: Ocupa 100% da largura */}
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 items-start">
          {/* Coluna 1: Branding e Slogan */}
          <div className="flex flex-col gap-2 ">
            <p className="font-raleway font-bold text-base uppercase tracking-[0.2em] text-black">CINESE</p>
            <p className="font-inter text-[22px] md:text-lg text-black">&ldquo;Contamos histórias. Criamos conexões.&rdquo;</p>
          </div>

          {/* Coluna 2: Contato - Email */}
          <div className="flex flex-col gap-2">
            <p className="font-raleway font-bold text-base uppercase tracking-[0.2em] text-black">Email</p>
            <a href="mailto:atendimento@cinesefilmes.com" className="font-inter text-lg">
              atendimento@cinesefilmes.com
            </a>
          </div>

          {/* Coluna 3: Contato - Whatsapp */}
          <div className="flex flex-col gap-2 ">
            <p className="font-raleway font-bold text-base uppercase tracking-[0.2em] text-black self-start">Whatsapp</p>
            <div className="font-inter text-base flex flex-col gap-1 self-start">
              <p className="whitespace-nowrap text-black">São Paulo | +55 (11) 9 8247-7229</p>
              <p className="whitespace-nowrap text-black">Florianópolis | +55 (48) 9 9115-1793</p>
            </div>
          </div>

          {/* Coluna 4: Social */}
          <div className="flex flex-col gap-2 ">
            <p className="font-raleway font-bold text-base uppercase tracking-[0.2em] text-black">Redes Sociais</p>
            <div className="flex gap-5 text-center justify-start">
              <Link href="https://www.instagram.com/cinese_content" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Image src="/instagram.png" alt="Instagram" width={44.5} height={48} className="w-10 h-auto md:w-[44.5px]" />
              </Link>
              <Link href="https://www.linkedin.com/company/cinesefilmes/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Image src="/linkedin.png" alt="Linkedin" width={44.5} height={48} className="w-10 h-auto md:w-[44.5px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Inferior de Copyright */}
      <div className="w-full bg-dark-obsidian border-t border-white/5 py-8 mt-4">
        <div className="px-6 text-center">
          <p className="text-[10px] sm:text-xs font-inter text-gray-muted tracking-widest uppercase">&copy; {new Date().getFullYear()} Cinese Filmes. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
