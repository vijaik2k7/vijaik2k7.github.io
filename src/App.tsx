import { useState } from 'react';
import { ThemeMode } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('beige');

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

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDark ? 'bg-[#09090b] text-zinc-100' : 'bg-[#eee8dd] text-stone-900'
      }`}
    >
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1">
        <Hero theme={theme} />
        <Projects theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}
