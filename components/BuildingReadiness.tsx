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
                                onChange={(e) => setDownPaymentPct(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-500"
                            />
                            <p className="text-right text-xs text-slate-500 mt-1 font-medium">
                                Cash Required: <span className="text-slate-900">{formatCurrency(downPaymentAmount)}</span>
                            </p>
                        </div>

                        <div>
                            <div className="flex justify-between items-baseline mb-3">
                                <label className="text-sm font-bold text-slate-700 font-serif">Interest Rate</label>
                                <span className="text-teal-600 font-bold bg-teal-50 px-2 py-1 rounded-md">{interestRate}%</span>
                            </div>
                            <input 
                                type="range" min="4" max="9" step="0.25"
                                value={interestRate}
                                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-500"
                            />
                        </div>

                         <div>
                            <div className="flex justify-between items-baseline mb-3">
                                <label className="text-sm font-bold text-slate-700 font-serif">Projected EBITDA</label>
                                <span className="text-slate-900 font-bold bg-slate-100 px-2 py-1 rounded-md">{formatCurrency(annualEBITDA)}</span>
                            </div>
                             <input 
                                type="range" min="100000" max="400000" step="10000"
                                value={annualEBITDA}
                                onChange={(e) => setAnnualEBITDA(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-500"
                            />
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                <Info size={12} /> Includes 2026 forecast + owner add-backs
                            </p>
                        </div>
                    </div>

                    {/* Output Column */}
                    <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Building2 size={120} />
                        </div>

                        <div className="relative z-10">
                            <div className="text-center mb-8">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Est. Monthly Payment</p>
                                <p className="text-5xl font-bold text-white font-serif tracking-tight">{formatCurrency(monthlyPayment)}</p>
                                <p className="text-slate-500 text-xs mt-2">Principal & Interest only</p>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-3">
                                 <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                    <span className="text-slate-300">Loan Amount</span>
                                    <span className="font-medium text-white font-serif tracking-wide">{formatCurrency(loanAmount)}</span>
                                </div>
                                 <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                    <span className="text-slate-300">Annual Debt Service</span>
                                    <span className="font-medium text-rose-300 font-serif tracking-wide">{formatCurrency(annualDebtService)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-300">LTV Ratio</span>
                                    <span className="font-medium text-teal-300 font-serif tracking-wide">{100 - downPaymentPct}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>

        {/* Scorecard - Spans 4 cols */}
        <div className="lg:col-span-4 space-y-6">
            <Card title="Lender Readiness" className="h-full">
                <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative mb-6">
                        {/* 
                           Added viewBox="0 0 160 160" to fix clipping issues.
                           The coordinate system now explicitly matches the circle centers (80,80) and radius+stroke.
                           70 radius + 6 stroke-width = 76 extent. 80+76 = 156. Fits in 160 box.
                        */}
                        <svg className="w-40 h-40 transform -rotate-90 overflow-visible" viewBox="0 0 160 160">
                            <circle
                                className="text-slate-100"
                                strokeWidth="12"
                                stroke="currentColor"
                                fill="transparent"
                                r="70"
                                cx="80"
                                cy="80"
                            />
                            <circle
                                className={`${isDSCRGood ? 'text-teal-500' : isDSCRWarning ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000 ease-out`}
                                strokeWidth="12"
                                strokeDasharray={440}
                                strokeDashoffset={440 - (Math.min(dscr, 2) / 2) * 440}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="70"
                                cx="80"
                                cy="80"
                            />
                        </svg>
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                            <span className={`text-4xl font-bold font-serif ${isDSCRGood ? 'text-teal-600' : isDSCRWarning ? 'text-amber-600' : 'text-rose-600'}`}>
                                {dscr.toFixed(2)}x
                            </span>
                            <span className="text-xs text-slate-400 font-bold uppercase mt-1">DSCR</span>
                        </div>
                    </div>
                    
                    <div className={`mb-8 px-4 py-2 rounded-full text-sm font-bold shadow-sm border ${isDSCRGood ? 'bg-teal-50 text-teal-700 border-teal-200' : isDSCRWarning ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        {isDSCRGood ? 'Exceeds Requirements' : isDSCRWarning ? 'Review Needed' : 'Below Target'}
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Approval Checklist</h4>
                    <ChecklistItem label="DSCR >= 1.25" status={isDSCRGood ? 'pass' : isDSCRWarning ? 'warn' : 'fail'} />
                    <ChecklistItem label="Reserve Goal Met" status="warn" />
                    <ChecklistItem label="Stable Profitability (2 yrs)" status="pass" />
                    <ChecklistItem label="A/R < 5% of Revenue" status="fail" />
                    <ChecklistItem label="Credit Card Debt < $10k" status="pass" />
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

const ChecklistItem: React.FC<{label: string, status: 'pass' | 'fail' | 'warn'}> = ({ label, status }) => {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            {status === 'pass' && <CheckCircle2 className="text-teal-500 w-5 h-5" />}
            {status === 'fail' && <XCircle className="text-rose-500 w-5 h-5" />}
            {status === 'warn' && <AlertTriangle className="text-amber-500 w-5 h-5" />}
        </div>
    )
}