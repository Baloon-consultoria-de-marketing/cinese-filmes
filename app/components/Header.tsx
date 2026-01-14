import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  fullWidth?: boolean;
}

export const Header = ({ fullWidth = false }: HeaderProps) => {
  return (
    <header className={`fixed top-0 z-50 transition-colors duration-300 ${fullWidth ? "left-0 w-full p-0 m-0 rounded-none bg-white" : "ml-2 mt-2 p-4 w-57.5 rounded-full hover:bg-white group"}`}>
      <nav className={`flex items-center gap-4 ${fullWidth ? "pl-8 py-4" : ""}`}>
        <Link href="/">
          <Image src="/favicon.ico" alt="Logo" width={30} height={30} className={fullWidth ? "" : "brightness-0 invert transition-all duration-300 group-hover:brightness-100 group-hover:invert-0"} />
        </Link>
        <ul className="flex items-center gap-4">
          <li className="relative font-medium font-[raleway] text-lg group/item">
            <Link href="/" className={fullWidth ? "text-black" : "text-white transition-colors duration-300 group-hover:text-black"}>
              Filmes
            </Link>
            {!fullWidth && (
              <span className="absolute bottom-0 right-0 w-0 h-px bg-white transition-all duration-300 group-hover/item:w-full group-hover/item:right-auto group-hover/item:left-0 group-hover:bg-black"></span>
            )}
          </li>
          <li className="relative font-medium font-[raleway] text-lg group/item">
            <Link href="/content" className={fullWidth ? "text-black" : "text-white transition-colors duration-300 group-hover:text-black"}>
              content
            </Link>
            {!fullWidth && (
              <span className="absolute bottom-0 right-0 w-0 h-px bg-white transition-all duration-300 group-hover/item:w-full group-hover/item:right-auto group-hover/item:left-0 group-hover:bg-black"></span>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
