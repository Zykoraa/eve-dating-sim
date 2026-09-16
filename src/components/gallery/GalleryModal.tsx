import React, { useState } from 'react';
import { Award, Lock, Sparkles, X, Heart, Star, Compass, Eye, Flame, Maximize2 } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import { CG_GALLERY_ITEMS, type CGDef } from '../../data/cgs';

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
  const [activeTab, setActiveTab] = useState<'intimacy' | 'endings'>('intimacy');
  const [lightboxCG, setLightboxCG] = useState<CGDef | null>(null);

  const handleClose = () => {
    soundEngine.playClick();
    setViewMode(state.previousViewMode === 'title' ? 'title' : 'novel');
  };

  const isCGUnlocked = (cg: CGDef) => {
    return (
      state.unlockedCGs.includes(cg.id) ||
      state.unlockedCGs.includes(cg.imageUrl) ||
      state.flags[`unlocked_${cg.id}`]
    );
  };

  const unlockedEndingsCount = ENDINGS_DATA.filter((e) => state.unlockedEndings.includes(e.id)).length;
  const unlockedCGCount = CG_GALLERY_ITEMS.filter(isCGUnlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 md:p-8 animate-fadeIn overflow-hidden">
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" /> Hall of Memories & Visual Gallery
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-purple-200">
            Eve’s Visual Novel Gallery
          </h1>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('intimacy');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'intimacy'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-pink-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-300" />
            <span>Intimate CGs (18+)</span>
            <span className="ml-1 text-[10px] bg-slate-950/60 px-2 py-0.5 rounded-full border border-pink-500/30">
              {unlockedCGCount}/{CG_GALLERY_ITEMS.length}
            </span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('endings');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'endings'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Story Endings</span>
            <span className="ml-1 text-[10px] bg-slate-950/60 px-2 py-0.5 rounded-full border border-purple-500/30">
              {unlockedEndingsCount}/{ENDINGS_DATA.length}
            </span>
          </button>

          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition ml-2"
            title="Close Gallery"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl w-full mx-auto flex-1 overflow-y-auto py-8">
        {/* Tab 1: Intimate CG Artwork Gallery */}
        {activeTab === 'intimacy' && (
          <div className="space-y-6">
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400/30" />
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  These visual novel event illustrations capture Eve's most tender, affirming, and passionate romantic encounters. Each scene celebrates body euphoria, mutual consent, and deep emotional connection.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CG_GALLERY_ITEMS.map((cg) => {
                const isUnlocked = isCGUnlocked(cg);

                return (
                  <div
                    key={cg.id}
                    onClick={() => {
                      if (isUnlocked) {
                        soundEngine.playSparkle();
                        setLightboxCG(cg);
                      }
                    }}
                    className={`group relative rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                      isUnlocked
                        ? 'bg-slate-900/80 border-rose-500/40 shadow-xl hover:border-pink-400 hover:shadow-2xl hover:shadow-rose-500/10 cursor-pointer transform hover:-translate-y-1'
                        : 'bg-slate-900/30 border-slate-800/80 opacity-75'
                    }`}
                  >
                    {/* CG Thumbnail / Illustration */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                      {isUnlocked ? (
                        <>
                          <img
                            src={cg.imageUrl}
                            alt={cg.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                          <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-500/30 flex items-center gap-1.5 text-[10px] font-bold text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3 h-3 text-pink-400" />
                            <span>View Full CG</span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-gradient-to-b from-slate-950 to-slate-900">
                          <Lock className="w-10 h-10 opacity-30 mb-2" />
                          <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">
                            Intimate CG Locked
                          </span>
                        </div>
                      )}

                      {/* Lighting Mood Tag */}
                      <div className="absolute top-3 left-3 flex items-center gap-1 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-bold text-slate-300">
                        <Flame className="w-3 h-3 text-rose-400" />
                        <span className="capitalize">{cg.lightingMood.replace('_', ' ')}</span>
                      </div>
                    </div>

                    {/* CG Metadata */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">
                            {cg.suitorName}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Era {cg.era}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-pink-300 transition-colors">
                          {cg.title}
                        </h3>

                        {isUnlocked ? (
                          <p className="text-xs text-slate-300/90 italic line-clamp-3 mb-3">
                            {cg.quote}
                          </p>
                        ) : (
                          <div className="space-y-1 mb-3">
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Compass className="w-3 h-3 text-slate-500" /> How to unlock:
                            </span>
                            <p className="text-xs text-slate-400/80 italic line-clamp-2">
                              {cg.hint}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Footer Badge */}
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                        {isUnlocked ? (
                          <span className="text-pink-400 font-semibold flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" /> High-Resolution CG
                          </span>
                        ) : (
                          <span className="text-slate-500 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Locked Encounter
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Story Endings */}
        {activeTab === 'endings' && (
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
        )}
      </div>

      {/* Lightbox Modal for Fullscreen CG Inspection */}
      {lightboxCG && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setLightboxCG(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 border border-rose-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fullscreen CG Image */}
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <img
                src={lightboxCG.imageUrl}
                alt={lightboxCG.title}
                className="w-full h-full object-cover filter brightness-105 contrast-105"
              />
              <button
                onClick={() => setLightboxCG(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white rounded-full transition shadow-xl"
                title="Close Fullscreen View"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-500/40 flex items-center gap-2 text-xs font-bold text-pink-300 shadow-xl">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Atmosphere: {lightboxCG.lightingMood.replace('_', ' ').toUpperCase()}</span>
              </div>
            </div>

            {/* CG Narrative & Quotes */}
            <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                  {lightboxCG.subtitle}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Era {lightboxCG.era} Milestone
                </span>
              </div>

              <h2 className="text-2xl font-black text-white mb-2">
                {lightboxCG.title}
              </h2>

              <p className="text-sm text-pink-200/90 italic leading-relaxed mb-3">
                {lightboxCG.quote}
              </p>

              <p className="text-xs text-slate-400 leading-relaxed">
                {lightboxCG.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
