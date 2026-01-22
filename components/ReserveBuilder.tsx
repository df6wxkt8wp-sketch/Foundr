import React, { useState } from 'react';
import { Card } from './Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatCurrency, RESERVE_TARGET, CURRENT_TOTAL_CASH, MONTHLY_OPS_AVG } from '../constants';
import { AlertCircle, ShieldCheck, TrendingUp } from 'lucide-react';

export const ReserveBuilder: React.FC = () => {
  const [monthlySweep, setMonthlySweep] = useState(10000);
  
  // Calculate Timeline
  const gap = RESERVE_TARGET - CURRENT_TOTAL_CASH;
  const monthsToGoal = gap > 0 ? Math.ceil(gap / monthlySweep) : 0;
  
  const timelineData = [];
  let currentAccumulated = CURRENT_TOTAL_CASH;
  
  // Generate data for next 24 months
  for (let i = 0; i <= 24; i++) {
    timelineData.push({
      month: i,
      balance: currentAccumulated,
      target: RESERVE_TARGET
    });
    // Stop adding if we hit target widely to keep chart clean, or keep going a bit
    if (currentAccumulated < RESERVE_TARGET * 1.5) {
        currentAccumulated += monthlySweep;
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <Card title="Reserve Projection Timeline">
                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timelineData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                            <defs>
                                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis 
                                dataKey="month" 
                                label={{ value: 'Months from Now', position: 'bottom', offset: 0, fill: '#94a3b8', fontSize: 12 }} 
                                stroke="#94a3b8"
                                tick={{fill: '#64748b', fontSize: 12}}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis 
                                tickFormatter={(val) => `$${val/1000}k`} 
                                stroke="#94a3b8"
                                tick={{fill: '#64748b', fontSize: 12}}
                                axisLine={false}
                                tickLine={false}
                                dx={-10}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <Tooltip 
                                formatter={(value: number) => [formatCurrency(value), "Balance"]}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            />
                            <ReferenceLine y={RESERVE_TARGET} label={{ value: 'Target Goal', position: 'insideTopRight', fill: '#ef4444', fontSize: 12 }} stroke="#ef4444" strokeDasharray="4 4" />
                            <Area type="monotone" dataKey="balance" stroke="#14b8a6" strokeWidth={4} fillOpacity={1} fill="url(#colorBalance)" activeDot={{r: 6, strokeWidth: 0, fill: '#0f766e'}} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-2 text-center py-4 bg-slate-50 rounded-xl border border-slate-100 mx-4 mb-2">
                    {gap > 0 ? (
                        <p className="text-slate-600 font-medium font-serif italic text-lg flex items-center justify-center gap-2">
                            <TrendingUp size={20} className="text-teal-500"/>
                            On track to reach <span className="text-teal-600 font-bold">{formatCurrency(RESERVE_TARGET)}</span> in <span className="text-slate-900 font-bold underline decoration-teal-300 decoration-2 underline-offset-4">{monthsToGoal} months</span>.
                        </p>
                    ) : (
                        <p className="text-teal-600 font-bold flex items-center justify-center gap-2 text-lg"><ShieldCheck size={24} /> Target Achieved</p>
                    )}
                </div>
            </Card>
        </div>

        <div className="space-y-6">
            <Card title="Configuration">
                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="text-sm font-bold text-slate-700 font-serif">Monthly Sweep</label>
                            <span className="text-lg font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">{formatCurrency(monthlySweep)}</span>
                        </div>
                        <input 
                            type="range" min="1000" max="30000" step="1000"
                            value={monthlySweep}
                            onChange={(e) => setMonthlySweep(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-500"
                        />
                         <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                            <span>Conservative ($1k)</span>
                            <span>Aggressive ($30k)</span>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-slate-500 font-medium">Current Cash</span>
                            <span className="font-bold text-slate-900 text-lg">{formatCurrency(CURRENT_TOTAL_CASH)}</span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-slate-500 font-medium">Monthly Ops Avg</span>
                            <span className="font-bold text-slate-900">{formatCurrency(MONTHLY_OPS_AVG)}</span>
                        </div>
                        <div className="h-px bg-slate-200 my-2"></div>
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-slate-900 font-bold font-serif text-base">Target (3 Mo)</span>
                            <span className="font-bold text-rose-500 text-xl font-serif">{formatCurrency(RESERVE_TARGET)}</span>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="bg-amber-50 border-amber-100 shadow-none">
                <div className="flex gap-4">
                    <div className="bg-amber-100 p-2 rounded-full h-fit text-amber-600">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-amber-900 font-serif mb-1">Reserve Policy</h4>
                        <p className="text-xs text-amber-800 leading-relaxed opacity-90">
                            Funds can only be accessed if operating cash flow is negative for &gt; 30 days. Replenishment must be prioritized over distributions once cash flow stabilizes.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};