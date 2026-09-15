import React, { useState } from 'react';
import { Settings, Volume2, VolumeX, Type, RotateCcw, X, Eye, ShieldAlert, Sliders, Flame } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';

export const SettingsModal: React.FC = () => {
  const { state, setViewMode, resetGame, updateSettings } = useGameStore();
  const [vol, setVol] = useState(soundEngine.getVolume() * 100);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [textSpeed, setTextSpeed] = useState(state.textSpeedMs);
  const [confirmReset, setConfirmReset] = useState(false);

  const settings = state.settings || {
    dyslexiaFont: false,
    fontSize: 'md',
    contentIntensity: 'standard',
    autoAdvanceDelayMs: 2200,
    bgmVolume: 0.6,
    sfxVolume: 0.8,
    adultContentEnabled: true,
  };

  const handleVolumeChange = (newVal: number) => {
    setVol(newVal);
    soundEngine.setVolume(newVal / 100);
    updateSettings({ sfxVolume: newVal / 100 });
  };

  const handleMuteToggle = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  const handleReset = () => {
    soundEngine.playTension();
    resetGame();
    setViewMode('title');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar bg-slate-900 rounded-3xl border border-pink-500/30 shadow-2xl p-6 flex flex-col space-y-5 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-pink-400" /> Game & Accessibility Settings
          </h2>
          <button
            onClick={() => setViewMode(state.previousViewMode === 'title' ? 'title' : 'novel')}
            className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Volume */}
        <div className="space-y-2 bg-slate-950/50 p-3.5 rounded-2xl border border-white/5">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              Sound Effects & Audio:
            </span>
            <span className="text-pink-400 font-mono">{isMuted ? 'Muted' : `${Math.round(vol)}%`}</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="100"
              disabled={isMuted}
              value={vol}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="flex-1 accent-pink-500 cursor-pointer"
            />
            <button
              onClick={handleMuteToggle}
              className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                isMuted ? 'bg-red-950/60 border-red-500 text-red-300' : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        </div>

        {/* Text Speed */}
        <div className="space-y-2 bg-slate-950/50 p-3.5 rounded-2xl border border-white/5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-purple-400" /> Typewriter Speed:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Fast (15ms)', val: 15 },
              { label: 'Normal (25ms)', val: 25 },
              { label: 'Chill (45ms)', val: 45 },
            ].map((spd) => (
              <button
                key={spd.val}
                onClick={() => {
                  soundEngine.playClick();
                  setTextSpeed(spd.val);
                  state.textSpeedMs = spd.val;
                }}
                className={`py-2 rounded-xl text-xs font-semibold border transition ${
                  textSpeed === spd.val
                    ? 'bg-pink-600 text-white border-pink-400 shadow-md'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {spd.label}
              </button>
            ))}
          </div>
        </div>

        {/* Typography & Dyslexia Support */}
        <div className="space-y-3 bg-slate-950/50 p-3.5 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-pink-400" />
              <div>
                <span className="text-xs font-bold text-slate-200 block">Dyslexia-Friendly Monospace Font</span>
                <span className="text-[10px] text-slate-400">High-legibility character spacing</span>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ dyslexiaFont: !settings.dyslexiaFont })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                settings.dyslexiaFont
                  ? 'bg-pink-600 text-white border-pink-400 shadow-md'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {settings.dyslexiaFont ? 'Enabled' : 'Default Sans'}
            </button>
          </div>

          {/* Font Sizing */}
          <div className="pt-2 border-t border-white/5 space-y-1.5">
            <span className="text-xs font-bold text-slate-300 block">Dialogue Text Size:</span>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => updateSettings({ fontSize: size })}
                  className={`py-1.5 rounded-xl font-bold uppercase transition border ${
                    settings.fontSize === size
                      ? 'bg-purple-600 text-white border-purple-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Narrative & Microaggression Intensity */}
        <div className="space-y-2 bg-slate-950/50 p-3.5 rounded-2xl border border-white/5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" /> Trans Reality & Microaggression Tone:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'gentle', label: 'Gentle / Cozy', desc: 'Focus on euphoria & safety' },
              { id: 'standard', label: 'Standard', desc: 'Balanced realism & hope' },
              { id: 'authentic', label: 'Authentic Deep', desc: 'Full societal nuance' },
            ].map((tone) => (
              <button
                key={tone.id}
                onClick={() => updateSettings({ contentIntensity: tone.id as any })}
                className={`p-2.5 rounded-xl text-left border transition ${
                  settings.contentIntensity === tone.id
                    ? 'bg-pink-950/60 border-pink-500 text-pink-200'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs">{tone.label}</div>
                <div className="text-[9.5px] text-slate-400 mt-0.5">{tone.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Adult & Sensual Content (18+) */}
        <div className="space-y-2 bg-rose-950/30 p-3.5 rounded-2xl border border-rose-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <div>
                <span className="text-xs font-bold text-rose-200 block">18+ Adult Language & Sensual Romance</span>
                <span className="text-[10px] text-rose-300/80">Uncensored queer language, raw intimate dating & T4T bedroom encounters</span>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ adultContentEnabled: !settings.adultContentEnabled })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                settings.adultContentEnabled
                  ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {settings.adultContentEnabled ? 'Enabled (18+)' : 'Censored / Mild'}
            </button>
          </div>
        </div>

        {/* Auto-Advance Delay */}
        <div className="space-y-2 bg-slate-950/50 p-3.5 rounded-2xl border border-white/5">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-teal-400" /> Auto-Play Pause Delay:
            </span>
            <span className="text-teal-400 font-mono">{(settings.autoAdvanceDelayMs / 1000).toFixed(1)}s</span>
          </div>
          <input
            type="range"
            min="1200"
            max="4000"
            step="200"
            value={settings.autoAdvanceDelayMs}
            onChange={(e) => updateSettings({ autoAdvanceDelayMs: Number(e.target.value) })}
            className="w-full accent-teal-500 cursor-pointer"
          />
        </div>

        {/* Reset Progress */}
        <div className="pt-2 border-t border-slate-800">
          {confirmReset ? (
            <div className="bg-red-950/50 border border-red-500/50 p-4 rounded-2xl text-center space-y-3">
              <p className="text-xs text-red-200 font-bold">
                Are you sure you want to reset all progress back to Month 0 (Pre-Transition)?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-red-950 text-slate-400 hover:text-red-300 border border-slate-700 hover:border-red-500/50 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset Game Progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
