"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { WhatsappButton } from "./components/whatsapp-button";
import { SectionNav } from "./components/SectionNav";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [videoPlayer, setVideoPlayer] = useState<{ videoId: string; url: string } | null>(null);
  const isScrolling = useRef(false);
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
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      if (e.deltaY > 0) {
        scrollToIndex(activeSection + 1);
      } else {
        scrollToIndex(activeSection - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const threshold = 50;

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          scrollToIndex(activeSection + 1);
        } else {
          scrollToIndex(activeSection - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection, scrollToIndex]);

  const handleVideoClick = (videoId: string, url: string) => {
    setVideoPlayer({ videoId, url });
  };

  const closeVideoPlayer = () => {
    setVideoPlayer(null);
  };

  return (
    <>
      <style jsx>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          overscroll-behavior-y: none;
          overscroll-behavior: none;
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
          overflow: hidden;
          position: relative;
        }
        section#section-footer {
          height: auto;
          min-height: auto;
          overflow: visible;
        }
        .video-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        iframe {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100vw;
          height: 56.25vw;
          transform: translate(-50%, -50%);
          border: none;
          pointer-events: none;
        }
        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          z-index: 10;
        }
        @media (max-aspect-ratio: 16/9) {
          iframe {
            width: 177.77vh;
            height: 100vh;
          }
        }

        /* Video Player Modal */
        .video-player-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeInOverlay 0.3s ease-in-out;
        }

        @keyframes fadeInOverlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .video-player-container {
          position: relative;
          width: 80%;
          height: 80%;
          max-width: 1200px;
          animation: slideInPlayer 0.3s ease-in-out;
        }

        @keyframes slideInPlayer {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .video-player-container iframe {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          transform: none !important;
          pointer-events: auto !important;
        }

        .close-button {
          position: absolute;
          top: -40px;
          right: 0;
          background: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #333;
          transition: all 0.2s ease;
          z-index: 51;
          padding: 0;
          line-height: 1;
          font-weight: 300;
        }

        .close-button:hover {
          background: #f0f0f0;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .video-player-container {
            width: 95%;
            height: 95%;
          }

          .close-button {
            top: -35px;
            width: 32px;
            height: 32px;
            font-size: 32px;
            font-weight: 600;
          }
        }
      `}</style>

      <Header />
      <main className="w-full h-screen">
        {/* Seção 1 */}
        <section id="section-1" className="relative w-full h-screen overflow-hidden">
          <div className="video-container">
            <iframe src="https://www.youtube.com/embed/RUpfQRCt3Go?autoplay=1&loop=1&playlist=RUpfQRCt3Go&mute=1" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <div className="video-overlay" onClick={() => handleVideoClick("RUpfQRCt3Go", "https://www.youtube.com/watch?v=RUpfQRCt3Go")}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <h2 className="text-white text-4xl md:text-6xl font-normal text-center px-4 drop-shadow-lg font-[raleway] tracking-widest">CINESE</h2>
          </div>
        </section>

        {/* Seção 2 */}
        <section id="section-2" className="relative w-full h-screen overflow-hidden">
          <div className="video-container">
            <iframe src="https://www.youtube.com/embed/fb9ao-ww15Q?autoplay=1&loop=1&playlist=fb9ao-ww15Q&mute=1" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <div className="video-overlay" onClick={() => handleVideoClick("fb9ao-ww15Q", "https://www.youtube.com/watch?v=fb9ao-ww15Q")}></div>
          </div>
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
          <div className="video-container">
            <iframe src="https://www.youtube.com/embed/fb9ao-ww15Q?autoplay=1&loop=1&playlist=fb9ao-ww15Q&mute=1" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <div className="video-overlay" onClick={() => handleVideoClick("fb9ao-ww15Q", "https://www.youtube.com/watch?v=fb9ao-ww15Q")}></div>
          </div>
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

      {/* Video Player Modal */}
      {videoPlayer && (
        <div className="video-player-overlay" onClick={closeVideoPlayer}>
          <div className="video-player-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeVideoPlayer}>
              X
            </button>
            <iframe src={`https://www.youtube.com/embed/${videoPlayer.videoId}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </div>
        </div>
      )}

      <SectionNav sections={sections} activeSection={activeSection} onNavigate={scrollToIndex} />

      <WhatsappButton />
    </>
  );
}
