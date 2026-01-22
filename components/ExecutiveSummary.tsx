import React from 'react';
import { StatCard, Card } from './Card';
import { pasadenaData, ranchoData, formatCurrency, formatPercent, RESERVE_TARGET, CURRENT_TOTAL_CASH } from '../constants';
import { TrendingUp, Wallet, Building2, Target, CheckCircle2 } from 'lucide-react';

export const ExecutiveSummary: React.FC = () => {
  const totalRev2025 = pasadenaData.metrics[1].revenue + ranchoData.metrics[1].revenue;
  const totalNet2025 = pasadenaData.metrics[1].netIncome + ranchoData.metrics[1].netIncome;
  const margin2025 = (totalNet2025 / totalRev2025) * 100;

  // Mock Purchase Readiness Score based on generic logic
  const readinessScore = 65; 

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="2025 Total Revenue" 
          value={formatCurrency(totalRev2025)} 
          subValue="+12.4% vs 2024" 
          trend="up"
          icon={<TrendingUp size={24} className="text-teal-600" />}
        />
        <StatCard 
          label="2025 Net Margin" 
          value={formatPercent(margin2025)} 
          subValue="Target: 15%" 
          trend="down"
          icon={<Target size={24} className="text-teal-600" />}
        />
        <StatCard 
          label="Current Cash Position" 
          value={formatCurrency(CURRENT_TOTAL_CASH)} 
          subValue={`Reserve Goal: ${formatCurrency(RESERVE_TARGET)}`} 
          trend="neutral"
          icon={<Wallet size={24} className="text-teal-600" />}
        />
        <StatCard 
          label="Purchase Readiness" 
          value={`${readinessScore}/100`} 
          subValue="Target: 85+ by Q4 2026" 
          trend="up"
          icon={<Building2 size={24} className="text-teal-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Strategic Goals 2026" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { text: "Increase Free Cash Flow", desc: "Optimize margins to fund reserves", status: "In Progress" },
              { text: "Purchase Building", desc: "Secure $1.5M-$3M financing by Dec 2026", status: "Planning" },
              { text: "Capital Reserve", desc: "Build 3-months operating expenses", status: "Behind" },
              { text: "Rancho Scale-up", desc: "Maximize ROI on recent buildout", status: "On Track" },
              { text: "Revenue Diversification", desc: "Increase private office inventory", status: "On Track" },
              { text: "Launch Covina", desc: "Market entry by Q4 2026", status: "Planning" },
            ].map((goal, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 transition-all cursor-default group">
                <div className={`mt-1 p-1 rounded-full ${goal.status === 'On Track' ? 'bg-teal-50 text-teal-600' : goal.status === 'Behind' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>
                    <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                     <h4 className="font-bold text-slate-900 text-sm font-serif group-hover:text-teal-700 transition-colors">{goal.text}</h4>
                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        goal.status === 'On Track' ? 'bg-teal-100 text-teal-700' : 
                        goal.status === 'Behind' ? 'bg-rose-100 text-rose-700' : 
                        'bg-slate-100 text-slate-600'
                     }`}>{goal.status}</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{goal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Financial Snapshot">
           <div className="space-y-8 py-2">
             <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-medium">Total Assets</span>
                  <span className="font-bold text-slate-900">{formatCurrency(pasadenaData.assets2025 + ranchoData.assets2025)}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-slate-900 h-2.5 rounded-full relative" style={{ width: '70%' }}></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-medium">Reserve Progress</span>
                  <span className="font-bold text-slate-900">{formatPercent((CURRENT_TOTAL_CASH / RESERVE_TARGET) * 100)}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-teal-500 h-2.5 rounded-full relative" style={{ width: `${(CURRENT_TOTAL_CASH / RESERVE_TARGET) * 100}%` }}></div>
                </div>
             </div>
             
             <div className="pt-6 border-t border-slate-100 mt-4">
               <h5 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">Key Action Item</h5>
               <p className="text-sm text-slate-700 leading-relaxed font-serif italic border-l-2 border-teal-500 pl-4 py-1 bg-teal-50/50 rounded-r">
                   "Review Rancho leasehold improvements ROI and adjust 2026 pricing model to accelerate reserve contribution."
               </p>
             </div>
           </div>
        </Card>
      </div>
    </div>
  );
};
