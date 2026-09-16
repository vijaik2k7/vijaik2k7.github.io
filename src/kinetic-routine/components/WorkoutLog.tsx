import React from 'react';
import { Trophy, CheckCircle2, Trash2 } from 'lucide-react';
import { CompletedSessionLog } from '../types/workout';

interface WorkoutLogProps {
  completedSessions: CompletedSessionLog[];
  onClearHistory: () => void;
}

export const WorkoutLog: React.FC<WorkoutLogProps> = ({ completedSessions, onClearHistory }) => {
  const totalWorkouts = completedSessions.length;

  return (
    <div className="w-full bg-[#FAF9F6] dark:bg-[#141413] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-2xl p-5 md:p-6 shadow-sm mt-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E6E2D8] dark:border-[#2A2A27] pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Trophy size={18} className="text-[#D97757]" />
          <h3 className="font-serif text-lg font-bold text-[#1F1E1B] dark:text-[#EDECE8]">
            Workout History & Streak Log
          </h3>
        </div>

        {totalWorkouts > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs text-[#706E6B] hover:text-red-500 dark:text-[#A09E9A] dark:hover:text-red-400 flex items-center space-x-1 transition-colors"
          >
            <Trash2 size={13} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-[#F3F0E9] dark:bg-[#1E1E1C] p-3 rounded-xl border border-[#E6E2D8] dark:border-[#2A2A27] text-center">
          <span className="block text-2xl font-mono font-bold text-[#D97757]">
            {totalWorkouts}
          </span>
          <span className="text-[11px] font-mono text-[#706E6B] dark:text-[#A09E9A]">
            Sessions Completed
          </span>
        </div>

        <div className="bg-[#F3F0E9] dark:bg-[#1E1E1C] p-3 rounded-xl border border-[#E6E2D8] dark:border-[#2A2A27] text-center">
          <span className="block text-2xl font-mono font-bold text-[#1F1E1B] dark:text-[#EDECE8]">
            2× / Wk
          </span>
          <span className="text-[11px] font-mono text-[#706E6B] dark:text-[#A09E9A]">
            Tue / Sat Frequency
          </span>
        </div>

        <div className="col-span-2 md:col-span-1 bg-[#F3F0E9] dark:bg-[#1E1E1C] p-3 rounded-xl border border-[#E6E2D8] dark:border-[#2A2A27] text-center">
          <span className="block text-2xl font-mono font-bold text-[#1F1E1B] dark:text-[#EDECE8]">
            48–72h
          </span>
          <span className="text-[11px] font-mono text-[#706E6B] dark:text-[#A09E9A]">
            Recovery Window
          </span>
        </div>
      </div>

      {/* Sessions List */}
      {totalWorkouts === 0 ? (
        <div className="text-center py-6 text-xs text-[#706E6B] dark:text-[#A09E9A] font-mono border border-dashed border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl">
          No completed sessions logged yet. Complete sets above to record your first workout!
        </div>
      ) : (
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          {completedSessions.map((session) => (
            <div
              key={session.id}
              className="p-3 bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <div>
                  <span className="font-semibold text-[#1F1E1B] dark:text-[#EDECE8] block">
                    {session.daySplit} • Phase {session.phase}
                  </span>
                  <span className="text-[11px] text-[#706E6B] dark:text-[#A09E9A] font-mono">
                    {session.dateString}
                  </span>
                </div>
              </div>

              <span className="font-mono text-[11px] bg-[#FAF9F6] dark:bg-[#141413] px-2.5 py-1 rounded-md border border-[#E6E2D8] dark:border-[#2A2A27] text-[#1F1E1B] dark:text-[#EDECE8]">
                {session.exercises.length} Exercises Done
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
