import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Wrench, Home, PenLine } from 'lucide-react';
import { ThemeMode } from '../types';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const isDark = theme === 'dark';
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(!isHomePage);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isHomePage) {
      setScrolledPastHero(true);
      return;
    }

    const handleScroll = () => {
      // Threshold: Scroll position past the Hero title (~180px)
      if (window.scrollY > 180) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    if (!isHomePage) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`border-b sticky top-0 z-40 transition-all duration-300 backdrop-blur-md ${
        isDark
          ? 'border-zinc-800/80 bg-[#09090b]/85'
          : 'border-[#d8cfbe]/80 bg-[#eee8dd]/85'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 sm:px-8 flex items-center justify-between">
        
        {/* Left Container: Hamburger Menu transitioning to Profile Pic + Name */}
        <div className="relative flex items-center h-9">

          {/* STATE 1: Hamburger Menu Button (visible when AT TOP before scrolling) */}
          <div
            className={`transition-all duration-300 transform flex items-center ${
              !scrolledPastHero
                ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-x-3 pointer-events-none absolute left-0'
            }`}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl border flex items-center gap-2 transition-all ${
                isDark
                  ? 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                  : 'bg-[#f4efe6] hover:bg-[#e4ddd0] border-[#d8cfbe] text-stone-700 hover:text-stone-900 shadow-sm'
              }`}
              title="Navigation Menu"
              aria-label="Navigation Menu"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-[#FF5500]" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              <span className="text-xs font-mono font-medium hidden sm:inline-block">Menu</span>
            </button>
          </div>

          {/* STATE 2: Profile Pic + Name (visible AFTER scrolling down past hero name) */}
          <div
            className={`transition-all duration-300 transform flex items-center ${
              scrolledPastHero
                ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 scale-95 translate-x-3 pointer-events-none absolute left-0'
            }`}
          >
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D97757]/40 shadow-sm group-hover:border-[#FF5500] transition-colors shrink-0">
                <img src="./profile.png" alt="Vijai Rangan" className="w-full h-full object-cover" />
              </div>
              <span className={`font-serif font-bold text-base tracking-tight group-hover:text-[#FF5500] transition-colors ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Vijai Rangan
              </span>
            </Link>

            {/* Optional Small Menu trigger next to name when scrolled */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`ml-3 p-1.5 rounded-lg border text-xs transition-colors ${
                isDark
                  ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  : 'border-[#d8cfbe] text-stone-500 hover:text-stone-900 hover:bg-[#e4ddd0]'
              }`}
              title="Menu"
            >
              {isMenuOpen ? <X className="w-3.5 h-3.5 text-[#FF5500]" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Right Controls: Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className={`p-2 border rounded-xl transition-colors ${
              isDark
                ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-amber-400'
                : 'bg-[#f4efe6] hover:bg-[#e4ddd0] border-[#d8cfbe] text-stone-700 shadow-sm'
            }`}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Popover Navigation Menu Drawer */}
      {isMenuOpen && (
        <div
          className={`border-b animate-fade-in transition-colors ${
            isDark
              ? 'bg-[#0e0e10] border-zinc-800 text-zinc-200'
              : 'bg-[#eee8dd] border-[#d8cfbe] text-stone-800'
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`p-3 rounded-xl border font-mono text-xs font-semibold flex items-center gap-2.5 transition-all ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800 hover:border-[#FF5500] hover:text-white'
                  : 'bg-[#f4efe6] border-[#d8cfbe] hover:border-[#FF5500] hover:bg-[#e8e1d3]'
              }`}
            >
              <Home className="w-4 h-4 text-[#FF5500]" />
              <span>Home</span>
            </Link>

            <button
              onClick={() => scrollToSection('projects')}
              className={`p-3 rounded-xl border font-mono text-xs font-semibold flex items-center gap-2.5 transition-all text-left ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800 hover:border-[#FF5500] hover:text-white'
                  : 'bg-[#f4efe6] border-[#d8cfbe] hover:border-[#FF5500] hover:bg-[#e8e1d3]'
              }`}
            >
              <Wrench className="w-4 h-4 text-[#FF5500]" />
              <span>Web Utilities</span>
            </button>

            <button
              onClick={() => scrollToSection('writing')}
              className={`p-3 rounded-xl border font-mono text-xs font-semibold flex items-center gap-2.5 transition-all text-left ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800 hover:border-[#FF5500] hover:text-white'
                  : 'bg-[#f4efe6] border-[#d8cfbe] hover:border-[#FF5500] hover:bg-[#e8e1d3]'
              }`}
            >
              <PenLine className="w-4 h-4 text-[#FF5500]" />
              <span>Writing</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
