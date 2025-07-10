import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CoursState {
  selected: string;
  setSelected: (key: string) => void;
  chapitresLus: string[];
  marquerChapitreLu: (slug: string) => void;
  tempsParChapitre: { [slug: string]: number };
  ajouterTempsChapitre: (slug: string, secondes: number) => void;
  resetProgression: () => void;
}

export const useCoursStore = create<CoursState>()(
  persist(
    (set, get) => ({
      selected: '',
      setSelected: (key) => set({ selected: key }),
      chapitresLus: [],
      marquerChapitreLu: (slug) => {
        const exist = get().chapitresLus.includes(slug);
        if (!exist) {
          set({ chapitresLus: [...get().chapitresLus, slug] });
        }
      },
      tempsParChapitre: {},
      ajouterTempsChapitre: (slug, secondes) => {
        const actuel = get().tempsParChapitre[slug] || 0;
        set({ tempsParChapitre: { ...get().tempsParChapitre, [slug]: actuel + secondes } });
      },
      resetProgression: () => {
        set({ chapitresLus: [], tempsParChapitre: {} });
      },
    }),
    {
      name: 'cours-subsection', // clé localStorage
    }
  )
); 