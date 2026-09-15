import React, { useState } from 'react';
import { 
  MapPin, 
  Sparkles, 
  Coins, 
  Zap, 
  Coffee, 
  Flower2, 
  BookOpen, 
  Gamepad2, 
  Mic, 
  HeartHandshake, 
  Users, 
  ShoppingBag, 
  Home, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import { CITY_ACTIVITIES } from '../../data/activities';
import type { CityActivity } from '../../types/game';

export const CityMapModal: React.FC = () => {
  const { state, setViewMode, performCityActivity } = useGameStore();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<CityActivity | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const era = state.transitionEra;
  const calendar = state.calendar;

  const activities = CITY_ACTIVITIES.filter((act) => {
    const eraMatch = act.unlockedEras.includes(era);
    const catMatch = filterCategory === 'all' || act.category === filterCategory;
    return eraMatch && catMatch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-emerald-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-indigo-400" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-purple-400" />;
      case 'Mic': return <Mic className="w-5 h-5 text-pink-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-400" />;
      case 'Users': return <Users className="w-5 h-5 text-sky-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-amber-300" />;
      default: return <Sparkles className="w-5 h-5 text-pink-400" />;
    }
  };

  const handleExecuteActivity = (act: CityActivity) => {
    if (calendar.energy < act.energyCost) {
      soundEngine.playTension();
      setNotice('Not enough energy! Rest at home or sleep to restore energy.');
      setTimeout(() => setNotice(null), 3500);
      return;
    }
    if (act.cashCost && state.stats.cash < act.cashCost) {
      soundEngine.playTension();
      setNotice('Not enough cash for this activity!');
      setTimeout(() => setNotice(null), 3500);
      return;
    }
    soundEngine.playSparkle();
    performCityActivity(act);
    setSelectedActivity(null);
  };

  return (
    <div className="relative w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* City Background Texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/backgrounds/street_night.png"
          alt="City Map"
          className="w-full h-full object-cover brightness-[0.4] blur-sm"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
      </div>

      {/* Floating Notice Toast */}
      {notice && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-red-600/90 to-rose-600/90 border border-red-400 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-2xl animate-bounce backdrop-blur-md">
          {notice}
        </div>
      )}

      {/* Top Header Navigation Bar */}
      <header className="relative z-10 p-4 border-b border-white/10 bg-slate-950/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-white">City Life & Districts</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono border border-pink-500/30">
                {calendar.dayOfWeek} ({calendar.timeOfDay.toUpperCase()})
              </span>
            </div>
            <p className="text-xs text-slate-400">Choose how to spend your day in the metropolitan queer district.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">Energy:</span>
            <span className="font-bold text-amber-300">{calendar.energy}/{calendar.maxEnergy}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs">
            <Coins className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-emerald-300">${state.stats.cash}</span>
          </div>

          <button
            onClick={() => setViewMode('apartment')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-pink-400" />
            <span>Return Home</span>
          </button>
        </div>
      </header>

      {/* Category Filter Pills */}
      <div className="relative z-10 px-6 py-3 border-b border-white/5 bg-slate-900/60 backdrop-blur-md flex items-center gap-2 overflow-x-auto no-scrollbar">
        <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0" />
        {[
          { id: 'all', label: 'All Districts' },
          { id: 'job', label: 'Jobs & Work Shifts' },
          { id: 'training', label: 'Vocal & Glam Studios' },
          { id: 'wellness', label: 'Self-Care & Sanctuary' },
          { id: 'hangout', label: 'Dates & Hangouts' },
          { id: 'shopping', label: 'Thrift & Fashion' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterCategory === cat.id
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-500/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((act) => {
            const hasEnergy = calendar.energy >= act.energyCost;
            const hasCash = !act.cashCost || state.stats.cash >= act.cashCost;
            const isAvailable = hasEnergy && hasCash;

            return (
              <div
                key={act.id}
                onClick={() => setSelectedActivity(act)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isAvailable 
                    ? 'bg-slate-900/80 border-white/10 hover:border-pink-500/50 hover:scale-[1.01] shadow-lg' 
                    : 'bg-slate-950/60 border-white/5 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-white/10 group-hover:border-pink-500/30 transition-colors">
                      {getIcon(act.icon)}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        <Zap className="w-3 h-3" /> -{act.energyCost}
                      </span>
                      {act.cashReward && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                          <Coins className="w-3 h-3" /> +${act.cashReward}
                        </span>
                      )}
                      {act.cashCost && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
                          <Coins className="w-3 h-3" /> -${act.cashCost}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-pink-300 transition-colors">
                    {act.name}
                  </h3>
                  <p className="text-[11px] text-pink-400 font-medium mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {act.location}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                {/* Stat Perks / Affection Tags */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {act.suitorAffection && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                        +{act.suitorAffection.amount} {act.suitorAffection.suitor}
                      </span>
                    )}
                    {act.statEffects.confidence && (
                      <span className="px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-300">
                        +{act.statEffects.confidence} Conf
                      </span>
                    )}
                    {act.statEffects.dysphoria && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                        {act.statEffects.dysphoria} Dysph
                      </span>
                    )}
                    {act.statEffects.voiceResonance && (
                      <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                        +{act.statEffects.voiceResonance} Voice
                      </span>
                    )}
                  </div>

                  <span className="text-pink-400 group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Execution Confirmation Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-400">
                {getIcon(selectedActivity.icon)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{selectedActivity.name}</h3>
                <p className="text-xs text-pink-400">{selectedActivity.location}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              {selectedActivity.description}
            </p>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 space-y-2 text-xs mb-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Energy Required:</span>
                <span className="font-bold text-amber-300">-{selectedActivity.energyCost} Energy</span>
              </div>
              {selectedActivity.cashReward && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Cash Payment:</span>
                  <span className="font-bold text-emerald-300">+${selectedActivity.cashReward}</span>
                </div>
              )}
              {selectedActivity.cashCost && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Cost:</span>
                  <span className="font-bold text-rose-300">-${selectedActivity.cashCost}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Time Advance:</span>
                <span className="font-bold text-indigo-300">Advances to next time slot</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExecuteActivity(selectedActivity)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-xs hover:brightness-110 shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
              >
                Engage in Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
