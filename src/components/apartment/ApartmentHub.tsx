import React, { useState } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Moon, 
  BookHeart, 
  Shirt, 
  Award, 
  Coffee, 
  Zap, 
  Coins, 
  Compass,
  Heart,
  ChevronRight
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';

export const ApartmentHub: React.FC = () => {
  const { state, setViewMode, setScene, advanceDay, advanceTime } = useGameStore();
  const [selectedDecor, setSelectedDecor] = useState<string | null>(null);

  const era = state.transitionEra;
  const calendar = state.calendar;

  const handleRest = () => {
    soundEngine.playClick();
    advanceTime(10);
  };

  const handleSleep = () => {
    soundEngine.playSparkle();
    advanceDay();
  };

  return (
    <div className="relative w-full h-full bg-slate-950 text-slate-100 overflow-hidden flex flex-col">
      {/* Background Room Artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/backgrounds/eve_room.png"
          alt="Eve's Apartment"
          className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
      </div>

      {/* Top Header HUD */}
      <header className="relative z-10 p-4 border-b border-white/10 bg-slate-950/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-white tracking-wide">Eve’s Sanctuary</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono border border-pink-500/30">
                Era {era}: Month {state.stats.hrtMonth} HRT
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {calendar.dayOfWeek} — Day {calendar.day} ({calendar.timeOfDay.toUpperCase()})
            </p>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="font-medium text-slate-300">Energy:</span>
            <span className="font-bold text-amber-300">{calendar.energy}/{calendar.maxEnergy}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10">
            <Coins className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-emerald-300">${state.stats.cash}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="font-medium text-slate-300">Conf:</span>
            <span className="font-bold text-pink-300">{state.stats.confidence}%</span>
          </div>

          <button
            onClick={() => setViewMode('city_hub')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-xs hover:brightness-110 shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Step Out into City</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Room Space */}
      <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 overflow-y-auto max-w-7xl mx-auto w-full items-center">
        
        {/* Left Column: Personal Care & Vanity */}
        <div className="space-y-4">
          <div 
            onClick={() => setViewMode('vanity')}
            className="group p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-pink-500/50 backdrop-blur-md shadow-xl transition-all cursor-pointer hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors">
                <Shirt className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-pink-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Open Mirror <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <h3 className="font-bold text-base text-white">Vanity Mirror & Wardrobe</h3>
            <p className="text-xs text-slate-400 mt-1">
              Style your outfits, practice winged eyeliner, or confront dysphoria with radical self-love.
            </p>
          </div>

          <div 
            onClick={() => setViewMode('phone')}
            className="group p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-purple-500/50 backdrop-blur-md shadow-xl transition-all cursor-pointer hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                HerSpace OS <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <h3 className="font-bold text-base text-white">HerSpace Smartphone</h3>
            <p className="text-xs text-slate-400 mt-1">
              InstaGlam social feed, Bloom dating app, The Nest community, voice tuner, and daily wellness logs.
            </p>
          </div>
        </div>

        {/* Center Column: Eve's Character Presence */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-56 h-80 sm:w-64 sm:h-96 rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-purple-950/60 via-slate-900/80 to-pink-950/40 shadow-2xl border border-white/10 group flex flex-col items-center justify-between">
            <div className="flex-1 flex items-center justify-center w-full">
              <img
                src={era === 1 
                  ? '/assets/characters/eve_era1.png' 
                  : era === 2 
                  ? '/assets/characters/eve_era2.png'
                  : era === 3
                  ? '/assets/characters/eve_era3.png'
                  : '/assets/characters/eve_era4.png'}
                alt="Eve"
                className="max-h-[300px] object-contain drop-shadow-[0_15px_30px_rgba(236,72,153,0.35)] transition-transform duration-500 group-hover:scale-105 select-none"
              />
            </div>
            <div className="w-full p-2 rounded-xl bg-slate-950/85 backdrop-blur-md text-xs border border-white/10">
              <p className="font-bold text-pink-300">Eve Blossoming</p>
              <p className="text-[10px] text-slate-400">“Taking each day as it comes.”</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={handleRest}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>Rest (-10 Eng)</span>
            </button>

            <button
              onClick={handleSleep}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs hover:brightness-110 shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-200" />
              <span>Sleep & End Day</span>
            </button>
          </div>

          {/* Intimate Sleepover & Holiday Host Buttons */}
          <div className="w-full flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                soundEngine.playSparkle();
                setScene('sleepover_hub', 'apartment_sleepovers');
                setViewMode('novel');
              }}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-900/60 via-rose-900/60 to-purple-900/60 border border-pink-500/40 text-pink-200 hover:text-white hover:border-pink-400 text-xs font-bold transition-all shadow flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Heart className="w-3.5 h-3.5 text-pink-400" />
              <span>Invite Suitor Over (Sleepover & Pillow Talk)</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playVictory();
                setScene('friendsgiving_start', 'friendsgiving');
                setViewMode('novel');
              }}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-950/70 via-purple-950/70 to-pink-950/70 border border-amber-500/40 text-amber-200 hover:text-white hover:border-amber-400 text-xs font-bold transition-all shadow flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Host Trans Friendsgiving (Chosen Family)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Diary & Room Decors */}
        <div className="space-y-4">
          <div 
            onClick={() => setViewMode('diary')}
            className="group p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-amber-500/50 backdrop-blur-md shadow-xl transition-all cursor-pointer hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <BookHeart className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Journal <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <h3 className="font-bold text-base text-white">Transition Diary</h3>
            <p className="text-xs text-slate-400 mt-1">
              Private handwritten diary entries tracking Eve’s feelings, milestones, dates, and emotional evolution.
            </p>
          </div>

          {/* Unlocked Room Decor Showcase */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Sanctuary Keepsakes</span>
              <span className="text-[10px] text-pink-400 font-mono">
                {state.apartmentDecors.filter(d => d.unlocked).length}/{state.apartmentDecors.length} Unlocked
              </span>
            </h4>

            <div className="grid grid-cols-4 gap-2">
              {state.apartmentDecors.map((decor) => (
                <button
                  key={decor.id}
                  onClick={() => setSelectedDecor(decor.id)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    decor.unlocked 
                      ? 'bg-slate-800/80 border-pink-500/30 hover:border-pink-400 text-pink-300 shadow-sm'
                      : 'bg-slate-950/50 border-white/5 text-slate-600 opacity-60'
                  }`}
                  title={decor.unlocked ? decor.name : 'Keepsake locked (progress routes to unlock)'}
                >
                  <Award className="w-4 h-4" />
                  <span className="text-[9px] truncate w-full text-center">{decor.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {selectedDecor && (
              <div className="mt-3 p-2.5 rounded-xl bg-slate-950/90 border border-white/10 text-xs">
                {(() => {
                  const d = state.apartmentDecors.find(item => item.id === selectedDecor);
                  if (!d) return null;
                  return (
                    <div>
                      <p className="font-bold text-pink-300">{d.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Gifted by: {d.giver}</p>
                      <p className="text-[11px] text-slate-300 mt-1">{d.description}</p>
                      <span className="inline-block mt-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        Perk: {d.statPerk}
                      </span>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
