"use client";

interface SectionNavProps {
  sections: string[];
  activeSection: number; // Recebe qual está ativa
  onNavigate: (index: number) => void; // Recebe a função para mudar
}

export const SectionNav = ({ sections, activeSection, onNavigate }: SectionNavProps) => {
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {sections.map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          className="group relative flex items-center justify-center cursor-pointer hover:transform hover:scale-110 ease-in-out duration-300"
          aria-label={`Ir para seção ${index + 1}`}
        >
          <div
            className={`w-2 h-2 rounded-full border-2 transition-all duration-300 
            ${activeSection === index ? "bg-white border-white scale-125" : "bg-transparent border-white hover:scale-110"}`}
          />
        </button>
      ))}
    </nav>
  );
};
