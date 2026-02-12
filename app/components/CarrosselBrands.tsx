"use client";

import Image from "next/image";
import React from "react";
import { mockImages } from "../content/mockImages";

const CarrosselBrands = () => {
  return (
    <>
      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 40s linear infinite;
        }
      `}</style>
      <div className="flex animate-scroll-infinite" style={{ width: "max-content" }}>
        <div className="flex gap-8 sm:gap-12 md:gap-16 shrink-0">
          {mockImages.map((image, index) => (
            <div key={`first-${index}`} className="shrink-0 flex items-center justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                width={100}
                height={100}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover grayscale hover:grayscale-0 transition-all duration-300"
                quality={90}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-8 sm:gap-12 md:gap-16 shrink-0">
          {mockImages.map((image, index) => (
            <div key={`second-${index}`} className="shrink-0 flex items-center justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                width={100}
                height={100}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover grayscale hover:grayscale-0 transition-all duration-300"
                quality={90}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarrosselBrands;
