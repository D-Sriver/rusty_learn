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
      className="w-11/12 shadow-xl backdrop-blur-md bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center p-3"
      role="banner"
      aria-label="En-tête principal"
    >
      <nav aria-label="Menu principal" className="flex items-center gap-2 md:gap-8 w-full justify-center">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`font-bold text-lg px-4 py-1 rounded-2xl transition-colors duration-200 select-none cursor-pointer
            text-yellow-400 \
            ${location.pathname === link.to ? 'ring-2 bg-yellow-300 text-yellow-900' : ''}`}
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
