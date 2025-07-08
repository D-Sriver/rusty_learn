import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import StarField from './components/StarField';
import HeaderMenu from './components/HeaderMenu';
import Presentation from './components/Presentation';
import HeroSection from './components/HeroSection';
import CoursPage from './components/CoursPage';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <BrowserRouter>
      <StarField />
      <div className="w-full justify-center p-8 overflow-hidden hidden md:flex">
        <HeaderMenu />
      </div>
      <main className='flex flex-col items-center justify-center' id="contenu-principal" tabIndex={-1} aria-label="Contenu principal" role="main">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <Presentation />
            </>
          } />
          <Route path="/cours" element={<CoursPage setMobileMenuOpen={setMobileMenuOpen} />} />
          <Route path="/ressources" element={<div className="text-white text-2xl mt-20">Page Ressources à venir !</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;