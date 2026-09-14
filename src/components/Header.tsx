import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../types';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <header
      className={`border-b px-4 py-3 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors backdrop-blur-md ${
        isDark
          ? 'border-zinc-800/80 bg-[#09090b]/80'
          : 'border-[#d8cfbe]/80 bg-[#eee8dd]/80'
      }`}
    >
      {/* Left Branding */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FF5500]/50 shadow-md">
          <img src="./profile.png" alt="Vijai Rangan" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className={`font-serif font-semibold text-lg tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
            Vijai Rangan
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`p-2 border rounded-lg transition-colors ${
            isDark
              ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-amber-400'
              : 'bg-[#f4efe6] hover:bg-[#e4ddd0] border-[#d8cfbe] text-amber-600 shadow-sm'
          }`}
          title={isDark ? 'Switch to Beige Theme' : 'Switch to Dark Theme'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-stone-800" />}
        </button>
      </div>
    </header>
  );
};
