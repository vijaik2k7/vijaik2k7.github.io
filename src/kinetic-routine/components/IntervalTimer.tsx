import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';

interface IntervalTimerProps {
  isOpen: boolean;
  initialSeconds: number;
  exerciseName: string;
  currentSetNumber: number;
  totalSets: number;
  isNextExercise: boolean;
  nextExerciseName?: string;
  autoRoll: boolean;
  onToggleAutoRoll: (enabled: boolean) => void;
  onTimerComplete: () => void;
  onSkipTimer: () => void;
  onClose: () => void;
}

export const IntervalTimer: React.FC<IntervalTimerProps> = ({
  isOpen,
  initialSeconds,
  exerciseName,
  currentSetNumber,
  totalSets,
  isNextExercise,
  nextExerciseName,
  autoRoll,
  onToggleAutoRoll,
  onTimerComplete,
  onSkipTimer,
  onClose,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [totalDuration, setTotalDuration] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const [soundMuted, setSoundMuted] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(initialSeconds);
      setTotalDuration(initialSeconds);
      setIsActive(true);
    }
  }, [isOpen, initialSeconds]);

  // Audio mute state
  useEffect(() => {
    sounds.enabled = !soundMuted;
  }, [soundMuted]);

  const handleFinish = useCallback(() => {
    sounds.playChime();
    setIsActive(false);
    if (autoRoll) {
      setTimeout(() => {
        onTimerComplete();
      }, 800);
    } else {
      onTimerComplete();
    }
  }, [autoRoll, onTimerComplete]);

  // Timer loop
  useEffect(() => {
    if (!isOpen || !isActive) return;

    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    if (timeLeft <= 3 && timeLeft > 0) {
      sounds.playTick();
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isActive, timeLeft, handleFinish]);

  if (!isOpen) return null;

  // Format time as MM:SS
  const minutes = Math.floor(Math.max(0, timeLeft) / 60);
  const seconds = Math.max(0, timeLeft) % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // SVG Progress Ring calculation
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = totalDuration > 0 ? timeLeft / totalDuration : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const setTimePreset = (sec: number) => {
    setTotalDuration(sec);
    setTimeLeft(sec);
    setIsActive(true);
  };

  const addTime = (deltaSec: number) => {
    setTimeLeft((prev) => Math.max(1, prev + deltaSec));
    setTotalDuration((prev) => Math.max(1, prev + deltaSec));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FAF9F6] dark:bg-[#141413] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col items-center">
        {/* Header Metadata */}
        <div className="w-full flex items-center justify-between mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#706E6B] dark:text-[#A09E9A] bg-[#F3F0E9] dark:bg-[#1E1E1C] px-2.5 py-1 rounded-md border border-[#E6E2D8] dark:border-[#2A2A27]">
            {isNextExercise ? 'Next Exercise Rest' : `Rest Interval (Set ${currentSetNumber} of ${totalSets})`}
          </span>
          
          <button
            onClick={() => setSoundMuted(!soundMuted)}
            className="p-1.5 text-[#706E6B] hover:text-[#D97757] dark:text-[#A09E9A] dark:hover:text-[#E07A5F] rounded-lg transition-colors"
            title={soundMuted ? 'Unmute Chime' : 'Mute Chime'}
          >
            {soundMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Current & Upcoming Exercise Titles */}
        <div className="text-center mb-6">
          <h3 className="font-serif text-2xl font-bold text-[#1F1E1B] dark:text-[#EDECE8]">
            {exerciseName}
          </h3>
          {isNextExercise && nextExerciseName && (
            <p className="text-sm text-[#D97757] dark:text-[#E07A5F] font-medium mt-1">
              Up Next: {nextExerciseName}
            </p>
          )}
        </div>

        {/* Circular Countdown Progress Ring */}
        <div className="relative w-52 h-52 flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Ring */}
            <circle
              cx="104"
              cy="104"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              className="text-[#E8E4DA] dark:text-[#282825]"
              fill="transparent"
            />
            {/* Animated Terracotta Progress Ring */}
            <circle
              cx="104"
              cy="104"
              r={radius}
              stroke="#D97757"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-500 ease-linear dark:stroke-[#E07A5F]"
              fill="transparent"
            />
          </svg>

          {/* Large Countdown Display */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-[#1F1E1B] dark:text-[#EDECE8]">
              {timeString}
            </span>
            <span className="text-xs font-medium text-[#706E6B] dark:text-[#A09E9A] mt-1">
              {isActive ? 'RESTING' : 'READY'}
            </span>
          </div>
        </div>

        {/* Preset Rest Duration Buttons */}
        <div className="w-full grid grid-cols-4 gap-2 mb-6">
          {[30, 60, 90, 120].map((sec) => (
            <button
              key={sec}
              onClick={() => setTimePreset(sec)}
              className={`py-1.5 rounded-lg font-mono text-xs font-medium border transition-all ${
                totalDuration === sec && timeLeft > 0
                  ? 'bg-[#D97757] text-white border-[#D97757]'
                  : 'bg-[#F3F0E9] dark:bg-[#1E1E1C] text-[#1F1E1B] dark:text-[#EDECE8] border-[#E6E2D8] dark:border-[#2A2A27] hover:border-[#D97757]'
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>

        {/* Adjustments & Pause / Play Controls */}
        <div className="w-full flex items-center justify-center space-x-3 mb-6">
          <button
            onClick={() => addTime(-10)}
            className="px-3 py-2 bg-[#F3F0E9] dark:bg-[#1E1E1C] text-[#1F1E1B] dark:text-[#EDECE8] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl text-xs font-mono font-medium hover:border-[#D97757]"
          >
            -10s
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            className="p-3 bg-[#F3F0E9] dark:bg-[#1E1E1C] text-[#1F1E1B] dark:text-[#EDECE8] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-full hover:text-[#D97757] dark:hover:text-[#E07A5F] transition-colors"
          >
            {isActive ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            onClick={() => setTimePreset(totalDuration)}
            className="p-3 bg-[#F3F0E9] dark:bg-[#1E1E1C] text-[#1F1E1B] dark:text-[#EDECE8] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-full hover:text-[#D97757] dark:hover:text-[#E07A5F] transition-colors"
            title="Reset Timer"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={() => addTime(30)}
            className="px-3 py-2 bg-[#F3F0E9] dark:bg-[#1E1E1C] text-[#1F1E1B] dark:text-[#EDECE8] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl text-xs font-mono font-medium hover:border-[#D97757]"
          >
            +30s
          </button>
        </div>

        {/* Auto-roll Toggle & Skip Action */}
        <div className="w-full flex flex-col space-y-3">
          <label className="flex items-center justify-between p-3 bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl cursor-pointer">
            <span className="text-xs font-medium text-[#1F1E1B] dark:text-[#EDECE8]">
              Auto-roll to next set when timer ends
            </span>
            <input
              type="checkbox"
              checked={autoRoll}
              onChange={(e) => onToggleAutoRoll(e.target.checked)}
              className="w-4 h-4 rounded text-[#D97757] focus:ring-[#D97757] accent-[#D97757]"
            />
          </label>

          <button
            onClick={onSkipTimer}
            className="w-full py-3 bg-[#D97757] hover:bg-[#D97757]/90 text-white font-medium rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-colors"
          >
            <span>Skip Rest & Begin Set</span>
            <SkipForward size={16} />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs text-[#706E6B] dark:text-[#A09E9A] hover:text-[#1F1E1B] dark:hover:text-[#EDECE8]"
          >
            Dismiss Overlay
          </button>
        </div>
      </div>
    </div>
  );
};
