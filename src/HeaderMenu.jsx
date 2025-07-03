import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/cours', label: 'Cours' },
  { to: '/ressources', label: 'Ressources' },
];

export default function HeaderMenu() {
  const location = useLocation();
  const headerRef = useRef(null);

  // Effet bounce au clic
  const handleClick = () => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { scale: 1 },
        { scale: 1.08, yoyo: true, repeat: 1, duration: 0.22, ease: 'bounce.out' }
      );
    }
  };

  // Draggable GSAP avec effet gelée au retour
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let draggable = Draggable.create(header, {
      type: 'x,y',
      inertia: false,
      onRelease: function () {
        // Animation retour + effet gelée
        gsap.to(header, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'expo.out',
          onStart: () => {
            gsap.to(header, {
              scaleX: 1.18,
              scaleY: 0.85,
              duration: 0.18,
              ease: 'power1.out',
              yoyo: true,
              repeat: 1,
              onComplete: () => {
                gsap.to(header, { scaleX: 1, scaleY: 1, duration: 0.18, ease: 'elastic.out(1, 0.4)' });
              }
            });
          },
        });
      },
    })[0];
    return () => {
      if (draggable) draggable.kill();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-30 w-[90vw] max-w-3xl rounded-2xl shadow-xl backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center gap-8 py-3 px-6 cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    >
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={handleClick}
          className={`font-bold text-lg px-4 py-1 rounded transition-colors duration-200 select-none cursor-pointer
            ${location.pathname === link.to ? 'text-yellow-400' : 'text-white/90 hover:text-yellow-300'}`}
          style={{ WebkitBackdropFilter: 'blur(8px)' }}
        >
          {link.label}
        </Link>
      ))}
    </header>
  );
} 