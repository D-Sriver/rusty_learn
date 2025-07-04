import React from 'react';

export default function AstuceRusty({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-6 p-5 bg-yellow-400/10 border border-yellow-400/40 rounded-2xl shadow-xl backdrop-blur-md flex items-start gap-4">
      <span className="text-3xl select-none" role="img" aria-label="Rusty le crabe">🦀</span>
      <div className="flex-1 text-yellow-100 text-lg font-mono">
        <span className="font-bold text-yellow-300">Astuce de Rusty&nbsp;:</span><br />
        {children}
      </div>
    </aside>
  );
} 