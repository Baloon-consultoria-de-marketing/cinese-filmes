"use client";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { WhatsappButton } from "../components/whatsapp-button";
import Image from "next/image";
import { mockImages } from "./mockImages";
import React from "react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { modalDataMap, ModalData } from "./modalMock";

export default function Content() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState("");
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const [modalData, setModalData] = React.useState<ModalData | null>(null);
  const [modalColor, setModalColor] = React.useState<"blue" | "gray" | "yellow">("blue");

  const openModal = (key: string, color: "blue" | "gray" | "yellow", section: string) => {
    setModalData(modalDataMap[key]);
    setModalColor(color);
    setActiveSection(section);
  };

  const closeModal = () => {
    setActiveSection(null);
    setModalData(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitMessage("Mensagem enviada com sucesso!");
        e.currentTarget.reset();
      } else {
        setSubmitMessage("Erro ao enviar. Tente novamente.");
      }
    } catch {
      setSubmitMessage("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header fullWidth={true} />
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
          <div className="w-full">
            <Image src="/INBOUND-MARKETING.png" alt="Inbound Marketing" width={1920} height={1080} className="hidden md:block" />
            <Image src="/INBOUND-MARKETING-MOBILE.png" alt="Inbound Marketing" width={1920} height={1080} className="block md:hidden" />
            <div className="flex w-full justify-center items-center gap-4 mt-8 relative z-40">
              <Button color="blue" onClick={() => openModal("treinamento", "blue", "inbound")}>
                TREINAMENTO
              </Button>
              <Button color="gray" onClick={() => openModal("cultura", "gray", "inbound")}>
                CULTURA
              </Button>
              <Button color="yellow" onClick={() => openModal("proposito", "yellow", "inbound")}>
                PROPÓSITO
              </Button>
            </div>
            {modalData && activeSection === "inbound" && (
              <div className="-mt-16 px-4 pt-20">
                <Modal isOpen={true} onClose={closeModal} data={modalData} color={modalColor} />
              </div>
            )}
          </div>
        </section>
        <section className="flex justify-center">
          <div className="w-full">
            <Image src="/ENDOMARKETING.png" alt="Inbound Marketing" width={1920} height={1080} className="hidden md:block" />
            <Image src="/ENDOMARKETING-MOBILE.png" alt="Inbound Marketing" width={1920} height={1080} className="block md:hidden" />
            <div className="flex w-full justify-center items-center gap-4 mt-8 relative z-40">
              <Button color="blue" onClick={() => openModal("treinamento", "blue", "endomarketing")}>
                TREINAMENTO
              </Button>
              <Button color="gray" onClick={() => openModal("cultura", "gray", "endomarketing")}>
                CULTURA
              </Button>
              <Button color="yellow" onClick={() => openModal("proposito", "yellow", "endomarketing")}>
                PROPÓSITO
              </Button>
            </div>
            {modalData && activeSection === "endomarketing" && (
              <div className="-mt-16 px-4 pt-20">
                <Modal isOpen={true} onClose={closeModal} data={modalData} color={modalColor} />
              </div>
            )}
          </div>
        </section>
        <section className="flex justify-center">
          <div className="w-full">
            <Image src="/EMPLOYER-BRANDING.png" alt="Inbound Marketing" width={1920} height={1080} className="hidden md:block" />
            <Image src="/EMPLOYER-BRANDING-MOBILE.png" alt="Inbound Marketing" width={1920} height={1080} className="block md:hidden" />
            <div className="flex w-full justify-center items-center gap-4 mt-8 relative z-40">
              <Button color="blue" onClick={() => openModal("saiba-mais", "blue", "employer")}>
                SAIBA MAIS
              </Button>
            </div>
            {modalData && activeSection === "employer" && (
              <div className="-mt-16 px-4 pt-20">
                <Modal isOpen={true} onClose={closeModal} data={modalData} color={modalColor} />
              </div>
            )}
          </div>
        </section>
        <section className="flex mt-8 flex-col items-center rounded-xl lg:flex-row gap-8 lg:gap-12 px-12 py-16 max-w-7xl mx-auto" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}>
          <div className="w-full lg:w-1/2">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold max-w-100 text-gray-900 mb-3">Vamos transformar seu negócio juntos?</h2>
              <p className="text-gray-600 text-lg max-w-112.5">Fale com a CINESE e descubra novas formas de conectar sua marca ao público.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="hidden" name="access_key" value="SUA_CHAVE_AQUI" />
              <input type="text" name="name" placeholder="Nome" className="w-full p-4 border border-gray-200 rounded-md focus:outline-none focus:border-gray-300" required />
              <input type="tel" name="phone" placeholder="Telefone" className="w-full p-4 border border-gray-200 rounded-md focus:outline-none focus:border-gray-300" required />
              <input type="email" name="email" placeholder="Email" className="w-full p-4 border border-gray-200 rounded-md focus:outline-none focus:border-gray-300" required />
              <textarea
                name="message"
                placeholder="Mensagem"
                className="w-full p-4 min-h-28 border border-gray-200 rounded-md h-24 resize-none focus:outline-none focus:border-gray-300"
                required
              ></textarea>
              {submitMessage && <p className="text-center text-sm">{submitMessage}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#9DC4D4] text-gray-800 font-semibold rounded-md hover:bg-[#8BB3C3] transition-colors uppercase tracking-wide text-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar Contato"}
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-8 text-center lg:text-center">Marcas atendidas</h2>
            <div className="grid grid-cols-4">
              {mockImages.map((image, index) => (
                <div key={index} className="flex items-center justify-center">
                  <Image src={image.src} alt={image.alt} width={30} height={30} className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <WhatsappButton />
      </main>
      <Footer />
    </>
  );
}
