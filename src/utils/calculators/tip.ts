// Tip Calculator Engine

export interface TipResult {
  tipAmount: number;
  totalAmount: number;
  tipPerPerson: number;
  totalPerPerson: number;
  isValid: boolean;
  error?: string;
}

export function calculateTip(opts: {
  billAmount: number;
  tipPercent: number;
  numPeople: number;
}): TipResult {
  const { billAmount, tipPercent, numPeople } = opts;
  const empty = { tipAmount: 0, totalAmount: 0, tipPerPerson: 0, totalPerPerson: 0, isValid: false };

  if (!billAmount || billAmount <= 0) return { ...empty, error: 'Please enter a valid bill amount' };
  if (tipPercent < 0 || tipPercent > 100) return { ...empty, error: 'Tip percentage must be between 0 and 100' };
  if (!numPeople || numPeople < 1) return { ...empty, error: 'Number of people must be at least 1' };

  const tipAmount = parseFloat((billAmount * (tipPercent / 100)).toFixed(2));
  const totalAmount = parseFloat((billAmount + tipAmount).toFixed(2));
  const tipPerPerson = parseFloat((tipAmount / numPeople).toFixed(2));
  const totalPerPerson = parseFloat((totalAmount / numPeople).toFixed(2));

  return { tipAmount, totalAmount, tipPerPerson, totalPerPerson, isValid: true };
}
