import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', action }) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6 lg:p-8 ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-6 pb-2">
          {title && <h3 className="text-slate-900 font-bold text-xl font-serif tracking-tight">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export const StatCard: React.FC<{ label: string; value: string; subValue?: string; trend?: 'up' | 'down' | 'neutral', icon?: React.ReactNode }> = ({ label, value, subValue, trend, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
       <div className={`p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors`}>
          {icon}
       </div>
       {trend && (
         <span className={`text-xs font-bold px-2 py-1 rounded-full ${
           trend === 'up' ? 'bg-teal-50 text-teal-700' : 
           trend === 'down' ? 'bg-rose-50 text-rose-700' : 
           'bg-slate-100 text-slate-600'
         }`}>
           {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '–'}
         </span>
       )}
    </div>
    
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-3xl font-bold text-slate-900 font-serif mb-1">{value}</h4>
      {subValue && (
        <p className={`text-sm font-medium ${trend === 'up' ? 'text-teal-600' : trend === 'down' ? 'text-rose-600' : 'text-slate-400'}`}>
          {subValue}
        </p>
      )}
    </div>
  </div>
);
