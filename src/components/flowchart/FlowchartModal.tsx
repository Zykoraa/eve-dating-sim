import React, { useState } from 'react';
import { 
  GitFork, 
  CheckCircle2, 
  Lock, 
  Compass, 
  X, 
  Play, 
  Heart, 
  Shield, 
  Award 
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import type { TransitionEra } from '../../types/game';

interface StoryNodeMeta {
  id: string;
  scenarioId: string;
  title: string;
  era: TransitionEra;
  chapter: string;
  description: string;
  type: 'milestone' | 'date' | 'clash' | 'ending';
}

const STORY_NODES: StoryNodeMeta[] = [
  // Era 0: Pre-HRT & Coming Out
  {
    id: 'era0_start',
    scenarioId: 'era0_coming_out',
    title: 'Bathroom Mirror & Choosing Truth',
    era: 0,
    chapter: 'Chapter 0',
    description: 'Pre-HRT boy-mode exhaustion, late-night pizza with Tara, and deciding to live.',
    type: 'milestone',
  },
  {
    id: 'era0_family_dinner_start',
    scenarioId: 'era0_family_dinner',
    title: 'Sunday Dinner & "My Name is Eve"',
    era: 0,
    chapter: 'Chapter 0',
    description: 'Suffocating collared shirt, facing familial microaggressions, and declaring authenticity.',
    type: 'clash',
  },
  {
    id: 'era1_bea_crisis_flashback',
    scenarioId: 'era1_bea_aftermath',
    title: '12-Hour Crisis Hold & Banishment',
    era: 1,
    chapter: 'Chapter 1',
    description: 'Surviving Bea’s malicious 911 gun lie, changing deadbolts, and reclaiming sanctuary.',
    type: 'clash',
  },
  {
    id: 'era1_swimsuit_start',
    scenarioId: 'era1_first_swimsuit',
    title: 'Harborview Pier & The First Swimsuit',
    era: 1,
    chapter: 'Chapter 1',
    description: 'Conquering beach vulnerability in a retro one-piece and feeling ocean surf on bare skin.',
    type: 'milestone',
  },

  // Era 1
  {
    id: 'prologue_start',
    scenarioId: 'prologue',
    title: 'The Mirror & The Egg',
    era: 1,
    chapter: 'Chapter 0',
    description: 'Eve stands before her bedroom mirror, adjusting her pastel hoodie.',
    type: 'milestone',
  },
  {
    id: 'prologue_spark',
    scenarioId: 'prologue',
    title: 'First Steps on HerSpace',
    era: 1,
    chapter: 'Chapter 0',
    description: 'Downloading HerSpace OS and choosing to disclose her authentic self.',
    type: 'milestone',
  },
  {
    id: 'era1_cafe_intro',
    scenarioId: 'era1_dates',
    title: 'Sunbeam Café Date',
    era: 1,
    chapter: 'Chapter 1',
    description: 'Meeting Liam for the first gentle coffee date.',
    type: 'date',
  },
  {
    id: 'era1_bench_convo',
    scenarioId: 'era1_dates',
    title: 'Lilac Bench & Weeping Willow',
    era: 1,
    chapter: 'Chapter 1',
    description: 'Vulnerability by the fountain and gentle hand-holding.',
    type: 'date',
  },
  {
    id: 'era1_thrift_start',
    scenarioId: 'era1_dates',
    title: 'Velvet Vintage Thrift Trip',
    era: 1,
    chapter: 'Chapter 1',
    description: 'Thrift shopping with Tara and discovering fitting room euphoria.',
    type: 'milestone',
  },

  // Era 2
  {
    id: 'era2_park_date',
    scenarioId: 'era2_dates',
    title: 'Botanical Garden Stroll',
    era: 2,
    chapter: 'Chapter 2',
    description: 'Walking beneath hanging orchids with Liam as voice training takes root.',
    type: 'date',
  },
  {
    id: 'era2_greenhouse_walk',
    scenarioId: 'era2_dates',
    title: 'Orchid House Confession',
    era: 2,
    chapter: 'Chapter 2',
    description: 'A delicate confession among misting ferns and glowing flora.',
    type: 'date',
  },
  {
    id: 'era2_chloe_club',
    scenarioId: 'era2_dates',
    title: 'Neon Riot Underground',
    era: 2,
    chapter: 'Chapter 2',
    description: 'Loud amplifiers, combat boots, and fearless T4T energy with Chloe.',
    type: 'date',
  },
  {
    id: 'era2_bass_lesson',
    scenarioId: 'era2_dates',
    title: 'Loft Vinyl & Bass Vibrations',
    era: 2,
    chapter: 'Chapter 2',
    description: 'Learning bass guitar vibrations on Chloe’s rooftop loft.',
    type: 'date',
  },
  {
    id: 'era2_maya_mentorship',
    scenarioId: 'era2_dates',
    title: 'Page & Petal Bookstore Wisdom',
    era: 2,
    chapter: 'Chapter 2',
    description: 'Receiving chosen family guidance and trans history from elder sister Maya.',
    type: 'milestone',
  },
  {
    id: 'era2_cabaret_intro',
    scenarioId: 'era2_cabaret_and_ink',
    title: 'The Velvet Siren Chrysalis Ball',
    era: 2,
    chapter: 'Chapter 2',
    description: 'Backstage contour with Roxie and stepping into the blinding spotlight of chosen family.',
    type: 'milestone',
  },
  {
    id: 'era2_jesse_intro_branch',
    scenarioId: 'era2_cabaret_and_ink',
    title: 'Chrome & Thorn Sacred Ink & Night Ride',
    era: 2,
    chapter: 'Chapter 2',
    description: 'Violet butterfly tattoo with Jesse Nolan followed by a midnight motorcycle ride to Whispering Pines.',
    type: 'date',
  },

  // Era 3
  {
    id: 'era3_courthouse_steps',
    scenarioId: 'era3_name_change',
    title: 'Municipal Legal Name & Gender Hearing',
    era: 3,
    chapter: 'Chapter 3',
    description: 'Standing before the judge with Dr. Shaw’s letter to make Eve’s name and sex marker legally permanent.',
    type: 'milestone',
  },
  {
    id: 'era3_rooftop_intro',
    scenarioId: 'era3_dates',
    title: 'Skyline Lounge Twilight',
    era: 3,
    chapter: 'Chapter 3',
    description: 'Sophisticated city views and undeniable passing confidence.',
    type: 'date',
  },
  {
    id: 'era3_julian_arcade',
    scenarioId: 'era3_dates',
    title: 'Neon Arcade & Dev Jam',
    era: 3,
    chapter: 'Chapter 3',
    description: 'Pixel art nostalgia and cozy gaming chemistry with Julian.',
    type: 'date',
  },
  {
    id: 'era3_museum_start',
    scenarioId: 'era3_dates',
    title: 'Observatory Dome Walk',
    era: 3,
    chapter: 'Chapter 3',
    description: 'Beneath starlit projector domes with Julian.',
    type: 'date',
  },
  {
    id: 'era3_kitchen_cooking',
    scenarioId: 'era3_dates',
    title: 'Flour Fight & Cozy Dumplings',
    era: 3,
    chapter: 'Chapter 3',
    description: 'A heartwarming late-night cooking date filled with laughter.',
    type: 'date',
  },

  // Era 4
  {
    id: 'era4_marcus_showdown',
    scenarioId: 'era4_climaxes',
    title: 'Boundary Clash vs Marcus',
    era: 4,
    chapter: 'Chapter 4',
    description: 'Confronting the finance bro chaser and asserting self-respect.',
    type: 'clash',
  },
  {
    id: 'ending_liam_epilogue',
    scenarioId: 'era4_climaxes',
    title: 'Liam Epilogue: Greenhouse Sanctuary',
    era: 4,
    chapter: 'Ending',
    description: 'A peaceful life cultivating orchids and walking hand-in-hand in daylight.',
    type: 'ending',
  },
  {
    id: 'ending_chloe_epilogue',
    scenarioId: 'era4_climaxes',
    title: 'Chloe Epilogue: T4T European Tour',
    era: 4,
    chapter: 'Ending',
    description: 'Touring across Europe, screaming on stages, and living fiercely.',
    type: 'ending',
  },
  {
    id: 'ending_julian_epilogue',
    scenarioId: 'era4_climaxes',
    title: 'Julian Epilogue: Dreamscape Studio',
    era: 4,
    chapter: 'Ending',
    description: 'Co-creating poetic indie games that touch thousands of queer hearts.',
    type: 'ending',
  },
  {
    id: 'ending_solo_epilogue',
    scenarioId: 'era4_climaxes',
    title: 'Solo Epilogue: Radiant Horizon',
    era: 4,
    chapter: 'Ending',
    description: 'Eve stands at the pinnacle of self-actualization, mentoring others.',
    type: 'ending',
  },
];

export const FlowchartModal: React.FC = () => {
  const { state, setViewMode, fastTravelToScene } = useGameStore();
  const [selectedEra, setSelectedEra] = useState<number | 'all'>('all');

  const visitedScenes = state.visitedScenes || ['prologue_start'];
  const visitedCount = STORY_NODES.filter((n) => visitedScenes.includes(n.id)).length;
  const progressPercent = Math.round((visitedCount / STORY_NODES.length) * 100);

  const filteredNodes = selectedEra === 'all' 
    ? STORY_NODES 
    : STORY_NODES.filter((n) => n.era === selectedEra);

  const handleFastTravel = (node: StoryNodeMeta) => {
    fastTravelToScene(node.id, node.scenarioId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900/95 border border-pink-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <GitFork className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-300 via-purple-200 to-white bg-clip-text text-transparent">
                Story Flowchart & Timeline Tree
              </h2>
              <p className="text-xs text-slate-400">
                Explore narrative branches, track discovered scenes, and fast travel to any visited node
              </p>
            </div>
          </div>

          <button
            onClick={() => setViewMode(state.previousViewMode === 'flowchart' ? 'novel' : state.previousViewMode)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar & Filter Bar */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[240px]">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-pink-400" />
              <span>Story Discovered:</span>
              <span className="text-pink-400 font-bold">{progressPercent}%</span>
              <span className="text-slate-500 text-[11px]">({visitedCount}/{STORY_NODES.length} scenes)</span>
            </div>
            <div className="flex-1 max-w-xs h-2 rounded-full bg-slate-800 overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setSelectedEra('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedEra === 'all' ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Eras
            </button>
            {[1, 2, 3, 4].map((eraNum) => (
              <button
                key={eraNum}
                onClick={() => setSelectedEra(eraNum)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedEra === eraNum ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Era {eraNum}
              </button>
            ))}
          </div>
        </div>

        {/* Story Tree Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNodes.map((node) => {
              const isVisited = visitedScenes.includes(node.id);
              const isCurrent = state.currentSceneId === node.id;

              return (
                <div
                  key={node.id}
                  className={`relative p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-gradient-to-b from-pink-900/40 to-slate-900/90 border-pink-500 ring-2 ring-pink-500/30 shadow-lg shadow-pink-500/10'
                      : isVisited
                      ? 'bg-slate-800/70 border-white/15 hover:border-pink-500/40 hover:bg-slate-800/90'
                      : 'bg-slate-900/40 border-white/5 opacity-60'
                  }`}
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                          node.era === 1 
                            ? 'bg-pink-500/20 text-pink-300 border-pink-500/30'
                            : node.era === 2
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                            : node.era === 3
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}>
                          Era {node.era} • {node.chapter}
                        </span>
                        {node.type === 'clash' && (
                          <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                            <Shield className="w-3 h-3" /> Clash
                          </span>
                        )}
                        {node.type === 'ending' && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                            <Award className="w-3 h-3" /> Ending
                          </span>
                        )}
                        {node.type === 'date' && (
                          <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                            <Heart className="w-3 h-3" /> Romance
                          </span>
                        )}
                      </div>

                      {isCurrent ? (
                        <span className="text-[10px] bg-pink-500 text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                          Active
                        </span>
                      ) : isVisited ? (
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Visited
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" /> Locked
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-slate-100 mb-1 flex items-center gap-1.5">
                      {node.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      {isVisited ? node.description : 'Undiscovered scene branch. Advance your journey to unlock.'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">
                      ID: {node.id}
                    </span>

                    {isVisited && (
                      <button
                        onClick={() => handleFastTravel(node)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all ${
                          isCurrent
                            ? 'bg-white/10 text-white cursor-default'
                            : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:brightness-110 shadow-sm'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{isCurrent ? 'Current Scene' : 'Jump Here'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="p-3 bg-slate-950/80 border-t border-white/5 text-center text-xs text-slate-400">
          Tip: Fast traveling jumps Eve directly into the chosen story scene while preserving her current stats and unlocks.
        </div>
      </div>
    </div>
  );
};
