// Calorie Calculator Engine (Mifflin-St Jeor)

export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type Goal = 'lose_fast' | 'lose' | 'maintain' | 'gain' | 'gain_fast';

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (little or no exercise)',
  light: 'Lightly active (1–3 days/week)',
  moderate: 'Moderately active (3–5 days/week)',
  active: 'Very active (6–7 days/week)',
  very_active: 'Extra active (physical job)',
};

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
};

export const GOAL_ADJUSTMENTS: Record<Goal, number> = {
  lose_fast: -1000, lose: -500, maintain: 0, gain: 500, gain_fast: 1000,
};

export const GOAL_LABELS: Record<Goal, string> = {
  lose_fast: 'Lose 2 lbs/week', lose: 'Lose 1 lb/week', maintain: 'Maintain weight',
  gain: 'Gain 1 lb/week', gain_fast: 'Gain 2 lbs/week',
};

export interface CalorieResult {
  bmr: number; tdee: number; targetCalories: number;
  protein: number; carbs: number; fat: number;
  isValid: boolean; error?: string;
}

export function calculateCalories(opts: {
  age: number; gender: Gender; heightCm: number; weightKg: number;
  activity: ActivityLevel; goal: Goal;
}): CalorieResult {
  const { age, gender, heightCm, weightKg, activity, goal } = opts;
  const empty = { bmr: 0, tdee: 0, targetCalories: 0, protein: 0, carbs: 0, fat: 0, isValid: false };
  if (!age || !heightCm || !weightKg) return { ...empty, error: 'Please fill in all fields' };
  if (age < 15 || age > 120) return { ...empty, error: 'Age must be between 15 and 120' };

  const bmr = gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = bmr * ACTIVITY_MULTIPLIERS[activity];
  const targetCalories = Math.max(1200, tdee + GOAL_ADJUSTMENTS[goal]);
  const protein = Math.round((targetCalories * 0.30) / 4);
  const carbs = Math.round((targetCalories * 0.40) / 4);
  const fat = Math.round((targetCalories * 0.30) / 9);

  return { bmr: Math.round(bmr), tdee: Math.round(tdee), targetCalories: Math.round(targetCalories), protein, carbs, fat, isValid: true };
}
