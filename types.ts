export enum View {
  ExecutiveSummary = 'Executive Summary',
  FinancialPerformance = 'Financial Performance',
  Plan2026 = '2026 Plan & Forecasts',
  ReserveBuilder = 'Reserve Builder',
  BuildingReadiness = 'Building Purchase Readiness',
  RanchoExpansion = 'Rancho Expansion',
  CovinaLaunch = 'Covina Launch Plan'
}

export interface FinancialMetric {
  year: number;
  revenue: number;
  netIncome: number;
  expenses: number;
}

export interface LocationData {
  id: string;
  name: string;
  metrics: FinancialMetric[];
  assets2024: number;
  assets2025: number;
  liabilities2025?: number;
  equity2025?: number;
}

export interface ForecastParams {
  pasadenaGrowth: number;
  ranchoGrowth: number;
  pasadenaMargin: number;
  ranchoMargin: number;
}

export interface BuildingParams {
  price: number;
  downPaymentPercent: number;
  interestRate: number;
  amortizationYears: number;
  addBacks: number;
}
