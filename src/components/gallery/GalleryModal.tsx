import React from 'react';
import { Award, Lock, Sparkles, X, Heart, Star, Compass } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';

interface EndingDef {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  quote: string;
  character: string;
  spriteUrl: string;
  themeGradient: string;
  hint: string;
}

const ENDINGS_DATA: EndingDef[] = [
  {
    id: 'ending_liam',
    title: 'Golden Bloom',
    subtitle: 'Liam Walker Romance Finale',
    badge: 'Devoted Ally Love',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    quote: '“Eve... from the first day I met you at that coffee shop, I knew you were the one. I want to build a life with you and love you forever.”',
    character: 'Liam Walker',
    spriteUrl: '/assets/characters/liam.png',
    themeGradient: 'from-emerald-950/60 via-slate-900/90 to-teal-950/60',
    hint: 'Choose Liam during the Chapter 4 Rooftop Climax.',
  },
  {
    id: 'ending_chloe',
    title: 'Velvet Riot & Queer Joy',
    subtitle: 'Chloe Vasquez Romance Finale',
    badge: 'T4T Magic & Sisterhood',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    quote: '“You and me, Eve. Against the entire boring world. We’re touring Europe next month, and you’re coming with me as my muse, my girl, my everything.”',
    character: 'Chloe Vasquez',
    spriteUrl: '/assets/characters/chloe.png',
    themeGradient: 'from-purple-950/60 via-slate-900/90 to-pink-950/60',
    hint: 'Choose Chloe during the Chapter 4 Rooftop Climax.',
  },
  {
    id: 'ending_julian',
    title: 'Cozy Infinite Horizons',
    subtitle: 'Julian Chen Romance Finale',
    badge: 'Gentle Soul Connection',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    quote: '“Every game I ever built was just a simulation of something I hadn’t found in real life. Until I met you.”',
    character: 'Julian Chen',
    spriteUrl: '/assets/characters/julian.png',
    themeGradient: 'from-blue-950/60 via-slate-900/90 to-indigo-950/60',
    hint: 'Choose Julian during the Chapter 4 Rooftop Climax.',
  },
  {
    id: 'ending_solo',
    title: 'Queen of Her Own Universe',
    subtitle: 'Self-Actualized Independence Finale',
    badge: 'Golden Empowerment',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    quote: '“You stand at the railing, feeling the cool night wind. You didn’t survive transition to seek permission. You are Eve. You are magnificent.”',
    character: 'Eve Herself',
    spriteUrl: '/assets/characters/eve_era4.png',
    themeGradient: 'from-pink-950/60 via-slate-900/90 to-amber-950/60',
    hint: 'Choose to celebrate Eve’s independent journey in Chapter 4.',
  },
];

export const GalleryModal: React.FC = () => {
  const { state, setViewMode } = useGameStore();

  const handleClose = () => {
    soundEngine.playClick();
    setViewMode(state.previousViewMode === 'title' ? 'title' : 'novel');
  };

  const unlockedCount = ENDINGS_DATA.filter((e) => state.unlockedEndings.includes(e.id)).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 md:p-8 animate-fadeIn overflow-hidden">
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" /> Hall of Memories & Finales
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-purple-200">
            Endings Gallery
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-900 border border-pink-500/30 px-4 py-2 rounded-2xl">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-200">
              {unlockedCount} / {ENDINGS_DATA.length} Finales Unlocked
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl w-full mx-auto flex-1 overflow-y-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENDINGS_DATA.map((ending) => {
            const isUnlocked = state.unlockedEndings.includes(ending.id);

            return (
              <div
                key={ending.id}
                className={`relative rounded-3xl border overflow-hidden p-6 transition-all duration-300 flex flex-col justify-between ${
                  isUnlocked
                    ? `bg-gradient-to-br ${ending.themeGradient} border-pink-500/40 shadow-2xl hover:border-pink-400/80`
                    : 'bg-slate-900/40 border-slate-800/80 opacity-70'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${ending.badgeColor}`}>
                      {ending.badge}
                    </span>
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> Unlocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-800/60 px-2.5 py-0.5 rounded-full border border-slate-700">
                        <Lock className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </div>

                  {/* Character and Details */}
                  <div className="flex gap-4 items-start">
                    <div className="w-24 h-28 rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-700/60 flex-shrink-0 flex items-end justify-center relative">
                      {isUnlocked ? (
                        <img
                          src={ending.spriteUrl}
                          alt={ending.character}
                          className="w-full h-full object-contain filter contrast-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                          <Lock className="w-8 h-8 opacity-40 mb-1" />
                          <span className="text-[10px] font-mono">Secret</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-100 mb-1">
                        {ending.title}
                      </h3>
                      <p className="text-xs font-semibold text-pink-400 mb-2">
                        {ending.subtitle}
                      </p>
                      {isUnlocked ? (
                        <p className="text-xs text-slate-300 italic leading-relaxed">
                          {ending.quote}
                        </p>
                      ) : (
                        <div className="text-xs text-slate-400 space-y-1">
                          <p className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
                            <Compass className="w-3 h-3" /> How to unlock:
                          </p>
                          <p className="italic text-slate-400">{ending.hint}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer status */}
                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Featuring: <strong className="text-slate-200">{ending.character}</strong></span>
                  {isUnlocked && (
                    <span className="text-pink-400 font-bold flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> Recorded in Memories
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
