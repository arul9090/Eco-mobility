
import React from 'react';
import { AppScreen } from '../types.ts';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <div className="flex-grow">
        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-6 py-4 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button 
            onClick={() => onNavigate(AppScreen.HOME)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === AppScreen.HOME ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <span className="material-icons">home</span>
            <span className="text-[10px] font-bold">Home</span>
          </button>
          
          <button 
            onClick={() => onNavigate(AppScreen.PLANNER)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === AppScreen.PLANNER ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <span className="material-icons">route</span>
            <span className="text-[10px] font-bold">Planner</span>
          </button>

          <div className="relative -mt-10">
            <button 
              onClick={() => onNavigate(AppScreen.MARKETPLACE)}
              className={`p-4 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95 ${currentScreen === AppScreen.MARKETPLACE ? 'bg-primary text-white shadow-primary/40' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}
            >
              <span className="material-icons text-3xl">{currentScreen === AppScreen.MARKETPLACE ? 'shopping_bag' : 'add'}</span>
            </button>
          </div>

          <button 
            onClick={() => onNavigate(AppScreen.PROFILE)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === AppScreen.PROFILE ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <span className="material-icons">insights</span>
            <span className="text-[10px] font-bold">Stats</span>
          </button>

          <button 
            onClick={() => onNavigate(AppScreen.SETTINGS)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === AppScreen.SETTINGS ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <span className="material-icons">settings</span>
            <span className="text-[10px] font-bold">Settings</span>
          </button>
        </div>
        
        {/* iOS Home Indicator */}
        <div className="w-32 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mt-4"></div>
      </nav>
    </div>
  );
};

export default Layout;
