"use client";

import { WhatsappButton } from "./components/whatsapp-button";
import { SectionNav } from "./components/SectionNav";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <style jsx>{`
        main {
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          scroll-padding: 0;
          -webkit-overflow-scrolling: touch;
        }
        main::-webkit-scrollbar {
          width: 0;
        }
        section {
          scroll-snap-align: start;
          scroll-snap-stop: normal;
        }
        video {
          will-change: transform;
          transform: translateZ(0);
        }
        @media (prefers-reduced-motion: no-preference) {
          * {
            scroll-behavior: smooth !important;
          }
        }
      `}</style>
      <Header />
      <main className="w-full h-screen overflow-y-scroll">
        {/* Seção 1 */}
        <section id="section-1" className="relative w-full md:aspect-video aspect-9/16 md:h-auto h-screen overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
            {/* O caminho deve começar sempre com / e NÃO incluir a palavra 'public' */}
            <source src="/teste.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <h2 className="text-white text-4xl md:text-6xl font-bold text-center px-4 drop-shadow-lg">CINESE</h2>
          </div>
        </section>

        {/* Seção 2 */}
        <section id="section-2" className="relative w-full md:aspect-video aspect-9/16 md:h-auto h-screen overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
            <source src="/teste.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 px-4">
            <div className="flex flex-col gap-2">
              <p className="text-white font-[raleway] text-lg md:text-2xl mb-2 md:mb-4">#vivo</p>
              <h2 className="text-white text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center drop-shadow-lg">HISTORINHAS COLORIDAS</h2>
              <p className="text-white font-[raleway] font-normal text-lg md:text-2xl mt-2 md:mt-4">Por uma infância sem preconceito</p>
            </div>
          </div>
        </section>

        {/* Seção 3 */}
        <section id="section-3" className="relative w-full md:aspect-video aspect-9/16 md:h-auto h-screen overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
            <source src="/teste.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 px-4">
            <div className="flex flex-col gap-2">
              <p className="text-white font-[raleway] text-lg md:text-2xl mb-2 md:mb-4">#vivo</p>
              <h2 className="text-white text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center drop-shadow-lg">HISTORINHAS COLORIDAS</h2>
              <p className="text-white font-[raleway] font-normal text-lg md:text-2xl mt-2 md:mt-4">Por uma infância sem preconceito</p>
            </div>
          </div>
        </section>
      </main>
      <SectionNav sections={["section-1", "section-2", "section-3"]} />
      <WhatsappButton />
      <Footer />
    </>
  );
}
