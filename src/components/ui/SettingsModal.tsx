import React, { useState } from 'react';
import { Settings, Volume2, VolumeX, Type, RotateCcw, X } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';

export const SettingsModal: React.FC = () => {
  const { state, setViewMode, resetGame } = useGameStore();
  const [vol, setVol] = useState(soundEngine.getVolume() * 100);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [textSpeed, setTextSpeed] = useState(state.textSpeedMs);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleVolumeChange = (newVal: number) => {
    setVol(newVal);
    soundEngine.setVolume(newVal / 100);
    soundEngine.playClick();
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
      <div className="w-full max-w-lg bg-slate-900 rounded-3xl border border-pink-500/30 shadow-2xl p-6 flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-pink-400" /> Game Settings
          </h2>
          <button
            onClick={() => setViewMode(state.previousViewMode === 'title' ? 'title' : 'novel')}
            className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Volume */}
        <div className="space-y-2">
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
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-purple-400" /> Text Typewriter Speed:
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

        {/* Reset Progress */}
        <div className="pt-4 border-t border-slate-800">
          {confirmReset ? (
            <div className="bg-red-950/50 border border-red-500/50 p-4 rounded-2xl text-center space-y-3">
              <p className="text-xs text-red-200 font-bold">
                Are you sure you want to reset all progress back to Month 1?
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
