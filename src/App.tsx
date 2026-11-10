import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeMode } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { KineticRoutinePage } from './components/KineticRoutinePage';
import { FoodAnalyzerPage } from './food-analyzer/FoodAnalyzerPage';

function HomePage({ theme }: { theme: ThemeMode }) {
  return (
    <>
      <Hero theme={theme} />
      <Projects theme={theme} />
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = typeof localStorage?.getItem === 'function' ? localStorage.getItem('vijai-portfolio-theme') : null;
      return (saved === 'dark' ? 'dark' : 'beige') as ThemeMode;
    } catch {
      return 'beige';
    }
  });

  const location = useLocation();

  useEffect(() => {
    try {
      if (typeof localStorage?.setItem === 'function') {
        localStorage.setItem('vijai-portfolio-theme', theme);
      }
    } catch {
      // Ignore storage errors
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'beige' : 'dark'));
  };

  const isDark = theme === 'dark';
  const isKineticApp = location.pathname.startsWith('/kinetic-routine');

  if (isKineticApp) {
    return <KineticRoutinePage />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDark ? 'bg-[#09090b] text-zinc-100' : 'bg-[#eee8dd] text-stone-900'
      }`}
    >
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
          <Route path="/food-analyzer" element={<FoodAnalyzerPage theme={theme} />} />
          <Route path="/kinetic-routine/*" element={<KineticRoutinePage />} />
        </Routes>
      </main>

      <Footer theme={theme} />
    </div>
  );
}
