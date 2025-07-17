import { useState, useEffect } from "react";
import { coursTree } from "@/articles/coursData";
import { BookOpen } from "lucide-react";
import SideMenuChapter from "./SideMenuChapter";
import { useAuthStore } from "@/store/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const iconMap = {
  BookOpen: <BookOpen className="inline w-5 h-5 mr-2 text-yellow-400" />,
};

export default function SideMenu({
  selected,
  onSelect,
  progressRefreshKey = 0,
}: {
  selected: string;
  onSelect: (key: string) => void;
  progressRefreshKey?: number;
}) {
  const { user } = useAuthStore();
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch(`${API_URL}/api/progress/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setProgress(data);
      });
  }, [user, progressRefreshKey]);

  // Trouve le chapitre parent de la sous-section sélectionnée
  const getParentChapterKey = (selectedKey: string) => {
    for (const chap of coursTree) {
      if (chap.children.some(child => child.key === selectedKey)) {
        return chap.key;
      }
    }
    return coursTree[0].key; // fallback
  };

  // Un seul chapitre ouvert à la fois
  const [openChapter, setOpenChapter] = useState(getParentChapterKey(selected));

  // Synchronise dynamiquement le chapitre ouvert avec la sous-section sélectionnée
  useEffect(() => {
    setOpenChapter(getParentChapterKey(selected));
  }, [selected]);

  const toggleChapter = (key: string) => {
    setOpenChapter((prev) => (prev === key ? '' : key));
  };

  return (
    <nav className="bg-white/10 border border-white/10 rounded-2xl shadow-xl backdrop-blur-xl p-2 flex flex-col gap-2 max-w-sm overflow-x-auto" aria-label="Navigation du cours" role="navigation">
      {coursTree.map((chap) => (
        <SideMenuChapter
          key={chap.key}
          chapter={chap}
          open={openChapter === chap.key}
          onToggle={() => toggleChapter(chap.key)}
          selectedKey={selected}
          onSelect={onSelect}
          progress={progress}
        />
      ))}
    </nav>
  );
}
