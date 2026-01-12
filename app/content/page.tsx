"use client";

import { WhatsappButton } from "../components/whatsapp-button";
import { SectionNav } from "../components/SectionNav";
import Image from "next/image";

export default function Content() {
  return (
    <>
      <main className="w-full mb-10">
        <section className="relative w-full aspect-video overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline preload="auto">
            {/* O caminho deve começar sempre com / e NÃO incluir a palavra 'public' e possuir apenas um nome */}
            <source src="/teste.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 drop-shadow-lg max-w-200">Se você não contar a sua historia Alguém fará isso por você!</h2>
          </div>
        </section>
        <section className="flex flex-col lg:flex-row justify-evenly pt-8 px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-40 items-center max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 max-w-full lg:max-w-156.25">
              <p className="text-2xl md:text-3xl lg:text-[39px] font-extrabold font-[raleway]">HUB de comunicação corporativa</p>
              <p className="text-base md:text-lg font-normal text-justify font-[raleway]">
                Somos a parceira estratégica na construção de conexões autênticas entre marcas, colaboradores e público-alvo. E como fazemos isso? Com histórias visuais extremamente impactantes.{" "}
              </p>
              <p className="text-base md:text-lg font-normal text-justify font-[raleway]">
                ​Analisamos seu momento institucional, alinhamos objetivos corporativos e criamos estratégias precisas para que cada campanha atinja seu maior potencial dentro das métricas
                estabelecidas.Sim somos mais que contadores de histórias, somos o racional e a sua estratégia para que seu conteúdo traga resultado de fato.
              </p>
              <p className="text-base md:text-lg font-normal text-justify font-[raleway]">Nosso coração pulsa em contar histórias que geram resultados reais.</p>
              <i className="text-center text-sm md:text-base"> &quot;Afinal, todo mundo tem uma boa história, mas poucos sabem contar! &quot;</i>
            </div>
            <video className="w-full lg:w-75 h-auto lg:h-119.5 aspect-9/16 object-cover max-w-md" autoPlay loop muted playsInline preload="auto">
              {/* O caminho deve começar sempre com / e NÃO incluir a palavra 'public' e possuir apenas um nome */}
              <source src="/teste.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
        <section className="flex justify-center">
          <div>
            <Image src="/INBOUND-MARKETING.png" alt="Inbound Marketing" width={1920} height={1080} className="hidden md:block" />
            <Image src="/INBOUND-MARKETING-MOBILE.png" alt="Inbound Marketing" width={1920} height={1080} className="block md:hidden" />
            <div>{/*área */}</div>
          </div>
        </section>
        <section className="flex justify-center">
          <div>
            <Image src="/ENDOMARKETING.png" alt="Inbound Marketing" width={1920} height={1080} className="hidden md:block" />
            <Image src="/ENDOMARKETING-MOBILE.png" alt="Inbound Marketing" width={1920} height={1080} className="block md:hidden" />
            <div>{/*área */}</div>
          </div>
        </section>
        <section className="flex justify-center">
          <div>
            <Image src="/EMPLOYER-BRANDING.png" alt="Inbound Marketing" width={1920} height={1080} className="hidden md:block" />
            <Image src="/EMPLOYER-BRANDING-MOBILE.png" alt="Inbound Marketing" width={1920} height={1080} className="block md:hidden" />
            <div>{/*área */}</div>
          </div>
        </section>
        <section></section>
        <WhatsappButton />
      </main>
    </>
  );
}
