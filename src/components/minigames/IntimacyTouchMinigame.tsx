import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Flame, X, Award, ShieldCheck } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import confetti from 'canvas-confetti';
import { CHARACTERS } from '../../data/characters';
import type { SuitorId } from '../../types/game';

interface TouchZone {
  id: string;
  label: string;
  description: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  pulseType: 'slow' | 'fast' | 'gentle';
  statBoost: 'euphoria' | 'affection' | 'resonance';
}

const TOUCH_ZONES: TouchZone[] = [
  {
    id: 'lips_jaw',
    label: 'Tender Lips & Jawline',
    description: 'Slow, lingering kisses that melt away the world',
    x: 50,
    y: 28,
    pulseType: 'slow',
    statBoost: 'euphoria',
  },
  {
    id: 'throat_collarbone',
    label: 'Sensitive Collarbone & Throat',
    description: 'Warm breath and delicate kisses sending shivers down your spine',
    x: 48,
    y: 38,
    pulseType: 'fast',
    statBoost: 'euphoria',
  },
  {
    id: 'waist_ribs',
    label: 'Blossoming Waist & Soft Ribs',
    description: 'Affirming hands tracing feminine curves with pure reverence',
    x: 52,
    y: 54,
    pulseType: 'gentle',
    statBoost: 'resonance',
  },
  {
    id: 'entwined_fingers',
    label: 'Entwined Fingers & Palms',
    description: 'Tight, grounding grip anchoring your souls together in the dark',
    x: 35,
    y: 68,
    pulseType: 'slow',
    statBoost: 'affection',
  },
  {
    id: 'nape_shoulders',
    label: 'Bare Shoulders & Warm Nape',
    description: 'Passionate pull, drawing bodies flush against each other',
    x: 65,
    y: 35,
    pulseType: 'fast',
    statBoost: 'resonance',
  },
];

// Partner specific whispered praises
const PARTNER_WHISPERS: Record<string, string[]> = {
  chloe: [
    '“God, Eve... right there. Every single inch of you is a woman.”',
    '“You feel so fucking soft against me, baby... don’t ever let go.”',
    '“Look at us. Two girls in love, making our own sanctuary under the neon lights.”',
    '“Your shivers... I love how sensitive you are, Eve. Let me take care of you.”',
    '“You’re my muse, my girl, my absolute everything tonight.”',
  ],
  liam: [
    '“Eve... sweetheart, you are the most breathtaking woman I’ve ever held.”',
    '“I’ve got you, love. Relax into me... there’s nowhere else I’d rather be.”',
    '“Your skin is like silk by the firelight. You take my breath away.”',
    '“Every heartbeat of mine belongs to you tonight, beautiful.”',
    '“Never doubt how real and cherished you are with me, Eve.”',
  ],
  julian: [
    '“Every universe I ever modeled... none of them felt this real or this perfect.”',
    '“Your breath against my throat... Eve, you drive me completely wild.”',
    '“Hold onto my hands, love. We’re in our own constellation tonight.”',
    '“The way you arch against me... you’re so breathtakingly beautiful.”',
    '“I want to memorize every single curve of your body tonight.”',
  ],
  maya: [
    '“Divinity in human form, Eve. You are sacred art in my arms.”',
    '“Let the warmth of the oil and my kisses banish every doubt from your soul.”',
    '“Women are the only true magic on this earth, and you are radiant.”',
    '“Breathe with me, darling. Feel how profoundly you are desired.”',
    '“Your womanhood is complete, magnificent, and utterly worshipped tonight.”',
  ],
  jesse: [
    '“Hold onto my chest, Eve. Any time the world gets too loud, you’re safe with me.”',
    '“You are breathtaking, girl. Every inch of your curves drives me crazy.”',
    '“Look into my eyes... you’re completely mine tonight, and I’m yours.”',
    '“Kissing your collarbone right over that fresh ink... you feel incredible.”',
    '“Nobody will ever make you feel small again. You are pure fire.”',
  ],
  default: [
    '“For the first time in my life, my body feels like home. I am here. I am loved.”',
    '“Every touch affirms the woman I was always meant to be.”',
    '“Waves of pure euphoria melting away every shadow of the past.”',
    '“My heart beats in tune with authentic peace and radiant pleasure.”',
    '“I celebrate every curve, every sensation, every victory of my womanhood.”',
  ],
};

