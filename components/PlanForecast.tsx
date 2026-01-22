import React, { useState } from 'react';
import { Card } from './Card';
import { ForecastParams } from '../types';
import { pasadenaData, ranchoData, formatCurrency, formatPercent } from '../constants';
import { TrendingUp, PiggyBank, ArrowRight } from 'lucide-react';

export const PlanForecast: React.FC = () => {
  const [scenario, setScenario] = useState<'base' | 'conservative' | 'aggressive'>('base');
  const [params, setParams] = useState<ForecastParams>({
    pasadenaGrowth: 7,
    ranchoGrowth: 20,
    pasadenaMargin: 9,
    ranchoMargin: 16
  });

  const handleScenarioChange = (s: 'base' | 'conservative' | 'aggressive') => {
    setScenario(s);
    if (s === 'base') setParams({ pasadenaGrowth: 7, ranchoGrowth: 20, pasadenaMargin: 9, ranchoMargin: 16 });
    if (s === 'conservative') setParams({ pasadenaGrowth: 4, ranchoGrowth: 12, pasadenaMargin: 7, ranchoMargin: 12 });
    if (s === 'aggressive') setParams({ pasadenaGrowth: 12, ranchoGrowth: 30, pasadenaMargin: 12, ranchoMargin: 20 });
  };

  // Calculations
  const pasadenaBaseRev = pasadenaData.metrics[1].revenue;
  const ranchoBaseRev = ranchoData.metrics[1].revenue;

  const projPasRev = pasadenaBaseRev * (1 + params.pasadenaGrowth / 100);
  const projRanchoRev = ranchoBaseRev * (1 + params.ranchoGrowth / 100);
  const projCovinaRev = 150000; // Placeholder for partial year

  const projPasNet = projPasRev * (params.pasadenaMargin / 100);
  const projRanchoNet = projRanchoRev * (params.ranchoMargin / 100);
  const projCovinaNet = -25000; // Loss during launch

  const totalProjRev = projPasRev + projRanchoRev + projCovinaRev;
  const totalProjNet = projPasNet + projRanchoNet + projCovinaNet;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-full border border-slate-200 shadow-sm inline-flex">
            {(['conservative', 'base', 'aggressive'] as const).map(s => (
            <button
                key={s}
                onClick={() => handleScenarioChange(s)}
                className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all duration-300 ${
                scenario === s 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
                {s}
            </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card title="Forecast Drivers">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3 items-center">
                  <label className="text-sm font-bold text-slate-700 font-serif">Pasadena Rev. Growth</label>
                  <span className="text-xs font-bold text-white bg-slate-900 px-2 py-1 rounded">{params.pasadenaGrowth}%</span>
                </div>
                <input 
                  type="range" min="0" max="20" step="0.5"
                  value={params.pasadenaGrowth}
                  onChange={(e) => setParams({...params, pasadenaGrowth: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-3 items-center">
                  <label className="text-sm font-bold text-slate-700 font-serif">Rancho Rev. Growth</label>
                  <span className="text-xs font-bold text-white bg-slate-900 px-2 py-1 rounded">{params.ranchoGrowth}%</span>
                </div>
                <input 
                  type="range" min="0" max="50" step="1"
                  value={params.ranchoGrowth}
                  onChange={(e) => setParams({...params, ranchoGrowth: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>

               <div className="pt-6 border-t border-slate-100">
                <div className="flex justify-between mb-3 items-center">
                  <label className="text-sm font-bold text-slate-700 font-serif">Pasadena Net Margin</label>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">{params.pasadenaMargin}%</span>
                </div>
                <input 
                  type="range" min="0" max="20" step="0.5"
                  value={params.pasadenaMargin}
                  onChange={(e) => setParams({...params, pasadenaMargin: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

               <div>
                <div className="flex justify-between mb-3 items-center">
                  <label className="text-sm font-bold text-slate-700 font-serif">Rancho Net Margin</label>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">{params.ranchoMargin}%</span>
                </div>
                <input 
                  type="range" min="0" max="30" step="1"
                  value={params.ranchoMargin}
                  onChange={(e) => setParams({...params, ranchoMargin: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card title="2026 Projections">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-2xl border border-slate-100 relative overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-sm group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <TrendingUp size={100} />
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Projected Revenue</p>
                  <p className="text-4xl font-bold text-slate-900 font-serif">{formatCurrency(totalProjRev)}</p>
                  <p className="text-sm text-slate-500 mt-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    Incl. Covina estimate
                  </p>
                </div>
                <div className="p-8 rounded-2xl border border-slate-100 relative overflow-hidden bg-gradient-to-br from-white to-slate-50 shadow-sm group hover:shadow-md transition-shadow">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <PiggyBank size={100} />
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Projected Net Income</p>
                  <p className={`text-4xl font-bold font-serif ${totalProjNet > 0 ? 'text-teal-600' : 'text-rose-600'}`}>{formatCurrency(totalProjNet)}</p>
                  <p className="text-sm text-slate-500 mt-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    Mo. Contribution: <span className="font-bold">{formatCurrency(totalProjNet / 12)}</span>
                  </p>
                </div>
             </div>

             <div className="mt-8">
                <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Location Breakdown</h4>
                    <span className="text-xs text-slate-400 font-medium">Detailed View</span>
                </div>
                
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-4 px-6 font-bold text-slate-500 font-serif">Location</th>
                        <th className="text-right py-4 px-6 font-bold text-slate-500 font-serif">Revenue</th>
                        <th className="text-right py-4 px-6 font-bold text-slate-500 font-serif">Growth</th>
                        <th className="text-right py-4 px-6 font-bold text-slate-500 font-serif">Margin</th>
                        <th className="text-right py-4 px-6 font-bold text-slate-500 font-serif">Net Income</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900 font-serif">Pasadena</td>
                        <td className="text-right px-6 text-slate-700 font-medium">{formatCurrency(projPasRev)}</td>
                        <td className="text-right px-6 text-teal-600 font-bold bg-teal-50/30">+{params.pasadenaGrowth}%</td>
                        <td className="text-right px-6 text-slate-600">{params.pasadenaMargin}%</td>
                        <td className="text-right px-6 font-bold text-slate-900">{formatCurrency(projPasNet)}</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900 font-serif">Rancho</td>
                        <td className="text-right px-6 text-slate-700 font-medium">{formatCurrency(projRanchoRev)}</td>
                        <td className="text-right px-6 text-teal-600 font-bold bg-teal-50/30">+{params.ranchoGrowth}%</td>
                        <td className="text-right px-6 text-slate-600">{params.ranchoMargin}%</td>
                        <td className="text-right px-6 font-bold text-slate-900">{formatCurrency(projRanchoNet)}</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900 font-serif flex items-center gap-2">
                            Covina <span className="text-[10px] uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Launch</span>
                        </td>
                        <td className="text-right px-6 text-slate-700 font-medium">{formatCurrency(projCovinaRev)}</td>
                        <td className="text-right px-6 text-slate-300">N/A</td>
                        <td className="text-right px-6 text-rose-500 bg-rose-50/30">-16%</td>
                        <td className="text-right px-6 font-bold text-rose-600">{formatCurrency(projCovinaNet)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
