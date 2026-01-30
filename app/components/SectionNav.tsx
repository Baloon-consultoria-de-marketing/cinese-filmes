"use client";

interface SectionNavProps {
  sections: string[];
  activeSection: number;
  onNavigate: (index: number) => void;
}

export const SectionNav = ({ sections, activeSection, onNavigate }: SectionNavProps) => {
  const VISIBLE_COUNT = 7;
  const ITEM_HEIGHT = 24; // px (altura do item + espaçamento)

  const maxStart = Math.max(0, sections.length - VISIBLE_COUNT);
  const startIndex = Math.min(Math.max(activeSection - Math.floor(VISIBLE_COUNT / 2), 0), maxStart);
  const translateY = -startIndex * ITEM_HEIGHT;

  return (
    <nav className="fixed right-10 top-1/2 -translate-y-1/2 z-40" style={{ height: VISIBLE_COUNT * ITEM_HEIGHT, overflow: "hidden" }}>
      <div className="flex flex-col transition-transform duration-300 ease-in-out px-2" style={{ transform: `translateY(${translateY}px)` }}>
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className="group relative flex items-center justify-center cursor-pointer hover:transform hover:scale-110 ease-in-out duration-300"
            style={{ height: ITEM_HEIGHT }}
            aria-label={`Ir para seção ${index + 1}`}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 
            ${activeSection === index ? "bg-white border-white scale-125" : "bg-transparent border-white hover:scale-110"}`}
            />
          </button>
        ))}
      </div>
    </nav>
  );
};
