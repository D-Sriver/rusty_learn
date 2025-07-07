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
      role="banner"
      aria-label="En-tête principal"
    >
      <nav aria-label="Menu principal" className="flex items-center gap-2 md:gap-8 w-full justify-center">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`rounded-xl font-bold text-yellow-400 hover:ring-3 transition-colors bg-transparent px-4 py-2 select-none cursor-pointer \
            ${location.pathname === link.to ? 'ring-2 bg-yellow-300 text-yellow-900 border-yellow-200/60 ' : ''}`}
            style={{ WebkitBackdropFilter: 'blur(5px)' }}
            aria-current={location.pathname === link.to ? 'page' : undefined}
            tabIndex={0}
            role="link"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
