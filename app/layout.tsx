import type { Metadata } from "next";
import { Inter, Raleway, Roboto } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";

// Configuração da Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Define a variável CSS
});

// Configuração da Roboto
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"], // Roboto requer weights específicos
});

// Configuração da Raleway
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway", // Define a variável CSS
});

export const metadata: Metadata = {
  title: "Cinese Filmes",
  description: "Seu projeto de filmes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} ${raleway.variable} ${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
