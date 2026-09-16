import React from 'react';
import { Sun, Moon, HelpCircle, Dumbbell } from 'lucide-react';
import { DaySplitId, PhaseId } from '../types/workout';

interface HeaderProps {
  currentDay: DaySplitId;
  onSelectDay: (day: DaySplitId) => void;
  currentPhase: PhaseId;
  onSelectPhase: (phase: PhaseId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDay,
  onSelectDay,
  currentPhase,
  onSelectPhase,
  isDark,
  onToggleTheme,
  onOpenGuide,
}) => {
  const isTuesday = new Date().getDay() === 2;
  const isSaturday = new Date().getDay() === 6;

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FAF9F6]/90 dark:bg-[#141413]/90 backdrop-blur-md border-b border-[#E6E2D8] dark:border-[#2A2A27] transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & App Title */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D97757] text-white flex items-center justify-center shadow-sm">
              <Dumbbell size={20} />
            </div>
            <div>
              <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[#1F1E1B] dark:text-[#EDECE8]">
                Kinetic Routine
              </h1>
              <p className="text-[11px] font-mono text-[#706E6B] dark:text-[#A09E9A]">
                Twice-Weekly Full-Body Split
              </p>
            </div>
          </div>

          {/* Mobile Right Action Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={onOpenGuide}
              className="p-2 text-[#706E6B] hover:text-[#D97757] dark:text-[#A09E9A] dark:hover:text-[#E07A5F] rounded-lg transition-colors"
              title="Program Guide"
            >
              <HelpCircle size={20} />
            </button>
            <button
              onClick={onToggleTheme}
              className="p-2 text-[#706E6B] hover:text-[#D97757] dark:text-[#A09E9A] dark:hover:text-[#E07A5F] rounded-lg transition-colors"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Center: Day Split & Phase Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
          {/* Day A vs Day B Selector */}
          <div className="flex items-center p-1 bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl text-xs font-medium">
            <button
              onClick={() => onSelectDay('Day A')}
              className={`relative px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                currentDay === 'Day A'
                  ? 'bg-[#D97757] text-white shadow-sm font-semibold'
                  : 'text-[#706E6B] dark:text-[#A09E9A] hover:text-[#1F1E1B] dark:hover:text-[#EDECE8]'
              }`}
            >
              <span>Day A (Tue)</span>
              {isTuesday && currentDay === 'Day A' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              )}
            </button>

            <button
              onClick={() => onSelectDay('Day B')}
              className={`relative px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                currentDay === 'Day B'
                  ? 'bg-[#D97757] text-white shadow-sm font-semibold'
                  : 'text-[#706E6B] dark:text-[#A09E9A] hover:text-[#1F1E1B] dark:hover:text-[#EDECE8]'
              }`}
            >
              <span>Day B (Sat)</span>
              {isSaturday && currentDay === 'Day B' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              )}
            </button>
          </div>

          {/* Phase Selector Dropdown */}
          <div className="relative">
            <select
              value={currentPhase}
              onChange={(e) => onSelectPhase(Number(e.target.value) as PhaseId)}
              className="appearance-none bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] text-[#1F1E1B] dark:text-[#EDECE8] text-xs font-medium px-3 py-2 pr-7 rounded-xl cursor-pointer hover:border-[#D97757] focus:ring-[#D97757]"
            >
              <option value={1}>Phase 1: Foundation (W1–4)</option>
              <option value={2}>Phase 2: Overload (W5–8)</option>
              <option value={3}>Phase 3: High-Intensity (W9–12)</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#706E6B] dark:text-[#A09E9A] text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* Desktop Action Controls */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={onOpenGuide}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#706E6B] dark:text-[#A09E9A] hover:text-[#D97757] dark:hover:text-[#E07A5F] bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl transition-colors"
          >
            <HelpCircle size={15} />
            <span>Guide</span>
          </button>
          
          <button
            onClick={onToggleTheme}
            className="p-2 text-[#706E6B] dark:text-[#A09E9A] hover:text-[#D97757] dark:hover:text-[#E07A5F] bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

      </div>
    </header>
  );
};
