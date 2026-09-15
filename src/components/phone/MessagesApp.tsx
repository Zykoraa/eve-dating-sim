import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import type { ChatResponseChoice } from '../../types/phone';
import type { SuitorId } from '../../types/game';

export const MessagesApp: React.FC = () => {
  const { state, modifyStats, updateSuitor, updateChatThreads } = useGameStore();
  const [activeThreadId, setActiveThreadId] = useState<string | null>(state.activeChatThreadId);
  const [isTyping, setIsTyping] = useState(false);

  const threads = state.chatThreads;
  const activeThread = threads.find((t) => t.id === activeThreadId);

  const handleSelectThread = (id: string) => {
    soundEngine.playClick();
    setActiveThreadId(id);
    updateChatThreads((prev) => 
      prev.map((t) => (t.id === id ? { ...t, unread: false } : t))
    );
  };

  const handleSendChoice = (choice: ChatResponseChoice) => {
    if (!activeThread) return;
    soundEngine.playClick();

    // Add Eve's message immediately
    const eveMsg = {
      id: `msg_${Date.now()}`,
      sender: 'eve' as const,
      senderName: 'Eve',
      text: choice.text,
      timestamp: 'Just now',
    };

    if (choice.statImpact) {
      modifyStats({
        confidence: choice.statImpact.confidence,
      });
      if (activeThread.participantId in state.suitors) {
        const sId = activeThread.participantId as SuitorId;
        updateSuitor(sId, {
          affection: (state.suitors[sId]?.affection || 0) + (choice.statImpact.suitorAffection || 0),
          respect: (state.suitors[sId]?.respect || 0) + (choice.statImpact.suitorRespect || 0),
        });
      }
    }

    updateChatThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThread.id) {
          return {
            ...t,
            messages: [...t.messages, eveMsg],
            pendingChoices: [],
            lastMessage: choice.text,
          };
        }
        return t;
      })
    );

    // Simulate suitor reply delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      soundEngine.playPhonePing();
      const suitorReplyMsg = {
        id: `reply_${Date.now()}`,
        sender: 'suitor' as const,
        senderName: activeThread.participantName,
        text: choice.suitorReply,
        timestamp: 'Just now',
      };

      updateChatThreads((prev) =>
        prev.map((t) => {
          if (t.id === activeThread.id) {
            return {
              ...t,
              messages: [...t.messages, suitorReplyMsg],
              lastMessage: choice.suitorReply,
            };
          }
          return t;
        })
      );
    }, 1600);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Active Conversation View */}
      {activeThread ? (
        <div className="flex flex-col h-full">
          {/* Thread Header */}
          <div className="flex items-center gap-3 p-3 bg-slate-900 border-b border-slate-800">
            <button
              onClick={() => setActiveThreadId(null)}
              className="p-1.5 hover:bg-slate-800 rounded-full text-slate-300 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-800 border border-pink-500/40">
              <img 
                src={activeThread.participantAvatar} 
                alt={activeThread.participantName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{activeThread.participantName}</h3>
              <p className="text-[10px] text-emerald-400 font-mono">
                {isTyping ? 'Typing...' : 'Online'}
              </p>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeThread.messages.map((msg) => {
              const isEve = msg.sender === 'eve';
              return (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${isEve ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs md:text-sm shadow-md ${
                      isEve
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 bg-slate-800/80 rounded-2xl w-16 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Response Choices Picker */}
          {activeThread.pendingChoices && activeThread.pendingChoices.length > 0 && !isTyping && (
            <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Choose Your Response:
              </span>
              {activeThread.pendingChoices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendChoice(choice)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-800 hover:bg-pink-950/70 border border-slate-700 hover:border-pink-500 text-slate-200 hover:text-white text-xs transition"
                >
                  <span className="text-[10px] uppercase font-bold text-pink-400 mr-2">[{choice.tone}]</span>
                  {choice.text}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Threads List View */
        <div className="flex flex-col h-full p-4">
          <h2 className="text-xl font-bold text-white mb-4">Messages 💬</h2>
          <div className="flex-1 overflow-y-auto space-y-2">
            {threads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => handleSelectThread(thread.id)}
                className="cursor-pointer p-3 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-pink-500/40 transition flex items-center gap-3.5"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-800 border border-pink-500/30 flex-shrink-0">
                  <img 
                    src={thread.participantAvatar} 
                    alt={thread.participantName}
                    className="w-full h-full object-cover"
                  />
                  {thread.unread && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-pink-500 rounded-full border-2 border-slate-900" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-white truncate">{thread.participantName}</h4>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{thread.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
