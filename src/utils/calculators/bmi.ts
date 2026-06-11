// BMI Calculator Engine

export interface BMIResult {
  bmi: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese' | 'Severely Obese';
  categoryColor: string;
  scalePercent: number;
  healthyWeightMin: number;
  healthyWeightMax: number;
  isValid: boolean;
  error?: string;
}

export function calculateBMI(opts: {
  heightCm: number;
  weightKg: number;
}): BMIResult {
  const { heightCm, weightKg } = opts;

  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return { bmi: 0, category: 'Normal weight', categoryColor: '#4ade80', scalePercent: 0, healthyWeightMin: 0, healthyWeightMax: 0, isValid: false, error: 'Please enter valid height and weight' };
  }
  if (heightCm < 50 || heightCm > 300) {
    return { bmi: 0, category: 'Normal weight', categoryColor: '#4ade80', scalePercent: 0, healthyWeightMin: 0, healthyWeightMax: 0, isValid: false, error: 'Height must be between 50 and 300 cm' };
  }
  if (weightKg < 10 || weightKg > 500) {
    return { bmi: 0, category: 'Normal weight', categoryColor: '#4ade80', scalePercent: 0, healthyWeightMin: 0, healthyWeightMax: 0, isValid: false, error: 'Weight must be between 10 and 500 kg' };
  }

  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  let category: BMIResult['category'];
  let categoryColor: string;

  if (bmi < 18.5) { category = 'Underweight'; categoryColor = '#60a5fa'; }
  else if (bmi < 25) { category = 'Normal weight'; categoryColor = '#4ade80'; }
  else if (bmi < 30) { category = 'Overweight'; categoryColor = '#facc15'; }
  else if (bmi < 40) { category = 'Obese'; categoryColor = '#f97316'; }
  else { category = 'Severely Obese'; categoryColor = '#ef4444'; }

  // Scale: 15 = 0%, 40 = 100%
  const scalePercent = Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));

  const healthyWeightMin = parseFloat((18.5 * heightM * heightM).toFixed(1));
  const healthyWeightMax = parseFloat((24.9 * heightM * heightM).toFixed(1));

  return { bmi, category, categoryColor, scalePercent, healthyWeightMin, healthyWeightMax, isValid: true };
}

export function kgToLbs(kg: number): number {
  return parseFloat((kg * 2.20462).toFixed(1));
}
export function lbsToKg(lbs: number): number {
  return parseFloat((lbs / 2.20462).toFixed(1));
}
export function cmToFtIn(cm: number): { ft: number; inches: number } {
  const totalInches = cm / 2.54;
  return { ft: Math.floor(totalInches / 12), inches: parseFloat((totalInches % 12).toFixed(1)) };
}
export function ftInToCm(ft: number, inches: number): number {
  return parseFloat(((ft * 12 + inches) * 2.54).toFixed(1));
}
