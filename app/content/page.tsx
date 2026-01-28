"use client";

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const [modalData, setModalData] = React.useState<ModalData | null>(null);
  const [modalColor, setModalColor] = React.useState<"blue" | "gray" | "yellow">("blue");
  const [phoneValue, setPhoneValue] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [showSolutions, setShowSolutions] = React.useState(false);
  const [videoPlayer, setVideoPlayer] = React.useState<{ videoId: string; url: string } | null>(null);

  const openModal = (key: string, color: "blue" | "gray" | "yellow", section: string, showSolutionsParam: boolean = false) => {
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
    setActiveSection(section);
    setShowSolutions(showSolutionsParam);
  };

  const closeModal = () => {
    setActiveSection(null);
    setModalData(null);
  };

  const handleVideoClick = (videoId: string, url: string) => {
    setVideoPlayer({ videoId, url });
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

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;

      if (modalData && activeSection) {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + "px";
      } else {
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0px";
        if (scrollY > 0) {
          window.scrollTo(0, scrollY);
        }
      }
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [modalData, activeSection]);

  return (
    <>
      <style jsx global>{`
        /* Previne scroll quando modal está aberto */
        body.modal-open {
          overflow: hidden;
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
            font-size: 18px;
          }
        }
      `}</style>

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

  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .video-container iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 56.25vw;
    transform: translate(-50%, -50%);
    border: none;
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
    .video-container iframe {
      width: 177.77vh;
      height: 100vh;
    }
  }

  .video-container-short {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
  }

  .video-container-short iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`}</style>

      <Header isVisible={true} />
      <main className="w-full">
        <section className="relative w-full h-screen overflow-hidden">
          <div className="video-container">
            <iframe src="https://www.youtube.com/embed/RUpfQRCt3Go?autoplay=1&loop=1&playlist=RUpfQRCt3Go&mute=1" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <div className="video-overlay" onClick={() => handleVideoClick("RUpfQRCt3Go", "https://www.youtube.com/watch?v=RUpfQRCt3Go")}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <h2 className="text-white text-4xl md:text-5xl font-normal text-center px-4 drop-shadow-lg font-[raleway] tracking-widest max-w-250">
              Se você não contar a sua historia Alguém fará isso por você!
            </h2>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center py-12 px-4">
          <p className="flex items-center w-full justify-center font-bold text-sm md:text-xl mb-8 font-[raleway]">EMPRESAS QUE CONFIARAM NO NOSSO TRABALHO</p>
        </section>
        <section className="relative w-full overflow-hidden py-16 bg-white">
          {/* Gradientes de esmaecimento */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Container do carrossel */}
          <div className="flex animate-scroll-infinite" style={{ width: "max-content" }}>
            {/* Primeiro conjunto de imagens */}
            <div className="flex gap-16 shrink-0">
              {mockImages.map((image, index) => (
                <div key={`first-${index}`} className="shrink-0 w-32 h-20 flex items-center justify-center">
                  <Image src={image.src} alt={image.alt} width={240} height={160} quality={75} className="max-w-full max-h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>

            {/* Segundo conjunto (duplicado para loop infinito) */}
            <div className="flex gap-16 shrink-0">
              {mockImages.map((image, index) => (
                <div key={`second-${index}`} className="shrink-0 w-32 h-20 flex items-center justify-center">
                  <Image src={image.src} alt={image.alt} width={240} height={160} quality={75} className="max-w-full max-h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="flex flex-col lg:flex-row justify-evenly py-16 px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-40 items-center max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 max-w-full lg:max-w-156.25">
              <p className="text-2xl md:text-3xl lg:text-[39px] font-extrabold font-[raleway]">HUB de comunicação corporativa</p>
              <p className="text-base md:text-lg font-normal text-justify font-[raleway]">
                Somos a parceira estratégica na construção de conexões autênticas entre marcas, colaboradores e público-alvo. E como fazemos isso? Com histórias visuais extremamente impactantes.
              </p>
              <p className="text-base md:text-lg font-normal text-justify font-[raleway]">
                ​Analisamos seu momento institucional, alinhamos objetivos corporativos e criamos estratégias precisas para que cada campanha atinja seu maior potencial dentro das métricas
                estabelecidas. Sim somos mais que contadores de histórias, somos o racional e a sua estratégia para que seu conteúdo traga resultado de fato.
              </p>
              <p className="text-base md:text-lg font-normal text-justify font-[raleway]">Nosso coração pulsa em contar histórias que geram resultados reais.</p>
              <i className="text-center text-sm md:text-base">&quot;Afinal, todo mundo tem uma boa história, mas poucos sabem contar!&quot;</i>
            </div>
            <div className="relative w-full lg:w-75 h-auto lg:h-119.5 aspect-9/16 max-w-md">
              <div className="video-container-short">
                <iframe src="https://www.youtube.com/embed/cHRPmNrrYeg?autoplay=1&loop=1&playlist=cHRPmNrrYeg&mute=1" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                <div className="video-overlay" onClick={() => handleVideoClick("cHRPmNrrYeg", "https://youtube.com/shorts/cHRPmNrrYeg?si=tXocsSBb2omHbDe5")}></div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center min-h-screen py-12">
          <div className={`w-full transition-shadow duration-300 ${modalData && activeSection === "inbound" ? "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]" : ""}`}>
            <div className="relative flex items-center justify-center w-full h-96 md:h-screen">
              <Image src="/INBOUND-MARKETING.png" alt="Inbound Marketing" width={1920} height={1080} className="hidden md:block w-full object-cover" />
              <Image src="/INBOUND-MARKETING-MOBILE.png" alt="Inbound Marketing" width={1920} height={1080} className="block md:hidden w-full object-cover" />
              <div className="hidden md:flex absolute bottom-24 flex-col md:flex-row w-full justify-center items-center gap-4 z-40 px-4 md:px-0">
                {/* buttons desktop */}
                <Button color="blue" onClick={() => openModal("topo", "blue", "inbound", true)}>
                  TOPO
                </Button>
                <Button color="yellow" onClick={() => openModal("meio", "yellow", "inbound", true)}>
                  MEIO
                </Button>
                <Button color="gray" onClick={() => openModal("fundo", "gray", "inbound", true)}>
                  FUNDO
                </Button>
              </div>
            </div>
            {modalData && activeSection === "inbound" && <Modal isOpen={!!modalData} onClose={closeModal} data={modalData} color={modalColor} showSolutions={showSolutions} />}
            <div className="flex md:hidden flex-col w-full justify-center items-center gap-4 py-8 z-40 px-4">
              {/* buttons mobile */}
              <Button color="blue" onClick={() => openModal("topo", "blue", "inbound", false)}>
                TOPO
              </Button>
              <Button color="yellow" onClick={() => openModal("meio", "yellow", "inbound", true)}>
                MEIO
              </Button>
              <Button color="gray" onClick={() => openModal("fundo", "gray", "inbound", true)}>
                FUNDO
              </Button>
            </div>
          </div>
        </section>

        <section className="flex justify-center min-h-screen py-12">
          <div className={`w-full transition-shadow duration-300 ${modalData && activeSection === "endomarketing" ? "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]" : ""}`}>
            <div className="relative flex flex-col items-center justify-center w-full h-96 md:h-screen">
              <Image src="/ENDOMARKETING.png" alt="Endomarketing" width={1920} height={1080} className="hidden md:block w-full object-cover" />
              <Image src="/ENDOMARKETING-MOBILE.png" alt="Endomarketing" width={1920} height={1080} className="block md:hidden w-full object-cover" />
              <div className="hidden md:flex absolute bottom-24 flex-col md:flex-row w-full justify-center items-center gap-4 z-40 px-4 md:px-0">
                <Button color="blue" onClick={() => openModal("treinamento", "blue", "endomarketing", false)}>
                  {/* buttons desktop */}
                  TREINAMENTO
                </Button>
                <Button color="yellow" onClick={() => openModal("cultura", "yellow", "endomarketing", false)}>
                  CULTURA
                </Button>
                <Button color="gray" onClick={() => openModal("proposito", "gray", "endomarketing", false)}>
                  PROPÓSITO
                </Button>
              </div>
            </div>
            {modalData && activeSection === "endomarketing" && <Modal isOpen={!!modalData} onClose={closeModal} data={modalData} color={modalColor} showSolutions={showSolutions} />}
            <div className="flex md:hidden flex-col w-full justify-center items-center gap-4 py-8 z-40 px-4">
              {/* buttons mobile */}
              <Button color="blue" onClick={() => openModal("treinamento", "blue", "endomarketing", false)}>
                TREINAMENTO
              </Button>
              <Button color="yellow" onClick={() => openModal("cultura", "yellow", "endomarketing", false)}>
                CULTURA
              </Button>
              <Button color="gray" onClick={() => openModal("proposito", "gray", "endomarketing", false)}>
                PROPÓSITO
              </Button>
            </div>
          </div>
        </section>

        <section className="flex justify-center min-h-screen py-12">
          <div className="w-full">
            <div className="relative flex items-center justify-center w-full h-96 md:h-screen">
              <Image src="/EMPLOYER-BRANDING.png" alt="Employer Branding" width={1920} height={1080} className="hidden md:block w-full object-cover" />
              <Image src="/EMPLOYER-BRANDING-MOBILE.png" alt="Employer Branding" width={1920} height={1080} className="block md:hidden w-full object-cover" />
              <div className="hidden md:flex absolute bottom-20 flex-col md:flex-row w-full justify-center items-center gap-4 z-40 px-4 md:px-0">
                {/* Button desktop */}
                <Button color="blue" onClick={() => openModal("marcaEmpregadora", "blue", "employer", false)}>
                  MARCA EMPREGADORA
                </Button>
              </div>
            </div>
            <div className="flex md:hidden flex-col w-full justify-center items-center gap-4 py-8 z-40 px-4">
              {/* Button mobile */}
              <Button color="blue" onClick={() => openModal("marcaEmpregadora", "blue", "employer", false)}>
                MARCA EMPREGADORA
              </Button>
            </div>
            {modalData && activeSection === "employer" && <Modal isOpen={!!modalData} onClose={closeModal} data={modalData} color={modalColor} showSolutions={showSolutions} />}
          </div>
        </section>

        <div className="bg-[#F0F8FB] p-8 lg:p-16">
          <section
            className="flex flex-col items-center rounded-xl lg:flex-row gap-8 lg:gap-12 px-4 md:px-12 py-16 max-w-7xl mx-auto bg-white"
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
                    <Image src={image.src} alt={image.alt} width={30} height={30} className="w-full object-cover grayscale hover:grayscale-0 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <WhatsappButton />
      </main>

      {/* Video Player Modal */}
      {videoPlayer && (
        <div className="video-player-overlay" onClick={closeVideoPlayer}>
          <div className="video-player-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeVideoPlayer}>
              X
            </button>
            <iframe src={`https://www.youtube.com/embed/${videoPlayer.videoId}?autoplay=1`} allow="autoplay; encrypted-media;" allowFullScreen></iframe>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
