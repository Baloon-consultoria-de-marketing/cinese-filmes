"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { WhatsappButton } from "../components/whatsapp-button";
import Image from "next/image";
import { mockImages } from "./mockImages";
import React from "react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { modalDataMapInbound, modalsDataMapEndomarketing, modalsDataMapEmployer, ModalData } from "./modalMock";
import Swal from "sweetalert2";

export default function Content() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [modalColor, setModalColor] = useState<"blue" | "gray" | "yellow">("blue");

  // Estados para controle de exibição dentro do Modal
  const [showSolutions, setShowSolutions] = useState(false);
  const [showTabs, setShowTabs] = useState(false); // <--- NOVO ESTADO AQUI

  const [phoneValue, setPhoneValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [videoPlayer, setVideoPlayer] = useState<{ videoId: string; url: string } | null>(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  const sections = useMemo(() => ["section-hero", "section-brands", "section-inbound", "section-endomarketing", "section-employer", "section-contact", "section-footer"], []);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= sections.length) return;
      const element = document.querySelector(`[data-section="${sections[index]}"]`);
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

  const openModal = (key: string, color: "blue" | "gray" | "yellow", section: string, showSolutionsParam: boolean = false, showTabsParam: boolean = false) => {
    let modalMap;
    if (section === "endomarketing") {
      modalMap = modalsDataMapEndomarketing;
    } else if (section === "employer") {
      modalMap = modalsDataMapEmployer;
    } else {
      modalMap = modalDataMapInbound;
    }

    setModalData(modalMap[key]);
    setModalColor(color);
    setShowSolutions(showSolutionsParam);
    setShowTabs(showTabsParam); // <--- Atualiza o estado
  };

  const closeModal = () => {
    setModalData(null);
  };

  const handleVideoClick = (videoId: string, url: string) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Abre direto no YouTube (app ou navegador)
      window.open(url, "_blank");
    } else {
      // Desktop: abre o modal customizado
      setVideoPlayer({ videoId, url });
    }
  };

  const closeVideoPlayer = () => {
    setVideoPlayer(null);
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length <= 10) {
      return cleaned.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return cleaned
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhoneValue(formatted);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value && !validateEmail(e.target.value)) {
      Swal.fire({
        title: "Email Inválido",
        text: "Por favor, insira um email válido",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#9DC4D4",
      });
      setEmailError("Por favor, insira um email válido");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const emailInput = formElement.email as HTMLInputElement;

    if (!validateEmail(emailInput.value)) {
      Swal.fire({
        title: "Email Inválido",
        text: "Por favor, insira um email válido antes de enviar",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#9DC4D4",
      });
      setEmailError("Por favor, insira um email válido");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(formElement);
    formData.append("access_key", "c15ae6a2-1610-49ee-9d63-692e511bb875");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Sucesso!",
          text: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#9DC4D4",
        });
        formElement.reset();
        setPhoneValue("");
        setEmailError("");
      } else {
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível enviar sua mensagem. Tente novamente.",
          icon: "error",
          confirmButtonText: "Tentar Novamente",
          confirmButtonColor: "#9DC4D4",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      Swal.fire({
        title: "Erro!",
        text: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        icon: "error",
        confirmButtonText: "Tentar Novamente",
        confirmButtonColor: "#9DC4D4",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll full-page por seções
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current || modalData) return;

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
      if (!modalData) return;

      const target = e.target as HTMLElement;
      const isInsideModal = target.closest('[class*="z-50"]');

      if (!isInsideModal && e.cancelable) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current || modalData) return;

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
  }, [activeSection, scrollToIndex, modalData]);

  return (
    <>
      <style jsx global>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          overscroll-behavior-y: none;
          overscroll-behavior: none;
          touch-action: none;
        }
      `}</style>
      <style jsx>{`
         @keyframes scroll-infinite { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-100% / 2)); } }
        .animate-scroll-infinite { animation: scroll-infinite 40s linear infinite; }
        .video-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; }
        .video-container iframe { position: absolute; top: 50%; left: 50%; width: 100vw; height: 56.25vw; transform: translate(-50%, -50%); border: none; }
        .video-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: pointer; z-index: 10; }
        @media (max-aspect-ratio: 16/9) { .video-container iframe { width: 177.77vh; height: 100vh; } }
        .video-container-short { position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 8px; }
        .video-container-short iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .video-player-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeInOverlay 0.3s ease-in-out; }
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        .video-player-container { position: relative; width: 80%; height: 80%; max-width: 1200px; animation: slideInPlayer 0.3s ease-in-out; }
        @keyframes slideInPlayer { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .video-player-container iframe { position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; transform: none !important; pointer-events: auto !important; }
        .close-button { position: fixed; top: 20px; right: 20px; background: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #333; transition: all 0.2s ease; z-index: 9998; padding: 0; line-height: 1; font-weight: 300; }
        .close-button:hover { background: #f0f0f0; transform: scale(1.1); }
        @media (max-width: 768px) { .close-button { top: 20px; right: 20px; width: 36px; height: 36px; font-size: 20px; z-index: 10000; } }
      `}</style>

      <Header isVisible={true} />
      <main className="w-full">
        <section data-section="section-hero" className="relative w-full h-screen overflow-hidden">
          <div className="video-container">
            <iframe src="https://www.youtube.com/embed/RUpfQRCt3Go?autoplay=1&loop=1&playlist=RUpfQRCt3Go&mute=1" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <div className="video-overlay" onClick={() => handleVideoClick("RUpfQRCt3Go", "https://www.youtube.com/watch?v=RUpfQRCt3Go")}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <i className="text-white text-xl md:text-3xl font-normal text-center px-4 drop-shadow-lg font-[raleway] tracking-widest md:max-w-250">
              Se você não contar a sua historia <br /> Alguém fará isso por você!
            </i>
          </div>
        </section>

        <section data-section="section-brands" className="w-full">
          <div className="relative w-full overflow-hidden bg-white">
            <p className="flex items-center w-full justify-center font-bold text-sm md:text-xl lg:text-2xl font-[raleway] pt-20 md:pt-10 md:pb-10">MARCAS ATENDIDAS</p>
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>
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
          </div>
          <div className="flex flex-col lg:flex-row justify-evenly px-10 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row gap-6 lg:gap-40 items-center max-w-7xl mx-auto lg:mb-12">
              <div className="flex flex-col gap-2 max-w-full lg:max-w-156.25">
                <p className="text-2xl md:text-3xl lg:text-[39px] font-extrabold font-[raleway]">CINESE CONTENT</p>
                <p className="text-[15px] md:text-lg font-normal text-justify font-[raleway]">
                  Somos a parceira estratégica na construção de conexões autênticas entre marcas, colaboradores e público-alvo. E como fazemos isso? Com histórias visuais extremamente impactantes.
                </p>
                <p className="text-[15px] md:text-lg font-normal text-justify font-[raleway]">
                  ​Analisamos seu momento institucional, alinhamos objetivos corporativos e criamos estratégias precisas para que cada campanha atinja seu maior potencial dentro das métricas
                  estabelecidas. Sim somos mais que contadores de histórias, somos o racional e a sua estratégia para que seu conteúdo traga resultado de fato.
                </p>
                <p className="text-[15px] md:text-lg font-normal text-justify font-[raleway]">Nosso coração pulsa em contar histórias que geram resultados reais.</p>
                <i className="text-center text-sm md:text-base">&quot;Afinal, todo mundo tem uma boa história, mas poucos sabem contar!&quot;</i>
              </div>
              <div
                className="relative w-33.75 lg:w-66.5 h-60 lg:h-118.5 rounded-lg aspect-video max-w-md"
                style={{ WebkitBoxShadow: "0px 0px 11px 0px #000000", boxShadow: "0px 0px 11px 0px #000000" }}
              >
                <div className="video-container-short">
                  <iframe src="https://www.youtube.com/embed/cHRPmNrrYeg?autoplay=1&loop=1&playlist=cHRPmNrrYeg&mute=1" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                  <div className="video-overlay" onClick={() => handleVideoClick("cHRPmNrrYeg", "https://youtube.com/shorts/cHRPmNrrYeg?si=tXocsSBb2omHbDe5")}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- INBOUND MARKETING (Tem Tabs) --- */}
        <section data-section="section-inbound" className="flex justify-center md:h-auto md:min-h-0 min-h-screen items-center">
          <div className={`w-full transition-shadow duration-300 ${modalData ? "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]" : ""}`}>
            <div className="relative flex items-center justify-center w-full md:h-full">
              <Image src="/INBOUND-MARKETING.png" alt="Inbound Marketing" width={0} height={0} className="hidden md:block w-full object-cover" quality={90} />
              <Image src="/INBOUND-MARKETING-MOBILE.png" alt="Inbound Marketing" width={0} height={0} className="block md:hidden w-full object-cover" quality={90} />
              <div className="hidden md:flex absolute bottom-50 flex-col md:flex-row w-full justify-center items-center gap-4 z-40 px-4 md:px-0">
                <Button color="blue" onClick={() => openModal("topo", "blue", "inbound", true, true)}>
                  TOPO
                </Button>
                <Button color="yellow" onClick={() => openModal("meio", "yellow", "inbound", true, true)}>
                  MEIO
                </Button>
                <Button color="gray" onClick={() => openModal("fundo", "gray", "inbound", true, true)}>
                  FUNDO
                </Button>
              </div>
            </div>
            <div className="flex md:hidden flex-col w-full justify-center items-center gap-8 z-40 px-4 py-8">
              <Button color="blue" onClick={() => openModal("topo", "blue", "inbound", false, true)}>
                TOPO
              </Button>
              <Button color="yellow" onClick={() => openModal("meio", "yellow", "inbound", true, true)}>
                MEIO
              </Button>
              <Button color="gray" onClick={() => openModal("fundo", "gray", "inbound", true, true)}>
                FUNDO
              </Button>
            </div>
          </div>
        </section>

        {/* --- ENDOMARKETING (NÃO Tem Tabs) --- */}
        <section data-section="section-endomarketing" className="flex justify-center md:h-auto md:min-h-0 min-h-screen items-center">
          <div className={`w-full transition-shadow duration-300 ${modalData ? "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]" : ""}`}>
            <div className="relative flex flex-col items-center justify-center w-full md:h-full">
              <Image src="/ENDOMARKETING.png" alt="Endomarketing" width={1920} height={1080} className="hidden md:block w-full object-cover" quality={90} />
              <Image src="/ENDOMARKETING-MOBILE.png" alt="Endomarketing" width={1920} height={1080} className="block md:hidden w-full object-cover" quality={90} />
              <div className="hidden md:flex absolute bottom-50 flex-col md:flex-row w-full justify-center items-center gap-4 z-40 px-4 md:px-0">
                <Button color="blue" onClick={() => openModal("treinamento", "blue", "endomarketing", false, false)}>
                  TREINAMENTO
                </Button>
                <Button color="yellow" onClick={() => openModal("cultura", "yellow", "endomarketing", false, false)}>
                  CULTURA
                </Button>
                <Button color="gray" onClick={() => openModal("proposito", "gray", "endomarketing", false, false)}>
                  PROPÓSITO
                </Button>
              </div>
            </div>
            <div className="flex md:hidden flex-col w-full justify-center items-center gap-4 z-40 px-4 py-8">
              <Button color="blue" onClick={() => openModal("treinamento", "blue", "endomarketing", false, false)}>
                TREINAMENTO
              </Button>
              <Button color="yellow" onClick={() => openModal("cultura", "yellow", "endomarketing", false, false)}>
                CULTURA
              </Button>
              <Button color="gray" onClick={() => openModal("proposito", "gray", "endomarketing", false, false)}>
                PROPÓSITO
              </Button>
            </div>
          </div>
        </section>

        {/* --- EMPLOYER BRANDING (Tem Tabs) --- */}
        <section data-section="section-employer" className="flex justify-center md:h-auto md:min-h-0 min-h-screen items-center">
          <div className="w-full">
            <div className="relative flex items-center justify-center w-full md:h-full">
              <Image src="/EMPLOYER-BRANDING.png" alt="Employer Branding" width={1920} height={1080} className="hidden md:block w-full object-cover" quality={90} />
              <Image src="/EMPLOYER-BRANDING-MOBILE.png" alt="Employer Branding" width={1920} height={1080} className="block md:hidden w-full object-cover" quality={90} />
              <div className="hidden md:flex absolute bottom-52 flex-col md:flex-row w-full justify-center items-center gap-4 z-40 px-4 md:px-0">
                <Button color="blue" onClick={() => openModal("marcaEmpregadora", "blue", "employer", false, true)}>
                  MARCA EMPREGADORA
                </Button>
              </div>
            </div>
            <div className="flex md:hidden flex-col w-full justify-center items-center gap-4 z-40 px-4 py-8">
              <Button color="blue" onClick={() => openModal("marcaEmpregadora", "blue", "employer", false, true)}>
                MARCA EMPREGADORA
              </Button>
            </div>
          </div>
        </section>

        <div data-section="section-contact" className="bg-[#F0F8FB] p-8 flex items-center">
          <section
            className="flex flex-col md:flex-row items-center rounded-xl lg:flex-row gap-8 lg:gap-12 px-4 md:px-12 py-16 max-w-7xl mx-auto bg-white"
            style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}
          >
            <div className="w-full lg:w-1/2">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold max-w-100 text-gray-900 mb-3">Vamos transformar seu negócio juntos?</h2>
                <p className="text-gray-600 text-lg max-w-112.5">Fale com a CINESE e descubra novas formas de conectar sua marca ao público.</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                <input type="text" name="name" placeholder="Nome" className="w-full p-4 border border-gray-200 rounded-md focus:outline-none focus:border-gray-300" required />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefone"
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  className="w-full p-4 border border-gray-200 rounded-md focus:outline-none focus:border-gray-300"
                  required
                />
                <div className="w-full">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onBlur={handleEmailBlur}
                    className="w-full p-4 border border-gray-200 rounded-md focus:outline-none focus:border-gray-300"
                    required
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                <textarea
                  name="message"
                  placeholder="Mensagem"
                  className="w-full p-4 min-h-28 border border-gray-200 rounded-md resize-none focus:outline-none focus:border-gray-300"
                  required
                ></textarea>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
                {mockImages.map((image, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={80}
                      height={80}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover grayscale hover:grayscale-0 transition-all"
                      quality={90}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <section data-section="section-footer" className="relative w-full h-auto overflow-visible">
          <Footer />
        </section>
        <WhatsappButton />
      </main>

      {/* --- RENDERIZAÇÃO CORRIGIDA DO MODAL --- */}
      {modalData && (
        <Modal
          isOpen={!!modalData}
          onClose={closeModal}
          data={modalData}
          color={modalColor}
          showSolutions={showSolutions}
          showTabs={showTabs} // <--- Usa o estado direto
        />
      )}

      {videoPlayer && (
        <div className="video-player-overlay" onClick={closeVideoPlayer}>
          <button className="close-button" onClick={closeVideoPlayer}>
            X
          </button>
          <div className="video-player-container" onClick={(e) => e.stopPropagation()}>
            <iframe src={`https://www.youtube.com/embed/${videoPlayer.videoId}?autoplay=1`} allow="autoplay; encrypted-media;" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </>
  );
}
