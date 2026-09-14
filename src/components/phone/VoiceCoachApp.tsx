import React, { useState } from 'react';
import { Mic, Sparkles } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import confetti from 'canvas-confetti';

export const VoiceCoachApp: React.FC = () => {
  const { state, modifyStats } = useGameStore();
  const [pitchHz, setPitchHz] = useState(195);
  const [isExercising, setIsExercising] = useState(false);
  const [feedback, setFeedback] = useState('Adjust your pitch slider or practice resonance.');

  const handlePracticeWarmup = () => {
    soundEngine.playSparkle();
    setIsExercising(true);
    setFeedback('Huuuummmm... lifting resonance into your cheekbones and soft palate...');

    setTimeout(() => {
      setIsExercising(false);
      soundEngine.playVictory();
      confetti({ particleCount: 35, spread: 45, origin: { y: 0.6 } });
      modifyStats({ voiceResonance: 10, confidence: 5 });
      setFeedback('Flawless resonance! Bright, forward, and effortlessly feminine. +10 Voice Resonance!');
    }, 2000);
  };

  const isFeminineZone = pitchHz >= 190 && pitchHz <= 245;

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 p-4 overflow-y-auto">
      {/* App Header */}
      <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center gap-2">
          <Mic className="w-5 h-5 text-pink-400" /> Resonance Coach
        </h2>
        <span className="text-xs bg-purple-950/60 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded-full font-mono">
          Level {Math.floor(state.stats.voiceResonance / 20) + 1}
        </span>
      </div>

      {/* Main Pitch Tuner Meter */}
      <div className="my-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 text-center shadow-xl">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
          Target Vocal Resonance
        </span>
        <div className="text-3xl font-mono font-black text-pink-400 my-1">
          {pitchHz} <span className="text-base font-normal text-slate-400">Hz</span>
        </div>
        <p className="text-xs font-medium text-purple-300">
          {isFeminineZone ? '✨ Optimal Melodic Head Resonance' : 'Chest Resonance / Warm Base'}
        </p>

        {/* Visual Audio Wave Canvas Simulation */}
        <div className="h-16 my-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => {
            const height = isExercising 
              ? Math.sin(i * 0.5 + Date.now() * 0.01) * 25 + 30 
              : ((i % 5) + 2) * 6;
            return (
              <div 
                key={i}
                className="w-1.5 rounded-full transition-all duration-150"
                style={{
                  height: `${height}px`,
                  backgroundColor: isFeminineZone ? '#ec4899' : '#8b5cf6'
                }}
              />
            );
          })}
        </div>

        {/* Pitch Slider */}
        <input 
          type="range" 
          min="120" 
          max="260" 
          value={pitchHz}
          onChange={(e) => {
            const hz = Number(e.target.value);
            setPitchHz(hz);
            soundEngine.playPitchTone(hz, 0.15);
          }}
          className="w-full accent-pink-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1 mb-3">
          <span>120 Hz (Chest)</span>
          <span className="text-pink-400 font-bold">210 Hz (Femme Zone)</span>
          <span>260 Hz (High)</span>
        </div>

        <button
          onClick={() => soundEngine.playPitchTone(pitchHz, 0.6)}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-300 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 mx-auto"
        >
          <span>🎵 Test Pitch Reference ({pitchHz} Hz)</span>
        </button>
      </div>

      {/* Feedback Card */}
      <div className="bg-pink-950/30 border border-pink-500/30 p-3.5 rounded-xl mb-4 text-xs text-pink-200">
        <p>{feedback}</p>
      </div>

      {/* Action Button */}
      <button
        disabled={isExercising}
        onClick={handlePracticeWarmup}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl transition hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        {isExercising ? 'Listening & Tuning...' : 'Practice 30-Sec Vocal Warmup'}
      </button>

      {/* Stats Footnote */}
      <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
        <div className="flex justify-between">
          <span>Current Resonance Level:</span>
          <strong className="text-white">{state.stats.voiceResonance} / 100</strong>
        </div>
        <div className="flex justify-between">
          <span>Bonus on Date Dialogues:</span>
          <strong className="text-emerald-400">+{Math.floor(state.stats.voiceResonance / 10)} Charm</strong>
        </div>
      </div>
    </div>
  );
};
