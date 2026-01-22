import React from 'react';
import { Card } from './Card';
import { formatCurrency } from '../constants';
import { Hammer, Users, Calendar, DollarSign, Check } from 'lucide-react';

export const RanchoExpansion: React.FC = () => {
  const investment = 49812.50;
  const incrementalRevenue = 4500; // Mock current monthly lift
  const paybackMonths = Math.ceil(investment / incrementalRevenue);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Rancho ROI Tracker">
           <div className="flex items-center gap-6 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="p-4 bg-white shadow-sm rounded-xl text-teal-600 ring-1 ring-slate-100">
                <Hammer size={32} strokeWidth={1.5} />
              </div>
              <div>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Total Investment (2025)</p>
                 <h3 className="text-3xl font-bold text-slate-900 font-serif">{formatCurrency(investment)}</h3>
                 <p className="text-sm text-slate-500 mt-1">Leasehold Improvements</p>
              </div>
           </div>

           <div className="space-y-6">
              <div>
                 <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-slate-600">Payback Progress</span>
                    <span className="text-slate-900">{paybackMonths} months remaining</span>
                 </div>
                 <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-slate-900 h-4 rounded-full relative" style={{ width: '15%' }}>
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                 </div>
                 <p className="text-xs text-right text-slate-400 mt-2 font-medium">Est. Break-even: Late 2026</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-teal-100 hover:shadow-md transition-all">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Monthly Lift</p>
                    <p className="text-2xl font-bold text-teal-600 mt-1 font-serif">+{formatCurrency(incrementalRevenue)}</p>
                 </div>
                 <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-teal-100 hover:shadow-md transition-all">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">New Desks</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1 font-serif">12</p>
                 </div>
              </div>
           </div>
        </Card>

        <Card title="Post-Construction KPIs">
            <div className="overflow-hidden rounded-xl border border-slate-100">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="text-left py-3 px-4 font-bold text-slate-400 font-serif uppercase text-xs tracking-wider">Metric</th>
                            <th className="text-right py-3 px-4 font-bold text-slate-400 font-serif uppercase text-xs tracking-wider">Target</th>
                            <th className="text-right py-3 px-4 font-bold text-slate-400 font-serif uppercase text-xs tracking-wider">Actual</th>
                            <th className="text-right py-3 px-4 font-bold text-slate-400 font-serif uppercase text-xs tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        <tr>
                            <td className="py-4 px-4 text-slate-700 font-bold font-serif">Private Office Occ.</td>
                            <td className="text-right px-4 text-slate-500">90%</td>
                            <td className="text-right px-4 font-bold text-slate-900">75%</td>
                            <td className="text-right px-4"><span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-md font-bold text-xs">Scale</span></td>
                        </tr>
                        <tr>
                            <td className="py-4 px-4 text-slate-700 font-bold font-serif">Membership Growth</td>
                            <td className="text-right px-4 text-slate-500">+5/mo</td>
                            <td className="text-right px-4 font-bold text-slate-900">+7/mo</td>
                            <td className="text-right px-4"><span className="text-teal-600 bg-teal-50 px-2 py-1 rounded-md font-bold text-xs">Good</span></td>
                        </tr>
                        <tr>
                            <td className="py-4 px-4 text-slate-700 font-bold font-serif">Event Revenue</td>
                            <td className="text-right px-4 text-slate-500">$2k/mo</td>
                            <td className="text-right px-4 font-bold text-slate-900">$850</td>
                            <td className="text-right px-4"><span className="text-rose-600 bg-rose-50 px-2 py-1 rounded-md font-bold text-xs">Lagging</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
      </div>
    </div>
  );
};

export const CovinaLaunch: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <Card title="Launch Timeline (2026)">
                <div className="space-y-0 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 py-2">
                    {[
                        { title: 'Location Secured', date: 'Q1 2026', status: 'done', desc: 'Site identified and lease agreement finalized.' },
                        { title: 'Permitting & Design', date: 'Q2 2026', status: 'current', desc: 'Architectural drawings, city approval.' },
                        { title: 'Buildout & Pre-Sales', date: 'Q3 2026', status: 'pending', desc: 'Construction, hard hat tours, marketing push.' },
                        { title: 'Soft Open', date: 'Oct 2026', status: 'pending', desc: 'Friends & Family, Founding Members move-in.' },
                        { title: 'Grand Opening', date: 'Jan 2027', status: 'pending', desc: 'Full operations, public launch event.' }
                    ].map((step, idx) => (
                        <div key={idx} className="relative pl-12 pb-8 last:pb-0 group">
                             <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 flex items-center justify-center bg-white z-10 transition-colors
                                ${step.status === 'done' ? 'border-teal-500 text-teal-500' : 
                                  step.status === 'current' ? 'border-slate-900 text-slate-900 shadow-md scale-110' : 
                                  'border-slate-200 text-slate-300'}`}>
                                    {step.status === 'done' ? <Check size={16} strokeWidth={3} /> : <span className="text-xs font-bold">{idx + 1}</span>}
                             </div>
                             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start p-4 rounded-xl hover:bg-slate-50 transition-colors -mt-2">
                                <div>
                                    <h4 className={`font-bold text-lg font-serif mb-1 ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.title}</h4>
                                    <p className="text-sm text-slate-500">{step.desc}</p>
                                </div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full mt-2 sm:mt-0 whitespace-nowrap
                                    ${step.status === 'current' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {step.date}
                                </span>
                             </div>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:border-teal-100 transition-colors">
                    <div className="flex flex-col items-center text-center p-2">
                        <div className="p-4 bg-teal-50 rounded-full text-teal-600 mb-4">
                            <DollarSign size={32} />
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">CapEx Budget</p>
                        <h3 className="text-3xl font-bold text-slate-900 mb-2 font-serif">$75,000</h3>
                        <p className="text-sm text-slate-500">Furniture & Fixtures</p>
                    </div>
                </Card>
                <Card className="hover:border-teal-100 transition-colors">
                    <div className="flex flex-col items-center text-center p-2">
                        <div className="p-4 bg-teal-50 rounded-full text-teal-600 mb-4">
                             <Users size={32} />
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Target Members (Yr 1)</p>
                        <h3 className="text-3xl font-bold text-slate-900 mb-2 font-serif">45</h3>
                        <p className="text-sm text-slate-500">60% Occupancy</p>
                    </div>
                </Card>
                <Card className="hover:border-teal-100 transition-colors">
                    <div className="flex flex-col items-center text-center p-2">
                        <div className="p-4 bg-teal-50 rounded-full text-teal-600 mb-4">
                             <Calendar size={32} />
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Breakeven Estimate</p>
                        <h3 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Month 9</h3>
                        <p className="text-sm text-slate-500">Post-Launch</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}