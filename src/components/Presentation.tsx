// @ts-nocheck
import React from 'react';
import logo from '/rusty.png';

export default function Presentation() {
  return (
    <section className="rounded-2xl flex-col shadow-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center md:w-1/2 w-3/4 gap-8 p-10">

      <div className="flex flex-row items-center gap-6 mb-4">
        <div className="flex-shrink-0 flex flex-col items-center">
            <img src={logo} alt="Rusty la mascotte" className="w-50 h-40 drop-shadow-2xl" />
        </div>
      </div>
        <p className="text-lg md:text-xl text-white font-mono text-center leading-relaxed max-w-2xl mb-2">
          Découvre des cours de rust comme nul autre pareil, des ressources, des défis pour devenir un pro du langage Rust.<br/>
          <span className="text-yellow-500 font-bold">Guidé par Rusty, la mascotte la plus pinceante du web&nbsp;!</span>
        </p>
      <button className="mt-2 bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-extrabold text-lg px-8 py-3 rounded-full shadow-lg border-2 border-yellow-200/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-200/60">
        Commencer
      </button>
    </section>
  );
}

