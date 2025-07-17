import { useRef } from "react";
import gsap from "gsap";

export default function SideMenuSubChapter({
  label,
  selected,
  onClick,
  chapterKey,
  progress = [], // Ajout d'une prop pour la progression
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  chapterKey: string;
  progress?: { chapitreKey: string; dateValidation: string | null }[];
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  // On considère validé si on trouve une entrée avec ce chapitreKey et une dateValidation non nulle
  const isLu = progress.some(p => p.chapitreKey === chapterKey && p.dateValidation);

  const handleMouseEnter = () => {
    if (!selected && buttonRef.current && dotRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        scale: 1.3,
        background: "#f59e42",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!selected && buttonRef.current && dotRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        x: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        scale: 1,
        background: "white",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-full rounded-l-3xl text-left p-3 transition-colors duration-200 hover:text-yellow-500 text-white font-medium flex items-center gap-3
        ${selected ? "bg-yellow-300 text-yellow-900 font-bold hover:text-yellow-900"  : "bg-transparent"}`}
    >
      <span
        ref={dotRef}
        className="w-2 h-2 rounded-full"
        style={{ background: selected ? "#733e0a" : "white" }}
      ></span>
      <span className="flex-1 min-w-0 break-words whitespace-normal">{label}</span>
      {isLu && (
        <span className="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-600 text-white font-bold ">
          ✔
        </span>
      )}
    </button>
  );
}
