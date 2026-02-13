
import React from 'react';
import { AppScreen } from '../types.ts';

interface ProfileProps {
  onNavigate: (screen: AppScreen) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  return (
    <main className="max-w-md mx-auto px-6 pt-12 pb-24">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              alt="User Profile" 
              className="w-16 h-16 rounded-full border-2 border-primary object-cover" 
              src="https://picsum.photos/seed/alex/150/150" 
            />
            <div className="absolute -bottom-1 -right-1 bg-primary text-slate-900 p-1 rounded-full shadow-lg">
              <span className="material-icons text-sm block">verified</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Alex Rivera</h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/20 dark:bg-primary/10 text-primary border border-primary/30 rounded-full">
              <span className="material-icons text-sm">workspace_premium</span>
              <span className="text-xs font-bold uppercase tracking-wider">Level 5 Eco-Warrior</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onNavigate(AppScreen.SETTINGS)}
          className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm"
        >
          <span className="material-icons text-slate-400">settings</span>
        </button>
      </header>

      <section className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm border border-primary/10 mb-8 flex flex-col items-center">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Monthly Carbon Goal</h2>
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle className="text-slate-100 dark:text-slate-800" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
            <circle className="text-primary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="138.23" strokeLinecap="round" strokeWidth="12"></circle>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-extrabold tracking-tighter">75%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Reached</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">124kg</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">CO2 Saved</p>
          </div>
          <div className="text-center border-l border-slate-50 dark:border-slate-800">
            <p className="text-2xl font-bold text-primary">8.5</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Trees Saved</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-lg">Badges Earned</h3>
          <span className="text-primary text-sm font-bold cursor-pointer">See All</span>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          <Badge icon="directions_bike" text="10-day Bike Streak" />
          <Badge icon="directions_bus" text="Public Transit Pro" />
          <Badge icon="electric_bolt" text="Zero Emission Hero" />
        </div>
      </section>

      <section className="mb-8">
        <h3 className="font-extrabold text-lg mb-4">City Rankings</h3>
        <div className="space-y-3">
          <RankItem rank={1} name="Liam Smith" points={950} img="https://picsum.photos/seed/liam/100/100" trophy />
          <div className="flex items-center justify-between p-4 bg-primary text-slate-900 rounded-xl shadow-lg ring-4 ring-primary/20">
            <div className="flex items-center gap-4">
              <span className="font-extrabold w-4">4</span>
              <img alt="Rank You" className="w-10 h-10 rounded-full object-cover border-2 border-slate-900/10" src="https://picsum.photos/seed/alex/100/100" />
              <div>
                <p className="text-sm font-extrabold">Alex Rivera (You)</p>
                <p className="text-[10px] font-bold uppercase opacity-70">782 Points</p>
              </div>
            </div>
            <span className="bg-slate-900/10 px-2 py-1 rounded text-[10px] font-bold">TOP 5%</span>
          </div>
          <RankItem rank={5} name="Sarah Chen" points={724} img="https://picsum.photos/seed/sarah/100/100" up />
        </div>
      </section>
    </main>
  );
};

const Badge = ({ icon, text }: any) => (
  <div className="flex-none w-32 flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <span className="material-icons text-3xl">{icon}</span>
    </div>
    <p className="text-[11px] font-bold text-center leading-tight">{text}</p>
  </div>
);

const RankItem = ({ rank, name, points, img, trophy, up }: any) => (
  <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
    <div className="flex items-center gap-4">
      <span className="text-slate-400 font-extrabold w-4">{rank}</span>
      <img alt={`Rank ${rank}`} className="w-10 h-10 rounded-full object-cover" src={img} />
      <div>
        <p className="text-sm font-bold">{name}</p>
        <p className="text-[10px] text-slate-400 uppercase">{points} Points</p>
      </div>
    </div>
    {trophy && <span className="material-icons text-amber-400">emoji_events</span>}
    {up && <span className="material-icons text-slate-300">arrow_upward</span>}
  </div>
);

export default Profile;
