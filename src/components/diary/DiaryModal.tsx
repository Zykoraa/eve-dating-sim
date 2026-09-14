import React, { useState } from 'react';
import { 
  BookHeart, 
  X, 
  Plus, 
  Calendar, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import type { DiaryEntry } from '../../types/game';

export const DiaryModal: React.FC = () => {
  const { state, setViewMode, addDiaryEntry, modifyStats } = useGameStore();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMood, setNewMood] = useState<'euphoric' | 'tender' | 'vulnerable' | 'determined' | 'peaceful'>('tender');

  const entries = state.diaryEntries;
  const currentEntry: DiaryEntry | undefined = entries[selectedIdx] || entries[0];

  const handleSaveEntry = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    soundEngine.playSparkle();
    const created: DiaryEntry = {
      id: `custom_diary_${Date.now()}`,
      day: state.calendar.day,
      era: state.transitionEra,
      title: newTitle.trim(),
      dateStr: `Day ${state.calendar.day} — Month ${state.stats.hrtMonth} HRT`,
      content: newContent.trim(),
      mood: newMood,
      sticker: '✨',
    };

    addDiaryEntry(created);
    modifyStats({ confidence: 10, dysphoria: -8, comfortRating: 10 });
    setIsWriting(false);
    setNewTitle('');
    setNewContent('');
    setSelectedIdx(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#1e1722] border-2 border-[#5c3e66] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Side: Table of Contents / Entries List */}
        <div className="w-full md:w-80 bg-[#16101a] border-r border-[#38263e] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center">
                  <BookHeart className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-sm text-pink-200 tracking-wide">Eve’s Diary</h2>
              </div>

              <button
                onClick={() => setIsWriting(true)}
                className="p-1.5 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-sm"
                title="Write New Entry"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mb-3">Personal chronicle of gender transition and romance.</p>

            <div className="space-y-1.5 overflow-y-auto max-h-[50vh] pr-1 no-scrollbar">
              {entries.map((entry, idx) => (
                <button
                  key={entry.id}
                  onClick={() => {
                    setSelectedIdx(idx);
                    setIsWriting(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                    selectedIdx === idx && !isWriting
                      ? 'bg-pink-500/20 border border-pink-500/40 text-pink-200 font-semibold'
                      : 'hover:bg-white/5 text-slate-400 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate font-medium">{entry.title}</span>
                    <span className="text-[10px] opacity-70 ml-1">{entry.sticker || '🌸'}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">{entry.dateStr}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Total Pages: {entries.length}</span>
            <span className="text-pink-400">Era {state.transitionEra}</span>
          </div>
        </div>

        {/* Right Side: Journal Page View */}
        <div className="flex-1 bg-[#251b2a] p-6 flex flex-col justify-between overflow-y-auto">
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between border-b border-[#3e2b46] pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-pink-300">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isWriting ? 'New Journal Reflection' : currentEntry?.dateStr}</span>
            </div>

            <button
              onClick={() => setViewMode('apartment')}
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Page Content */}
          {isWriting ? (
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-xs font-medium text-pink-300 mb-1">Entry Title</label>
                <input
                  type="text"
                  placeholder="e.g. The first time someone smiled at my dress..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-pink-300 mb-1">Emotional Mood</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {(['euphoric', 'tender', 'vulnerable', 'determined', 'peaceful'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setNewMood(m)}
                      className={`px-3 py-1 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                        newMood === m
                          ? 'bg-pink-500 text-white font-bold'
                          : 'bg-black/30 text-slate-400 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-xs font-medium text-pink-300 mb-1">Dear Diary...</label>
                <textarea
                  rows={8}
                  placeholder="Write your raw, honest thoughts about your transition, dating, and how you feel in your body today..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-pink-500 leading-relaxed font-serif"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsWriting(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEntry}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-xs hover:brightness-110 shadow-lg shadow-pink-500/30 transition-all cursor-pointer"
                >
                  Save to Diary (+10 Conf)
                </button>
              </div>
            </div>
          ) : currentEntry ? (
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl text-pink-100 font-serif tracking-wide">
                  {currentEntry.title}
                </h3>
                <span className="text-2xl">{currentEntry.sticker || '🌸'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 shadow-inner">
                <p className="text-sm text-slate-200 leading-relaxed font-serif whitespace-pre-wrap">
                  {currentEntry.content}
                </p>
              </div>

              {currentEntry.photoUrl && (
                <div className="w-36 h-48 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl p-1 bg-white/5 rotate-[-2deg]">
                  <img
                    src={currentEntry.photoUrl}
                    alt="Memory"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="capitalize px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 font-mono">
                  Mood: {currentEntry.mood}
                </span>
                <span>•</span>
                <span>Self-love registered</span>
              </div>
            </div>
          ) : null}

          {/* Navigation Arrows */}
          {!isWriting && entries.length > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-[#3e2b46]">
              <button
                disabled={selectedIdx >= entries.length - 1}
                onClick={() => setSelectedIdx(prev => Math.min(entries.length - 1, prev + 1))}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-pink-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Earlier Entry
              </button>

              <span className="text-xs text-slate-500 font-mono">
                {selectedIdx + 1} of {entries.length}
              </span>

              <button
                disabled={selectedIdx <= 0}
                onClick={() => setSelectedIdx(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-pink-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                Later Entry <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
