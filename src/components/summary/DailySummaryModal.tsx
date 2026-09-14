import React from 'react';
import { 
  Moon, 
  Heart, 
  Coins, 
  Flame, 
  Sun, 
  ChevronRight,
  BookHeart
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';

export const DailySummaryModal: React.FC = () => {
  const { state, setViewMode } = useGameStore();

  const calendar = state.calendar;
  const latestDiary = state.diaryEntries[0];

  const handleAwaken = () => {
    soundEngine.playSparkle();
    setViewMode('apartment');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-900/40 animate-in fade-in zoom-in duration-300 text-center">
        
        {/* Glowing Moon Emblem */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-400 p-0.5 mx-auto mb-4 shadow-lg shadow-purple-500/30">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Moon className="w-8 h-8 text-purple-300 animate-pulse" />
          </div>
        </div>

        <h2 className="font-bold text-2xl text-white tracking-wide">
          Night Falls on Day {calendar.day - 1}
        </h2>
        <p className="text-xs text-purple-300/80 mt-1">
          Resting peacefully in your apartment sanctuary. Another step of your transition realized.
        </p>

        {/* Quick Stat Highlights */}
        <div className="grid grid-cols-3 gap-2.5 my-6">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/5">
            <Heart className="w-5 h-5 text-pink-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 block">Confidence</span>
            <span className="font-bold text-sm text-pink-300">{state.stats.confidence}%</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/5">
            <Coins className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 block">Savings</span>
            <span className="font-bold text-sm text-emerald-300"></span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/5">
            <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 block">Self-Care Streak</span>
            <span className="font-bold text-sm text-amber-300">{state.dailyRoutines.streakDays} Days</span>
          </div>
        </div>

        {/* Latest Diary Reflection Excerpt */}
        {latestDiary && (
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-left mb-6 relative">
            <div className="flex items-center justify-between text-xs text-pink-300 font-medium mb-1">
              <span className="flex items-center gap-1.5">
                <BookHeart className="w-3.5 h-3.5" /> {latestDiary.title}
              </span>
              <span>{latestDiary.sticker || '✨'}</span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-3 font-serif italic leading-relaxed">
              “{latestDiary.content}”
            </p>
          </div>
        )}

        {/* Action Button: Wake Up */}
        <button
          onClick={handleAwaken}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-sm hover:brightness-110 shadow-xl shadow-pink-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Sun className="w-4 h-4 text-amber-200 group-hover:rotate-45 transition-transform" />
          <span>Awaken to Day {calendar.day} ({calendar.dayOfWeek})</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  );
};
