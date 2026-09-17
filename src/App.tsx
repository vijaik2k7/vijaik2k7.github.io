import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeMode } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WeekendReadings } from './components/WeekendReadings';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { ReadingPage } from './components/ReadingPage';
import { KineticRoutinePage } from './components/KineticRoutinePage';
import { FoodAnalyzerPage } from './food-analyzer/FoodAnalyzerPage';

function HomePage({ theme }: { theme: ThemeMode }) {
  return (
    <>
      <Hero theme={theme} />
      <WeekendReadings theme={theme} />
      <Projects theme={theme} />
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('vijai-portfolio-theme');
    return (saved === 'dark' ? 'dark' : 'beige') as ThemeMode;
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('vijai-portfolio-theme', theme);
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
          <Route path="/reading/:id" element={<ReadingPage theme={theme} />} />
          <Route path="/food-analyzer" element={<FoodAnalyzerPage theme={theme} />} />
          <Route path="/kinetic-routine/*" element={<KineticRoutinePage />} />
        </Routes>
      </main>

      <Footer theme={theme} />
    </div>
  );
}
