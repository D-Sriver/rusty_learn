import { useRef, useState } from 'react';
import { coursTree } from '../articles/coursData';
import { BookOpen } from 'lucide-react';
import SideMenuChapter from './SideMenuChapter';

export const iconMap = {
  BookOpen: <BookOpen className="inline w-5 h-5 mr-2 text-yellow-400" />,
};

export default function SideMenu({ selected, onSelect }: { selected: string, onSelect: (key: string) => void }) {
  const [openChapters, setOpenChapters] = useState([coursTree[0].key]);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const chevronRefs = useRef<{ [key: string]: SVGSVGElement | null }>({});

  const toggleChapter = (key: string) => {
    setOpenChapters((prev) =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <nav className="bg-white/10 border border-white/10 rounded-2xl shadow-xl backdrop-blur-xl p-4 flex flex-col gap-2">
      {coursTree.map(chap => (
        <SideMenuChapter
          key={chap.key}
          chapter={chap}
          open={openChapters.includes(chap.key)}
          onToggle={() => toggleChapter(chap.key)}
          selectedKey={selected}
          onSelect={onSelect}
          dropdownRef={{ current: dropdownRefs.current[chap.key] as HTMLDivElement }}
          chevronRef={{ current: chevronRefs.current[chap.key] as SVGSVGElement }}
        />
      ))}
    </nav>
  );
} 