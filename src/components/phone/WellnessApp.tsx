import React from 'react';
import { 
  Heart, 
  Pill, 
  Droplet, 
  Sparkles, 
  Mic, 
  CheckCircle2, 
  Flame,
  Smile
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';

export const WellnessApp: React.FC = () => {
  const { state, toggleDailyRoutine } = useGameStore();
  const routines = state.dailyRoutines || {
    hrtLogged: false,
    waterLogged: false,
    skincareLogged: false,
    voiceWarmupLogged: false,
    streakDays: 3,
  };

  const completedCount = [
    routines.hrtLogged,
    routines.waterLogged,
    routines.skincareLogged,
    routines.voiceWarmupLogged,
  ].filter(Boolean).length;

  const progressPercent = Math.round((completedCount / 4) * 100);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-white/10 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-400 to-teal-600 flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wide text-emerald-300">
              Bloom Wellness
            </h2>
            <span className="text-[10px] text-slate-400 block -mt-0.5">HRT & Self-Care Sanctuary</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-1 rounded-xl text-xs font-bold">
          <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{routines.streakDays} Day Streak</span>
        </div>
      </div>

      {/* Overview Card */}
      <div className="p-4 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-200">Daily Self-Love Checklist</span>
            <p className="text-[11px] text-slate-400">Month {state.stats.hrtMonth} on E • You are blooming</p>
          </div>
          <span className="text-xs font-bold text-emerald-400">{progressPercent}% Done</span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Routine Checkboxes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {/* HRT */}
        <button
          onClick={() => toggleDailyRoutine('hrtLogged')}
          className={`w-full p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left ${
            routines.hrtLogged
              ? 'bg-emerald-950/40 border-emerald-500/60 text-slate-200'
              : 'bg-slate-900/70 border-white/10 text-slate-400 hover:border-emerald-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              routines.hrtLogged ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
            }`}>
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-xs font-bold block ${routines.hrtLogged ? 'text-emerald-300' : 'text-slate-200'}`}>
                Hormone Therapy (HRT)
              </span>
              <span className="text-[10px] text-slate-400">
                Estradiol & blocker dose taken • +10 Dysphoria Shield
              </span>
            </div>
          </div>
          <CheckCircle2 className={`w-5 h-5 transition-transform ${
            routines.hrtLogged ? 'text-emerald-400 scale-110' : 'text-slate-600'
          }`} />
        </button>

        {/* Water */}
        <button
          onClick={() => toggleDailyRoutine('waterLogged')}
          className={`w-full p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left ${
            routines.waterLogged
              ? 'bg-sky-950/40 border-sky-500/60 text-slate-200'
              : 'bg-slate-900/70 border-white/10 text-slate-400 hover:border-sky-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              routines.waterLogged ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-500'
            }`}>
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-xs font-bold block ${routines.waterLogged ? 'text-sky-300' : 'text-slate-200'}`}>
                Electrolytes & Hydration
              </span>
              <span className="text-[10px] text-slate-400">
                2L water + pickle juice salts • +5 Comfort Rating
              </span>
            </div>
          </div>
          <CheckCircle2 className={`w-5 h-5 transition-transform ${
            routines.waterLogged ? 'text-sky-400 scale-110' : 'text-slate-600'
          }`} />
        </button>

        {/* Skincare / Affirmation */}
        <button
          onClick={() => toggleDailyRoutine('skincareLogged')}
          className={`w-full p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left ${
            routines.skincareLogged
              ? 'bg-pink-950/40 border-pink-500/60 text-slate-200'
              : 'bg-slate-900/70 border-white/10 text-slate-400 hover:border-pink-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              routines.skincareLogged ? 'bg-pink-500/20 text-pink-400' : 'bg-slate-800 text-slate-500'
            }`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-xs font-bold block ${routines.skincareLogged ? 'text-pink-300' : 'text-slate-200'}`}>
                Skincare & Gentle Mirror Love
              </span>
              <span className="text-[10px] text-slate-400">
                Moisturize & 1 min affirmation • +5 Confidence
              </span>
            </div>
          </div>
          <CheckCircle2 className={`w-5 h-5 transition-transform ${
            routines.skincareLogged ? 'text-pink-400 scale-110' : 'text-slate-600'
          }`} />
        </button>

        {/* Voice Warmup */}
        <button
          onClick={() => toggleDailyRoutine('voiceWarmupLogged')}
          className={`w-full p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left ${
            routines.voiceWarmupLogged
              ? 'bg-purple-950/40 border-purple-500/60 text-slate-200'
              : 'bg-slate-900/70 border-white/10 text-slate-400 hover:border-purple-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              routines.voiceWarmupLogged ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-500'
            }`}>
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-xs font-bold block ${routines.voiceWarmupLogged ? 'text-purple-300' : 'text-slate-200'}`}>
                Resonance Pitch Practice
              </span>
              <span className="text-[10px] text-slate-400">
                Siren hums & forward resonance • +8 Voice Resonance
              </span>
            </div>
          </div>
          <CheckCircle2 className={`w-5 h-5 transition-transform ${
            routines.voiceWarmupLogged ? 'text-purple-400 scale-110' : 'text-slate-600'
          }`} />
        </button>

        {/* Affirmation Box */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-teal-900/20 border border-white/10 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 text-xs text-pink-300 font-bold">
            <Smile className="w-4 h-4" />
            <span>Today’s Hormone Affirmation</span>
          </div>
          <p className="text-xs text-slate-300 italic">
            "Your womanhood is not a performance for others to grade. It is the steady, quiet bloom of your own soul."
          </p>
        </div>
      </div>
    </div>
  );
};
