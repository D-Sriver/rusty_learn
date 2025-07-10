import { useEffect, useRef } from "react";
import { ChevronRight, BookOpen } from "lucide-react";
import gsap from "gsap";
import SideMenuSubChapter from "./SideMenuSubChapter";
import type { TypeChapter } from "../articles/coursData";

const iconMap = {
  BookOpen: <BookOpen className="inline w-5 h-5 mr-2 text-yellow-400" />,
};

export default function SideMenuChapter({
  chapter,
  open,
  onToggle,
  selectedKey,
  onSelect,
}: {
  chapter: TypeChapter;
  open: boolean;
  onToggle: () => void;
  selectedKey: string;
  onSelect: (key: string) => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = dropdownRef.current;
    const content = contentRef.current;
    const chevron = chevronRef.current;

    if (!container || !content) return;

    // Kill any existing timeline
    if (tl.current) {
      tl.current.kill();
    }

    // Create a new timeline
    tl.current = gsap.timeline();

    if (open) {
      // Opening animation
      gsap.set(container, {
        display: "flex",
        height: "auto",
        opacity: 1,
      });

      // Get the natural height
      const naturalHeight = content.offsetHeight;

      // Reset for animation
      gsap.set(container, {
        height: 0,
        opacity: 0,
      });

      // Animate opening
      tl.current
        .to(container, {
          height: naturalHeight,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          content.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.2",
        );

      // Animate chevron
      if (chevron) {
        gsap.to(chevron, {
          rotate: 90,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    } else {
      // Closing animation
      tl.current
        .to(content.children, {
          y: -10,
          opacity: 0,
          duration: 0.2,
          stagger: 0.02,
          ease: "power2.in",
        })
        .to(
          container,
          {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              if (container) {
                gsap.set(container, { display: "none" });
              }
            },
          },
          "-=0.1",
        );

      // Animate chevron
      if (chevron) {
        gsap.to(chevron, {
          rotate: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }

    // Cleanup function
    return () => {
      if (tl.current) {
        tl.current.kill();
      }
    };
  }, [open]);

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-2 py-2 rounded-xl font-bold text-yellow-400 hover:ring-2 transition-colors mb-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/10 border border-white/10 text-left"
      >
        <span>
          {iconMap[chapter.icon as keyof typeof iconMap]}
          {chapter.label}
        </span>
        <ChevronRight
          ref={chevronRef}
          className="inline w-5 h-5 transition-transform"
        />
      </button>
      <div
        ref={dropdownRef}
        style={{ overflow: "hidden" }}
        className="flex flex-col  bg-white/5 rounded-xl shadow-inner"
      >
        <div ref={contentRef} className="flex flex-col">
          {chapter.children.map((child) => (
            <div
              key={child.key}
              style={{ opacity: 0 }}
            >
              <SideMenuSubChapter
                label={child.label}
                selected={selectedKey === child.key}
                onClick={() => onSelect(child.key)}
                chapterKey={child.key}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
