
import React from 'react';
import { AppScreen } from '../types.ts';

interface NavigationProps {
  onNavigate: (screen: AppScreen) => void;
}

const NavigationScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="relative h-screen w-full max-w-md mx-auto bg-white dark:bg-black shadow-2xl overflow-hidden flex flex-col">
      {/* Status Bar Space */}
      <div className="h-12 w-full flex justify-between items-center px-8 z-20">
        <span className="text-sm font-semibold">9:41</span>
        <div className="flex gap-1.5 items-center">
          <span className="material-icons text-[14px]">signal_cellular_alt</span>
          <span className="material-icons text-[14px]">wifi</span>
          <span className="material-icons text-[14px]">battery_full</span>
        </div>
      </div>

      {/* Map Section (60% Height) */}
      <div className="relative flex-grow h-[60%] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
        <div className="absolute inset-0">
          <img 
            alt="Navigation map" 
            className="w-full h-full object-cover opacity-80 dark:opacity-40 grayscale-[0.2]" 
            src="https://picsum.photos/seed/nav-map/800/1200" 
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 400 600">
            <path d="M50 550 L50 450 L150 450 L150 300 L300 300 L300 100" stroke="#13ec5b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></path>
            <circle cx="50" cy="550" fill="#13ec5b" r="10" stroke="white" strokeWidth="3"></circle>
            <circle cx="50" cy="550" fill="#13ec5b" fillOpacity="0.2" r="20">
              <animate attributeName="r" dur="1.5s" from="10" repeatCount="indefinite" to="25"></animate>
              <animate attributeName="opacity" dur="1.5s" from="0.4" repeatCount="indefinite" to="0"></animate>
            </circle>
          </svg>
        </div>

        {/* Floating Controls */}
        <div className="absolute top-4 left-4 z-10">
          <button onClick={() => onNavigate(AppScreen.PLANNER)} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-primary/20">
            <span className="material-icons text-slate-800 dark:text-white">arrow_back</span>
          </button>
        </div>
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-3">
          <button className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-primary/20">
            <span className="material-icons text-slate-800 dark:text-white">volume_up</span>
          </button>
          <button className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-primary/20">
            <span className="material-icons text-slate-800 dark:text-white">my_location</span>
          </button>
        </div>

        {/* POI Markers on Map */}
        <div className="absolute top-[45%] left-[38%] flex flex-col items-center">
          <div className="bg-primary text-white p-1 rounded-full shadow-lg border-2 border-white">
            <span className="material-icons text-[16px]">local_drink</span>
          </div>
        </div>
        <div className="absolute top-[30%] left-[65%] flex flex-col items-center">
          <div className="bg-primary text-white p-1 rounded-full shadow-lg border-2 border-white">
            <span className="material-icons text-[16px]">build</span>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="relative bg-white dark:bg-background-dark rounded-t-xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30">
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-primary w-2/3"></div>
        </div>
        <div className="flex justify-center py-2.5">
          <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        </div>
        <div className="px-6 pb-10">
          <div className="flex items-center gap-5 mb-6">
            <div className="bg-primary w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <span className="material-icons text-3xl">turn_left</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">Turn left on Oak St</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">In 200 meters • Then head North</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-primary/10 dark:bg-primary/5 p-4 rounded-xl border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-icons text-primary text-sm">eco</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Eco Score</span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-slate-800 dark:text-white">94</span>
                <span className="text-xs font-semibold text-primary mb-1">/100</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Saving 1.2kg CO₂</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-icons text-slate-400 text-sm">terrain</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Elevation</span>
              </div>
              <div className="h-8 flex items-end gap-[2px]">
                <div className="w-2 bg-slate-200 dark:bg-slate-700 h-[20%] rounded-t-sm"></div>
                <div className="w-2 bg-slate-200 dark:bg-slate-700 h-[40%] rounded-t-sm"></div>
                <div className="w-2 bg-primary h-[80%] rounded-t-sm"></div>
                <div className="w-2 bg-slate-200 dark:bg-slate-700 h-[60%] rounded-t-sm"></div>
                <div className="w-2 bg-slate-200 dark:bg-slate-700 h-[30%] rounded-t-sm"></div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Max Incline: 3%</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">12:35</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">12 min • 3.4 km</div>
            </div>
            <button 
              onClick={() => onNavigate(AppScreen.HOME)}
              className="bg-red-500/10 text-red-500 font-bold px-6 py-3 rounded-xl border border-red-500/20 active:scale-95 transition-transform"
            >
              End Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationScreen;
