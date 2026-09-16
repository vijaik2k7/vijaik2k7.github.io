export type PhaseId = 1 | 2 | 3;
export type DaySplitId = 'Day A' | 'Day B';

export interface PhaseInfo {
  id: PhaseId;
  name: string;
  subtitle: string;
  duration: string;
  repRange: string;
  rpeTarget: string;
  rpeDescription: string;
  recommendedRestSeconds: number;
  strategy: string;
}

export type VisualType = 
  | 'squat' 
  | 'bench' 
  | 'row' 
  | 'rdl' 
  | 'deadlift' 
  | 'ohp' 
  | 'pullup' 
  | 'lunge' 
  | 'plank' 
  | 'legraise' 
  | 'woodchop' 
  | 'abwheel';

export interface ExerciseDefinition {
  id: string;
  baseName: string;
  category: 'Knee Dominant' | 'Horizontal Push' | 'Horizontal Pull' | 'Hip Dominant' | 'Vertical Push' | 'Vertical Pull' | 'Core & Abdominals';
  visualType: VisualType;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  cues: string[];
  // Phase specific variation mapping
  phaseVariations: Record<PhaseId, {
    name: string;
    sets: number;
    repsOrTime: string;
    isTimedHold?: boolean;
    defaultDurationSeconds?: number;
    recommendedRestSeconds: number;
    rpe: string;
  }>;
}

export interface SetRecord {
  setNumber: number;
  repsCompleted: number | string;
  weightLbs: number;
  rpeAchieved: number;
  completed: boolean;
  completedAt?: string;
}

export interface ExerciseProgressLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetRecord[];
}

export interface CompletedSessionLog {
  id: string;
  timestamp: string;
  dateString: string;
  daySplit: DaySplitId;
  phase: PhaseId;
  exercises: ExerciseProgressLog[];
  totalTimeSeconds: number;
}
