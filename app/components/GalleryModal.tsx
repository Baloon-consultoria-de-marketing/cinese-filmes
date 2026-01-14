"use client";

import React from "react";
import Image from "next/image";

interface GalleryModalData {
  title: string;
  subtitle: string;
  images: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GalleryModalData;
}

export const GalleryModal = ({ isOpen, onClose, data }: GalleryModalProps) => {
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };

  React.useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 md:bg-black/50 backdrop-blur-sm ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}>
      <div
        className={`relative w-full h-full md:w-[90%] lg:w-[80%] md:h-auto md:rounded-2xl shadow-2xl overflow-hidden bg-white md:max-h-[85vh] flex flex-col ${isClosing ? "animate-scaleOut" : "animate-scaleIn"}`}
      >
        {/* Header com botão de fechar */}
        <div className="flex items-start justify-end pt-4 px-4 shrink-0">
          <button
            onClick={handleClose}
            className="text-gray-900 hover:text-gray-600 text-2xl font-bold w-10 h-10 flex items-center justify-center cursor-pointer rounded-full transition-all duration-300"
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="px-8 lg:px-12 pt-4 pb-8 shrink-0">
          <div className="text-left mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{data.title}</h2>
            <p className="text-gray-700 text-lg">{data.subtitle}</p>
          </div>
        </div>

        {/* Container com scroll e gradiente */}
        <div className="relative flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-8 lg:px-12 pb-8 scrollbar-hide">
            {/* Grid de imagens estilo masonry */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.images.map((image, index) => (
                <div key={index} className={`relative overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ${index % 5 === 0 ? "row-span-2" : ""}`}>
                  <Image src={image.src} alt={image.alt} width={image.width || 300} height={image.height || 300} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          {/* Gradiente no final */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
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
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes scaleOut {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: 0;
              transform: scale(0.95);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
          .animate-fadeOut {
            animation: fadeOut 0.5s ease-in-out;
          }
          .animate-scaleIn {
            animation: scaleIn 0.5s ease-in-out;
          }
          .animate-scaleOut {
            animation: scaleOut 0.5s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};
