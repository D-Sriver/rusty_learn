import React, {useEffect, useState} from 'react';
import { MDXProvider } from '@mdx-js/react';
import * as mdxPagesRaw from '../articles/mdxIndex';
import { coursTree } from '../articles/coursData';
import SideMenu from './SideMenu';
import MobileSideMenu from './MobileSideMenu';
import AstuceRusty from './AstuceRusty';
import QCMDirect from './QCMDirect';
import { useLocation } from 'react-router-dom';
import { useCoursStore } from '../store/useCoursStore';

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

  // N'affiche le menu que si selected est initialisé
  if (!selected) {
    return null; // ou un loader si tu veux
  }

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
      <aside className="md:w-96 md:sticky top-32 z-10 hidden md:block">
        <SideMenu selected={selected} onSelect={setSelected} />
      </aside>
      <div className="relative w-full ">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <div className="border-b border-white/20 px-8 pt-4 pb-4 md:px-8 md:pt-8 md:pb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 drop-shadow mb-0">{selectedLabel}</h2>
          </div>
          <div className="prose prose-invert">
            <MDXProvider components={components}>
              {SelectedComponent && React.createElement(SelectedComponent)}
            </MDXProvider>
          </div>
        </div>
      </div>
    </div>
  );
} 