import { PhaseInfo, ExerciseDefinition, PhaseId, DaySplitId } from '../types/workout';

export const PHASES: Record<PhaseId, PhaseInfo> = {
  1: {
    id: 1,
    name: 'Phase 1: Foundation & Mechanics',
    subtitle: 'Master movement patterns with dumbbell & bodyweight variations',
    duration: 'Weeks 1–4',
    repRange: '3 sets × 8–10 reps',
    rpeTarget: 'RPE 6–7',
    rpeDescription: '3–4 reps in reserve',
    recommendedRestSeconds: 60,
    strategy: 'Focus on perfect technique, steady tempo, and establishing baseline work capacity.',
  },
  2: {
    id: 2,
    name: 'Phase 2: Progressive Overload & Density',
    subtitle: 'Shift to primary barbell compounds & add load weekly',
    duration: 'Weeks 5–8',
    repRange: '3–4 sets × 6–8 reps',
    rpeTarget: 'RPE 7–8',
    rpeDescription: '2 reps in reserve',
    recommendedRestSeconds: 90,
    strategy: 'Add 2.5–5 lbs for upper body or 5–10 lbs for lower body each week while keeping form tight.',
  },
  3: {
    id: 3,
    name: 'Phase 3: High-Intensity Strength',
    subtitle: 'Heavy compound loads with longer rest intervals',
    duration: 'Weeks 9–12',
    repRange: '3–4 sets × 4–6 reps',
    rpeTarget: 'RPE 8–9',
    rpeDescription: '1–2 reps in reserve',
    recommendedRestSeconds: 120,
    strategy: 'Maximal tension on primary compounds with longer rest (2–3 minutes). Conclude with a 1-week deload.',
  },
};

export const DAY_A_EXERCISES: ExerciseDefinition[] = [
  {
    id: 'squat_a',
    baseName: 'Squat Pattern',
    category: 'Knee Dominant',
    visualType: 'squat',
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Core', 'Adductors'],
    cues: [
      'Break at the hips and knees simultaneously.',
      'Keep chest elevated and maintain a neutral spine.',
      'Drive knees outward in line with your toes.',
      'Push through the full foot to stand tall.'
    ],
    phaseVariations: {
      1: {
        name: 'Goblet Squats',
        sets: 3,
        repsOrTime: '8–10 reps',
        recommendedRestSeconds: 60,
        rpe: 'RPE 6–7',
      },
      2: {
        name: 'Barbell Back Squats',
        sets: 3,
        repsOrTime: '6–8 reps',
        recommendedRestSeconds: 90,
        rpe: 'RPE 7–8',
      },
      3: {
        name: 'Paused Barbell Back Squats',
        sets: 4,
        repsOrTime: '4–6 reps',
        recommendedRestSeconds: 120,
        rpe: 'RPE 8–9',
      },
    },
  },
  {
    id: 'bench_a',
    baseName: 'Horizontal Press',
    category: 'Horizontal Push',
    visualType: 'bench',
    primaryMuscles: ['Pectoralis Major', 'Anterior Deltoids'],
    secondaryMuscles: ['Triceps Brachii', 'Core'],
    cues: [
      'Retract and depress shoulder blades into the bench.',
      'Lower the weight smoothly to lower sternum.',
      'Maintain 45-degree elbow tuck.',
      'Drive feet into floor for leg drive.'
    ],
    phaseVariations: {
      1: {
        name: 'Flat Dumbbell Bench Press',
        sets: 3,
        repsOrTime: '8–10 reps',
        recommendedRestSeconds: 60,
        rpe: 'RPE 6–7',
      },
      2: {
        name: 'Flat Barbell Bench Press',
        sets: 3,
        repsOrTime: '6–8 reps',
        recommendedRestSeconds: 90,
        rpe: 'RPE 7–8',
      },
      3: {
        name: 'Heavy Barbell / Incline Bench Press',
        sets: 4,
        repsOrTime: '4–6 reps',
        recommendedRestSeconds: 120,
        rpe: 'RPE 8–9',
      },
    },
  },
  {
    id: 'row_a',
    baseName: 'Horizontal Pull',
    category: 'Horizontal Pull',
    visualType: 'row',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['Biceps Brachii', 'Rear Deltoids'],
    cues: [
      'Keep chest pressed firmly against pad or torso flat.',
      'Lead movement with the elbows, squeezing shoulder blades.',
      'Pause briefly at peak contraction.',
      'Control the eccentric stretch down.'
    ],
    phaseVariations: {
      1: {
        name: 'Inverted Bodyweight Rows / Cable Rows',
        sets: 3,
        repsOrTime: '8–10 reps',
        recommendedRestSeconds: 60,
        rpe: 'RPE 6–7',
      },
      2: {
        name: 'Chest-Supported Dumbbell Rows',
        sets: 3,
        repsOrTime: '8–10 reps',
        recommendedRestSeconds: 90,
        rpe: 'RPE 7–8',
      },
      3: {
        name: 'Pendlay / Heavy Barbell Rows',
        sets: 4,
        repsOrTime: '6–8 reps',
        recommendedRestSeconds: 120,
        rpe: 'RPE 8–9',
      },
    },
  },
  {
    id: 'rdl_a',
    baseName: 'Hinge Pattern (RDL)',
    category: 'Hip Dominant',
    visualType: 'rdl',
    primaryMuscles: ['Hamstrings', 'Gluteus Maximus'],
    secondaryMuscles: ['Erector Spinae', 'Forearms'],
    cues: [
      'Push hips back horizontally toward wall behind you.',
      'Keep weight close to legs throughout the path.',
      'Maintain flat back with soft knee bend.',
      'Drive hips forward to lockout at top.'
    ],
    phaseVariations: {
      1: {
        name: 'Dumbbell Romanian Deadlifts',
        sets: 2,
        repsOrTime: '8–10 reps',
        recommendedRestSeconds: 60,
        rpe: 'RPE 6–7',
      },
      2: {
        name: 'Barbell Romanian Deadlifts',
        sets: 3,
        repsOrTime: '8–10 reps',
        recommendedRestSeconds: 90,
        rpe: 'RPE 7–8',
      },
      3: {
        name: 'Deficit Barbell Romanian Deadlifts',
        sets: 3,
        repsOrTime: '6–8 reps',
        recommendedRestSeconds: 120,
        rpe: 'RPE 8–9',
      },
    },
  },
  {
    id: 'core_a',
    baseName: 'Anti-Extension / Core Rotation',
    category: 'Core & Abdominals',
    visualType: 'legraise',
    primaryMuscles: ['Rectus Abdominis', 'Obliques'],
    secondaryMuscles: ['Hip Flexors', 'Grip'],
    cues: [
      'Engage core before initiating movement.',
      'Avoid swinging or using momentum.',
      'Curv posterior pelvis slightly at top of leg raise.',
      'Exhale sharply on peak contraction.'
    ],
    phaseVariations: {
      1: {
        name: 'Cable Woodchops / Captain Chair Raises',
        sets: 2,
        repsOrTime: '12–15 reps',
        recommendedRestSeconds: 45,
        rpe: 'RPE 6–7',
      },
      2: {
        name: 'Hanging Leg Raises',
        sets: 2,
        repsOrTime: '12–15 reps',
        recommendedRestSeconds: 60,
        rpe: 'RPE 7–8',
      },
      3: {
        name: 'Weighted Hanging Leg Raises',
        sets: 3,
        repsOrTime: '10–12 reps',
        recommendedRestSeconds: 60,
        rpe: 'RPE 8–9',
      },
    },
  },
];

