import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Info, Timer as TimerIcon } from 'lucide-react';
import { ExerciseDefinition, PhaseId, SetRecord } from '../types/workout';
import { ExerciseVisual } from './ExerciseVisual';

interface ExerciseCardProps {
  exercise: ExerciseDefinition;
  exerciseIndex: number;
  totalExercises: number;
  phase: PhaseId;
  completedSets: SetRecord[];
  onLogSet: (setIndex: number, weightLbs: number, repsCompleted: number | string, rpe: number) => void;
  onTriggerRestTimer: (recommendedSeconds: number) => void;
  onPrevExercise: () => void;
  onNextExercise: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  exerciseIndex,
  totalExercises,
  phase,
  completedSets,
  onLogSet,
  onTriggerRestTimer,
  onPrevExercise,
  onNextExercise,
}) => {
  const variation = exercise.phaseVariations[phase];
  const [activeSetIndex, setActiveSetIndex] = useState<number>(() => {
    const nextUncompleted = completedSets.findIndex((s) => !s.completed);
    return nextUncompleted >= 0 ? nextUncompleted : 0;
  });

  const [weightInput, setWeightInput] = useState<number>(() => {
    return completedSets[activeSetIndex]?.weightLbs || 0;
  });

  const [repsInput, setRepsInput] = useState<string>(() => {
    return String(completedSets[activeSetIndex]?.repsCompleted || variation.repsOrTime);
  });

  const [rpeInput, setRpeInput] = useState<number>(7);

  const currentSet = completedSets[activeSetIndex] || {
    setNumber: activeSetIndex + 1,
    repsCompleted: variation.repsOrTime,
    weightLbs: 0,
    rpeAchieved: 7,
    completed: false,
  };

  const handleSetDone = () => {
    const repsVal = isNaN(Number(repsInput)) ? repsInput : Number(repsInput);
    onLogSet(activeSetIndex, weightInput, repsVal, rpeInput);

    // Trigger Rest Interval Timer
    onTriggerRestTimer(variation.recommendedRestSeconds);

    // Move selection to next set if available
    if (activeSetIndex < variation.sets - 1) {
      setActiveSetIndex(activeSetIndex + 1);
    }
  };

  const allSetsCompleted = completedSets.length >= variation.sets && completedSets.every((s) => s.completed);

  return (
    <div className="w-full bg-[#FAF9F6] dark:bg-[#141413] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-2xl p-5 md:p-7 shadow-sm transition-all">
      {/* Exercise Index & Category Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#D97757]/15 text-[#D97757] dark:text-[#E07A5F] rounded-lg">
            EXERCISE {exerciseIndex + 1} OF {totalExercises}
          </span>
          <span className="text-xs font-medium text-[#706E6B] dark:text-[#A09E9A] bg-[#F3F0E9] dark:bg-[#1E1E1C] px-2.5 py-1 rounded-lg border border-[#E6E2D8] dark:border-[#2A2A27]">
            {exercise.category}
          </span>
        </div>

        {/* Phase Pill */}
        <span className="text-[11px] font-mono text-[#706E6B] dark:text-[#A09E9A]">
          Phase {phase} Variation
        </span>
      </div>

      {/* Main Title & Target Rep Range */}
      <div className="mb-4">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1F1E1B] dark:text-[#EDECE8]">
          {variation.name}
        </h2>
        <p className="text-xs text-[#706E6B] dark:text-[#A09E9A] mt-1 font-mono">
          Target: <strong className="text-[#1F1E1B] dark:text-[#EDECE8]">{variation.sets} sets × {variation.repsOrTime}</strong> @ {variation.rpe} • Rest {variation.recommendedRestSeconds}s
        </p>
      </div>

      {/* Vector Visual & Cues Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Visual Component */}
        <ExerciseVisual type={exercise.visualType} exerciseName={variation.name} />

        {/* Cues & Primary Muscles */}
        <div className="bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#706E6B] dark:text-[#A09E9A] mb-2 flex items-center space-x-1">
              <Info size={14} className="text-[#D97757]" />
              <span>Biomechanical Cues</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#1F1E1B] dark:text-[#EDECE8]">
              {exercise.cues.map((cue, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#D97757] font-bold">•</span>
                  <span>{cue}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E6E2D8] dark:border-[#2A2A27]">
            <span className="text-[11px] font-mono text-[#706E6B] dark:text-[#A09E9A]">Target Muscles: </span>
            <span className="text-xs font-medium text-[#1F1E1B] dark:text-[#EDECE8]">
              {exercise.primaryMuscles.join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Set Tracker Table & Input */}
      <div className="bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl p-4 mb-6">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#706E6B] dark:text-[#A09E9A] mb-3">
          Set Tracker ({completedSets.filter((s) => s.completed).length} / {variation.sets} Complete)
        </h3>

        {/* Set Rows */}
        <div className="space-y-2 mb-4">
          {Array.from({ length: variation.sets }).map((_, idx) => {
            const setLog = completedSets[idx] || {
              setNumber: idx + 1,
              repsCompleted: variation.repsOrTime,
              weightLbs: 0,
              rpeAchieved: 7,
              completed: false,
            };
            const isCurrent = activeSetIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveSetIndex(idx)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-[#FAF9F6] dark:bg-[#141413] border-[#D97757] shadow-sm'
                    : setLog.completed
                    ? 'bg-[#FAF9F6]/50 dark:bg-[#141413]/50 border-emerald-500/30'
                    : 'bg-[#FAF9F6]/30 dark:bg-[#141413]/30 border-transparent hover:border-[#E6E2D8] dark:hover:border-[#2A2A27]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      setLog.completed
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-[#D97757] text-white'
                        : 'bg-[#E8E4DA] dark:bg-[#282825] text-[#706E6B] dark:text-[#A09E9A]'
                    }`}
                  >
                    {setLog.completed ? <Check size={14} /> : idx + 1}
                  </div>
                  <span className="text-xs font-semibold text-[#1F1E1B] dark:text-[#EDECE8]">
                    Set {idx + 1}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono">
                  {setLog.completed ? (
                    <span className="text-[#1F1E1B] dark:text-[#EDECE8]">
                      {setLog.weightLbs > 0 ? `${setLog.weightLbs} lbs × ` : ''}{setLog.repsCompleted} (RPE {setLog.rpeAchieved})
                    </span>
                  ) : (
                    <span className="text-[#706E6B] dark:text-[#A09E9A]">
                      Target: {variation.repsOrTime}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Form for Active Set */}
        {!currentSet.completed && (
          <div className="bg-[#FAF9F6] dark:bg-[#141413] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-auto">
              {/* Weight Input */}
              <div>
                <label className="block text-[11px] font-mono text-[#706E6B] dark:text-[#A09E9A] mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  min="0"
                  step="2.5"
                  value={weightInput || ''}
                  onChange={(e) => setWeightInput(Number(e.target.value))}
                  placeholder="0"
                  className="w-full bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] text-[#1F1E1B] dark:text-[#EDECE8] px-3 py-1.5 rounded-lg text-sm font-mono focus:border-[#D97757]"
                />
              </div>

              {/* Reps Completed Input */}
              <div>
                <label className="block text-[11px] font-mono text-[#706E6B] dark:text-[#A09E9A] mb-1">
                  Reps / Hold
                </label>
                <input
                  type="text"
                  value={repsInput}
                  onChange={(e) => setRepsInput(e.target.value)}
                  className="w-full bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] text-[#1F1E1B] dark:text-[#EDECE8] px-3 py-1.5 rounded-lg text-sm font-mono focus:border-[#D97757]"
                />
              </div>

              {/* RPE Selector */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[11px] font-mono text-[#706E6B] dark:text-[#A09E9A] mb-1">
                  RPE (6–10)
                </label>
                <select
                  value={rpeInput}
                  onChange={(e) => setRpeInput(Number(e.target.value))}
                  className="w-full bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] text-[#1F1E1B] dark:text-[#EDECE8] px-2 py-1.5 rounded-lg text-sm font-mono focus:border-[#D97757]"
                >
                  <option value={6}>RPE 6 (4 in reserve)</option>
                  <option value={7}>RPE 7 (3 in reserve)</option>
                  <option value={8}>RPE 8 (2 in reserve)</option>
                  <option value={9}>RPE 9 (1 in reserve)</option>
                  <option value={10}>RPE 10 (Max Effort)</option>
                </select>
              </div>
            </div>

            {/* Complete Set & Trigger Rest Button */}
            <button
              onClick={handleSetDone}
              className="w-full md:w-auto px-5 py-3 bg-[#D97757] hover:bg-[#D97757]/90 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <Check size={18} />
              <span>Complete Set {activeSetIndex + 1} & Start Rest</span>
              <TimerIcon size={16} className="opacity-80" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-[#E6E2D8] dark:border-[#2A2A27] pt-4">
        <button
          onClick={onPrevExercise}
          disabled={exerciseIndex === 0}
          className="flex items-center space-x-1.5 text-xs font-medium text-[#706E6B] dark:text-[#A09E9A] hover:text-[#1F1E1B] dark:hover:text-[#EDECE8] disabled:opacity-30"
        >
          <ArrowLeft size={16} />
          <span>Previous Exercise</span>
        </button>

        {allSetsCompleted && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
            ✓ All Sets Finished!
          </span>
        )}

        <button
          onClick={onNextExercise}
          disabled={exerciseIndex === totalExercises - 1}
          className="flex items-center space-x-1.5 text-xs font-medium text-[#D97757] dark:text-[#E07A5F] hover:underline disabled:opacity-30"
        >
          <span>Next Exercise</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
