"use client";

import { useEffect, useState } from "react";

export const SectionNav = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ["section-1", "section-2", "section-3"];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId, index) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(index);
              }
            });
          },
          {
            threshold: 0.5,
          }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {sections.map((_, index) => (
        <button key={index} onClick={() => scrollToSection(index)} className="group relative flex items-center justify-center" aria-label={`Ir para seção ${index + 1}`}>
          <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === index ? "bg-white border-white scale-125" : "bg-transparent border-white hover:scale-110"}`} />
        </button>
      ))}
    </nav>
  );
};
