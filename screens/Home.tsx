
import React from 'react';
import { AppScreen } from '../types.ts';

interface HomeProps {
  onNavigate: (screen: AppScreen) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <main className="max-w-md mx-auto px-5 pt-12 pb-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Welcome back,</h1>
          <p className="text-2xl font-extrabold">Alex Rivera</p>
        </div>
        <div className="relative cursor-pointer" onClick={() => onNavigate(AppScreen.PROFILE)}>
          <img 
            alt="User Profile" 
            className="w-12 h-12 rounded-full border-2 border-primary/20" 
            src="https://picsum.photos/seed/alex/100/100" 
          />
          <div className="absolute -bottom-1 -right-1 bg-primary w-4 h-4 rounded-full border-2 border-background-light flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </div>
        </div>
      </header>

      {/* Your Green Impact Card */}
      <section className="bg-primary rounded-xl p-6 mb-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="relative z-10">
          <h2 className="text-sm font-bold opacity-90 uppercase tracking-widest mb-4">Your Green Impact</h2>
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold leading-none">12.5</span>
                <span className="text-lg font-bold">kg</span>
              </div>
              <p className="text-xs font-medium opacity-80">CO2 Saved this week</p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-4xl font-extrabold leading-none">3</span>
                <span className="material-icons text-xl">forest</span>
              </div>
              <p className="text-xs font-medium opacity-80">Trees equivalent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="mb-8" onClick={() => onNavigate(AppScreen.PLANNER)}>
        <div className="relative group cursor-text">
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input 
            readOnly
            className="w-full bg-white dark:bg-slate-800/50 border-none rounded-xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 placeholder-slate-400 font-medium cursor-pointer" 
            placeholder="Where to next?" 
            type="text" 
          />
        </div>
      </section>

      {/* Nearby Eco-Options */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Nearby Eco-Options</h3>
          <button className="text-primary text-sm font-bold">See all</button>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {/* E-Bike Option */}
          <div className="min-w-[160px] bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <span className="material-icons text-primary">pedal_bike</span>
            </div>
            <p className="text-sm font-bold">E-bike</p>
            <p className="text-xs text-slate-500 mb-2">200m away</p>
            <div className="flex items-center gap-1 bg-primary/20 text-primary-dark rounded-full px-2 py-1 w-fit">
              <span className="material-icons text-[14px]">timer</span>
              <span className="text-[10px] font-bold">2 min</span>
            </div>
          </div>
          {/* Bus Option */}
          <div className="min-w-[160px] bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <span className="material-icons text-primary">directions_bus</span>
            </div>
            <p className="text-sm font-bold">Line 42 Bus</p>
            <p className="text-xs text-slate-500 mb-2">North Station</p>
            <div className="flex items-center gap-1 bg-primary/20 text-primary-dark rounded-full px-2 py-1 w-fit">
              <span className="material-icons text-[14px]">timer</span>
              <span className="text-[10px] font-bold">5 min</span>
            </div>
          </div>
          {/* Scooter Option */}
          <div className="min-w-[160px] bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <span className="material-icons text-primary">electric_scooter</span>
            </div>
            <p className="text-sm font-bold">Lime-S</p>
            <p className="text-xs text-slate-500 mb-2">450m away</p>
            <div className="flex items-center gap-1 bg-primary/20 text-primary-dark rounded-full px-2 py-1 w-fit">
              <span className="material-icons text-[14px]">battery_charging_full</span>
              <span className="text-[10px] font-bold">88%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Frequent Destinations */}
      <section>
        <h3 className="text-lg font-bold mb-4">Frequent Destinations</h3>
        <div className="space-y-3">
          <DestinationItem icon="home" name="Home" address="22 Maple Avenue" score={98} />
          <DestinationItem icon="work" name="Work" address="Innovation Plaza" score={92} />
          <DestinationItem icon="fitness_center" name="Peak Fitness" address="4th St Crossing" score={74} color="amber-500" />
        </div>
      </section>
    </main>
  );
};

const DestinationItem = ({ icon, name, address, score, color = 'primary' }: any) => (
  <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-50 dark:border-slate-700/50">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
        <span className="material-icons text-slate-500 dark:text-slate-400">{icon}</span>
      </div>
      <div>
        <p className="font-bold text-sm">{name}</p>
        <p className="text-xs text-slate-500">{address}</p>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Eco-Score</span>
      <span className={`text-${color === 'primary' ? 'primary' : color} font-extrabold`}>{score}</span>
    </div>
  </div>
);

export default Home;
