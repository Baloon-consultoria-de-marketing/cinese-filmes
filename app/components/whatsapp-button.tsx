import React from "react";
import Image from "next/image";

interface WhatsappButtonProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  phoneNumber?: string;
  message?: string;
  tooltipText?: string;
}

export const WhatsappButton: React.FC<WhatsappButtonProps> = ({
  position = "bottom-right",
  phoneNumber = "5511982477229",
  message = "Oi! Estou interessado em seus serviços e gostaria de saber mais sobre isso. Você poderia me enviar mais informações? Obrigado!",
  tooltipText = "Estamos disponíveis! Clique aqui para conversar",
}) => {
  const positionStyles = {
    "bottom-right": { bottom: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "top-left": { top: "20px", left: "20px" },
  };

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <style jsx>{`
          [data-wa-tooltip] {
            position: relative;
            cursor: default;
          }

          [data-wa-tooltip]:hover::before {
            content: attr(data-wa-tooltip);
            font-size: 16px;
            text-align: center;
            position: absolute;
            display: block;
            right: calc(0% - 100px);
            min-width: 200px;
            max-width: 200px;
            bottom: calc(100% + 40px);
            transform: translate(-50%);
            animation: fade-in 500ms ease;
            background: #00E785;
            border-radius: 4px;
            padding: 10px;
            color: #ffffff;
            z-index: 1;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }

          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>

      <a
        data-wa-tooltip={tooltipText}
        target="_blank"
        rel="noopener noreferrer"
        href={whatsappUrl}
        style={{
          cursor: "pointer",
          height: "auto",
          width: "auto",
          position: "fixed",
          ...positionStyles[position],
          display: "flex",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: 600,
          fontFamily: "sans-serif",
          alignItems: "center",
          zIndex: 999999999,
          borderRadius: "100px",
          animation: "pulse 2.5s ease infinite",
        }}
      >
        <Image src="/whatsappButton.png" alt="WhatsApp" width={60} height={60} />
      </a>
    </>
  );
};
