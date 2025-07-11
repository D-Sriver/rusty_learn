import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/cours', label: 'Cours' },
  { to: '/ressources', label: 'Ressources' },
];

export default function HeaderMenu() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (!open) setVisible(true); // Toujours rendre visible AVANT d'ouvrir
    setOpen((v) => !v);
  };

  // Gère la présence dans le DOM
  useEffect(() => {
    if (open && dropdownRef.current) {
      // On force la hauteur à "auto" après l'expansion pour éviter le bug du double clic
      setMaxHeight(dropdownRef.current.scrollHeight + "px");
      const timeout = setTimeout(() => {
        if (dropdownRef.current && open) {
          setMaxHeight("999px"); // assez grand pour ne jamais couper le menu
        }
      }, 220);
      return () => clearTimeout(timeout);
    } else {
      setMaxHeight("0px");
    }
  }, [open]);

  useEffect(() => {
    if (!open && visible) {
      const timeout = setTimeout(() => setVisible(false), 220);
      return () => clearTimeout(timeout);
    }
    if (open && !visible) {
      setVisible(true);
    }
  }, [open, visible]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  // Fermer le dropdown si clic en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header
      className="w-11/12 shadow-xl backdrop-blur-md bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center p-3 fixed top-4 left-1/2 -translate-x-1/2 z-50"
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
        {user ? (
          <div className="relative">
            <button
              ref={buttonRef}
              className="font-bold text-lg px-4 py-1 rounded-2xl transition-colors duration-200 select-none cursor-pointer text-yellow-400 ring-2"
              title={user.username}
              onClick={handleToggle}
            >
              {user.username}
            </button>
            {visible && (
              <div
                ref={dropdownRef}
                style={{
                  maxHeight: open ? maxHeight : "0px",
                  transition: "max-height 0.22s cubic-bezier(0.4,0,0.2,1)",
                  overflow: "hidden",
                }}
                className={`absolute left-0 mt-2 w-44 bg-transparent backdrop-blur-sm rounded-xl shadow-lg border-2 border-yellow-400 flex flex-col z-50 ${open ? "" : "pointer-events-none"}`}
              >
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-left text-yellow-50 hover:text-yellow-400 rounded-t-xl transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-yellow-50 hover:text-yellow-400 rounded-b-xl transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="font-bold text-lg px-4 py-1 rounded-2xl transition-colors duration-200 select-none cursor-pointer text-yellow-400 hover:bg-yellow-300 hover:text-yellow-900">
            Connexion
          </Link>
        )}
      </nav>
    </header>
  );
}
