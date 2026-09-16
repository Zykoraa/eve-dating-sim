import React, { useState } from 'react';
import { 
  Mic, 
  CheckCircle2, 
  PhoneCall, 
  X, 
  Flame, 
  Zap, 
  Activity,
  Wind
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import confetti from 'canvas-confetti';

interface VoicePracticeCall {
  id: string;
  title: string;
  recipient: string;
  context: string;
  script: string;
  targetPitchMin: number; // Hz
  targetPitchMax: number; // Hz
  minResonance: number;   // 0 - 100%
  tip: string;
}

const PRACTICE_CALLS: VoicePracticeCall[] = [
  {
    id: 'cafe_order',
    title: 'Morning Cafe Order',
    recipient: 'Local Barista • The Daily Grind',
    context: 'Quick, natural customer order with friendly upward inflection and zero hesitation.',
    script: '“Hi! Good morning! Could I please get an iced oat milk latte with two pumps of vanilla?”',
    targetPitchMin: 195,
    targetPitchMax: 235,
    minResonance: 65,
    tip: 'Keep the vowels forward in the facial mask and lift the soft palate on “Hi!” for an effortless melodic entry.',
  },
  {
    id: 'pharmacy_refill',
    title: 'Pharmacy HRT Refill Call',
    recipient: 'CityCare Pharmacy Desk',
    context: 'Administrative phone call. State birth date and medication name with calm, resonant authority.',
    script: '“Hello, I’m calling to check the refill status of my estradiol valerate prescription under Eve.”',
    targetPitchMin: 185,
    targetPitchMax: 225,
    minResonance: 70,
    tip: 'Support the breath from the diaphragm to prevent falling into vocal fry or defensive low chest pitch.',
  },
  {
    id: 'date_voicemail',
    title: 'Sweet Voicemail for Your Date',
    recipient: 'HerSpace Voicemail Box',
    context: 'Warm, relaxed, and intimately melodic cadence without forcing artificial falsetto.',
    script: '“Hey you... just wanted to say I had the sweetest time last night. Let me know when you wake up. xx”',
    targetPitchMin: 205,
    targetPitchMax: 245,
    minResonance: 80,
    tip: 'Blend soft breathiness with forward head resonance for a warm, sensual, feminine vocal texture.',
  },
];

export const VoiceTunerMinigame: React.FC = () => {
  const { state, triggerMinigame, modifyStats, toggleDailyRoutine } = useGameStore();

  const [selectedCallIdx, setSelectedCallIdx] = useState(0);
  const [currentPitch, setCurrentPitch] = useState(210); // Hz
  const [resonance, setResonance] = useState(72);       // %
  const [breathSupport, setBreathSupport] = useState(80); // %
  const [isGliding, setIsGliding] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [practiceSuccess, setPracticeSuccess] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const activeCall = PRACTICE_CALLS[selectedCallIdx];

  // Play reference pitch tone
  const playPitch = (hz: number) => {
    soundEngine.playPitchTone(hz, 0.6);
  };

  // Run pitch glide siren
  const handleGlideSiren = () => {
    if (isGliding) return;
    setIsGliding(true);
    soundEngine.playClick();

    const startHz = 160;
    const peakHz = 260;
    let step = 0;
    const totalSteps = 20;

    const interval = window.setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const hz = Math.round(startHz + (peakHz - startHz) * Math.sin(progress * Math.PI));
      setCurrentPitch(hz);
      soundEngine.playPitchTone(hz, 0.08);

      if (step >= totalSteps) {
        clearInterval(interval);
        setIsGliding(false);
        setResonance((prev) => Math.min(100, prev + 5));
        setFeedbackMessage('Smooth vocal siren glide complete! Pharyngeal resonance unlocked.');
      }
    }, 80);
  };

  // Test the phrase against pitch and resonance calibration
  const handleTestPhrase = () => {
    const isPitchInRange = currentPitch >= activeCall.targetPitchMin && currentPitch <= activeCall.targetPitchMax;
    const isResonanceGood = resonance >= activeCall.minResonance;

    if (isPitchInRange && isResonanceGood) {
      soundEngine.playVictory();
      setFeedbackMessage(`🌟 Outstanding! Bright forward resonance (${resonance}%) and pitch locked at ${currentPitch} Hz!`);
      const updatedSuccess = { ...practiceSuccess, [activeCall.id]: true };
      setPracticeSuccess(updatedSuccess);

      // Check if all 3 completed
      if (Object.keys(updatedSuccess).length === PRACTICE_CALLS.length) {
        setIsCompleted(true);
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        modifyStats({
          voiceResonance: 15,
          confidence: 10,
          dysphoria: -12,
        });
        if (!state.dailyRoutines.voiceWarmupLogged) {
          toggleDailyRoutine('voiceWarmupLogged');
        }
      }
    } else if (!isPitchInRange) {
      soundEngine.playTension();
      if (currentPitch < activeCall.targetPitchMin) {
        setFeedbackMessage(`⚠️ Pitch is slightly low (${currentPitch} Hz). Target is ${activeCall.targetPitchMin}–${activeCall.targetPitchMax} Hz. Raise pitch slightly.`);
      } else {
        setFeedbackMessage(`⚠️ Pitch is overstrained (${currentPitch} Hz). Relax tension in your throat and aim for ${activeCall.targetPitchMin}–${activeCall.targetPitchMax} Hz.`);
      }
    } else {
      soundEngine.playTension();
      setFeedbackMessage(`⚠️ Dark chest resonance detected (${resonance}%). Aim for >${activeCall.minResonance}% by placing the sound in the facial mask.`);
    }
  };

  const handleExit = () => {
    soundEngine.playClick();
    triggerMinigame('none');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-3xl max-h-[95vh] overflow-y-auto bg-slate-900 rounded-3xl border border-pink-500/40 shadow-2xl p-4 sm:p-6 flex flex-col space-y-5 text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                HerSpace Voice Coach & Acoustic Tuner
              </h2>
              <p className="text-xs text-slate-400">
                Scientific resonance & pitch calibration for authentic, effortless vocal euphoria.
              </p>
            </div>
          </div>
          <button
            onClick={handleExit}
            className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Practice Scenario Selection Tabs */}
        <div className="grid grid-cols-3 gap-2">
          {PRACTICE_CALLS.map((call, idx) => (
            <button
              key={call.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedCallIdx(idx);
                setFeedbackMessage(null);
              }}
              className={`p-2.5 rounded-2xl border text-left transition-all ${
                selectedCallIdx === idx
                  ? 'bg-gradient-to-br from-pink-950/60 to-purple-950/60 border-pink-500 text-white shadow-md'
                  : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold truncate">{call.title}</span>
                {practiceSuccess[call.id] && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                )}
              </div>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">{call.recipient}</p>
            </button>
          ))}
        </div>

        {/* Active Script Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950/90 via-purple-950/40 to-slate-950/90 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" /> Call Practice Simulation
            </span>
            <span className="text-xs font-mono text-pink-400">
              Target: {activeCall.targetPitchMin}–{activeCall.targetPitchMax} Hz • {activeCall.minResonance}%+ Res
            </span>
          </div>
          <p className="text-sm sm:text-base text-pink-100 font-medium italic mb-2">
            {activeCall.script}
          </p>
          <p className="text-xs text-slate-400">
            <span className="text-amber-300 font-semibold">Pro Coach Tip:</span> {activeCall.tip}
          </p>
        </div>

        {/* Pitch & Resonance Visual Meter */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-white/10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" /> Real-Time Pitch Frequency:
            </span>
            <span className="font-mono text-base font-bold text-cyan-300">
              {currentPitch} Hz ({currentPitch >= 220 ? 'A3/B3 Femme Optimal' : 'Mid Range'})
            </span>
          </div>

          {/* Interactive Spectrum Slider */}
          <div className="relative pt-2 pb-1">
            <input
              type="range"
              min="140"
              max="280"
              value={currentPitch}
              onChange={(e) => {
                const hz = Number(e.target.value);
                setCurrentPitch(hz);
                soundEngine.playPitchTone(hz, 0.15);
              }}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            {/* Target Window Overlay */}
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>140 Hz (Chest)</span>
              <span className="text-cyan-400 font-bold">180–240 Hz (Femme Target)</span>
              <span>280 Hz (High)</span>
            </div>
          </div>

          {/* Resonance Balance Slider */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" /> Forward Mask Resonance:
              </span>
              <span className="font-mono font-bold text-amber-300">
                {resonance}% {resonance >= 70 ? '🌟 Bright Acoustic Profile' : 'Muffled'}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={resonance}
              onChange={(e) => setResonance(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Diaphragmatic Breath Support Slider */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-teal-400" /> Diaphragmatic Breath Flow:
              </span>
              <span className="font-mono font-bold text-teal-300">
                {breathSupport}% {breathSupport >= 70 ? '🌬️ Steady Airflow' : 'Shallow'}
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={breathSupport}
              onChange={(e) => setBreathSupport(Number(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>
        </div>

        {/* Quick Pitch Reference Tones & Glide Actions */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 text-xs">Reference Tones:</span>
          <button
            onClick={() => playPitch(174)}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-mono transition"
          >
            F3 (174 Hz)
          </button>
          <button
            onClick={() => playPitch(220)}
            className="px-2.5 py-1 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 font-mono transition font-bold"
          >
            A3 (220 Hz Target)
          </button>
          <button
            onClick={() => playPitch(261)}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-mono transition"
          >
            C4 (261 Hz)
          </button>

          <button
            disabled={isGliding}
            onClick={handleGlideSiren}
            className="ml-auto px-3 py-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white font-semibold transition flex items-center gap-1 shadow"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isGliding ? 'Gliding...' : 'Pitch Siren Warmup'}</span>
          </button>
        </div>

        {/* Live Feedback Banner */}
        {feedbackMessage && (
          <div className="p-3 rounded-2xl bg-slate-950 border border-pink-500/30 text-xs text-pink-200 animate-fadeIn">
            {feedbackMessage}
          </div>
        )}

        {/* Primary Action Button */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={handleTestPhrase}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-pink-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mic className="w-4 h-4" />
            <span>Speak & Test Phrase ({activeCall.title})</span>
          </button>

          {isCompleted && (
            <button
              onClick={handleExit}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              Complete Training (+15 Res)
            </button>
          )}
        </div>

        {/* Completion Milestone Card */}
        {isCompleted && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-950/80 border border-emerald-500/50 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="font-bold text-sm text-emerald-100">Daily Voice Warmup Logged! 🎉</p>
                <p className="text-[11px] text-emerald-300/80">+15 Voice Resonance, +10 Confidence, -12 Dysphoria</p>
              </div>
            </div>
            <button
              onClick={handleExit}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              Return to App
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
