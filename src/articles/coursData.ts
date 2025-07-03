export const coursTree = [
  {
    key: 'chap1',
    label: 'Chapitre 1 : Les bases',
    icon: 'BookOpen',
    children: [
      { key: 'chap1-intro', label: 'Introduction', importKey: 'Chap1Intro' },
      { key: 'chap1-variables', label: 'Variables et Mutabilité', importKey: 'Chap1Variables' },
      { key: 'chap1-types', label: 'Types de base', importKey: 'Chap1Types' },
    ],
  },
  {
    key: 'chap2',
    label: 'Chapitre 2 : Propriété et Emprunt',
    icon: 'BookOpen',
    children: [
      { key: 'chap2-ownership', label: 'Ownership', importKey: 'Chap2Ownership' },
      { key: 'chap2-borrowing', label: 'Borrowing', importKey: 'Chap2Borrowing' },
      { key: 'chap2-lifetimes', label: 'Lifetimes', importKey: 'Chap2Lifetimes' },
    ],
  },
]; 