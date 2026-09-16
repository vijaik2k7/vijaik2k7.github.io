import { useState, useEffect } from 'react';
import { DaySplitId, PhaseId, SetRecord, CompletedSessionLog, ExerciseProgressLog } from './types/workout';
import { getExercisesForDay, detectDefaultDaySplit, PHASES } from './data/workouts';
import { Header } from './components/Header';
import { ExerciseCard } from './components/ExerciseCard';
import { IntervalTimer } from './components/IntervalTimer';
import { PhaseGuide } from './components/PhaseGuide';
import { WorkoutLog } from './components/WorkoutLog';
import { Trophy, CheckCircle } from 'lucide-react';
import { sounds } from './utils/audio';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Day & Phase state
  const [currentDay, setCurrentDay] = useState<DaySplitId>(() => detectDefaultDaySplit());
  const [currentPhase, setCurrentPhase] = useState<PhaseId>(1);

  // Active exercise state
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);

  // Set Logs per exercise: Record<exerciseId, SetRecord[]>
  const [exerciseLogs, setExerciseLogs] = useState<Record<string, SetRecord[]>>({});

  // Completed session history in localStorage
  const [completedSessions, setCompletedSessions] = useState<CompletedSessionLog[]>(() => {
    try {
      const saved = localStorage.getItem('kinetic_routine_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Timer modal state
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [autoRoll, setAutoRoll] = useState(true);

  // Guide modal state
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Apply dark mode class to root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Persist sessions
  useEffect(() => {
    try {
      localStorage.setItem('kinetic_routine_sessions', JSON.stringify(completedSessions));
    } catch {
      // Storage save quiet fail
    }
  }, [completedSessions]);

  const exercises = getExercisesForDay(currentDay);
  const currentExercise = exercises[exerciseIndex] || exercises[0];
  const currentVariation = currentExercise.phaseVariations[currentPhase];
  const currentSetsLog = exerciseLogs[currentExercise.id] || [];

  // Handle set log
  const handleLogSet = (setIndex: number, weightLbs: number, repsCompleted: number | string, rpe: number) => {
    setExerciseLogs((prev) => {
      const existing = prev[currentExercise.id] ? [...prev[currentExercise.id]] : [];
      existing[setIndex] = {
        setNumber: setIndex + 1,
        repsCompleted,
        weightLbs,
        rpeAchieved: rpe,
        completed: true,
        completedAt: new Date().toISOString(),
      };
      return {
        ...prev,
        [currentExercise.id]: existing,
      };
    });
  };

  // Trigger Rest Interval Timer
  const handleTriggerRestTimer = (recommendedSeconds: number) => {
    setTimerSeconds(recommendedSeconds);
    setIsTimerOpen(true);
  };

  // Timer completion auto-roll callback
  const handleTimerComplete = () => {
    setIsTimerOpen(false);

    // Check if current exercise sets are all finished
    const currentCompletedCount = (exerciseLogs[currentExercise.id] || []).filter((s) => s.completed).length;
    if (currentCompletedCount >= currentVariation.sets && exerciseIndex < exercises.length - 1) {
      // Auto-roll to next exercise!
      setExerciseIndex(exerciseIndex + 1);
    }
  };

  // Finish session
  const handleFinishSession = () => {
    sounds.playChime();
    const sessionLogs: ExerciseProgressLog[] = exercises.map((ex) => ({
      exerciseId: ex.id,
      exerciseName: ex.phaseVariations[currentPhase].name,
      sets: exerciseLogs[ex.id] || [],
    }));

    const newSession: CompletedSessionLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      dateString: new Date().toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      daySplit: currentDay,
      phase: currentPhase,
      exercises: sessionLogs,
      totalTimeSeconds: 0,
    };

    setCompletedSessions((prev) => [newSession, ...prev]);
    setExerciseLogs({});
    setExerciseIndex(0);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all recorded workout history?')) {
      setCompletedSessions([]);
    }
  };

  const isNextExerciseInTimer =
    currentSetsLog.filter((s) => s.completed).length >= currentVariation.sets &&
    exerciseIndex < exercises.length - 1;

  const nextExerciseName = isNextExerciseInTimer
    ? exercises[exerciseIndex + 1]?.phaseVariations[currentPhase].name
    : undefined;

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#141413] text-[#1F1E1B] dark:text-[#EDECE8] flex flex-col transition-colors">
      {/* Header */}
      <Header
        currentDay={currentDay}
        onSelectDay={(day) => {
          setCurrentDay(day);
          setExerciseIndex(0);
        }}
        currentPhase={currentPhase}
        onSelectPhase={(phase) => setCurrentPhase(phase)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 md:py-8">
        
        {/* Phase Info Banner */}
        <div className="bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold text-sm text-[#1F1E1B] dark:text-[#EDECE8]">
              {PHASES[currentPhase].name}
            </h3>
            <p className="text-xs text-[#706E6B] dark:text-[#A09E9A] mt-0.5">
              {PHASES[currentPhase].subtitle} ({PHASES[currentPhase].duration})
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-[#D97757] dark:text-[#E07A5F] bg-[#D97757]/10 px-3 py-1 rounded-full border border-[#D97757]/20">
            {PHASES[currentPhase].rpeTarget} ({PHASES[currentPhase].rpeDescription})
          </span>
        </div>

        {/* Exercise Quick Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {exercises.map((ex, idx) => {
            const exVariation = ex.phaseVariations[currentPhase];
            const logs = exerciseLogs[ex.id] || [];
            const isCompleted = logs.length >= exVariation.sets && logs.every((s) => s.completed);
            const isActive = idx === exerciseIndex;

            return (
              <button
                key={ex.id}
                onClick={() => setExerciseIndex(idx)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 border ${
                  isActive
                    ? 'bg-[#D97757] text-white border-[#D97757] shadow-sm font-semibold'
                    : isCompleted
                    ? 'bg-[#F3F0E9] dark:bg-[#1E1E1C] text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-[#F3F0E9] dark:bg-[#1E1E1C] text-[#706E6B] dark:text-[#A09E9A] border-[#E6E2D8] dark:border-[#2A2A27] hover:border-[#D97757]'
                }`}
              >
                <span>{idx + 1}. {exVariation.name}</span>
                {isCompleted && <CheckCircle size={14} className="text-emerald-500" />}
              </button>
            );
          })}
        </div>

        {/* Active Exercise Card */}
        <ExerciseCard
          exercise={currentExercise}
          exerciseIndex={exerciseIndex}
          totalExercises={exercises.length}
          phase={currentPhase}
          completedSets={currentSetsLog}
          onLogSet={handleLogSet}
          onTriggerRestTimer={handleTriggerRestTimer}
          onPrevExercise={() => setExerciseIndex(Math.max(0, exerciseIndex - 1))}
          onNextExercise={() => setExerciseIndex(Math.min(exercises.length - 1, exerciseIndex + 1))}
        />

        {/* Session Finish Actions */}
        <div className="mt-8 flex items-center justify-between bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-2xl p-5">
          <div>
            <h3 className="font-serif font-bold text-base text-[#1F1E1B] dark:text-[#EDECE8]">
              Workout Routine Session ({currentDay})
            </h3>
            <p className="text-xs text-[#706E6B] dark:text-[#A09E9A]">
              Log your full session when all sets are completed.
            </p>
          </div>

          <button
            onClick={handleFinishSession}
            className="px-6 py-3 bg-[#D97757] hover:bg-[#D97757]/90 text-white font-semibold rounded-xl shadow-sm flex items-center space-x-2 transition-all"
          >
            <Trophy size={18} />
            <span>Finish & Record Workout</span>
          </button>
        </div>

        {/* History Log Section */}
        <WorkoutLog
          completedSessions={completedSessions}
          onClearHistory={handleClearHistory}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E6E2D8] dark:border-[#2A2A27] py-6 text-center text-xs text-[#706E6B] dark:text-[#A09E9A] font-mono">
        Kinetic Routine — Anthropic Beige & Burnt Orange Aesthetic Utility
      </footer>

      {/* Interval Timer Modal */}
      <IntervalTimer
        isOpen={isTimerOpen}
        initialSeconds={timerSeconds}
        exerciseName={currentVariation.name}
        currentSetNumber={currentSetsLog.length}
        totalSets={currentVariation.sets}
        isNextExercise={isNextExerciseInTimer}
        nextExerciseName={nextExerciseName}
        autoRoll={autoRoll}
        onToggleAutoRoll={(enabled) => setAutoRoll(enabled)}
        onTimerComplete={handleTimerComplete}
        onSkipTimer={handleTimerComplete}
        onClose={() => setIsTimerOpen(false)}
      />

      {/* Phase Guide Drawer */}
      <PhaseGuide
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
