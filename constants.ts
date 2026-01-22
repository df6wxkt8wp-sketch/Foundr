import { LocationData } from './types';

// Pasadena Data
// 2024: Rev $820,017.95; Net $69,958.21 -> Exp = 750,059.74
// 2025: Rev $887,637.59; Net $48,235.62 -> Exp = 839,401.97
export const pasadenaData: LocationData = {
  id: 'pasadena',
  name: 'Pasadena',
  metrics: [
    { year: 2024, revenue: 820017.95, netIncome: 69958.21, expenses: 750059.74 },
    { year: 2025, revenue: 887637.59, netIncome: 48235.62, expenses: 839401.97 },
  ],
  assets2024: 100352.63,
  assets2025: 148588.25,
};

// Rancho Data
// 2024: Rev $393,052.57; Net $39,223.17 -> Exp = 353,829.40
// 2025: Rev $496,390.88; Net $68,298.03 -> Exp = 428,092.85
export const ranchoData: LocationData = {
  id: 'rancho',
  name: 'Rancho',
  metrics: [
    { year: 2024, revenue: 393052.57, netIncome: 39223.17, expenses: 353829.40 },
    { year: 2025, revenue: 496390.88, netIncome: 68298.03, expenses: 428092.85 },
  ],
  assets2024: 36244.80,
  assets2025: 95063.86,
  liabilities2025: 125224.43,
  equity2025: -30160.57
};

// Combined 2025 Operating Expenses for Reserve Calculation
export const TOTAL_EXPENSES_2025 = pasadenaData.metrics[1].expenses + ranchoData.metrics[1].expenses;
export const MONTHLY_OPS_AVG = TOTAL_EXPENSES_2025 / 12; // ~$105,624
export const RESERVE_TARGET = MONTHLY_OPS_AVG * 3; // ~$316,873

// Current Cash Position (Est from 2025 Balance Sheets + Assumption of continued ops)
// Pas Cash 2025: 87k. Let's assume some accrued cash for Rancho.
export const CURRENT_TOTAL_CASH = 87068.62 + 20000; // Estimated starting cash

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};
