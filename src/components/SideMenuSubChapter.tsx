
export default function SideMenuSubChapter({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-white font-medium flex items-center gap-2
        ${selected ? 'bg-yellow-400 text-yellow-900 shadow font-extrabold' : 'bg-white/5 hover:bg-yellow-300/30 hover:text-yellow-200'}`}
    >
      <span className="w-2 h-2 rounded-full mr-2" style={{ background: selected ? '#facc15' : '#23272e' }}></span>
      {label}
    </button>
  );
} 