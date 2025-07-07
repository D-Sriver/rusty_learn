import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/cours', label: 'Cours' },
  { to: '/ressources', label: 'Ressources' },
];

export default function HeaderMenu() {
  const location = useLocation();

  return (
    <header
      className="w-1/2 min-w-400px md:min-w-300px shadow-xl backdrop-blur-md bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center gap-2 md:gap-8 p-3"
    >
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`rounded-xl font-bold text-yellow-400 hover:bg-yellow-400/10 transition-colors bg-transparent px-4 py-2 select-none cursor-pointer \
            ${location.pathname === link.to ? 'ring-2 ring-yellow-400/30' : ''}`}
          style={{ WebkitBackdropFilter: 'blur(5px)' }}
        >
          {link.label}
        </Link>
      ))}
    </header>
  );
}
