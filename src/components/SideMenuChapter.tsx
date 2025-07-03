import { useEffect } from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import SideMenuSubChapter from './SideMenuSubChapter';

const iconMap = {
  BookOpen: <BookOpen className="inline w-5 h-5 mr-2 text-yellow-400" />,
};

export default function SideMenuChapter({
  chapter,
  open,
  onToggle,
  selectedKey,
  onSelect,
  dropdownRef,
  chevronRef
}: {
  chapter: any,
  open: boolean,
  onToggle: () => void,
  selectedKey: string,
  onSelect: (key: string) => void,
  dropdownRef: React.RefObject<HTMLDivElement>,
  chevronRef: React.RefObject<SVGSVGElement>
}) {
  useEffect(() => {
    const ref = dropdownRef.current;
    if (ref) {
      if (open) {
        ref.style.display = 'flex';
        gsap.to(ref, { height: 'auto', opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      } else {
        gsap.to(ref, { height: 0, opacity: 0, y: -10, duration: 0.25, ease: 'power2.in', onComplete: () => { if(ref) ref.style.display = 'none'; } });
      }
    }
    if (chevronRef.current) {
      gsap.to(chevronRef.current, { rotate: open ? 90 : 0, duration: 0.25, ease: 'power2.inOut' });
    }
  }, [open, dropdownRef, chevronRef]);

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 rounded-xl font-bold text-yellow-400 hover:bg-yellow-400/10 transition-colors mb-1 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 bg-white/10 border border-white/10"
      >
        <span>{iconMap[chapter.icon as keyof typeof iconMap]}{chapter.label}</span>
        <ChevronRight ref={chevronRef} className="inline w-5 h-5 transition-transform" />
      </button>
      <div
        ref={dropdownRef}
        style={{ overflow: 'hidden', height: open ? 'auto' : 0, opacity: open ? 1 : 0, display: open ? 'flex' : 'none' }}
        className="flex flex-col gap-1 pl-4 border-l-2 border-yellow-400/40 ml-2 bg-white/5 rounded-xl shadow-inner"
      >
        {chapter.children.map((child: any) => (
          <SideMenuSubChapter
            key={child.key}
            label={child.label}
            selected={selectedKey === child.key}
            onClick={() => onSelect(child.key)}
          />
        ))}
      </div>
    </div>
  );
} 