export const DAY_B_EXERCISES: ExerciseDefinition[] = [
  {
    id: 'deadlift_b',
    baseName: 'Primary Hinge (Deadlift)',
    category: 'Hip Dominant',
    visualType: 'deadlift',
    primaryMuscles: ['Gluteus Maximus', 'Hamstrings', 'Erector Spinae'],
    secondaryMuscles: ['Quadriceps', 'Trapezius', 'Lats', 'Forearms'],
    cues: [
      'Wedging hips close to bar before pull.',
      'Pull slack out of the bar; brace core down hard.',
      'Push floor away with legs while extending hips.',
      'Lock out with hips, without hyperextending back.'
    ],
    phaseVariations: {
      1: {
        name: 'Trap-Bar Deadlifts',
        sets: 3,
        repsOrTime: '8–10 reps',
        recommendedRestSeconds: 60,
        rpe: 'RPE 6–7',
      },
      2: {
        name: 'Conventional Barbell Deadlifts',
        sets: 3,
        repsOrTime: '5 reps',
        recommendedRestSeconds: 120,
        rpe: 'RPE 7–8',
      },
      3: {
        name: 'Heavy Conventional Barbell Deadlifts',
        sets: 4,
        repsOrTime: '4–5 reps',
        recommendedRestSeconds: 180,
        rpe: 'RPE 8–9',
      },
    },
  },
  {
    id: 'ohp_b',
    baseName: 'Vertical Press',
    category: 'Vertical Push',
    visualType: 'ohp',
    primaryMuscles: ['Anterior & Lateral Deltoids', 'Triceps Brachii'],
    secondaryMuscles: ['Upper Chest', 'Core', 'Glutes'],
    cues: [
      'Squeeze glutes and brace abs tightly.',
      'Press bar vertically overhead clearing forehead.',
      'Lock elbows overhead directly above upper back.',
      'Lower smoothly back to upper chest collarbone.'
    ],
    phaseVariations: {
      1: {
        name: 'Seated Dumbbell Overhead Press',
        sets: 3,
        repsOrTime: '8–10 reps',
        recommendedRestSeconds: 60,
        rpe: 'RPE 6–7',
      },
      2: {
        name: 'Standing Barbell Overhead Press',
        sets: 3,
        repsOrTime: '6–8 reps',
        recommendedRestSeconds: 90,
        rpe: 'RPE 7–8',
      },
      3: {
        name: 'Heavy Standing Barbell Overhead Press',
        sets: 4,
        repsOrTime: '4–6 reps',
        recommendedRestSeconds: 120,
        rpe: 'RPE 8–9',
      },
    },
  },
  {
    id: 'pullup_b',
    baseName: 'Vertical Pull',
    category: 'Vertical Pull',
    visualType: 'pullup',
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major'],
    secondaryMuscles: ['Biceps Brachii', 'Rear Deltoids', 'Core'],
    cues: [
      'Depress shoulder blades before pulling.',
      'Drive elbows down toward hip pockets.',
      'Pull chest up to touch or clear bar.',
      'Lower under full control to dead hang.'
    ],
    phaseVariations: {
      1: {
        name: 'Lat Pulldowns',
        sets: 3,
        repsOrTime: '8–10 reps',
        recommendedRestSeconds: 60,
        rpe: 'RPE 6–7',
      },
      2: {
        name: 'Bodyweight Pull-Ups',
        sets: 3,
        repsOrTime: '6–8 reps',
        recommendedRestSeconds: 90,
        rpe: 'RPE 7–8',
      },
      3: {
        name: 'Weighted Pull-Ups',
        sets: 4,
        repsOrTime: '4–6 reps',
        recommendedRestSeconds: 120,
        rpe: 'RPE 8–9',
      },
    },
  },
  {
    id: 'lunge_b',
    baseName: 'Unilateral Knee/Hip',
    category: 'Knee Dominant',
    visualType: 'lunge',
    primaryMuscles: ['Quadriceps', 'Gluteus Medius & Maximus'],
    secondaryMuscles: ['Adductors', 'Hamstrings', 'Calves'],
    cues: [
      'Place back foot elevated or step far enough out.',
      'Lower rear knee vertically toward the floor.',
      'Keep front knee tracking over middle toe.',
      'Push through front heel to return to top.'
    ],
    phaseVariations: {
      1: {
        name: 'Dumbbell Walking Lunges',
        sets: 2,
        repsOrTime: '8–10 reps / leg',
        recommendedRestSeconds: 60,
        rpe: 'RPE 6–7',
      },
      2: {
        name: 'Bulgarian Split Squats',
        sets: 2,
        repsOrTime: '8–10 reps / leg',
        recommendedRestSeconds: 90,
        rpe: 'RPE 7–8',
      },
      3: {
        name: 'Heavy Bulgarian Split Squats',
        sets: 3,
        repsOrTime: '6–8 reps / leg',
        recommendedRestSeconds: 90,
        rpe: 'RPE 8–9',
      },
    },
  },
  {
    id: 'plank_b',
    baseName: 'Isometric Core / Rollout',
    category: 'Core & Abdominals',
    visualType: 'plank',
    primaryMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
    secondaryMuscles: ['Glutes', 'Serratus Anterior', 'Shoulders'],
    cues: [
      'Create straight line from head to heels.',
      'Tuck pelvis under (posterior pelvic tilt).',
      'Contract glutes and quad muscles hard.',
      'Breathe steadily without letting hips sag.'
    ],
    phaseVariations: {
      1: {
        name: 'Forearm Plank Hold',
        sets: 2,
        repsOrTime: '30–45s hold',
        isTimedHold: true,
        defaultDurationSeconds: 45,
        recommendedRestSeconds: 45,
        rpe: 'RPE 6–7',
      },
      2: {
        name: 'Ab Wheel Rollouts',
        sets: 3,
        repsOrTime: '8–10 rollouts',
        recommendedRestSeconds: 60,
        rpe: 'RPE 7–8',
      },
      3: {
        name: 'Weighted Plank / Standing Ab Rollouts',
        sets: 3,
        repsOrTime: '45–60s hold or 10 rollouts',
        isTimedHold: true,
        defaultDurationSeconds: 60,
        recommendedRestSeconds: 60,
        rpe: 'RPE 8–9',
      },
    },
  },
];

export function getExercisesForDay(day: DaySplitId): ExerciseDefinition[] {
  return day === 'Day A' ? DAY_A_EXERCISES : DAY_B_EXERCISES;
}

export function detectDefaultDaySplit(): DaySplitId {
  const dayOfWeek = new Date().getDay(); // 0 = Sun, 2 = Tue, 6 = Sat
  if (dayOfWeek === 6) {
    return 'Day B'; // Saturday -> Day B
  }
  return 'Day A'; // Default to Day A (Tuesday)
}
