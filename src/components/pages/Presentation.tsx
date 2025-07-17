// @ts-nocheck
import React from 'react';
import logo from '/rusty.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Presentation() {
  const commencerBtnRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (commencerBtnRef.current) {
      gsap.fromTo(
        commencerBtnRef.current,
        { scale: 0.8, boxShadow: '0 0 0px 0px #fde047' },
        {
          scale: 1,
          boxShadow: '0 0 16px 2px #fde04780',
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)',
        }
      );
    }
  }, []);

  return (
    <section className="rounded-2xl flex-col shadow-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center md:w-10/12 w-11/12 gap-8 p-10" aria-labelledby="titre-presentation" role="region">

      <div className="flex flex-row items-center gap-6 mb-4">
        <div className="flex-shrink-0 flex flex-col items-center">
            <img src={logo} alt="Rusty la mascotte" className="w-50 h-40 drop-shadow-2xl" />
        </div>
      </div>
        <p className="text-lg md:text-xl text-white font-mono text-center leading-relaxed max-w-2xl mb-2">
          Découvre des cours de rust comme nul autre pareil, des ressources, des défis pour devenir un pro du langage Rust.<br/>
          <span className="text-yellow-500 font-bold">Guidé par Rusty, la mascotte la plus pinceante du web&nbsp;!</span>
        </p>
      <Link
        to="/cours"
        ref={commencerBtnRef}
        className="mt-2 bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-extrabold text-lg px-8 py-3 rounded-full shadow-lg border-2 border-yellow-200/60 transition-colors duration-200 focus:outline-none"
        style={{ WebkitBackdropFilter: 'blur(5px)' }}
        onMouseEnter={() => {
          if (commencerBtnRef.current) {
            gsap.to(commencerBtnRef.current, { scale: 1.08, boxShadow: '0 0 24px 4px #fde047cc', duration: 0.2 });
          }
        }}
        onMouseLeave={() => {
          if (commencerBtnRef.current) {
            gsap.to(commencerBtnRef.current, { scale: 1, boxShadow: '0 0 16px 2px #fde04780', duration: 0.2 });
          }
        }}
        aria-label="Commencer le cours"
        role="button"
      >
        Commencer
      </Link>
    </section>
  );
}

