// Age Calculator Engine

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalWeeks: number;
  nextBirthday: {
    daysUntil: number;
    date: string;
    zodiacSign: string;
  };
  isValid: boolean;
  error?: string;
}

const ZODIAC_SIGNS = [
  { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
  { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
  { sign: 'Pisces', start: [2, 19], end: [3, 20] },
  { sign: 'Aries', start: [3, 21], end: [4, 19] },
  { sign: 'Taurus', start: [4, 20], end: [5, 20] },
  { sign: 'Gemini', start: [5, 21], end: [6, 20] },
  { sign: 'Cancer', start: [6, 21], end: [7, 22] },
  { sign: 'Leo', start: [7, 23], end: [8, 22] },
  { sign: 'Virgo', start: [8, 23], end: [9, 22] },
  { sign: 'Libra', start: [9, 23], end: [10, 22] },
  { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
  { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
];

function getZodiacSign(month: number, day: number): string {
  for (const z of ZODIAC_SIGNS) {
    const [sm, sd] = z.start;
    const [em, ed] = z.end;
    if (sm === 12 && month === 12 && day >= sd) return z.sign;
    if (em === 1 && month === 1 && day <= ed) return z.sign;
    if (month === sm && day >= sd) return z.sign;
    if (month === em && day <= ed) return z.sign;
  }
  return 'Unknown';
}

export function calculateAge(birthDateStr: string, toDateStr?: string): AgeResult {
  const birth = new Date(birthDateStr);
  const to = toDateStr ? new Date(toDateStr) : new Date();

  if (isNaN(birth.getTime())) {
    return { years: 0, months: 0, days: 0, totalDays: 0, totalHours: 0, totalMinutes: 0, totalWeeks: 0, nextBirthday: { daysUntil: 0, date: '', zodiacSign: '' }, isValid: false, error: 'Invalid birth date' };
  }
  if (birth > to) {
    return { years: 0, months: 0, days: 0, totalDays: 0, totalHours: 0, totalMinutes: 0, totalWeeks: 0, nextBirthday: { daysUntil: 0, date: '', zodiacSign: '' }, isValid: false, error: 'Birth date cannot be in the future' };
  }

  let years = to.getFullYear() - birth.getFullYear();
  let months = to.getMonth() - birth.getMonth();
  let days = to.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalMs = to.getTime() - birth.getTime();
  const totalDays = Math.floor(totalMs / msPerDay);
  const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(totalMs / (1000 * 60));
  const totalWeeks = Math.floor(totalDays / 7);

  // Next birthday
  const thisYear = to.getFullYear();
  let nextBirthDate = new Date(thisYear, birth.getMonth(), birth.getDate());
  if (nextBirthDate <= to) {
    nextBirthDate = new Date(thisYear + 1, birth.getMonth(), birth.getDate());
  }
  const daysUntil = Math.ceil((nextBirthDate.getTime() - to.getTime()) / msPerDay);
  const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    totalWeeks,
    nextBirthday: {
      daysUntil,
      date: nextBirthDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      zodiacSign,
    },
    isValid: true,
  };
}
