import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="fixed top-0 ml-8 mt-8 w-[230px] p-4 z-50 transition-colors duration-300 hover:bg-white group rounded-full">
      <nav className="flex items-center gap-4">
        <Link href="/">
          <Image src="/favicon.ico" alt="Logo" width={30} height={30} className="brightness-0 invert transition-all duration-300 group-hover:brightness-100 group-hover:invert-0" />
        </Link>
        <ul className="flex items-center gap-4">
          <li className="relative font-medium font-[raleway] text-lg group/item">
            <Link href="/" className="text-white transition-colors duration-300 group-hover:text-black">
              Filmes
            </Link>
            <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/item:w-full group-hover/item:right-auto group-hover/item:left-0 group-hover:bg-black"></span>
          </li>
          <li className="relative font-medium font-[raleway] text-lg group/item">
            <Link href="/content" className="text-white transition-colors duration-300 group-hover:text-black">
              content
            </Link>
            <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/item:w-full group-hover/item:right-auto group-hover/item:left-0 group-hover:bg-black"></span>
          </li>
        </ul>
      </nav>
    </header>
  );
};
