import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StarField from './components/StarField';
import HeaderMenu from './components/HeaderMenu';
import Presentation from './components/Presentation';
import HeroSection from './components/HeroSection';
import CoursPage from './components/CoursPage';
import RessourcesPage from './components/RessourcesPage';
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <StarField />
      <div className="w-full justify-center p-8  hidden md:flex">
        <HeaderMenu />
      </div>
      <main className='flex flex-col items-center justify-center py-8' id="contenu-principal" tabIndex={-1} aria-label="Contenu principal" role="main">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <Presentation />
            </>
          } />
          <Route path="/cours" element={<CoursPage />} />
          <Route path="/ressources" element={<RessourcesPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;