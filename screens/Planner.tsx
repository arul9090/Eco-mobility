
import React, { useState, useEffect } from 'react';
import { AppScreen } from '../types.ts';
import { GoogleGenAI } from "@google/genai";

interface PlannerProps {
  onNavigate: (screen: AppScreen) => void;
}

interface GroundingLink {
  uri: string;
  title: string;
  type: 'search' | 'maps';
}

const Planner: React.FC<PlannerProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [groundingLinks, setGroundingLinks] = useState<GroundingLink[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, (err) => console.error("Geolocation error:", err));
    }
  }, []);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setAiResponse(null);
    setGroundingLinks([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Help me find the most eco-friendly way to get to: ${searchQuery}. Provide current travel conditions and nearby green points of interest.`,
        config: {
          tools: [{ googleSearch: {} }, { googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: userLocation ? {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
              } : undefined
            }
          }
        },
      });

      const text = response.text;
      setAiResponse(text || "No insights found.");

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links: GroundingLink[] = [];

      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          links.push({ uri: chunk.web.uri, title: chunk.web.title, type: 'search' });
        }
        if (chunk.maps) {
          links.push({ uri: chunk.maps.uri, title: chunk.maps.title || "View on Google Maps", type: 'maps' });
        }
      });
      setGroundingLinks(links);
    } catch (error) {
      console.error("AI Search error:", error);
      setAiResponse("Sorry, I couldn't fetch live data right now. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 bg-white dark:bg-slate-900 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => onNavigate(AppScreen.HOME)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <span className="material-icons">arrow_back_ios_new</span>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold">Plan Route</h1>
            <p className="text-xs text-slate-500">Eco-conscious navigation</p>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <span className="material-icons">more_horiz</span>
          </button>
        </div>

        {/* AI Search Input */}
        <form onSubmit={handleAiSearch} className="relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination or ask 'Best bike route...'"
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-4 pl-12 pr-12 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-slate-900 rounded-lg flex items-center justify-center disabled:opacity-50"
          >
            {isSearching ? <span className="material-icons animate-spin text-sm">sync</span> : <span className="material-icons text-sm">auto_awesome</span>}
          </button>
        </form>
      </header>

      <div className="flex-1 overflow-y-auto px-6 space-y-6">
        {/* AI Results Section */}
        {aiResponse && (
          <section className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-5 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-icons text-primary">auto_awesome</span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Live Eco-Insights</h3>
            </div>
            <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap mb-4">
              {aiResponse}
            </div>
            
            {groundingLinks.length > 0 && (
              <div className="pt-4 border-t border-primary/10">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Sources & More Info</p>
                <div className="flex flex-wrap gap-2">
                  {groundingLinks.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full text-[11px] font-semibold border border-slate-100 dark:border-slate-700 hover:border-primary transition-colors shadow-sm"
                    >
                      <span className="material-icons text-[14px] text-primary">
                        {link.type === 'search' ? 'travel_explore' : 'place'}
                      </span>
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Map Section */}
        <div className="h-48 relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 ios-shadow">
          <img 
            alt="Route map visualization" 
            className="w-full h-full object-cover opacity-80" 
            src={`https://picsum.photos/seed/${searchQuery || 'nyc'}/800/600`} 
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
            <path className="dotted-path" d="M50 200 Q 150 180 200 120 T 350 50" fill="none" stroke="#13ec5b" strokeLinecap="round" strokeWidth="6"></path>
            <circle cx="50" cy="200" fill="#13ec5b" r="6"></circle>
            <circle cx="350" cy="50" fill="#13ec5b" r="8" stroke="white" strokeWidth="3"></circle>
          </svg>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2 ios-shadow">
            <span className="material-icons text-primary text-sm">eco</span>
            <span className="text-[10px] font-bold">Fastest eco-route selected</span>
          </div>
        </div>

        {/* Route Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Optimized Routes</h3>
            <span className="text-xs font-bold text-slate-400 uppercase">Sort by Eco</span>
          </div>

          <div 
            onClick={() => onNavigate(AppScreen.NAVIGATION)}
            className="relative bg-white dark:bg-slate-800 border-2 border-primary rounded-xl p-5 ios-shadow cursor-pointer transition-all active:scale-98"
          >
            <div className="absolute -top-3 right-5 bg-primary text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Best Impact
            </div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="material-icons text-primary text-3xl">directions_bike</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Cycling</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <span>15 min</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <span className="material-icons text-orange-500 text-xs">local_fire_department</span>
                      <span>240 kcal</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-primary">0g</span>
                <p className="text-[10px] text-slate-400 font-medium uppercase">CO₂</p>
              </div>
            </div>
            <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-icons text-primary text-sm">eco</span>
                <span className="text-xs font-semibold">Saves 1.2kg CO₂</span>
              </div>
              <span className="material-icons text-primary text-sm">arrow_forward_ios</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="material-icons text-blue-500 text-3xl">directions_bus</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Bus Line 4</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <span>22 min</span>
                    <span>•</span>
                    <span className="font-bold text-slate-900 dark:text-white">$2.75</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-slate-700 dark:text-slate-300">120g</span>
                <p className="text-[10px] text-slate-400 font-medium uppercase">CO₂</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Start Button */}
      <div className="fixed bottom-24 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-900 via-white dark:via-slate-900 to-transparent pointer-events-none">
        <button 
          onClick={() => onNavigate(AppScreen.NAVIGATION)}
          className="pointer-events-auto w-full bg-primary py-4 rounded-xl text-slate-900 font-bold text-lg shadow-xl shadow-primary/20 active:scale-95 transition-transform"
        >
          Start Eco-Trip
        </button>
      </div>
    </div>
  );
};

export default Planner;
