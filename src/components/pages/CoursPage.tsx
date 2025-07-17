import React, {useEffect, useState, useRef} from 'react';
import { MDXProvider } from '@mdx-js/react';
import * as mdxPagesRaw from '@/articles/mdxIndex';
import { coursTree } from '@/articles/coursData';
import SideMenu from '../navigation/SideMenu';
import MobileSideMenu from '../navigation/MobileSideMenu';
import AstuceRusty from '../ui/AstuceRusty';
import QCMDirect from '../ui/QCMDirect';
import { useLocation } from 'react-router-dom';
import { useCoursStore } from '@/store/useCoursStore';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const mdxPages = mdxPagesRaw as Record<string, React.ComponentType>;
const components = {
  AstuceRusty,
  QCMDirect,
};

export default function CoursPage({ setMobileMenuOpen }: { setMobileMenuOpen?: (open: boolean) => void }) {
  const location = useLocation();
  const defaultKey = coursTree[0].children[0].key;
  const selected = useCoursStore((state) => state.selected) || defaultKey;
  const setSelected = useCoursStore((state) => state.setSelected);
  const [mobileMenuOpen, setMobileMenuOpenLocal] = useState(false);
  const [elapsed, setElapsed] = useState(0); // temps en secondes
  const user = useAuthStore(state => state.user);
  const [progressRefreshKey, setProgressRefreshKey] = useState(0);
  const previousSelected = useRef<string | null>(null);

  // Si aucune sous-section n'est sélectionnée (premier chargement), on initialise avec la valeur par défaut
  useEffect(() => {
    if (!useCoursStore.getState().selected) {
      setSelected(defaultKey);
    }
  }, [defaultKey, setSelected]);

  useEffect(() => {
    if (location.pathname.startsWith('/cours')) {
      localStorage.setItem('lastCoursPage', location.pathname + location.search + location.hash);
    }
  }, [location]);

  // Synchronise l'état avec le parent si besoin
  useEffect(() => {
    if (setMobileMenuOpen) setMobileMenuOpen(mobileMenuOpen);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  // Compteur de temps passé sur la page (persistant)
  useEffect(() => {
    setElapsed(0);
    const key = `elapsed_${user?.id}_${selected}`;
    const saved = localStorage.getItem(key);
    if (saved) setElapsed(Number(saved));

    let seconds = saved ? Number(saved) : 0;
    let interval: ReturnType<typeof setInterval> | null = null;
    interval = setInterval(() => {
      seconds++;
      setElapsed(seconds);
      localStorage.setItem(key, String(seconds)); // Sauvegarde à chaque tick
    }, 1000);
    return () => {
      if (interval) clearInterval(interval);
      // On ne supprime pas ici, on attend la validation
    };
  }, [selected, user]);

  // N'affiche le menu que si selected est initialisé
  if (!selected) {
    return null; // ou un loader si tu veux
  }

  useEffect(() => {
    if (previousSelected.current && previousSelected.current !== selected) {
      // On attend la fin du rendu du nouveau chapitre
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 80); // 80ms = assez pour la plupart des rendus, ajuste si besoin
    }
    previousSelected.current = selected;
  }, [selected]);

  let selectedLabel = '';
  let SelectedComponent: React.ComponentType | null = null;
  coursTree.forEach(chap => {
    chap.children.forEach(child => {
      if (child.key === selected) {
        selectedLabel = child.label;
        SelectedComponent = mdxPages[child.importKey] as React.ComponentType;
      }
    });
  });

  return (
    <div className="cours-card flex flex-row min-h-screen w-full md:w-11/12 justify-center items-start gap-2 md:gap-7">
      {/* Burger menu mobile */}
      <MobileSideMenu selected={selected} onSelect={setSelected} open={mobileMenuOpen} setOpen={setMobileMenuOpenLocal} />
      {/* SideMenu desktop */}
      <aside className="md:w-96 md:sticky top-25 z-10 hidden md:block">
        <SideMenu selected={selected} onSelect={setSelected} progressRefreshKey={progressRefreshKey} />
      </aside>
      <div className="relative w-full ">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <div className="border-b border-white/20 px-8 pt-4 pb-4 md:px-8 md:pt-8 md:pb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 drop-shadow mb-0">{selectedLabel}</h2>
          </div>
          <div className="prose prose-invert">
            <MDXProvider components={components}>
              {SelectedComponent
                ? React.createElement(SelectedComponent)
                : (
                  <div className="flex flex-col items-center justify-center gap-4 bg-yellow-400/10 border border-yellow-300/30 rounded-2xl shadow-lg p-10 my-8 animate-fade-in">
                    <span className="text-5xl md:text-6xl animate-bounce-slow">⏳</span>
                    <span className="text-yellow-200 text-2xl md:text-3xl font-bold drop-shadow text-center">
                      Page " {selectedLabel} " à venir !
                    </span>
                    <span className="text-yellow-100 text-lg italic text-center max-w-xl">
                      Ce chapitre arrive bientôt… Reste connecté!
                    </span>
                  </div>
                )
              }
            </MDXProvider>
          </div>
          {/* Ajout du bouton de validation de chapitre */}
          <ValidationChapitre selected={selected} user={user} elapsed={elapsed} setProgressRefreshKey={setProgressRefreshKey} hasContent={!!SelectedComponent} />
        </div>
      </div>
    </div>
  );
}

// Nouveau composant pour la validation du chapitre
function ValidationChapitre({ selected, user, elapsed, setProgressRefreshKey, hasContent }: { selected: string, user: any, elapsed: number, setProgressRefreshKey: (fn: (k: number) => number) => void, hasContent: boolean }) {
  const [done, setDone] = React.useState(false);
  const [isAlreadyValidated, setIsAlreadyValidated] = React.useState(false);
  const setSelected = useCoursStore((state) => state.setSelected);

  // Trouver la clé du chapitre suivant
  function getNextChapterKey(currentKey: string): string | null {
    // Aplatit tous les enfants dans un tableau
    const allChapters: string[] = [];
    coursTree.forEach(chap => {
      chap.children.forEach(child => {
        allChapters.push(child.key);
      });
    });
    const idx = allChapters.indexOf(currentKey);
    if (idx !== -1 && idx < allChapters.length - 1) {
      return allChapters[idx + 1];
    }
    return null;
  }
  const nextKey = getNextChapterKey(selected);

  // Ajoute ce useEffect pour reset done à chaque changement de chapitre
  React.useEffect(() => {
    setDone(false);
  }, [selected]);

  React.useEffect(() => {
    if (!user) return;
    fetch(`${API_URL}/api/progress/${user.id}`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.chapitreKey === selected && p.dateValidation);
        setIsAlreadyValidated(!!found);
      });
  }, [user, selected, done]);

  if (!hasContent) return <div className="py-6"></div>;

  if (done || isAlreadyValidated) {
    return (
      <div className="flex flex-col items-center py-6 gap-4">
        <div className="text-green-500 font-bold text-lg">Bravo, tu as validé ce chapitre ! 🎉</div>
        {nextKey && (
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-6 rounded-lg shadow transition-all duration-150"
            onClick={() => setSelected(nextKey)}
          >
            Passer au chapitre suivant
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6">
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-6 rounded-lg shadow transition-all duration-150 mt-4"
        onClick={async () => {
          if (!user) return;
          await fetch(`${API_URL}/api/progress/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              chapitreKey: selected,
              tempsPasse: elapsed, // on envoie le temps cumulé
              dateValidation: new Date().toISOString(),
            }),
          });
          localStorage.removeItem(`elapsed_${user.id}_${selected}`); // On efface la sauvegarde locale
          setDone(true);
          setProgressRefreshKey(k => k + 1); // Force le refresh du menu latéral
        }}
      >
        J’ai terminé ce chapitre
      </button>
    </div>
  );
} 