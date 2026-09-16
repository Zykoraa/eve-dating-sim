import React from 'react';
import { Play, FolderOpen, Settings, Heart, Award, GitFork, Home, Palette } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import type { TransitionEra } from '../../types/game';

export const TitleScreen: React.FC = () => {
  const { setViewMode, setScene, advanceEra } = useGameStore();

  const handleStartGame = () => {
    soundEngine.playSparkle();
    advanceEra(0, 0);
    setScene('era0_start', 'era0_coming_out');
    setViewMode('novel');
  };

  const handleChapterJump = (sceneId: string, scenarioId: string, era: TransitionEra) => {
    soundEngine.playClick();
    advanceEra(era);
    setScene(sceneId, scenarioId);
    setViewMode('novel');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 flex items-center justify-center p-6 md:p-12 select-none">
      {/* Pristine Rooftop Twilight Wallpaper (Free of any baked-in text or faux buttons) */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-70 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(/assets/backgrounds/title_bg.jpg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/40" />
      </div>

      {/* Main Content Layout: Two-Column Hero */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
        {/* Left Column: Game Title & Interactive Menu */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 bg-pink-950/80 border border-pink-500/50 px-4 py-1.5 rounded-full text-xs font-bold text-pink-300 backdrop-blur-md shadow-lg w-fit">
              <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" /> 
              <span>An Interactive MTF Romance Visual Novel</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-rose-950/90 border border-rose-500/60 px-3 py-1.5 rounded-full text-xs font-extrabold text-rose-300 backdrop-blur-md shadow-lg tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>18+ Adults Only • Raw Romance & Intimacy</span>
            </div>
          </div>

          <div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-purple-300 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] mb-3">
              Becoming Eve
            </h1>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium max-w-lg drop-shadow">
              From first HRT doses, messy eyeliner, and clumsy cafe dates to fierce confidence, genuine romance, and unapologetic joy.
            </p>
          </div>

          {/* Functional Interactive Menu Buttons */}
          <div className="w-full max-w-md space-y-3 pt-2">
            <button
              onClick={handleStartGame}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black text-base shadow-2xl shadow-pink-600/40 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-3 border border-pink-400/60 group"
            >
              <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" /> 
              <span>Start New Journey</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playSparkle();
                setViewMode('creator');
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-950/80 via-pink-950/60 to-slate-900 hover:bg-pink-900/60 text-pink-200 font-extrabold text-xs sm:text-sm border border-pink-500/50 hover:border-pink-400 backdrop-blur-md transition flex items-center justify-center gap-2.5 shadow-lg hover:scale-105 cursor-pointer"
            >
              <Palette className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>Character Creator & Styling Studio</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playSparkle();
                setViewMode('apartment');
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-pink-300 font-bold text-xs border border-pink-500/40 hover:border-pink-400 backdrop-blur-md transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Home className="w-4 h-4 text-pink-400" />
              <span>Eve's Apartment Sanctuary & City Life Sim</span>
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => setViewMode('save_load')}
                className="py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 hover:border-pink-500/50 backdrop-blur-md transition flex items-center justify-center gap-1.5 shadow-lg"
              >
                <FolderOpen className="w-3.5 h-3.5 text-pink-400" /> 
                <span>Load</span>
              </button>

              <button
                onClick={() => setViewMode('flowchart')}
                className="py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 hover:border-purple-500/50 backdrop-blur-md transition flex items-center justify-center gap-1.5 shadow-lg"
              >
                <GitFork className="w-3.5 h-3.5 text-purple-400" /> 
                <span>Story Tree</span>
              </button>

              <button
                onClick={() => setViewMode('gallery')}
                className="py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 hover:border-amber-500/50 backdrop-blur-md transition flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" /> 
                <span>Gallery</span>
              </button>

              <button
                onClick={() => setViewMode('settings')}
                className="py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 hover:border-pink-500/50 backdrop-blur-md transition flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Settings className="w-3.5 h-3.5 text-pink-400" /> 
                <span>Settings</span>
              </button>
            </div>

            {/* Quick Era Jumps */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <button 
                onClick={() => handleChapterJump('era0_start', 'era0_coming_out', 0)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
              >
                Ch 0: Coming Out (Boy-Mode)
              </button>
              <button 
                onClick={() => handleChapterJump('era0_family_dinner_start', 'era0_family_dinner', 0)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-slate-800 text-rose-300 border border-rose-500/40 transition"
              >
                Ch 0: Family Dinner
              </button>
              <button 
                onClick={() => handleChapterJump('era1_bea_crisis_flashback', 'era1_bea_aftermath', 1)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/40 transition"
              >
                Ch 1: Crisis Room & Evicting Bea
              </button>
              <button 
                onClick={() => handleChapterJump('era1_swimsuit_start', 'era1_first_swimsuit', 1)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 transition"
              >
                Ch 1: Pier Swimsuit
              </button>
              <button 
                onClick={() => handleChapterJump('era1_cafe_intro', 'era1_dates', 1)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-pink-900/60 text-pink-300 border border-slate-800 transition"
              >
                Ch 1: Liam
              </button>
              <button 
                onClick={() => handleChapterJump('era2_cabaret_intro', 'era2_cabaret_and_ink', 2)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-purple-900/60 text-purple-300 border border-purple-500/40 transition"
              >
                Ch 2: Roxie Cabaret & Jesse Ink
              </button>
              <button 
                onClick={() => handleChapterJump('era2_punk_intro', 'era2_dates', 2)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-pink-900/60 text-pink-300 border border-slate-800 transition"
              >
                Ch 2: Chloe
              </button>
              <button 
                onClick={() => handleChapterJump('era3_courthouse_steps', 'era3_name_change', 3)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 transition"
              >
                Ch 3: Legal Name Hearing
              </button>
              <button 
                onClick={() => handleChapterJump('era3_julian_intro', 'era3_dates', 3)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-pink-900/60 text-pink-300 border border-slate-800 transition"
              >
                Ch 3: Julian & Maya
              </button>
              <button 
                onClick={() => handleChapterJump('bea_ambush_start', 'bea_confrontation', 1)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/40 transition"
              >
                Ex: Facing Bea
              </button>
              <button 
                onClick={() => handleChapterJump('era4_climax_intro', 'era4_climaxes', 4)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-pink-900/60 text-pink-300 border border-slate-800 transition"
              >
                Ch 4: Climax
              </button>
              <button 
                onClick={() => {
                  soundEngine.playSparkle();
                  setScene('nsfw_hub', 'nsfw_encounters');
                  setViewMode('novel');
                }}
                className="px-2 py-0.5 rounded bg-rose-950/90 hover:bg-rose-900 text-rose-300 border border-rose-500/60 font-bold transition flex items-center gap-1 shadow-md shadow-rose-900/30"
              >
                <span>🔥 18+ After Dark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Eve's Character Portrait Feature */}
        <div className="hidden md:flex md:col-span-5 items-end justify-center h-full relative">
          <div className="relative max-h-[85vh] animate-float drop-shadow-[0_20px_40px_rgba(236,72,153,0.3)]">
            <img 
              src="/assets/characters/eve_era4.png" 
              alt="Eve"
              className="max-h-[80vh] object-contain filter contrast-105"
            />
            {/* Soft Ambient Glow Halo behind Eve */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pink-500/20 via-purple-500/15 to-transparent rounded-full filter blur-3xl scale-95" />
          </div>
        </div>
      </div>
    </div>
  );
};
