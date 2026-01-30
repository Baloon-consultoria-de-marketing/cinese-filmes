import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  isVisible?: boolean;
}

export const Header = ({ isVisible = false }: HeaderProps) => {
  return (
    <header className={`fixed top-0 z-50 transition-all duration-300 ml-2 mt-2 p-4 rounded-full ${isVisible ? "bg-transparent" : "hover:bg-white group"}`}>
      <nav className="flex items-center gap-8 px-8">
        <Link href="/">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={30}
            height={30}
            className={`transition-all duration-300 ${isVisible ? "" : "brightness-0 invert group-hover:brightness-100 group-hover:invert-0"}`}
          />
        </Link>
        <ul className="flex items-center gap-8">
          <li className="relative font-medium font-[raleway] text-lg group/item">
            <Link href="/" className={`transition-colors duration-300 ${isVisible ? "text-black" : "text-white group-hover:text-black"}`}>
              Filmes
            </Link>
            <span
              className={`absolute bottom-0 right-0 w-0 h-px transition-all duration-300 group-hover/item:w-full group-hover/item:right-auto group-hover/item:left-0 ${
                isVisible ? "bg-black" : "bg-white group-hover:bg-black"
              }`}
            ></span>
          </li>
          <li className="relative font-medium font-[raleway] text-lg group/item">
            <Link href="/content" className={`transition-colors duration-300 ${isVisible ? "text-black" : "text-white group-hover:text-black"}`}>
              Content
            </Link>
            <span
              className={`absolute bottom-0 right-0 w-0 h-px transition-all duration-300 group-hover/item:w-full group-hover/item:right-auto group-hover/item:left-0 ${
                isVisible ? "bg-black" : "bg-white group-hover:bg-black"
              }`}
            ></span>
          </li>
        </ul>
      </nav>
    </header>
  );
};
