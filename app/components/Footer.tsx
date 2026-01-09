import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4">
        <div>
          <p className="font-normal font-[raleway] text-lg md:text-xl">CINESE</p>
          <p className="max-w-[429px] text-xl md:text-2xl font-[raleway] mt-2">transformando histórias em conexões e resultados concretos.</p>
        </div>
        <div>
          <p className="font-normal font-[roboto] mb-2">Email</p>
          <p className="font-normal text-sm md:text-base font-[roboto] break-words">atendimento@cinesefilmes.com</p>
        </div>
        <div>
          <p className="font-normal font-[roboto] mb-2">Whatsapp</p>
          <p className="font-normal font-[roboto] text-sm md:text-base">São Paulo | (11) 9 8247-7229</p>
          <p className="font-normal font-[roboto] text-sm md:text-base">Florianópolis | (11) 9 9115-1793</p>
        </div>
        <div>
          <p className="font-normal font-[roboto] mb-2">CINESE</p>
          <div className="flex gap-4 mt-2">
            <Link href="https://www.instagram.com/cinesefilmes/" target="_blank" rel="noopener noreferrer">
              <Image src="/instagram.png" alt="Logo" width={44.5} height={48} className="w-10 h-auto md:w-[44.5px]" />
            </Link>
            <Link href="https://www.linkedin.com/company/cinese-filmes/" target="_blank" rel="noopener noreferrer">
              <Image src="/linkedin.png" alt="Logo" width={44.5} height={48} className="w-10 h-auto md:w-[44.5px]" />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full bg-(--color-dark-obsidian) p-4">
        <div className="flex items-center justify-center">
          <p className="text-xs md:text-sm text-gray-500 text-center">&copy; {new Date().getFullYear()} Cinese Filmes. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
