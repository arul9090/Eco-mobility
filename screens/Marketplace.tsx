
import React from 'react';
import { AppScreen } from '../types.ts';

interface MarketplaceProps {
  onNavigate: (screen: AppScreen) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onNavigate }) => {
  return (
    <main className="max-w-md mx-auto pt-12 pb-24">
      <header className="px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold font-display tracking-tight">Marketplace</h1>
          <p className="text-sm opacity-60">Redeem your sustainable efforts</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
          <span className="material-icons text-slate-600 dark:text-slate-300">history</span>
        </button>
      </header>

      <div className="px-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-xl p-6 shadow-lg shadow-primary/20 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">Current Balance</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-icons text-eco-gold text-3xl">toll</span>
              <span className="text-4xl font-extrabold font-display">1,250</span>
              <span className="text-sm font-medium opacity-90 self-end mb-1">Eco-Coins</span>
            </div>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
              <span className="material-icons text-sm">add_circle</span>
              Earn more
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <section className="mb-8">
        <div className="px-6 flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold font-display">Featured Rewards</h2>
          <button className="text-primary text-sm font-semibold">View all</button>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 px-6">
          <RewardCard 
            title="50% off City Bike Rental" 
            detail="Unlimited rides for 24 hours" 
            cost={450} 
            score={5.0} 
            tag="Limited Time" 
            img="https://picsum.photos/seed/bike-rental/400/200" 
          />
          <RewardCard 
            title="Free Coffee at Green Beans" 
            detail="Valid for any medium beverage" 
            cost={200} 
            score={4.8} 
            tag="Popular" 
            color="eco-gold" 
            img="https://picsum.photos/seed/coffee/400/200" 
          />
        </div>
      </section>

      <div className="flex overflow-x-auto hide-scrollbar gap-2 px-6 mb-6">
        <FilterButton active text="All Items" />
        <FilterButton text="Transit" />
        <FilterButton text="Charging" />
        <FilterButton text="Products" />
      </div>

      <section className="px-6">
        <h2 className="text-lg font-bold font-display mb-4">Eco-Marketplace</h2>
        <div className="grid grid-cols-2 gap-4">
          <GridRewardItem title="Weekly Bus Pass" category="Transit" cost={400} img="https://picsum.photos/seed/bus/300/200" />
          <GridRewardItem title="EV Charging Credit" category="Energy" cost={500} img="https://picsum.photos/seed/ev-charge/300/200" />
          <GridRewardItem title="Bamboo Mug" category="Retail" cost={600} img="https://picsum.photos/seed/mug/300/200" />
          <GridRewardItem title="Canvas Tote Bag" category="Retail" cost={300} img="https://picsum.photos/seed/tote/300/200" />
        </div>
      </section>
    </main>
  );
};

const RewardCard = ({ title, detail, cost, score, tag, color = 'primary', img }: any) => (
  <div className="flex-shrink-0 w-72 bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
    <div className="h-32 bg-slate-200 relative">
      <img className="w-full h-full object-cover" src={img} alt={title} />
      <span className={`absolute top-3 left-3 bg-${color} ${color === 'eco-gold' ? 'text-slate-900' : 'text-white'} text-[10px] font-bold px-2 py-1 rounded-full uppercase`}>{tag}</span>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-slate-800 dark:text-white mb-1">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{detail}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-primary">
          <span className="material-icons text-sm">toll</span>
          <span className="font-bold">{cost}</span>
        </div>
        <span className="text-[10px] flex items-center gap-0.5 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded">
          <span className="material-icons text-[12px]">eco</span> {score}
        </span>
      </div>
    </div>
  </div>
);

const FilterButton = ({ text, active = false }: any) => (
  <button className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${active ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
    {text}
  </button>
);

const GridRewardItem = ({ title, category, cost, img }: any) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col">
    <div className="h-28 bg-slate-200 relative">
      <img className="w-full h-full object-cover" src={img} alt={title} />
    </div>
    <div className="p-3 flex flex-col flex-grow">
      <h4 className="text-sm font-bold leading-tight mb-1">{title}</h4>
      <div className="flex items-center gap-1 mb-3">
        <span className="material-icons text-[12px] text-primary">eco</span>
        <span className="text-[10px] opacity-60">{category}</span>
      </div>
      <button className="mt-auto w-full bg-primary/10 text-primary py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1">
        <span className="material-icons text-xs">toll</span> {cost}
      </button>
    </div>
  </div>
);

export default Marketplace;
