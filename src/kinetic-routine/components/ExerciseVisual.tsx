import React from 'react';
import { VisualType } from '../types/workout';

interface ExerciseVisualProps {
  type: VisualType;
  exerciseName: string;
}

export const ExerciseVisual: React.FC<ExerciseVisualProps> = ({ type, exerciseName }) => {
  return (
    <div className="relative w-full h-48 md:h-56 bg-[#F3F0E9] dark:bg-[#1E1E1C] border border-[#E6E2D8] dark:border-[#2A2A27] rounded-xl flex flex-col items-center justify-center p-4 overflow-hidden group">
      {/* Background Subtle Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#1F1E1B_1px,transparent_1px)] dark:bg-[radial-gradient(#EDECE8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* SVG Motion Diagram */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {renderSvgForType(type)}
      </div>

      {/* Label Badge */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
        <span className="text-[11px] font-mono tracking-wider text-[#706E6B] dark:text-[#A09E9A] uppercase bg-[#FAF9F6]/80 dark:bg-[#141413]/80 px-2 py-0.5 rounded border border-[#E6E2D8] dark:border-[#2A2A27] backdrop-blur-sm">
          Form & Muscle Activation
        </span>
        <span className="text-[11px] font-medium text-[#D97757] dark:text-[#E07A5F] bg-[#D97757]/10 px-2 py-0.5 rounded">
          {exerciseName}
        </span>
      </div>
    </div>
  );
};

function renderSvgForType(type: VisualType) {
  const accentColor = '#D97757'; // Terracotta
  const secondaryColor = '#C4A482'; // Sand
  const strokeColor = 'currentColor';

  switch (type) {
    case 'squat':
      return (
        <svg viewBox="0 0 200 160" className="w-auto h-full max-h-40 text-[#1F1E1B] dark:text-[#EDECE8] transition-transform duration-500 group-hover:scale-105">
          {/* Ground */}
          <line x1="20" y1="140" x2="180" y2="140" stroke="#E6E2D8" strokeWidth="2" strokeDasharray="4 4" className="dark:stroke-[#2A2A27]" />
          
          {/* Standing & Deep Squat poses overlay */}
          <g className="animate-pulse">
            {/* Barbell */}
            <rect x="70" y="55" width="60" height="6" rx="3" fill={secondaryColor} />
            <circle cx="68" cy="58" r="8" fill={secondaryColor} />
            <circle cx="132" cy="58" r="8" fill={secondaryColor} />
            
            {/* Head */}
            <circle cx="100" cy="40" r="10" stroke={strokeColor} strokeWidth="3" fill="none" />
            {/* Spine */}
            <path d="M 100 50 L 96 85" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            
            {/* Thighs (Quads Highlighted in Terracotta) */}
            <path d="M 96 85 L 68 95" stroke={accentColor} strokeWidth="7" strokeLinecap="round" />
            {/* Lower legs */}
            <path d="M 68 95 L 75 140" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            {/* Feet */}
            <path d="M 75 140 L 60 140" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            
            {/* Arms holding bar */}
            <path d="M 98 62 L 78 58" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M 102 62 L 122 58" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          </g>
          <text x="100" y="152" textAnchor="middle" className="text-[10px] font-mono fill-[#706E6B] dark:fill-[#A09E9A]">Quad & Glute Drive</text>
        </svg>
      );

    case 'bench':
      return (
        <svg viewBox="0 0 200 160" className="w-auto h-full max-h-40 text-[#1F1E1B] dark:text-[#EDECE8] transition-transform duration-500 group-hover:scale-105">
          {/* Bench Frame */}
          <rect x="40" y="95" width="120" height="10" rx="2" fill="#E8E4DA" className="dark:fill-[#282825]" />
          <line x1="50" y1="105" x2="50" y2="135" stroke={strokeColor} strokeWidth="4" />
          <line x1="150" y1="105" x2="150" y2="135" stroke={strokeColor} strokeWidth="4" />

          {/* Lifter Torso lying flat */}
          {/* Head */}
          <circle cx="55" cy="85" r="9" stroke={strokeColor} strokeWidth="3" fill="none" />
          {/* Chest & Torso (Chest Highlighted in Terracotta) */}
          <path d="M 64 88 L 120 88" stroke={accentColor} strokeWidth="8" strokeLinecap="round" />
          
          {/* Legs */}
          <path d="M 120 88 L 140 100 L 140 135" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Barbell & Arms */}
          <g className="animate-pulse">
            <line x1="90" y1="45" x2="90" y2="135" stroke="#E6E2D8" strokeWidth="1" strokeDasharray="3 3" />
            <rect x="87" y="50" width="6" height="50" rx="2" fill={secondaryColor} transform="rotate(90 90 75)" />
            <circle cx="65" cy="75" r="7" fill={secondaryColor} />
            <circle cx="115" cy="75" r="7" fill={secondaryColor} />
            
            {/* Arms pressing up */}
            <path d="M 85 88 L 85 75" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            <path d="M 95 88 L 95 75" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          </g>
          <text x="100" y="152" textAnchor="middle" className="text-[10px] font-mono fill-[#706E6B] dark:fill-[#A09E9A]">Chest & Triceps Tension</text>
        </svg>
      );

    case 'row':
      return (
        <svg viewBox="0 0 200 160" className="w-auto h-full max-h-40 text-[#1F1E1B] dark:text-[#EDECE8] transition-transform duration-500 group-hover:scale-105">
          {/* Ground */}
          <line x1="20" y1="140" x2="180" y2="140" stroke="#E6E2D8" strokeWidth="2" strokeDasharray="4 4" className="dark:stroke-[#2A2A27]" />
          
          {/* Bent over row pose */}
          {/* Head */}
          <circle cx="125" cy="55" r="9" stroke={strokeColor} strokeWidth="3" fill="none" />
          {/* Upper Back / Lats Highlighted */}
          <path d="M 120 62 L 80 85" stroke={accentColor} strokeWidth="7" strokeLinecap="round" />
          {/* Hips & Legs */}
          <path d="M 80 85 L 75 110 L 78 140" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Barbell pulled to sternum */}
          <g className="animate-pulse">
            <rect x="90" y="85" width="8" height="36" rx="2" fill={secondaryColor} transform="rotate(90 94 103)" />
            <circle cx="94" cy="85" r="6" fill={secondaryColor} />
            <path d="M 100 68 L 94 98" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          </g>
          <text x="100" y="152" textAnchor="middle" className="text-[10px] font-mono fill-[#706E6B] dark:fill-[#A09E9A]">Lat & Rhomboid Squeeze</text>
        </svg>
      );

    case 'rdl':
    case 'deadlift':
      return (
        <svg viewBox="0 0 200 160" className="w-auto h-full max-h-40 text-[#1F1E1B] dark:text-[#EDECE8] transition-transform duration-500 group-hover:scale-105">
          {/* Ground */}
          <line x1="20" y1="140" x2="180" y2="140" stroke="#E6E2D8" strokeWidth="2" strokeDasharray="4 4" className="dark:stroke-[#2A2A27]" />
          
          {/* Deadlift / RDL Hinge Pose */}
          {/* Head */}
          <circle cx="135" cy="50" r="9" stroke={strokeColor} strokeWidth="3" fill="none" />
          {/* Spine & Erector */}
          <path d="M 128 56 L 85 80" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          {/* Hamstrings & Glutes Highlighted in Terracotta */}
          <path d="M 85 80 L 80 112 L 85 140" stroke={accentColor} strokeWidth="6" strokeLinecap="round" fill="none" />
          
          {/* Barbell close to shins */}
          <rect x="100" y="90" width="8" height="45" rx="2" fill={secondaryColor} transform="rotate(90 104 112)" />
          <circle cx="104" cy="90" r="8" fill={secondaryColor} />
          {/* Arms hanging straight */}
          <path d="M 112 62 L 104 112" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />

          <text x="100" y="152" textAnchor="middle" className="text-[10px] font-mono fill-[#706E6B] dark:fill-[#A09E9A]">Posterior Chain & Hinge Drive</text>
        </svg>
      );

    case 'ohp':
      return (
        <svg viewBox="0 0 200 160" className="w-auto h-full max-h-40 text-[#1F1E1B] dark:text-[#EDECE8] transition-transform duration-500 group-hover:scale-105">
          {/* Standing OHP */}
          <line x1="20" y1="140" x2="180" y2="140" stroke="#E6E2D8" strokeWidth="2" strokeDasharray="4 4" className="dark:stroke-[#2A2A27]" />

          {/* Head */}
          <circle cx="100" cy="50" r="9" stroke={strokeColor} strokeWidth="3" fill="none" />
          {/* Shoulders & Delts Highlighted in Terracotta */}
          <circle cx="100" cy="62" r="6" fill={accentColor} />
          {/* Spine & Torso */}
          <path d="M 100 60 L 100 100" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          {/* Legs */}
          <path d="M 100 100 L 88 140" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          <path d="M 100 100 L 112 140" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />

          {/* Barbell Overhead */}
          <g className="animate-pulse">
            <rect x="70" y="22" width="60" height="5" rx="2" fill={secondaryColor} />
            <circle cx="68" cy="24.5" r="7" fill={secondaryColor} />
            <circle cx="132" cy="24.5" r="7" fill={secondaryColor} />
            {/* Arms locked out */}
            <path d="M 94 62 L 78 27" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M 106 62 L 122 27" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          </g>

          <text x="100" y="152" textAnchor="middle" className="text-[10px] font-mono fill-[#706E6B] dark:fill-[#A09E9A]">Deltoid & Core Stability</text>
        </svg>
      );

    case 'pullup':
      return (
        <svg viewBox="0 0 200 160" className="w-auto h-full max-h-40 text-[#1F1E1B] dark:text-[#EDECE8] transition-transform duration-500 group-hover:scale-105">
          {/* Pullup Bar */}
          <line x1="40" y1="25" x2="160" y2="25" stroke={secondaryColor} strokeWidth="6" strokeLinecap="round" />

          {/* Head near bar */}
          <circle cx="100" cy="38" r="9" stroke={strokeColor} strokeWidth="3" fill="none" />
          {/* Lats Highlighted */}
          <path d="M 100 47 L 100 85" stroke={accentColor} strokeWidth="7" strokeLinecap="round" />
          {/* Legs */}
          <path d="M 100 85 L 94 125" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          <path d="M 100 85 L 106 125" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />

          {/* Arms pulling up */}
          <path d="M 100 50 L 75 25" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          <path d="M 100 50 L 125 25" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />

          <text x="100" y="152" textAnchor="middle" className="text-[10px] font-mono fill-[#706E6B] dark:fill-[#A09E9A]">Lat Depression & Elbow Drive</text>
        </svg>
      );

    case 'lunge':
      return (
        <svg viewBox="0 0 200 160" className="w-auto h-full max-h-40 text-[#1F1E1B] dark:text-[#EDECE8] transition-transform duration-500 group-hover:scale-105">
          <line x1="20" y1="140" x2="180" y2="140" stroke="#E6E2D8" strokeWidth="2" strokeDasharray="4 4" className="dark:stroke-[#2A2A27]" />

          {/* Head */}
          <circle cx="100" cy="45" r="9" stroke={strokeColor} strokeWidth="3" fill="none" />
          {/* Torso */}
          <path d="M 100 54 L 100 90" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          
          {/* Front Leg (Glutes & Quads Highlighted) */}
          <path d="M 100 90 L 130 90 L 130 140" stroke={accentColor} strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Back Leg */}
          <path d="M 100 90 L 65 115 L 65 140" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Dumbbells in hand */}
          <circle cx="95" cy="80" r="5" fill={secondaryColor} />
          <circle cx="105" cy="80" r="5" fill={secondaryColor} />

          <text x="100" y="152" textAnchor="middle" className="text-[10px] font-mono fill-[#706E6B] dark:fill-[#A09E9A]">Unilateral Balance & Glute Activation</text>
        </svg>
      );

    case 'plank':
    case 'legraise':
    default:
      return (
        <svg viewBox="0 0 200 160" className="w-auto h-full max-h-40 text-[#1F1E1B] dark:text-[#EDECE8] transition-transform duration-500 group-hover:scale-105">
          {/* Floor line */}
          <line x1="20" y1="120" x2="180" y2="120" stroke="#E6E2D8" strokeWidth="2" strokeDasharray="4 4" className="dark:stroke-[#2A2A27]" />

          {/* Plank Horizontal Pose */}
          {/* Head */}
          <circle cx="50" cy="98" r="8" stroke={strokeColor} strokeWidth="3" fill="none" />
          {/* Core & Abdominals Highlighted in Terracotta */}
          <path d="M 58 100 L 135 100" stroke={accentColor} strokeWidth="7" strokeLinecap="round" />
          {/* Legs */}
          <path d="M 135 100 L 165 118" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />

          {/* Forearm support */}
          <path d="M 58 100 L 58 118 L 45 118" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" fill="none" />

          <text x="100" y="152" textAnchor="middle" className="text-[10px] font-mono fill-[#706E6B] dark:fill-[#A09E9A]">Anti-Extension Core Hold</text>
        </svg>
      );
  }
}
