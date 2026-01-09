import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="p-4">
      <nav className="flex items-center gap-4">
        <Link href="/">
          <Image src="/favicon.ico" alt="Logo" width={30} height={30} />
        </Link>
        <ul className="flex items-center gap-4">
          <li className="relative group">
            <Link href="/">Filmes</Link>
            <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full group-hover:right-auto group-hover:left-0"></span>
          </li>
          <li className="relative group">
            <Link href="/content">content</Link>
            <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full group-hover:right-auto group-hover:left-0"></span>
          </li>
        </ul>
      </nav>
    </header>
  );
};
