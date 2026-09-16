import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, Volume2, Info } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import confetti from 'canvas-confetti';

export const VoiceCoachApp: React.FC = () => {
  const { state, modifyStats, triggerMinigame } = useGameStore();
  const [pitchHz, setPitchHz] = useState(195);
  const [isExercising, setIsExercising] = useState(false);
  const [feedback, setFeedback] = useState('Adjust your pitch slider or enable real mic tracking.');
  
  // Real microphone states
  const [isMicActive, setIsMicActive] = useState(false);
  const [micDetectedHz, setMicDetectedHz] = useState<number | null>(null);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [sustainedTargetMs, setSustainedTargetMs] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Pitch detection via autocorrelation
  const detectPitch = (buffer: Float32Array, sampleRate: number): number | null => {
    // Check volume (RMS)
    let sumSquares = 0;
    for (let i = 0; i < buffer.length; i++) {
      sumSquares += buffer[i] * buffer[i];
    }
    const rms = Math.sqrt(sumSquares / buffer.length);
    setMicVolume(Math.min(100, Math.round(rms * 400)));

    if (rms < 0.015) {
      return null; // Too quiet / background noise
    }

    // Autocorrelation search within human vocal range (80 Hz to 450 Hz)
    const minPeriod = Math.floor(sampleRate / 450);
    const maxPeriod = Math.floor(sampleRate / 80);

    let bestR = 0;
    let bestPeriod = -1;

    for (let period = minPeriod; period <= maxPeriod; period++) {
      let r = 0;
      for (let i = 0; i < buffer.length - period; i++) {
        r += buffer[i] * buffer[i + period];
      }
      if (r > bestR) {
        bestR = r;
        bestPeriod = period;
      }
    }

    if (bestPeriod > 0 && bestR > 0.05) {
      const freq = Math.round(sampleRate / bestPeriod);
      if (freq >= 80 && freq <= 450) {
        return freq;
      }
    }
    return null;
  };

  const startMicTracking = async () => {
    try {
      soundEngine.playClick();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsMicActive(true);
      setFeedback('Microphone listening! Speak or hum softly into your microphone...');

      const buffer = new Float32Array(analyser.fftSize);

      let targetSustainedCounter = 0;

      const processAudio = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getFloatTimeDomainData(buffer);
        const freq = detectPitch(buffer, ctx.sampleRate);

        if (freq) {
          setMicDetectedHz(freq);
          setPitchHz(freq);

          // Check if in feminine sweet spot (185 Hz to 240 Hz)
          if (freq >= 185 && freq <= 240) {
            targetSustainedCounter += 16;
            setSustainedTargetMs(targetSustainedCounter);

            if (targetSustainedCounter > 2000) {
              soundEngine.playVictory();
              confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
              modifyStats({ voiceResonance: 12, confidence: 6 });
              setFeedback('Target sustained for 2s! Beautiful bright feminine resonance! +12 Voice Resonance');
              targetSustainedCounter = 0;
            } else {
              setFeedback(`Target Resonance Sustained! (${Math.round((targetSustainedCounter / 2000) * 100)}%)`);
            }
          } else if (freq < 185) {
            targetSustainedCounter = Math.max(0, targetSustainedCounter - 20);
            setSustainedTargetMs(targetSustainedCounter);
            setFeedback('Chest resonance detected. Gently glide resonance forward into your smile!');
          } else {
            targetSustainedCounter = Math.max(0, targetSustainedCounter - 20);
            setSustainedTargetMs(targetSustainedCounter);
            setFeedback('High head / falsetto range. Relax your throat for soft spoken warmth.');
          }
        } else {
          targetSustainedCounter = Math.max(0, targetSustainedCounter - 10);
          setSustainedTargetMs(targetSustainedCounter);
        }

        animationFrameRef.current = requestAnimationFrame(processAudio);
      };

      processAudio();
    } catch {
      setFeedback('Microphone permission was denied or unavailable. Use the manual slider.');
      setIsMicActive(false);
    }
  };

  const stopMicTracking = () => {
    soundEngine.playClick();
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsMicActive(false);
    setMicDetectedHz(null);
    setMicVolume(0);
    setSustainedTargetMs(0);
    setFeedback('Microphone turned off. Ready for manual resonance exercises.');
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

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

  const isFeminineZone = pitchHz >= 185 && pitchHz <= 240;

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 p-4 overflow-y-auto no-scrollbar">
      {/* App Header */}
      <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-md">
            <Mic className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
              Resonance Coach
            </h2>
            <span className="text-[10px] text-slate-400">Real-Time Pitch & Formant Tuner</span>
          </div>
        </div>

        <span className="text-xs bg-purple-950/60 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded-full font-mono">
          Level {Math.floor(state.stats.voiceResonance / 20) + 1}
        </span>
      </div>

      {/* Launch Full Interactive Minigame */}
      <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/90 via-purple-950/80 to-pink-950/90 border border-indigo-500/40 shadow-lg flex items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-indigo-200">Interactive Call Simulation Minigame</h4>
          <p className="text-[10px] text-slate-300 mt-0.5">Practice realistic phone scenarios (Ordering coffee, HRT pharmacy refills, voicemails) with resonance scoring!</p>
        </div>
        <button
          onClick={() => triggerMinigame('voice_tuner')}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-xs shadow-md hover:brightness-110 flex-shrink-0 cursor-pointer"
        >
          Launch Practice
        </button>
      </div>

      {/* Main Pitch Tuner Meter */}
      <div className="my-4 bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 text-center shadow-xl relative overflow-hidden">
        {/* Needle Gauge / Visual Target Indicator */}
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
          {isMicActive ? 'Live Microphone Frequency' : 'Target Vocal Frequency'}
        </span>

        <div className="text-4xl font-mono font-black my-1 transition-colors duration-200">
          <span className={isFeminineZone ? 'text-pink-400' : pitchHz < 185 ? 'text-purple-400' : 'text-sky-400'}>
            {micDetectedHz || pitchHz}
          </span>
          <span className="text-sm font-normal text-slate-400 ml-1">Hz</span>
        </div>

        <p className="text-xs font-semibold text-purple-300 flex items-center justify-center gap-1.5">
          {isFeminineZone ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Optimal Feminine Resonance Sweet Spot
            </span>
          ) : pitchHz < 185 ? (
            <span className="text-slate-400">Warm Chest Resonance • Bring forward to lips</span>
          ) : (
            <span className="text-sky-300">High Head Voice / Falsetto</span>
          )}
        </p>

        {/* Sustained target bar when mic active */}
        {isMicActive && (
          <div className="my-2.5 max-w-xs mx-auto">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Hold Target Tone</span>
              <span className="text-pink-400 font-bold">{Math.round((sustainedTargetMs / 2000) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-emerald-400 transition-all duration-100 rounded-full"
                style={{ width: `${Math.min(100, (sustainedTargetMs / 2000) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Dynamic Waveform Visualizer */}
        <div className="h-16 my-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-center gap-1 px-3 overflow-hidden">
          {Array.from({ length: 26 }).map((_, i) => {
            let height = 6;
            if (isMicActive) {
              height = micDetectedHz ? Math.min(50, Math.max(6, micVolume * Math.sin(i * 0.4 + Date.now() * 0.01))) : 4;
            } else if (isExercising) {
              height = Math.sin(i * 0.5 + Date.now() * 0.01) * 25 + 30;
            } else {
              height = ((i % 5) + 2) * 5;
            }

            return (
              <div 
                key={i}
                className="w-1.5 rounded-full transition-all duration-100"
                style={{
                  height: `${height}px`,
                  backgroundColor: isFeminineZone ? '#ec4899' : '#8b5cf6'
                }}
              />
            );
          })}
        </div>

        {/* Pitch Slider (Disabled during mic tracking to avoid conflicts) */}
        <input 
          type="range" 
          min="120" 
          max="260" 
          value={pitchHz}
          disabled={isMicActive}
          onChange={(e) => {
            const hz = Number(e.target.value);
            setPitchHz(hz);
            soundEngine.playPitchTone(hz, 0.15);
          }}
          className="w-full accent-pink-500 cursor-pointer disabled:opacity-40"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1 mb-3">
          <span>120 Hz (Chest)</span>
          <span className="text-pink-400 font-bold">210 Hz (Femme Target)</span>
          <span>260 Hz (Falsetto)</span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {/* Real Mic Toggle */}
          <button
            onClick={isMicActive ? stopMicTracking : startMicTracking}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
              isMicActive
                ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110'
            }`}
          >
            {isMicActive ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span>{isMicActive ? 'Stop Live Mic' : '🎙️ Use Real Microphone'}</span>
          </button>

          {/* Test Reference Tone */}
          <button
            onClick={() => soundEngine.playPitchTone(pitchHz, 0.6)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-pink-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Play Tone ({pitchHz} Hz)</span>
          </button>
        </div>
      </div>

      {/* Dynamic Feedback Card */}
      <div className="bg-pink-950/30 border border-pink-500/30 p-3.5 rounded-xl mb-3 text-xs text-pink-200 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-pink-300">Voice Coach Feedback:</span>
          <p className="mt-0.5 leading-relaxed">{feedback}</p>
        </div>
      </div>

      {/* Manual Siren Warmup Button */}
      <button
        onClick={handlePracticeWarmup}
        disabled={isExercising}
        className="w-full py-3 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold text-xs shadow-lg hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 mb-3"
      >
        <Sparkles className="w-4 h-4" />
        <span>{isExercising ? 'Resonating...' : '5-Minute Siren Pitch Glide Warmup'}</span>
      </button>

      {/* Quick Tips */}
      <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center gap-1 text-slate-300 font-semibold text-xs">
          <Info className="w-3.5 h-3.5 text-pink-400" />
          <span>Femme Resonance Wisdom:</span>
        </div>
        <p>• Feminine resonance is mostly about <strong>space and brightness</strong>, not just pitch height.</p>
        <p>• Keep your throat relaxed and project sound toward your cheekbones and front teeth.</p>
      </div>
    </div>
  );
};
