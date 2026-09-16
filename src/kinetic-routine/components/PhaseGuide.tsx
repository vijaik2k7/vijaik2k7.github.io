import React from 'react';
import { X, Award, Flame, Dumbbell } from 'lucide-react';
import { PHASES } from '../data/workouts';

interface PhaseGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhaseGuide: React.FC<PhaseGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] dark:bg-[#141413] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E6E2D8] dark:border-[#2A2A27] pb-4 mb-6">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D97757] text-white flex items-center justify-center">
              <Award size={18} />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1F1E1B] dark:text-[#EDECE8]">
                12-Week Hypertrophy & Strength Program
              </h2>
              <p className="text-xs text-[#706E6B] dark:text-[#A09E9A] font-mono">
                Twice-per-week Full-Body Multi-Joint System
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#706E6B] hover:text-[#1F1E1B] dark:text-[#A09E9A] dark:hover:text-[#EDECE8] rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Overview Banner */}
        <div className="bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl p-4 mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#D97757] dark:text-[#E07A5F] font-bold mb-1 flex items-center space-x-1.5">
            <Flame size={15} />
            <span>Core Philosophy</span>
          </h3>
          <p className="text-xs text-[#1F1E1B] dark:text-[#EDECE8] leading-relaxed">
            Spacing high-stimulus full-body sessions 48 to 72 hours apart (e.g., Tuesday and Saturday) maximizes muscular protein synthesis (MPS) while ensuring optimal nervous system recovery and endocrine response.
          </p>
        </div>

        {/* 3 Phase Cards */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#706E6B] dark:text-[#A09E9A]">
            Progression Across 3 Phases
          </h3>

          {[1, 2, 3].map((num) => {
            const p = PHASES[num as 1 | 2 | 3];
            return (
              <div
                key={num}
                className="bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-serif font-bold text-sm text-[#1F1E1B] dark:text-[#EDECE8]">
                    {p.name}
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-[#D97757]/15 text-[#D97757] dark:text-[#E07A5F] rounded-md font-semibold">
                    {p.duration}
                  </span>
                </div>
                <p className="text-xs text-[#706E6B] dark:text-[#A09E9A] mb-2 font-mono">
                  {p.repRange} • {p.rpeTarget} ({p.rpeDescription}) • Rest {p.recommendedRestSeconds}s
                </p>
                <p className="text-xs text-[#1F1E1B] dark:text-[#EDECE8]">
                  {p.strategy}
                </p>
              </div>
            );
          })}
        </div>

        {/* Exercise Evolution Tree */}
        <div className="bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl p-4 mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#706E6B] dark:text-[#A09E9A] font-bold mb-3 flex items-center space-x-1.5">
            <Dumbbell size={15} className="text-[#D97757]" />
            <span>Movement Evolution Over Time</span>
          </h3>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2 bg-[#FAF9F6] dark:bg-[#141413] rounded-lg border border-[#E6E2D8] dark:border-[#2A2A27]">
              <strong className="text-[#D97757]">Squat:</strong> Goblet Squat → Barbell Back Squat → Paused Squat
            </div>
            <div className="p-2 bg-[#FAF9F6] dark:bg-[#141413] rounded-lg border border-[#E6E2D8] dark:border-[#2A2A27]">
              <strong className="text-[#D97757]">Hinge:</strong> DB Romanian Deadlift → Trap Bar Deadlift → Barbell Conventional Deadlift
            </div>
            <div className="p-2 bg-[#FAF9F6] dark:bg-[#141413] rounded-lg border border-[#E6E2D8] dark:border-[#2A2A27]">
              <strong className="text-[#D97757]">Push:</strong> DB Floor/Bench Press → Barbell Bench Press → Heavy Standing Overhead Press
            </div>
            <div className="p-2 bg-[#FAF9F6] dark:bg-[#141413] rounded-lg border border-[#E6E2D8] dark:border-[#2A2A27]">
              <strong className="text-[#D97757]">Pull:</strong> Inverted Rows / Lat Pulldown → Chest-Supported Rows / Pull-Ups → Pendlay / Weighted Pull-Ups
            </div>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#D97757] hover:bg-[#D97757]/90 text-white font-medium rounded-xl transition-colors"
        >
          Got It, Back to Workout
        </button>

      </div>
    </div>
  );
};
