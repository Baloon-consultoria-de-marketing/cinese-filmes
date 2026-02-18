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

  // 1. ALTERADO: O estado agora guarda o formato (video ou reels)
  const [videoPlayer, setVideoPlayer] = useState<{ videoId: string; format: "reels" | "video" } | null>(null);

  const [imageViewer, setImageViewer] = useState<string | null>(null);
  const [isImageClosing, setIsImageClosing] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // 2. ALTERADO: Recebe o formato. Se não informado, assume "video" (padrão 16:9)
  const handleCarouselVideoClick = (videoId: string, format: "reels" | "video" = "video") => {
    setVideoPlayer({ videoId, format });
  };

  const closeVideoPlayer = () => {
    setVideoPlayer(null);
  };

  const handleImageClick = (imageSrc: string) => {
    setImageViewer(imageSrc);
    setIsImageClosing(false);
  };

  const closeImageViewer = () => {
    setIsImageClosing(true);
    setTimeout(() => {
      setImageViewer(null);
      setIsImageClosing(false);
    }, 300);
  };

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

  // Lógica de Scroll
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    scrollPositionRef.current = scrollY;
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleBodyScroll = () => {
      document.body.style.overflow = "hidden";

      if (mediaQuery.matches) {
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.top = `-${scrollY}px`;
      } else {
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
      }
    };

    handleBodyScroll();
    mediaQuery.addEventListener("change", handleBodyScroll);

    return () => {
      mediaQuery.removeEventListener("change", handleBodyScroll);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";

      if (mediaQuery.matches) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const colorMap = {
    blue: "bg-[var(--color-blue-light)]",
    gray: "bg-[var(--color-gray-light)]",
    yellow: "bg-[var(--color-yellow-soft)]",
  };

  const filteredCarousel = data.carouselItems.filter((item) => {
    return item.type === carouselFilter;
  });

  // Lógica para definir o alinhamento
  const allReels = filteredCarousel.length > 0 && filteredCarousel.every((item) => item.format === "reels");
  const carouselAlignment = allReels ? "items-start" : "items-center";

  const showCarouselButtons = isDesktop && filteredCarousel.length > 4;
  const galleryImages = ["/campaign/01.jpg", "/campaign/02.jpg", "/campaign/03.jpg", "/campaign/04.jpg", "/campaign/05.jpg"];

  const showGalleryButtons = isDesktop && galleryImages.length > 3;

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = 300;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`} onClick={handleClose} />

      <div className={`fixed inset-0 z-50 flex items-center justify-center ${isClosing ? "animate-slideDown" : "animate-slideUp"}`}>
        <div className={`relative w-full h-full md:h-auto md:max-w-7xl md:max-h-[95vh] overflow-y-auto overflow-x-hidden md:rounded-2xl shadow-2xl scrollbar-hide ${colorMap[color]}`}>
          <div className="sticky top-0 flex items-start justify-end pt-4 px-4 bg-inherit z-10">
            <button
              onClick={handleClose}
              className="text-gray-900 hover:text-white text-2xl font-bold w-10 h-10 flex items-center justify-center cursor-pointer rounded-full transition-all duration-300"
              aria-label="Fechar modal"
            >
              ×
            </button>
          </div>

          <div className="p-4 md:px-16 px-4 ">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-8">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">{data.category}</p>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{data.title}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm">{data.description}</p>

                {showSolutions && (
                  <div className="mb-6 mt-3 ml-3">
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
                <div className="mb-6 ml-3">
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

              {/* --- VÍDEO DESTAQUE (Vertical) --- */}
              <div className="flex-1 flex items-start justify-center lg:sticky lg:top-8">
                <div
                  className="relative w-full cursor-pointer overflow-hidden rounded-xl shadow-lg bg-black"
                  style={{ aspectRatio: "9/16", maxHeight: "500px", maxWidth: "280px" }}
                  /* ALTERADO: mudado de "video" para "reels" */
                  onClick={() => handleCarouselVideoClick(data.videoSrc, "reels")}
                >
                  {/* WRAPPER CENTRALIZADOR + ZOOM 180% */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <iframe
                      src={`https://www.youtube.com/embed/${data.videoSrc}?autoplay=1&loop=1&playlist=${data.videoSrc}&mute=1&controls=0&modestbranding=1&disablekb=1&fs=0`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-[180%] h-[180%] border-none"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            <div className="-mt-20">
              <h3 className="text-xl font-bold mb-6 mt-24 md:mt-12 text-gray-900">Videos Relacionados</h3>

              {showTabs && (
                <div className="mb-6">
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

              {carouselFilter === "campanhas" ? (
                <div className="relative">
                  {showGalleryButtons && (
                    <>
                      <button
                        type="button"
                        aria-label="Anterior"
                        onClick={() => scrollCarousel("left")}
                        /* Ajustei top-25 para top-1/2 para centralizar verticalmente de forma mais segura */
                        className="hidden md:flex items-center justify-center cursor-pointer hover:scale-110 duration-300 absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-white transition z-20"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="Próximo"
                        onClick={() => scrollCarousel("right")}
                        /* Ajustei top-25 para top-1/2 para centralizar verticalmente de forma mais segura */
                        className="hidden md:flex items-center justify-center cursor-pointer hover:scale-110 duration-300 absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg text-gray-800 hover:bg-white transition z-20"
                      >
                        ›
                      </button>
                    </>
                  )}
                  {/* ADICIONADO: ref={carouselRef} para conectar o scroll aos botões */}
                  <div className="overflow-x-auto scrollbar-hide" ref={carouselRef}>
                    <div className="flex gap-4 pb-4 w-max">
                      {galleryImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 shrink-0 cursor-pointer"
                          style={{ width: "350px", height: "200px" }}
                          onClick={() => handleImageClick(image)}
                        >
                          <Image src={image} alt={`Galeria ${index + 1}`} fill className="object-cover hover:scale-110 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
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
                    /* ALTERADO: Usa a variável carouselAlignment baseada no conteúdo */
                    className={`relative z-0 flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory w-full h-fit select-none carousel-smooth ${carouselAlignment}`}
                    key={carouselFilter}
                  >
                    {filteredCarousel.map((item, index) => (
                      <div
                        key={`${carouselFilter}-${index}`}
                        className={`shrink-0 snap-start transition-all duration-500 ease-in-out flex flex-col ${item.format === "reels" ? "w-36 h-auto" : "w-60 h-auto"}`}
                        style={{
                          animation: "fadeIn 0.5s ease-in-out",
                        }}
                      >
                        {/* Container da Imagem/Vídeo */}
                        <div
                          className={`relative mb-3 shrink-0 rounded-xl overflow-hidden bg-gray-200 shadow-md cursor-pointer hover:scale-105 duration-300 transition-all object-cover w-full ${
                            item.format === "reels" ? "aspect-9/16" : "aspect-video"
                          }`}
                          onClick={() => handleCarouselVideoClick(typeof item.thumbnail === "string" ? item.thumbnail : "", item.format)}
                        >
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <iframe
                              src={`https://www.youtube.com/embed/${typeof item.thumbnail === "string" ? item.thumbnail : ""}?autoplay=1&loop=1&playlist=${typeof item.thumbnail === "string" ? item.thumbnail : ""}&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1`}
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                              className="w-[200%] h-[200%] border-none"
                            ></iframe>
                          </div>

                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-semibold z-10">{item.duration}</div>
                        </div>

                        {/* Texto descritivo: Agora flui livremente abaixo do vídeo */}
                        <p className="text-xs  text-gray-700 ">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {videoPlayer && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" onClick={closeVideoPlayer}>
          <div
            className={`relative bg-black shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ${
              videoPlayer.format === "reels" ? "w-full max-w-100 aspect-9/16" : "w-full max-w-5xl aspect-video"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button-mobile" onClick={closeVideoPlayer}>
              X
            </button>
            <button className="close-button-desktop" onClick={closeVideoPlayer}>
              X
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${videoPlayer.videoId}?autoplay=1&loop=1&playlist=${videoPlayer.videoId}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full border-none"
            ></iframe>
          </div>
        </div>
      )}

      {imageViewer && (
        <div
          className={`fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${isImageClosing ? "opacity-0" : "opacity-100 animate-fadeIn"}`}
          onClick={closeImageViewer}
        >
          <div
            className={`relative transition-all duration-300 ${isImageClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
            style={{ width: "80vw", height: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-8 right-8 bg-white hover:bg-gray-200 border-none w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-2xl text-gray-900 transition-all duration-200 hover:scale-110 z-10 shadow-lg"
              onClick={closeImageViewer}
            >
              X
            </button>
            <Image src={imageViewer} alt="Visualização em tamanho grande" fill className="object-contain" />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(30px); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
        .animate-fadeOut { animation: fadeOut 0.5s ease-in-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-in-out; }
        .animate-slideDown { animation: slideDown 0.5s ease-in-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .carousel-smooth { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; overscroll-behavior-x: contain; }
        .youtube-iframe { pointer-events: none !important; }
        .youtube-iframe::after { display: none !important; }
        .close-button-mobile { position: absolute; top: 20px; right: 20px; background: white; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #333; transition: all 0.2s ease; z-index: 10000; padding: 0; line-height: 1; font-weight: 300; }
        .close-button-mobile:hover { background: #f0f0f0; transform: scale(1.1); }
        .close-button-desktop { display: none; position: absolute; top: 20px; right: 20px; background: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; align-items: center; justify-content: center; font-size: 24px; color: #333; transition: all 0.2s ease; z-index: 10000; padding: 0; line-height: 1; font-weight: 400; }
        .close-button-desktop:hover { background: #f0f0f0; transform: scale(1.1); }
        @media (max-width: 768px) { .close-button-mobile { display: flex; } .close-button-desktop { display: none; } }
        @media (min-width: 769px) { .close-button-mobile { display: none; } .close-button-desktop { display: flex; } }
        @keyframes imageFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .image-viewer-enter { animation: imageFadeIn 0.3s ease-in-out; }
      `}</style>
    </>
  );
};
