import { useRef } from "react";
import gsap from "gsap";

export default function SideMenuSubChapter({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (!selected && buttonRef.current && dotRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.02,
        x: 4,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        scale: 1.3,
        background: "#fbbf24",
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
        background: "#23272e",
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
      className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-white font-medium flex items-center gap-2
        ${selected ? "bg-yellow-400 text-yellow-900 shadow font-extrabold" : "bg-white/5 hover:bg-yellow-300/30 hover:text-yellow-200"}`}
    >
      <span
        ref={dotRef}
        className="w-2 h-2 rounded-full mr-2"
        style={{ background: selected ? "#facc15" : "#23272e" }}
      ></span>
      <span className="flex-1 min-w-0 break-words whitespace-normal">{label}</span>
    </button>
  );
}
