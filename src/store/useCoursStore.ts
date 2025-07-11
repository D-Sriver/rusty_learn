import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CoursState {
  selected: string;
  setSelected: (key: string) => void;
}

export const useCoursStore = create<CoursState>()(
  persist(
    (set) => ({
      selected: '',
      setSelected: (key) => set({ selected: key }),
    }),
    {
      name: 'cours-subsection', // clé localStorage
    }
  )
); 