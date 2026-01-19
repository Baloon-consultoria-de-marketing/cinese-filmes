"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { WhatsappButton } from "./components/whatsapp-button";
import { SectionNav } from "./components/SectionNav";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const isScrolling = useRef(false);
  const touchStartRef = useRef(0);
  const activeSectionRef = useRef(0);

  const sections = useMemo(() => ["section-1", "section-2", "section-3", "section-footer"], []);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= sections.length) return;

      const element = document.getElementById(sections[index]);
      if (element) {
        isScrolling.current = true;
        activeSectionRef.current = index;
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
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      e.preventDefault();

      if (e.deltaY > 0) {
        scrollToIndex(activeSectionRef.current + 1);
      } else if (activeSectionRef.current > 0) {
        scrollToIndex(activeSectionRef.current - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;

      const touchEnd = e.changedTouches[0].clientY;
      const difference = touchStartRef.current - touchEnd;
      const threshold = 50;

      if (Math.abs(difference) > threshold) {
        if (difference > 0) {
          // Swipe up (desce)
          scrollToIndex(activeSectionRef.current + 1);
        } else if (activeSectionRef.current > 0) {
          // Swipe down (sobe)
          scrollToIndex(activeSectionRef.current - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollToIndex]);

  return (
    <>
      <style jsx>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
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
