import { useState } from 'react';
import SideMenu from './SideMenu';
import MobileSideMenu from './MobileSideMenu';
import { coursTree } from '../articles/coursData';

export default function RessourcesPage() {
  // On prend la première clé par défaut
  const defaultKey = coursTree[0].children[0].key;
  const [selected, setSelected] = useState(defaultKey);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="cours-card flex flex-col md:flex-row justify-center items-start min-h-[70vh] w-10/12 gap-6 md:gap-7">
      {/* Burger menu mobile */}
      <MobileSideMenu selected={selected} onSelect={setSelected} open={mobileMenuOpen} setOpen={setMobileMenuOpen} />

      <div className="relative w-full max-w-11/12 ">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <div className="border-b border-white/20 px-8 pt-8 pb-4 md:px-14 md:pt-14 md:pb-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 drop-shadow mb-0">Ressources</h2>
          </div>
          <div className="prose prose-invert p-8 text-center text-yellow-200 text-xl">
            Page Ressources à venir !
          </div>
        </div>
      </div>
    </div>
  );
} 