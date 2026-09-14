import React, { useState } from 'react';
import { Save, FolderOpen, Trash2, X, Clock } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import type { SaveSlot } from '../../types/game';

export const SaveLoadModal: React.FC = () => {
  const { state, setViewMode, saveGame, loadGame } = useGameStore();
  const [activeTab, setActiveTab] = useState<'save' | 'load'>('save');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const getSlotData = (slotId: number): SaveSlot | null => {
    try {
      const item = localStorage.getItem(`eve_save_slot_${slotId}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  const handleSave = (slotId: number) => {
    saveGame(slotId);
    setStatusMsg(`Saved to Slot ${slotId}! ✨`);
    setTimeout(() => setStatusMsg(null), 2000);
  };

  const handleLoad = (slotId: number) => {
    const success = loadGame(slotId);
    if (success) {
      setViewMode('novel');
    } else {
      soundEngine.playTension();
      setStatusMsg(`Slot ${slotId} is empty!`);
      setTimeout(() => setStatusMsg(null), 2000);
    }
  };

  const handleDelete = (slotId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    localStorage.removeItem(`eve_save_slot_${slotId}`);
    setStatusMsg(`Cleared Slot ${slotId}`);
    setTimeout(() => setStatusMsg(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 rounded-3xl border border-pink-500/30 shadow-2xl p-6 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('save')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'save' 
                  ? 'bg-pink-600 text-white shadow-lg' 
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Save className="w-4 h-4 inline mr-1.5" /> Save Game
            </button>
            <button
              onClick={() => setActiveTab('load')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'load' 
                  ? 'bg-pink-600 text-white shadow-lg' 
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <FolderOpen className="w-4 h-4 inline mr-1.5" /> Load Game
            </button>
          </div>

          <button
            onClick={() => setViewMode(state.previousViewMode === 'title' ? 'title' : 'novel')}
            className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {statusMsg && (
          <div className="my-3 py-2 bg-pink-950/80 border border-pink-500/40 text-pink-200 text-center font-bold text-xs rounded-xl animate-fadeIn">
            {statusMsg}
          </div>
        )}

        {/* 4 Save Slots */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {[1, 2, 3, 4].map((slotId) => {
            const slot = getSlotData(slotId);
            return (
              <div
                key={slotId}
                onClick={() => (activeTab === 'save' ? handleSave(slotId) : handleLoad(slotId))}
                className="cursor-pointer p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/50 transition flex items-center justify-between group shadow"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-sm text-pink-400 group-hover:border-pink-500">
                    #{slotId}
                  </span>
                  <div>
                    {slot ? (
                      <div>
                        <h4 className="font-bold text-sm text-white mb-1">{slot.title}</h4>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-pink-400" /> {slot.timestamp}
                          </span>
                          <span className="text-purple-300">Era {slot.era}</span>
                          <span className="text-emerald-400">Month {slot.hrtMonth}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">Empty Save Slot</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-pink-950/40 border border-pink-500/30 text-pink-300 group-hover:bg-pink-600 group-hover:text-white transition">
                    {activeTab === 'save' ? 'Overwrite Slot' : slot ? 'Load Slot' : 'Empty'}
                  </span>
                  {slot && (
                    <button
                      onClick={(e) => handleDelete(slotId, e)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition rounded-lg"
                      title="Delete Save"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
