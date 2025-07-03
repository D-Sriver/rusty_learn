import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StarField from './StarField';
import HeaderMenu from './HeaderMenu';
import logo from '/rusty.png'

function Intro() {
  return (
    <header className="relative flex flex-col items-center justify-center min-h-screen text-center z-10">
      <img src={logo} alt="Rusty Learn" className="w-1/8" />
      <h1
        className="text-7xl md:text-8xl font-extrabold tracking-tight mb-4"
        style={{ color: '#FFB000', textShadow: '0 2px 16px #0d133d' }}
      >
        Rusty <span className="text-white">Learn</span>
      </h1>
      <h2 className="text-2xl md:text-3xl font-mono font-bold text-white mb-6 drop-shadow">
        Des base solides pour les développeurs curieux
      </h2>
    </header>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <StarField />
      <HeaderMenu />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;