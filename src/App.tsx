import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StarField from './components/StarField';
import HeaderMenu from './components/HeaderMenu';
import Presentation from './components/Presentation';
import HeroSection from './components/HeroSection';

const App = () => {
  return (
    <BrowserRouter>
      <StarField />
      <div className="w-full flex justify-center p-8 overflow-hidden">
        <HeaderMenu />
      </div>
      <main className='flex flex-col items-center justify-center'>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <Presentation />
            </>
          } />
          <Route path="/cours" element={<div className="text-white text-2xl mt-20">Page Cours à venir !</div>} />
          <Route path="/ressources" element={<div className="text-white text-2xl mt-20">Page Ressources à venir !</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;