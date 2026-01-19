"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { WhatsappButton } from "./components/whatsapp-button";
import { SectionNav } from "./components/SectionNav";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const isScrolling = useRef(false); // Trava para impedir múltiplos scrolls rápidos

  // Definição das seções para controle lógico
  const sections = useMemo(() => ["section-1", "section-2", "section-3"], []);

  // Função centralizada de navegação
  const scrollToIndex = useCallback(
    (index: number) => {
      // Verificações de segurança (limites do array)
      if (index < 0 || index >= sections.length) return;

      const element = document.getElementById(sections[index]);
      if (element) {
        isScrolling.current = true;
        setActiveSection(index);

        // O "smooth" aqui dita a suavidade da animação
        element.scrollIntoView({ behavior: "smooth", block: "start" });

        // Tempo de espera para liberar o próximo scroll (ajustado para a duração da animação)
        setTimeout(() => {
          isScrolling.current = false;
        }, 700);
      }
    },
    [sections],
  );

  // Listener para a roda do mouse
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      // Se deltaY > 0, está descendo. Se < 0, está subindo.
      if (e.deltaY > 0) {
        scrollToIndex(activeSection + 1);
      } else {
        scrollToIndex(activeSection - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [activeSection, scrollToIndex]); // Recria o listener quando a seção ativa muda

  return (
    <>
      <style jsx>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden; /* IMPORTANTE: Desativa o scroll nativo */
        }
        #root {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        main {
          height: 100vh;
          width: 100%;
          overflow: hidden; /* JS controla a posição, não o usuário */
          position: relative;
        }
        section {
          height: 100vh;
          width: 100%;
          /* Removemos scroll-snap pois agora é controlado via JS */
        }
        video {
          will-change: transform;
          transform: translateZ(0);
        }
      `}</style>

      <Header />

      <main className="w-full h-screen">
        {/* Seção 1 */}
        <section id="section-1" className="relative w-full h-screen overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
            <source src="/videoHorizontal.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <h2 className="text-white text-4xl md:text-6xl font-normal text-center px-4 drop-shadow-lg font-[raleway] tracking-widest">CINESE</h2>
          </div>
        </section>

        {/* Seção 2 */}
        <section id="section-2" className="relative w-full h-screen overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
            <source src="/videoVertical.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 px-4">
            <div className="flex flex-col gap-2">
              <p className="text-white font-[raleway] text-lg md:text-2xl mb-2 md:mb-4">#vivo</p>
              <h2 className="text-white text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-center drop-shadow-lg">HISTORINHAS COLORIDAS</h2>
              <p className="text-white font-[raleway] font-normal text-lg md:text-2xl mt-2 md:mt-4 text-center">Por uma infância sem preconceito</p>
            </div>
          </div>
        </section>

        {/* Seção 3 */}
        <section id="section-3" className="relative w-full h-screen overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
            <source src="/videoVertical.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 px-4">
            <div className="flex flex-col gap-2">
              <p className="text-white font-[raleway] text-lg md:text-2xl mb-2 md:mb-4">#vivo</p>
              <h2 className="text-white text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-center drop-shadow-lg">HISTORINHAS COLORIDAS</h2>
              <p className="text-white font-[raleway] font-normal text-lg md:text-2xl mt-2 md:mt-4 text-center">Por uma infância sem preconceito</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>

      {/* Passamos as props de controle para o nav */}
      <SectionNav sections={sections} activeSection={activeSection} onNavigate={scrollToIndex} />

      <WhatsappButton />
    </>
  );
}
