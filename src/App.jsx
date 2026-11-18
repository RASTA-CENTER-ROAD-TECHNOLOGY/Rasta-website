import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ResponsiveNavigation from './components/nav/ResponsiveNavigation';
import Footer from './components/layout/Footer';
import { useInitialScreenMode } from './hooks/useInitialScreenMode';

import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Training from './pages/Training';
import Research from './pages/Research';
import Consultancy from './pages/Consultancy';
import Laboratories from './pages/Laboratories';
import Projects from './pages/Projects';
import Alumni from './pages/Alumni';
import Contact from './pages/Contact';
import Terms from './pages/Terms';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AppShell() {
  const { isMobile } = useInitialScreenMode();

  return (
    <ResponsiveNavigation isMobile={isMobile}>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/training" element={<Training />} />
        <Route path="/research" element={<Research />} />
        <Route path="/consultancy" element={<Consultancy />} />
        <Route path="/laboratories" element={<Laboratories />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </ResponsiveNavigation>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
