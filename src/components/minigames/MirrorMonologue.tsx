import React, { useState } from 'react';
import { Sparkles, Sun, Moon } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import confetti from 'canvas-confetti';

interface IntrusiveRound {
  shadowThought: string;
  options: {
    text: string;
    mantra: string;
    statBuff: { confidence: number; dysphoria: number };
    tone: 'compassion' | 'sisterhood' | 'rebirth';
  }[];
}

const MONOLOGUE_ROUNDS: IntrusiveRound[] = [
  {
    shadowThought: "Look at your shoulders and reflection. Who are you kidding? People in public can always tell.",
    options: [
      {
        text: "My body carried me through the hardest years of my life. I honor it as I bloom.",
        mantra: "Radical Body Gratitude",
        statBuff: { confidence: 15, dysphoria: -15 },
        tone: 'compassion',
      },
      {
        text: "Tara, Chloe, and my sisters see the real me. I refuse to see myself through cruel eyes.",
        mantra: "Sisterhood Anchor",
        statBuff: { confidence: 15, dysphoria: -15 },
        tone: 'sisterhood',
      },
    ],
  },
  {
    shadowThought: "Your voice gave you away when you ordered coffee. You will never sound like a cis woman.",
    options: [
      {
        text: "My voice is the voice of a real woman because I am a woman speaking with it.",
        mantra: "Authentic Frequency",
        statBuff: { confidence: 15, dysphoria: -15 },
        tone: 'compassion',
      },
      {
        text: "Transition is a melody learned note by note. I grant myself tenderness and patience.",
        mantra: "Gentle Pacing",
        statBuff: { confidence: 12, dysphoria: -12 },
        tone: 'rebirth',
      },
    ],
  },
  {
    shadowThought: "You started too late. You lost all your youth to the closet.",
    options: [
      {
        text: "The best time was twenty years ago. The second best time is right now, alive and free.",
        mantra: "Radiant Second Bloom",
        statBuff: { confidence: 25, dysphoria: -25 },
        tone: 'rebirth',
      },
      {
        text: "Every day I live authentically from now on is a victory over silence.",
        mantra: "Fearless Presence",
        statBuff: { confidence: 25, dysphoria: -25 },
        tone: 'sisterhood',
      },
    ],
  },
];

export const MirrorMonologue: React.FC = () => {
  const { state, modifyStats, setViewMode } = useGameStore();
  const [roundIdx, setRoundIdx] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [selectedMantra, setSelectedMantra] = useState<string | null>(null);

  const currentRound = MONOLOGUE_ROUNDS[roundIdx];

  const handleSelectOption = (opt: typeof currentRound.options[0]) => {
    soundEngine.playSparkle();
    setSelectedMantra(opt.mantra);
    modifyStats(opt.statBuff);

    setTimeout(() => {
      if (roundIdx + 1 < MONOLOGUE_ROUNDS.length) {
        setRoundIdx(roundIdx + 1);
        setSelectedMantra(null);
      } else {
        soundEngine.playVictory();
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
        setResolved(true);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center p-4">
      {/* Mirror Glass Glow Frame */}
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-purple-950/30 to-slate-950 border border-purple-500/40 rounded-3xl p-6 shadow-[0_0_80px_rgba(168,85,247,0.2)] flex flex-col items-center text-slate-100 overflow-hidden">
        {/* Mirror Reflection Silhouette */}
        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-300 shadow-xl mb-4 relative">
          <img
            src="/assets/characters/eve_avatar.png"
            alt="Eve Reflection"
            className="w-full h-full rounded-full object-cover bg-slate-900"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>

        {!resolved ? (
          <div className="w-full space-y-5 text-center">
            {/* Round indicator */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 bg-purple-950/60 border border-purple-500/30 px-3 py-0.5 rounded-full">
                Facing The Mirror Shadow • Round {roundIdx + 1} of 3
              </span>
            </div>

            {/* Shadow Voice Box */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-red-500/20 text-slate-300 text-sm italic relative">
              <Moon className="w-4 h-4 text-purple-400 absolute -top-2 -left-2 bg-slate-900 rounded-full p-0.5" />
              "{currentRound.shadowThought}"
            </div>

            {/* Eve's Self-Compassion Tools */}
            <div className="space-y-3 pt-1">
              <span className="text-xs font-semibold text-pink-300 block">
                Answer with Self-Compassion:
              </span>

              {currentRound.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  disabled={selectedMantra !== null}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs font-medium transition-all duration-200 flex items-center justify-between ${
                    selectedMantra === opt.mantra
                      ? 'bg-pink-900/60 border-pink-400 text-white scale-[1.02] shadow-lg shadow-pink-500/20'
                      : 'bg-slate-900/70 border-white/10 text-slate-200 hover:border-pink-500/40 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-pink-400 block tracking-wider">
                      ✨ {opt.mantra}
                    </span>
                    <p className="leading-relaxed">{opt.text}</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-pink-400 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Triumphant Resolution */
          <div className="w-full text-center space-y-4 py-4 animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Sun className="w-8 h-8 text-white animate-spin-slow" />
            </div>

            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-300 via-pink-300 to-white bg-clip-text text-transparent">
              The Mirror Reflects Pure Love
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              The shadowy voice of dysphoria recedes into quiet mist. In its place remains a young woman who has fought hard for every drop of joy, standing tall in her own skin.
            </p>

            <div className="inline-flex items-center gap-3 bg-pink-950/50 border border-pink-500/40 px-4 py-2 rounded-2xl text-xs font-bold text-pink-300">
              <span>+25 Permanent Confidence</span>
              <span>•</span>
              <span>-30 Dysphoria Shield Cleanse</span>
            </div>

            <button
              onClick={() => setViewMode(state.previousViewMode || 'vanity')}
              className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg hover:brightness-110 transition"
            >
              Step Forward with Unshakable Grace
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
