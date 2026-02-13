
import React from 'react';
import { AppScreen } from '../types.ts';

interface SettingsProps {
  onNavigate: (screen: AppScreen) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  return (
    <main className="max-w-md mx-auto pb-24 pt-12">
      <header className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <button 
          onClick={() => onNavigate(AppScreen.HOME)}
          className="text-primary font-semibold hover:opacity-80 transition-opacity"
        >
          Done
        </button>
      </header>

      <section className="px-6 mb-8">
        <div className="bg-white dark:bg-slate-800/50 p-4 rounded-xl flex items-center space-x-4 border border-primary/10 shadow-sm">
          <img alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-primary" src="https://picsum.photos/seed/alex/150/150" />
          <div>
            <h2 className="font-bold text-lg">Alex Rivera</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Level 5 Eco-Warrior</p>
            <div className="mt-1 flex items-center text-primary text-xs font-bold uppercase tracking-wider">
              <span className="material-icons-round text-[14px] mr-1">eco</span>
              1.2 Tons CO2 Saved
            </div>
          </div>
          <span className="material-icons-round ml-auto text-slate-300">chevron_right</span>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="px-6 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Transport Preferences</h3>
        <div className="bg-white dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-700">
          <PreferenceToggle icon="pedal_bike" label="Bike" checked />
          <PreferenceToggle icon="directions_walk" label="Walk" checked />
          <PreferenceToggle icon="directions_bus" label="Public Transit" checked />
          <PreferenceToggle icon="ev_station" label="Electric Vehicle" checked />
          <PreferenceToggle icon="groups" label="Carpool" />
        </div>
      </section>

      <section className="mb-8">
        <h3 className="px-6 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Vehicle Details</h3>
        <div className="bg-white dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-700">
          <div className="px-6 py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-500">Active EV Model</label>
                <span className="text-primary font-bold text-sm">Edit Model</span>
              </div>
              <div className="flex items-center bg-background-light dark:bg-background-dark p-3 rounded-lg border border-primary/20">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-md shadow-sm overflow-hidden mr-4 flex items-center justify-center">
                  <span className="material-icons text-3xl text-slate-400">electric_car</span>
                </div>
                <div>
                  <h4 className="font-bold">Tesla Model 3</h4>
                  <p className="text-xs text-slate-500">Long Range Dual Motor</p>
                </div>
                <div className="ml-auto text-right">
                  <span className="block text-xs font-bold text-primary uppercase">82% Charged</span>
                  <span className="text-[10px] text-slate-400">Range: 310 mi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 mb-12">
        <button 
          onClick={() => onNavigate(AppScreen.HOME)}
          className="w-full bg-slate-100 dark:bg-slate-800 text-red-500 font-bold py-4 rounded-xl active:opacity-70 transition-all flex items-center justify-center space-x-2"
        >
          <span className="material-icons-round text-[20px]">logout</span>
          <span>Sign Out</span>
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-[0.2em]">EcoRoute AI v2.4.1</p>
      </section>
    </main>
  );
};

const PreferenceToggle = ({ icon, label, checked = false }: any) => (
  <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 dark:border-slate-700/50 last:border-none">
    <div className="flex items-center space-x-4">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <span className="material-icons-round text-[20px]">{icon}</span>
      </div>
      <span className="font-medium">{label}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={checked} className="sr-only peer" />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
    </label>
  </div>
);

export default Settings;
