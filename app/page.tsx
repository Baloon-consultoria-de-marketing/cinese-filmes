"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { WhatsappButton } from "./components/whatsapp-button";
import { SectionNav } from "./components/SectionNav";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const isScrolling = useRef(false);

  // Ref para guardar a posição inicial do toque
  const touchStartY = useRef(0);

  const sections = useMemo(() => ["section-1", "section-2", "section-3", "section-footer"], []);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= sections.length) return;

      const element = document.getElementById(sections[index]);
      if (element) {
        isScrolling.current = true;
        setActiveSection(index);

        element.scrollIntoView({ behavior: "smooth", block: "start" });

        setTimeout(() => {
          isScrolling.current = false;
        }, 700);
      }
    },
    [sections],
  );

  useEffect(() => {
    // --- Lógica Desktop (Mouse Wheel) ---
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      if (e.deltaY > 0) {
        scrollToIndex(activeSection + 1);
      } else {
        scrollToIndex(activeSection - 1);
      }
    };

    // --- Lógica Mobile (Touch Swipe) ---
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    // NOVO: Impede o comportamento nativo (scroll elástico e pull-to-refresh)
    const handleTouchMove = (e: TouchEvent) => {
      // e.preventDefault() aqui é CRUCIAL para impedir o reload da página
      // ao tentar subir além do topo.
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      // Limite de sensibilidade (50px)
      const threshold = 50;

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          // Arrastou para cima -> Próxima seção
          scrollToIndex(activeSection + 1);
        } else {
          // Arrastou para baixo -> Seção anterior
          scrollToIndex(activeSection - 1);
        }
      }
    };

    // Adiciona os listeners com { passive: false } para permitir o preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false }); // Novo Listener
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection, scrollToIndex]);

  return (
    <>
      <style jsx>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          /* CSS Moderno para impedir pull-to-refresh */
          overscroll-behavior-y: none;
          overscroll-behavior: none;
          /* Impede gestos de zoom/pan nativos */
          touch-action: none; 
        }
        #root {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        main {
          height: 100vh;
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        section {
          height: 100vh;
          width: 100%;
        }
        section#section-footer {
          height: auto;
          min-height: auto;
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

        {/* Seção Footer */}
        <section id="section-footer" className="relative w-full h-auto overflow-visible">
          <Footer />
        </section>
      </main>

      <SectionNav sections={sections} activeSection={activeSection} onNavigate={scrollToIndex} />

      <WhatsappButton />
    </>
  );
}
