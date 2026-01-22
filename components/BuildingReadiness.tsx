import React, { useState } from 'react';
import { Card } from './Card';
import { formatCurrency, formatPercent } from '../constants';
import { CheckCircle2, XCircle, AlertTriangle, Building2, Calculator, Info } from 'lucide-react';

export const BuildingReadiness: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState(2250000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [amortization, setAmortization] = useState(20);
  const [annualEBITDA, setAnnualEBITDA] = useState(180000); // Default proxy

  const downPaymentAmount = purchasePrice * (downPaymentPct / 100);
  const loanAmount = purchasePrice - downPaymentAmount;
  
  // Monthly P&I Calculation
  const r = interestRate / 100 / 12;
  const n = amortization * 12;
  const monthlyPayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const annualDebtService = monthlyPayment * 12;
  
  const dscr = annualEBITDA / annualDebtService;

  // Readiness Logic
  const isDSCRGood = dscr >= 1.25;
  const isDSCRWarning = dscr >= 1.0 && dscr < 1.25;
  
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Inputs and Calculator - Spans 8 cols */}
        <div className="lg:col-span-8 space-y-6">
            <Card title="Acquisition Modeler" icon={<Calculator size={24}/>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Input Column */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-baseline mb-3">
                                <label className="text-sm font-bold text-slate-700 font-serif">Purchase Price</label>
                                <span className="text-xl font-bold text-slate-900 font-serif">{formatCurrency(purchasePrice)}</span>
                            </div>
                            <input 
                                type="range" min="1500000" max="3000000" step="50000"
                                value={purchasePrice}
                                onChange={(e) => setPurchasePrice(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-500"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                                <span>$1.5M</span>
                                <span>$3.0M</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-baseline mb-3">
                                <label className="text-sm font-bold text-slate-700 font-serif">Down Payment</label>
                                <span className="text-teal-600 font-bold bg-teal-50 px-2 py-1 rounded-md">{downPaymentPct}%</span>
                            </div>
                            <input 
                                type="range" min="10" max="40" step="5"
                                value={downPaymentPct}
                                onChange={(e) => setDownPaymentPct