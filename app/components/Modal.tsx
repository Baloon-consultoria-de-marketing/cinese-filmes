"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ModalData } from "../content/modalMock";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData;
  color: "blue" | "gray" | "yellow";
  showSolutions?: boolean;
  showTabs?: boolean;
}

export const Modal = ({ isOpen, onClose, data, color, showSolutions = false, showTabs = false }: ModalProps) => {
  const [carouselFilter, setCarouselFilter] = useState<string>(data.tabs?.[0]?.id || "");
  const [prevDataId, setPrevDataId] = useState<string | undefined>(undefined);
  const [isClosing, setIsClosing] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState<{ videoId: string; url: string } | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleCarouselVideoClick = (videoId: string) => {
    setVideoPlayer({ videoId, url: "" });
  };

  const closeVideoPlayer = () => {
    setVideoPlayer(null);
  };

  // Reset para a primeira aba quando trocar de modal
  if (data.tabs?.[0]?.id !== prevDataId) {
    setPrevDataId(data.tabs?.[0]?.id);
    setCarouselFilter(data.tabs?.[0]?.id || "");
  }

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };

  // --- MUDANÇA AQUI: Bloqueio de scroll inteligente ---
  useEffect(() => {
    if (!isOpen) return;

    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleBodyScroll = () => {
      if (mediaQuery.matches) {
        // É mobile: Bloqueia o scroll do body, mas permite scroll interno do modal
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
      } else {
        // É desktop: Limpa o estilo inline
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
      }
    };

    handleBodyScroll();
    mediaQuery.addEventListener("change", handleBodyScroll);

    return () => {
      mediaQuery.removeEventListener("change", handleBodyScroll);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);
  // ----------------------------------------------------

  if (!isOpen && !isClosing) return null;

  const colorMap = {
    blue: "bg-[var(--color-blue-light)]",
    gray: "bg-[var(--color-gray-light)]",
    yellow: "bg-[var(--color-yellow-soft)]",
  };

  const filteredCarousel = data.carouselItems.filter((item) => {
    return item.type === carouselFilter;
  });

  const showCarouselButtons = isDesktop && filteredCarousel.length > 4;

  // Array de imagens para a galeria (substitua pelos caminhos reais das suas imagens)
  const galleryImages = ["/amem.png", "/fair-price.png", "/cinese.png", "/amem.png", "/fair-price.png", "/cinese.png", "/amem.png", "/fair-price.png"];

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = 300; // ajuste conforme necessário
    carouselRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`} onClick={handleClose} />

      {/* Modal - Centralizado */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center  ${isClosing ? "animate-slideDown" : "animate-slideUp"}`}>
        <div className={`relative w-full h-full md:h-auto md:max-w-7xl md:max-h-[95vh] overflow-y-auto overflow-x-hidden md:rounded-2xl shadow-2xl scrollbar-hide ${colorMap[color]}`}>
          {/* Header com botão de fechar */}
          <div className="sticky top-0 flex items-start justify-end pt-4 px-4 bg-inherit z-10">
            <button
              onClick={handleClose}
              className="text-gray-900 hover:text-white text-2xl font-bold w-10 h-10 flex items-center justify-center cursor-pointer rounded-full transition-all duration-300"
              aria-label="Fechar modal"
            >
              ×
            </button>
          </div>

          {/* Conteúdo principal */}
          <div className="p-4 md:px-16 px-4 ">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-8">
              {/* Lado esquerdo - Texto */}
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">{data.category}</p>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{data.title}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm">{data.description}</p>

                {showSolutions && (
                  <div className="mb-6 mt-3 ml-6">
                    <p className="font-semibold mb-3 -ml-3 text-gray-900 ">&bull; &nbsp;Soluções Indicadas:</p>
                    <ul className="">
                      {data.solutions?.map((solution, index) => (
                        <li key={index} className="flex items-start gap-2 text-base md:md:max-w-130">
                          <span className="text-gray-600 ">•</span>
                          <span className="text-gray-700">
                            <strong>{data.solutionStrong?.[index]}</strong> {solution}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mb-6 ml-6">
                  <p className="font-semibold mb-3 -ml-3 text-gray-900">&bull; &nbsp;Benefícios:</p>
                  <ul className="space-y-1">
                    {data.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-base">
                        <span className="text-gray-600 ">•</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lado direito - Vídeo */}
              <div className="flex-1 flex items-start justify-center lg:sticky lg:top-8">
                <div className="relative w-full cursor-pointer" style={{ aspectRatio: "9/16", maxHeight: "500px", maxWidth: "280px" }} onClick={() => handleCarouselVideoClick(data.videoSrc)}>
                  <iframe
                    src={`https://www.youtube.com/embed/${data.videoSrc}?autoplay=1&loop=1&playlist=${data.videoSrc}&mute=1&controls=0&modestbranding=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full object-cover rounded-xl shadow-lg border-none youtube-iframe"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Carrossel de soluções */}
            <div className="-mt-20">
              <h3 className="text-xl font-bold mb-6 mt-24 md:mt-12 text-gray-900">Soluções Indicadas</h3>

              {/* Toggle Reels/Shorts */}
              {showTabs && (
                <div className="mb-6">
                  {/* Desktop: inline-flex como antes */}
                  <div className="hidden md:inline-flex gap-1 bg-white/30 rounded-lg p-1">
                    {data.tabs?.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCarouselFilter(tab.id)}
                        className={`px-4 py-0.5 rounded-lg cursor-pointer font-semibold transition-all duration-300 ease-in-out ${
                          carouselFilter === tab.id ? "bg-white text-gray-900 shadow-md scale-105" : "bg-transparent text-gray-700 hover:bg-white/30"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Mobile: carrossel com scroll horizontal */}
                  <div className="md:hidden overflow-x-auto scrollbar-hide">
                    <div className="inline-flex gap-1 bg-white/30 rounded-lg p-1">
                      {data.tabs?.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setCarouselFilter(tab.id)}
                          className={`px-4 py-0.5 rounded-lg cursor-pointer font-semibold transition-all duration-300 ease-in-out whitespace-nowrap ${
                            carouselFilter === tab.id ? "bg-white text-gray-900 shadow-md scale-105" : "bg-transparent text-gray-700 hover:bg-white/30"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Renderização condicional: Galeria (Campanhas) vs Carrossel (outros) */}
              {carouselFilter === "campanhas" ? (
                // Galeria de fotos com Grid 4 colunas e scroll interno
                <div className="max-h-96 overflow-y-auto pr-2 scrollbar-hide">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Image src={image} alt={`Galeria ${index + 1}`} fill className="object-cover hover:scale-110 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Carrossel original
                <div className="relative">
                  {/* Botões laterais (somente desktop e > 4 vídeos) */}
                  {showCarouselButtons && (
                    <>
                      <button
                        type="button"
                        aria-label="Anterior"
                        onClick={() => scrollCarousel("left")}
                        className="hidden md:flex items-center justify-center cursor-pointer hover:scale-110 duration-300 absolute left-0 top-20 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-white transition z-20"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="Próximo"
                        onClick={() => scrollCarousel("right")}
                        className="hidden md:flex items-center justify-center cursor-pointer hover:scale-110 duration-300 absolute right-0 top-20 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-white transition z-20"
                      >
                        ›
                      </button>
                    </>
                  )}

                  <div
                    ref={carouselRef}
                    className="relative z-0 flex gap-4 overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide snap-x snap-mandatory w-full md:max-h-72 select-none carousel-smooth"
                    key={carouselFilter}
                  >
                    {filteredCarousel.map((item, index) => (
                      <div
                        key={`${carouselFilter}-${index}`}
                        className="shrink-0 w-60 snap-start transition-all duration-500 ease-in-out"
                        style={{
                          animation: "fadeIn 0.5s ease-in-out",
                        }}
                      >
                        <div
                          className="relative mb-3 rounded-xl overflow-hidden bg-gray-200 aspect-video shadow-md cursor-pointer hover:scale-105 duration-300 transition-all object-cover"
                          onClick={() => handleCarouselVideoClick(typeof item.thumbnail === "string" ? item.thumbnail : "")}
                        >
                          <iframe
                            src={`https://www.youtube.com/embed/${typeof item.thumbnail === "string" ? item.thumbnail : ""}?autoplay=1&loop=1&playlist=${typeof item.thumbnail === "string" ? item.thumbnail : ""}&mute=1`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="w-full h-full border-none"
                          ></iframe>
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-semibold">{item.duration}</div>
                        </div>
                        <p className="text-md text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(30px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-fadeOut {
          animation: fadeOut 0.5s ease-in-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-in-out;
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-in-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .carousel-smooth {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
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
        /* Permite scroll no modal mobile */
        @media (max-width: 768px) {
          .overflow-y-auto {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
          .close-button {
            top: -35px;
            width: 32px;
            height: 32px;
            font-size: 18px;
          }
        }
        .youtube-iframe {
          pointer-events: none !important;
        }
        .youtube-iframe::after {
          display: none !important;
        }
        iframe[src*="youtube.com"] {
          pointer-events: none !important;
        }
        /* Remove controles do YouTube */
        .youtube-iframe::-webkit-media-controls {
          display: none !important;
        }
            `}</style>
      </div>
      {videoPlayer && (
        <div className="video-player-overlay" onClick={closeVideoPlayer}>
          <div className="video-player-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeVideoPlayer}>
              ×
            </button>
            <iframe src={`https://www.youtube.com/embed/${videoPlayer.videoId}?autoplay=1&loop=1&playlist=${videoPlayer.videoId}`} allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </>
  );
};
