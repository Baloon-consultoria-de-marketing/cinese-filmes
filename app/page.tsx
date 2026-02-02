"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";

import { WhatsappButton } from "./components/whatsapp-button";
import { SectionNav } from "./components/SectionNav";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { TiSocialYoutube } from "react-icons/ti";
import { mockMovies } from "./MockMovies";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [videoPlayer, setVideoPlayer] = useState<{ videoId: string; url: string } | null>(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  const sections = useMemo(() => [...mockMovies.map((m) => `section-${m.id}`), "section-footer"], []);

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
        
        /* CSS ATUALIZADO PARA CORRIGIR BORDAS */
        iframe {
          position: absolute;
          top: 50%;
          left: 50%;
          /* Garante cobertura total baseada na proporção 16:9 */
          width: 100vw;
          height: 56.25vw; /* 100 * 9 / 16 */
          min-height: 100vh;
          min-width: 177.77vh; /* 100 * 16 / 9 */
          
          /* Aumentado de 1.3 para 1.5 ou 1.6 para cobrir altura vertical */
          transform: translate(-50%, -50%) scale(1.6);
          
          border: none;
          pointer-events: none;
          object-fit: cover;
        }

        @media (max-aspect-ratio: 16/9) {
          iframe {
            /* Ajuste fino para telas mais altas que largas (mobile) */
            width: 177.77vh;
            height: 100vh;
            // transform: translate(-50%, -50%) scale(1.6);
          }
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
          .video-overlay {
            width: 100vh;
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

        /* Importante: Reseta o scale dentro do modal para ver o vídeo inteiro */
        .video-player-container iframe {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          transform: none !important;
          min-width: 0 !important;
          min-height: 0 !important;
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

      main section:first-of-type .movie-title {
          font-weight: 500;
          font-size: 80px;
          font-family: 'Raleway', sans-serif;
        }
        
        @media (max-width: 1024px) {
          main section:first-of-type .movie-title {
            font-size: 60px;
          }
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

        .movie-overlay {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        section:hover .movie-overlay {
          opacity: 1;
        }
      `}</style>

      <Header />
      <main className="w-full h-screen">
        {/* Seções dos filmes */}
        {mockMovies.map((movie) => (
          <section key={movie.id} id={`section-${movie.id}`} className="relative w-full h-screen overflow-hidden">
            <div className="video-container">
              {/* URL ATUALIZADA: Parâmetros para limpar a interface e melhorar o loop */}
              <iframe
                src={`https://www.youtube.com/embed/${movie.videoUrl}?autoplay=1&loop=1&playlist=${movie.videoUrl}&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <div className="video-overlay" onClick={() => handleVideoClick(movie.videoUrl, `https://www.youtube.com/watch?v=${movie.videoUrl}`)}></div>
            </div>
            <div className="movie-overlay absolute inset-0 flex flex-col items-center justify-center bg-black/20">
              <div className="relative flex flex-col items-center justify-center">
                {movie.hasIcon && <TiSocialYoutube size={150} color="rgba(255,255,255,0.6)" className="absolute z-0" />}
                <h2 className="text-white text-2xl md:text-4xl font-bold text-center px-4 drop-shadow-lg font-[raleway] tracking-widest relative z-10 movie-title">{movie.title}</h2>
                <p className="text-white text-xl md:text-3xl font-light text-center px-4 drop-shadow-lg font-[raleway] tracking-wide relative z-10 ">{movie.brand}</p>
              </div>
            </div>
          </section>
        ))}

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
