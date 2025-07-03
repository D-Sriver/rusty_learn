import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import CoursContent from '../articles/cours.mdx';
import IntroContent from '../articles/intro.mdx';
import VariablesContent from '../articles/variables.mdx';
import OwnershipContent from '../articles/ownership.mdx';

const coursList = [
  { key: 'intro', label: 'Introduction', component: IntroContent },
  { key: 'variables', label: 'Variables', component: VariablesContent },
  { key: 'ownership', label: 'Ownership', component: OwnershipContent },
  { key: 'cours', label: 'Cours complet', component: CoursContent },
];

const components = {
  // Personnalisation des balises si besoin (ex: h1, code, blockquote...)
};

export default function CoursPage() {
  const [selected, setSelected] = useState('intro');
  const SelectedComponent = coursList.find(c => c.key === selected)?.component || IntroContent;

  return (
    <div className="cours-card flex flex-col md:flex-row justify-center items-start min-h-[70vh] w-10/12 gap-6 md:gap-12">
      <aside className="w-full md:w-64 mb-4 md:mb-0 md:sticky top-32 z-10">
        <nav className="bg-white/10 border border-white/20 rounded-2xl shadow-lg backdrop-blur-xl p-4 flex md:flex-col flex-row gap-2 md:gap-4">
          {coursList.map(c => (
            <button
              key={c.key}
              onClick={() => setSelected(c.key)}
              className={`w-full text-left px-4 py-2 rounded-lg font-bold transition-colors duration-200
                ${selected === c.key ? 'bg-yellow-400 text-yellow-900 shadow' : 'bg-white/5 text-white/90 hover:bg-yellow-300/30 hover:text-yellow-200'}`}
            >
              {c.label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="relative w-full max-w-11/12 ">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.015]">
          <div className="prose prose-invert max-w-none px-8 py-10 md:px-14 md:py-14">
            <MDXProvider components={components}>
              <SelectedComponent />
            </MDXProvider>
          </div>
        </div>
      </div>
    </div>
  );
} 