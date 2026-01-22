import React, { useState } from 'react';
import { View } from './types';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { FinancialPerformance } from './components/FinancialPerformance';
import { PlanForecast } from './components/PlanForecast';
import { ReserveBuilder } from './components/ReserveBuilder';
import { BuildingReadiness } from './components/BuildingReadiness';
import { RanchoExpansion, CovinaLaunch } from './components/ExpansionViews';
import { LayoutDashboard, PieChart, TrendingUp, PiggyBank, Building, ArrowUpRight, MapPin, Menu, X, Printer, Flag } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.ExecutiveSummary);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case View.ExecutiveSummary: return <ExecutiveSummary />;
      case View.FinancialPerformance: return <FinancialPerformance />;
      case View.Plan2026: return <PlanForecast />;
      case View.ReserveBuilder: return <ReserveBuilder />;
      case View.BuildingReadiness: return <BuildingReadiness />;
      case View.RanchoExpansion: return <RanchoExpansion />;
      case View.CovinaLaunch: return <CovinaLaunch />;
      default: return <ExecutiveSummary />;
    }
  };

  const navItems = [
    { view: View.ExecutiveSummary, icon: <LayoutDashboard size={20} strokeWidth={1.5} /> },
    { view: View.FinancialPerformance, icon: <PieChart size={20} strokeWidth={1.5} /> },
    { view: View.Plan2026, icon: <TrendingUp size={20} strokeWidth={1.5} /> },
    { view: View.ReserveBuilder, icon: <PiggyBank size={20} strokeWidth={1.5} /> },
    { view: View.BuildingReadiness, icon: <Building size={20} strokeWidth={1.5} /> },
    { view: View.RanchoExpansion, icon: <ArrowUpRight size={20} strokeWidth={1.5} /> },
    { view: View.CovinaLaunch, icon: <MapPin size={20} strokeWidth={1.5} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900 font-sans">
      {/* Sidebar - Clean White with Foundr aesthetics */}
      <aside 
        className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed md:relative z-20 h-full shadow-sm`}
      >
        <div className="h-24 flex items-center justify-between px-6 border-b border-slate-100">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="bg-black text-white p-2 rounded-full">
                <Flag size={20} fill="white" />
              </div>
              <span className="font-bold text-3xl tracking-tight text-black lowercase font-sans">foundr</span>
            </div>
          ) : (
             <div className="bg-black text-white p-2 rounded-full mx-auto">
                <Flag size={20} fill="white" />
              </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-slate-900 transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-8">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.view}>
                <button
                  onClick={() => setCurrentView(item.view)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all text-sm font-medium text-left
                    ${currentView === item.view 
                      ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {isSidebarOpen && <span className="truncate leading-tight">{item.view}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {isSidebarOpen && (
             <div className="p-6 border-t border-slate-100">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-serif font-bold italic shrink-0">
                        OT
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-slate-900 font-serif truncate">Ownership Team</p>
                        <p className="text-xs text-slate-500 truncate">Admin Access</p>
                    </div>
                </div>
            </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative bg-dot-pattern">
        <header className="h-24 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-10 sticky top-0">
            <div>
                 <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-serif italic">{currentView}</h1>
                 <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-sans font-medium">Strategic Dashboard • {new Date().getFullYear()}</p>
            </div>
           
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition shadow-sm"
                >
                    <Printer size={16} />
                    <span className="hidden sm:inline">Export Report</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-black rounded-full hover:bg-slate-800 transition shadow-sm">
                    <span>Presentation Mode</span>
                </button>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-10">
            <div className="max-w-7xl mx-auto pb-12 animate-in fade-in duration-500">
                {renderView()}
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;