export const IntimacyTouchMinigame: React.FC = () => {
  const { state, setViewMode, triggerMinigame, modifyStats, updateSuitor } = useGameStore();

  const [euphoriaMeter, setEuphoriaMeter] = useState(20);
  const [rhythmBeat, setRhythmBeat] = useState(false);
  const [activeWhisper, setActiveWhisper] = useState<string>('Breathe together. Gently touch the glowing sensory points in time with your heartbeat.');
  const [touchStreak, setTouchStreak] = useState(0);
  const [isClimaxAchieved, setIsClimaxAchieved] = useState(false);
  const [lastTouchFeedback, setLastTouchFeedback] = useState<string | null>(null);

  const activeSuitorId = state.activeSuitor as SuitorId | null;
  const partnerName = activeSuitorId && activeSuitorId in CHARACTERS 
    ? CHARACTERS[activeSuitorId].name 
    : 'Eve Herself';

  const whisperList = activeSuitorId && activeSuitorId in PARTNER_WHISPERS 
    ? PARTNER_WHISPERS[activeSuitorId] 
    : PARTNER_WHISPERS.default;

  // Heartbeat pulse cycle every 1200ms
  useEffect(() => {
    const interval = setInterval(() => {
      setRhythmBeat((prev) => !prev);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const handleZoneTouch = (zone: TouchZone, _e: React.MouseEvent) => {
    if (isClimaxAchieved) return;

    soundEngine.playHeartbeat();

    // In rhythm bonus
    const inSync = rhythmBeat;
    const gain = inSync ? 18 : 12;

    const newMeter = Math.min(100, euphoriaMeter + gain);
    setEuphoriaMeter(newMeter);

    const newStreak = touchStreak + 1;
    setTouchStreak(newStreak);

    // Pick a whisper from partner
    const whisper = whisperList[Math.floor(Math.random() * whisperList.length)];
    setActiveWhisper(whisper);

    if (inSync) {
      soundEngine.playSparkle();
      setLastTouchFeedback(`Perfect Cadence on ${zone.label} • Deep Sensory Euphoria (+18%)`);
    } else {
      setLastTouchFeedback(`Tender Caress on ${zone.label} • Gentle Affirmation (+12%)`);
    }

    // Trigger Climax state when 100% reached
    if (newMeter >= 100) {
      soundEngine.playVictory();
      setIsClimaxAchieved(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#d946ef', '#fbcfe8'],
      });

      // Apply stat rewards
      modifyStats({
        confidence: 25,
        dysphoria: -30,
        comfortRating: 25,
      });

      if (activeSuitorId) {
        updateSuitor(activeSuitorId, {
          affection: (state.suitors[activeSuitorId]?.affection || 0) + 25,
          respect: (state.suitors[activeSuitorId]?.respect || 0) + 20,
        });
      }
    }
  };

  const handleFinish = () => {
    soundEngine.playSparkle();
    triggerMinigame('none');
    setViewMode('novel');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-8 animate-fadeIn select-none overflow-hidden">
      {/* Background Mood Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/30 via-slate-950 to-purple-950/40 pointer-events-none" />

      {/* Top Header & HUD */}
      <div className="relative z-10 max-w-4xl w-full flex items-center justify-between pb-4 border-b border-rose-500/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">
            <Flame className="w-4 h-4 text-rose-400 animate-pulse" /> Intimate Resonance & Caress (18+)
          </div>
          <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-purple-200">
            Sensory Harmony with {partnerName}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Heartbeat Cadence Indicator */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-rose-500/40 px-3.5 py-1.5 rounded-full shadow-lg">
            <Heart 
              className={`w-4 h-4 text-rose-400 transition-transform duration-300 ${
                rhythmBeat ? 'scale-125 fill-rose-500' : 'scale-100 fill-rose-500/30'
              }`} 
            />
            <span className="text-xs font-mono font-bold text-rose-200">
              {rhythmBeat ? 'Heartbeat Peak' : 'Deep Exhale'}
            </span>
          </div>

          <button
            onClick={handleFinish}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-full transition"
            title="Return to Story"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Euphoria & Sensory Progress Bar */}
      <div className="relative z-10 max-w-2xl w-full my-3 px-4">
        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
          <span className="text-rose-300 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Euphoria & Mutual Pleasure
          </span>
          <span className="font-mono text-pink-400 text-sm">{euphoriaMeter}%</span>
        </div>
        <div className="w-full bg-slate-900/90 h-3.5 rounded-full p-0.5 border border-rose-500/40 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 rounded-full transition-all duration-500 relative"
            style={{ width: `${euphoriaMeter}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Central Interactive Caress Stage */}
      <div className="relative z-10 flex-1 max-w-xl w-full flex items-center justify-center my-2">
        <div className="relative w-full aspect-[4/5] max-h-[52vh] rounded-3xl bg-slate-900/50 border border-rose-500/30 shadow-2xl overflow-hidden flex items-center justify-center">
          {/* Ambient Boudoir Background Art / Texture */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-rose-950/20 to-purple-950/30" />

          {/* Artistic Sensual Silhouette Guide */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none opacity-85">
            <svg 
              viewBox="0 0 400 500" 
              className="w-full h-full filter drop-shadow-[0_0_25px_rgba(244,63,94,0.3)]"
            >
              {/* Sensual Contours: Delicate Neck, Collarbones, Bustline, Feminine Waist, and Arms */}
              <path 
                d="M 200 60 C 185 60 175 75 175 95 C 175 115 185 130 200 130 C 215 130 225 115 225 95 C 225 75 215 60 200 60 Z" 
                fill="none" 
                stroke="rgba(244, 114, 182, 0.4)" 
                strokeWidth="2.5" 
              />
              {/* Neck & Throat */}
              <path 
                d="M 190 130 Q 185 160 165 175 Q 150 185 130 205 Q 115 220 110 260 Q 125 240 145 230" 
                fill="none" 
                stroke="rgba(244, 114, 182, 0.35)" 
                strokeWidth="2" 
              />
              <path 
                d="M 210 130 Q 215 160 235 175 Q 250 185 270 205 Q 285 220 290 260 Q 275 240 255 230" 
                fill="none" 
                stroke="rgba(244, 114, 182, 0.35)" 
                strokeWidth="2" 
              />
              {/* Collarbone Arc */}
              <path 
                d="M 160 175 Q 200 185 240 175" 
                fill="none" 
                stroke="rgba(251, 207, 232, 0.5)" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />
              {/* Torso, Soft Ribs, Developing Curves */}
              <path 
                d="M 145 230 Q 170 250 170 275 Q 155 310 150 350 Q 145 390 160 440" 
                fill="none" 
                stroke="rgba(244, 114, 182, 0.4)" 
                strokeWidth="2.5" 
              />
              <path 
                d="M 255 230 Q 230 250 230 275 Q 245 310 250 350 Q 255 390 240 440" 
                fill="none" 
                stroke="rgba(244, 114, 182, 0.4)" 
                strokeWidth="2.5" 
              />
              {/* Gentle Navel & Hip contours */}
              <circle cx="200" cy="360" r="3" fill="rgba(244, 63, 94, 0.6)" />
              <path 
                d="M 160 440 Q 200 460 240 440" 
                fill="none" 
                stroke="rgba(244, 114, 182, 0.3)" 
                strokeWidth="2" 
              />
            </svg>
          </div>

          {/* Interactive Touch Nodes */}
          {TOUCH_ZONES.map((zone) => (
            <button
              key={zone.id}
              onClick={(e) => handleZoneTouch(zone, e)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group p-3 rounded-full focus:outline-none transition-transform active:scale-90"
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              title={zone.label}
            >
              {/* Expanding Ripple Ring */}
              <div 
                className={`absolute inset-0 rounded-full border border-pink-400/60 transition-all duration-700 ${
                  rhythmBeat ? 'scale-150 opacity-0' : 'scale-100 opacity-60'
                } bg-pink-500/10 group-hover:bg-rose-500/30`} 
              />

              {/* Glowing Interactive Core Button */}
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-300 shadow-[0_0_15px_rgba(244,63,94,0.8)] border border-white/60 flex items-center justify-center transform group-hover:scale-125 transition-transform">
                <Heart className="w-4 h-4 fill-white text-white" />
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute left-1/2 -top-8 -translate-x-1/2 bg-slate-950/90 border border-pink-500/40 text-[10px] font-bold text-pink-200 px-2 py-0.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                {zone.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Whispered Narrative Feedback & Pacing Bar */}
      <div className="relative z-10 max-w-xl w-full bg-slate-900/85 backdrop-blur-md border border-rose-500/40 rounded-2xl p-4 shadow-xl text-center">
        {lastTouchFeedback && (
          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest mb-1 animate-fadeIn">
            {lastTouchFeedback}
          </div>
        )}
        <p className="text-sm font-medium text-pink-100/90 italic leading-relaxed">
          {activeWhisper}
        </p>
      </div>

      {/* Climax Achieved Modal */}
      {isClimaxAchieved && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-scaleUp">
          <div className="max-w-md w-full bg-slate-900 border border-rose-500/60 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/30">
              <Award className="w-8 h-8 text-white" />
            </div>

            <div>
              <div className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">
                Ecstatic Release Achieved
              </div>
              <h2 className="text-2xl font-black text-white">
                Profound Intimate Harmony
              </h2>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic">
              Breathless, trembling in each other’s arms as wave after wave of physical euphoria washes away every remaining trace of dysphoria. In {partnerName}’s embrace, you are wholly, undeniably woman.
            </p>

            {/* Stat Rewards Card */}
            <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 text-xs space-y-1.5 text-left">
              <div className="flex items-center justify-between text-amber-300 font-bold">
                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Confidence</span>
                <span>+25</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Dysphoria Shield</span>
                <span>-30 Dysphoria</span>
              </div>
              <div className="flex items-center justify-between text-pink-400 font-bold">
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> Affection & Respect</span>
                <span>+25 Romance Boost</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95"
            >
              Continue Romance & Aftercare
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
