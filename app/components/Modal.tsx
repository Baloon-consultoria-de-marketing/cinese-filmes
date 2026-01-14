"use client";

import React, { useState, useEffect } from "react";
import { ModalData } from "../content/modalMock";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData;
  color: "blue" | "gray" | "yellow";
}

export const Modal = ({ isOpen, onClose, data, color }: ModalProps) => {
  const [carouselFilter, setCarouselFilter] = useState<string>(data.tabs[0]?.id || "");
  const [prevDataId, setPrevDataId] = useState<string | undefined>(undefined);

  // Reset para a primeira aba quando trocar de modal
  if (data.tabs[0]?.id !== prevDataId) {
    setPrevDataId(data.tabs[0]?.id);
    setCarouselFilter(data.tabs[0]?.id || "");
  }

  if (!isOpen) return null;

  const colorMap = {
    blue: "bg-[var(--color-blue-light)]",
    gray: "bg-[var(--color-gray-light)]",
    yellow: "bg-[var(--color-yellow-soft)]",
  };

  const filteredCarousel = data.carouselItems.filter((item) => {
    return item.type === carouselFilter;
  });

  return (
    <div className="relative z-30 w-full flex justify-center">
      <div className={`relative -mt-12 w-full max-w-[80%] rounded-2xl shadow-2xl overflow-hidden ${colorMap[color]}`}>
        {/* Header com botão de fechar */}
        <div className="flex items-start justify-end pt-4 px-4">
          <button
            onClick={onClose}
            className="text-gray-900 hover:text-white text-2xl font-bold w-10 h-10 flex items-center justify-center cursor-pointer rounded-full transition-all duration-300"
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lado esquerdo - Texto */}
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">{data.category}</p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{data.title}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm">{data.description}</p>

              <div className="mb-6">
                <p className="font-semibold mb-3 text-gray-900">Benefícios:</p>
                <ul className="space-y-2">
                  {data.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-gray-600 mt-1">•</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lado direito - Vídeo */}
            <div className="flex-1">
              <div className="relative mx-auto" style={{ aspectRatio: "9/16", maxHeight: "478px", maxWidth: "290px" }}>
                <video className="w-full h-full object-cover rounded-xl shadow-lg" autoPlay loop muted playsInline>
                  <source src={data.videoSrc} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Carrossel de soluções */}
          <div className="">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Soluções Indicadas</h3>

            {/* Toggle Reels/Shorts */}
            <div className="inline-flex gap-1 mb-6 bg-white/30 rounded-lg p-1">
              {data.tabs.map((tab) => (
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

            {/* Carrossel */}
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" key={carouselFilter}>
                {filteredCarousel.map((item, index) => (
                  <div
                    key={`${carouselFilter}-${index}`}
                    className="shrink-0 w-64 snap-start transition-all duration-500 ease-in-out"
                    style={{
                      animation: "fadeIn 0.5s ease-in-out",
                    }}
                  >
                    <div className="relative mb-3 rounded-xl overflow-hidden bg-gray-200 aspect-video shadow-md">
                      <video className="w-full h-full object-cover" src={data.videoSrc} muted playsInline />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-semibold">{item.duration}</div>
                    </div>
                    <p className="text-sm font-bold mb-1 text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
