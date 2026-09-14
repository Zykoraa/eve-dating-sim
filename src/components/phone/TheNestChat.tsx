import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Sparkles, Shield, AlertTriangle, MessageSquare } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import { generateNestResponses } from '../../utils/nestResponses';
import type { NestMessage } from '../../types/phone';

export const TheNestChat: React.FC = () => {
  const { state, modifyStats, updateNestMessages } = useGameStore();
  const [inputVal, setInputVal] = useState('');
  const [typingAuthor, setTypingAuthor] = useState<string | null>(null);
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const messages: NestMessage[] = state.nestMessages;

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingAuthor]);

  const handleSend = (overrideText?: string) => {
    const textToSend = (overrideText !== undefined ? overrideText : inputVal).trim();
    if (!textToSend) return;

    soundEngine.playClick();

    const userMsg: NestMessage = {
      id: `usr_${Date.now()}`,
      author: 'Eve (You)',
      avatar: '💖',
      role: 'Egg Emeritus',
      text: textToSend,
      time: 'Just now',
    };

    // Append user message immediately
    updateNestMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Generate intelligent, empathetic community replies
    const { replies, statsDiff } = generateNestResponses(textToSend);

    if (statsDiff) {
      modifyStats(statsDiff);
    }

    // Schedule each reply with realistic typing indicator
    replies.forEach((reply, idx) => {
      const typingStart = reply.delayMs - 800;
      setTimeout(() => {
        setTypingAuthor(reply.author);
      }, Math.max(300, typingStart));

      setTimeout(() => {
        setTypingAuthor(null);
        soundEngine.playPhonePing();
        const communityMsg: NestMessage = {
          id: `reply_${Date.now()}_${idx}`,
          author: reply.author,
          avatar: reply.avatar,
          role: reply.role,
          text: reply.text,
          time: 'Just now',
        };
        updateNestMessages((prev) => [...prev, communityMsg]);
      }, reply.delayMs);
    });
  };

  const quickPrompts = [
    {
      label: 'Ask for Support 🫂',
      icon: Heart,
      text: 'Having a little dysphoria wave today, could really use some sisterhood love and hugs 🥺',
    },
    {
      label: 'Share Date Win 🎉',
      icon: Sparkles,
      text: 'I held my head high on my date and had the sweetest, most affirming time! ✨',
    },
    {
      label: 'Vent About a Creep 🚩',
      icon: AlertTriangle,
      text: 'Ugh, a guy on Bloom asked if I am "discreet". Why are chasers like this?? 🙅‍♀️',
    },
    {
      label: 'HRT Second Puberty 🌸',
      icon: Shield,
      text: 'Another week on HRT! My emotions are softer and I am feeling closer to myself every day.',
    },
    {
      label: 'Fit & Eyeliner Check 💄',
      icon: MessageSquare,
      text: 'Tried liquid eyeliner wings and styled my cute outfit today! Hope it looks pretty 💕',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Channel Header */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-400 to-white flex items-center justify-center text-slate-900 font-bold text-xs shadow-md">
            🏳️‍⚧️
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              #the-nest-sanctuary
            </h3>
            <p className="text-[10px] text-pink-300">14 sisters online • Safe space</p>
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((m) => {
          const isUser = m.author.includes('Eve');

          return (
            <div 
              key={m.id} 
              className={`flex items-start gap-3 p-3 rounded-2xl border transition-all ${
                isUser 
                  ? 'bg-pink-950/40 border-pink-500/40 ml-4' 
                  : 'bg-slate-900/70 border-slate-800/80 mr-4'
              }`}
            >
              <span className="text-2xl p-1 bg-slate-800 rounded-full flex-shrink-0">{m.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-bold text-xs ${isUser ? 'text-pink-300' : 'text-white'}`}>
                    {m.author}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                    {m.role}
                  </span>
                  <span className="text-[9px] text-slate-500 ml-auto font-mono">{m.time}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">{m.text}</p>
              </div>
            </div>
          );
        })}

        {/* Live Typing Indicator */}
        {typingAuthor && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic py-1 px-3 bg-slate-900/40 rounded-xl w-fit animate-pulse border border-slate-800">
            <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span>{typingAuthor} is typing...</span>
          </div>
        )}

        <div ref={scrollBottomRef} />
      </div>

      {/* Quick Community Actions */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <div className="flex gap-1.5 mb-2.5 overflow-x-auto pb-1 no-scrollbar">
          {quickPrompts.map((q, idx) => {
            const Icon = q.icon;
            return (
              <button 
                key={idx}
                onClick={() => handleSend(q.text)}
                className="text-[10px] whitespace-nowrap bg-slate-800/90 hover:bg-pink-950 border border-slate-700 hover:border-pink-500/50 px-2.5 py-1.5 rounded-full text-pink-300 hover:text-white transition flex items-center gap-1.5 flex-shrink-0 active:scale-95"
              >
                <Icon className="w-3 h-3 text-pink-400" />
                <span>{q.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message #the-nest..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
            className="p-2 bg-pink-600 hover:bg-pink-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl shadow-md transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
