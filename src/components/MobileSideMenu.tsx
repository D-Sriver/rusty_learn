import React, { useRef, useEffect } from 'react';
import SideMenu from './SideMenu';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';

function BurgerIcon({ open }: { open: boolean }) {
  const top = React.useRef<HTMLDivElement>(null);
  const mid = React.useRef<HTMLDivElement>(null);
  const bot = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (top.current && mid.current && bot.current) {
      if (open) {
        gsap.to(top.current, { y: 10, rotate: 45, duration: 0.3, ease: 'power2.inOut' });
        gsap.to(mid.current, { opacity: 0, duration: 0.2 });
        gsap.to(bot.current, { y: -10, rotate: -45, duration: 0.3, ease: 'power2.inOut' });
      } else {
        gsap.to(top.current, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.inOut' });
        gsap.to(mid.current, { opacity: 1, duration: 0.2 });
        gsap.to(bot.current, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.inOut' });
      }
    }
  }, [open]);

  return (
    <div className="relative w-8 h-8 flex flex-col items-center justify-center">
      <div ref={top} className="absolute w-8 h-1 bg-yellow-900 rounded transition-all" style={{ top: 4, left: 0 }} />
      <div ref={mid} className="absolute w-8 h-1 bg-yellow-900 rounded transition-all" style={{ top: 14, left: 0 }} />
      <div ref={bot} className="absolute w-8 h-1 bg-yellow-900 rounded transition-all" style={{ top: 24, left: 0 }} />
    </div>
  );
}

export default function MobileSideMenu({ selected, onSelect, open, setOpen }: { selected: string, onSelect: (key: string) => void, open: boolean, setOpen: (open: boolean) => void }) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Animation GSAP
  useEffect(() => {
    if (drawerRef.current && overlayRef.current) {
      if (open) {
        gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.2 });
        gsap.to(drawerRef.current, { x: 0, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(drawerRef.current, { x: '100%', duration: 0.3, ease: 'power2.in' });
        gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.2 });
      }
    }
  }, [open]);

  // Fermer le menu si on clique sur une entrée
  const handleSelect = (key: string) => {
    onSelect(key);
    setOpen(false);
  };

  // Fermer si on clique sur l'overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) setOpen(false);
  };

  // Fermer le menu quand on clique sur un lien principal
  const handleNavClick = () => setOpen(false);

  return (
    <>
      {/* Burger visible uniquement sur mobile */}
      <button
        className="md:hidden fixed top-4 right-4 z-40 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-full w-14 h-14 flex items-center justify-center shadow-lg focus:outline-none"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen(!open)}
      >
        <BurgerIcon open={open} />
      </button>
      {/* Overlay + Drawer */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-30 bg-black/70 opacity-0 pointer-events-none md:hidden"
        onClick={handleOverlayClick}
        tabIndex={-1}
      >
        <div
          ref={drawerRef}
          className="absolute top-0 right-0 h-lvh w-4/5 max-w-xs bg-[#0a0f38] text-yellow-400 p-0 pt-0 translate-x-full flex flex-col focus:outline-none"
          style={{ borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }}
          tabIndex={0}
        >
          <div className="flex items-center justify-between px-4 py-4">
            
          </div>
          {/* Liens principaux */}
          <nav className="flex flex-col gap-2 px-4 pt-12">
            <Link
              to="/"
              onClick={handleNavClick}
              className={`block w-full rounded-xl px-4 py-3 text-lg font-bold text-yellow-900 bg-yellow-400 hover:bg-yellow-500 transition-colors ${location.pathname === '/' ? 'ring-2 ring-yellow-300' : ''}`}
            >
              Accueil
            </Link>
            <Link
              to="/cours"
              onClick={handleNavClick}
              className={`block w-full rounded-xl px-4 py-3 text-lg font-bold text-yellow-900 bg-yellow-400 hover:bg-yellow-500 transition-colors ${location.pathname.startsWith('/cours') ? 'ring-2 ring-yellow-300' : ''}`}
            >
              Cours
            </Link>
            <Link
              to="/ressources"
              onClick={handleNavClick}
              className={`block w-full rounded-xl px-4 py-3 text-lg font-bold text-yellow-900 bg-yellow-400 hover:bg-yellow-500 transition-colors ${location.pathname.startsWith('/ressources') ? 'ring-2 ring-yellow-300' : ''}`}
            >
              Ressources
            </Link>
          </nav>
          <div className="flex-1 overflow-y-auto px-2 py-4">
            <SideMenu selected={selected} onSelect={handleSelect} />
          </div>
        </div>
      </div>
    </>
  );
} 