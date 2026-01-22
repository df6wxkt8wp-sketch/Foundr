import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card } from './Card';
import { pasadenaData, ranchoData, formatCurrency } from '../constants';

export const FinancialPerformance: React.FC = () => {
  const historyData = [
    {
      year: '2024',
      PasadenaRev: pasadenaData.metrics[0].revenue,
      RanchoRev: ranchoData.metrics[0].revenue,
      PasadenaNet: pasadenaData.metrics[0].netIncome,
      RanchoNet: ranchoData.metrics[0].netIncome,
    },
    {
      year: '2025',
      PasadenaRev: pasadenaData.metrics[1].revenue,
      RanchoRev: ranchoData.metrics[1].revenue,
      PasadenaNet: pasadenaData.metrics[1].netIncome,
      RanchoNet: ranchoData.metrics[1].netIncome,
    },
  ];

  const expenses2025 = [
    { name: 'Rent', value: 538222.54 },
    { name: 'Mgmt Fees', value: 289812.14 },
    { name: 'Other Ops', value: 839401.97 - 538222.54 - 289812.14 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 border border-slate-100 shadow-xl rounded-xl ring-1 ring-black/5">
          <p className="font-bold text-slate-900 mb-2 font-serif text-lg">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-500 font-medium">{entry.name}:</span>
                <span className="font-bold text-slate-900">{formatCurrency(entry.value)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Trends (2024 vs 2025)">
          <div className="h-80 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historyData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  stroke="#94a3b8" 
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#64748b' }} 
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  tickFormatter={(value) => `$${value / 1000}k`} 
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#64748b' }} 
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{fill: '#f0fdfa', opacity: 0.5}} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="PasadenaRev" name="Pasadena Revenue" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={48} />
                <Bar dataKey="RanchoRev" name="Rancho Revenue" fill="#14b8a6" radius={[6, 6, 0, 0]} barSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Net Income Performance">
          <div className="h-80 w-full mt-2">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  stroke="#94a3b8" 
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#64748b' }} 
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  tickFormatter={(value) => `$${value / 1000}k`} 
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#64748b' }} 
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="PasadenaNet" name="Pasadena Net" stroke="#0f172a" strokeWidth={4} activeDot={{ r: 8, fill: '#0f172a', strokeWidth: 0 }} dot={{r: 4, fill: '#0f172a'}} />
                <Line type="monotone" dataKey="RanchoNet" name="Rancho Net" stroke="#14b8a6" strokeWidth={4} activeDot={{ r: 8, fill: '#14b8a6', strokeWidth: 0 }} dot={{r: 4, fill: '#14b8a6'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Pasadena 2025 Expense Breakdown">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={expenses2025} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  stroke="#64748b" 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#475569' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="value" fill="#ef4444" radius={[0, 6, 6, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Balance Sheet Highlights (2025)" className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 pb-2 border-b border-slate-100">Pasadena</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all group">
                            <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Cash</span>
                            <span className="font-bold text-slate-900 text-lg">{formatCurrency(pasadenaData.assets2025)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all group">
                            <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">A/R</span>
                            <span className="font-bold text-slate-900 text-lg">$38,681.83</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 pb-2 border-b border-slate-100">Rancho</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all group">
                            <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Total Assets</span>
                            <span className="font-bold text-slate-900 text-lg">{formatCurrency(ranchoData.assets2025)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md transition-all group">
                            <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Total Liab.</span>
                            <span className="font-bold text-rose-600 text-lg">{formatCurrency(ranchoData.liabilities2025 || 0)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 p-5 bg-teal-50 border-l-4 border-teal-500 rounded-r-xl text-sm text-slate-700 font-serif italic flex items-start gap-3">
                <span className="font-sans not-italic font-bold text-teal-800 uppercase text-xs tracking-wider mt-1">Insight</span>
                <p>Pasadena A/R increased significantly in 2025 ($8.5k to $38.7k). Collections focus needed to improve cash flow for reserve building.</p>
            </div>
        </Card>
      </div>
    </div>
  );
};
