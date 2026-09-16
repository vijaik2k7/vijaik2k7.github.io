import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeMode } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WeekendReadings } from './components/WeekendReadings';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { ReadingPage } from './components/ReadingPage';
import { KineticRoutinePage } from './components/KineticRoutinePage';

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
  const [theme, setTheme] = useState<ThemeMode>('beige');
  const location = useLocation();

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'beige' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
          <Route path="/kinetic-routine/*" element={<KineticRoutinePage />} />
        </Routes>
      </main>

      <Footer theme={theme} />
    </div>
  );
}

