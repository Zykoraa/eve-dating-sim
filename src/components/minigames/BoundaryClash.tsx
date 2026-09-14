import React, { useState } from 'react';
import { Swords, Award } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import confetti from 'canvas-confetti';

export const BoundaryClash: React.FC = () => {
  const { setViewMode, modifyStats, setScene } = useGameStore();

  const [eveHp, setEveHp] = useState(100);
  const [marcusEgo, setMarcusEgo] = useState(100);
  const [combatLog, setCombatLog] = useState<string[]>([
    'Marcus sneers: "Look Eve, let’s be real. Most guys wouldn’t even give a girl like you a chance. You should be grateful I’m offering my penthouse."'
  ]);
  const [isVictory, setIsVictory] = useState(false);
  const [shake, setShake] = useState(false);

  const attacks = [
    {
      id: 'self_respect',
      name: 'Radical Self-Respect',
      damage: 35,
      recoil: 0,
      quote: '“I survived 23 years in the closet, Marcus. You think I’m going to settle for living in yours?”',
      type: 'Defensive Strike'
    },
    {
      id: 'public_roast',
      name: 'The Public Reality Check',
      damage: 40,
      recoil: 5,
      quote: '“Lower your voice. Before everyone in this 5-star lounge realizes your entire personality is 90% protein powder and 10% cowardice.”',
      type: 'Heavy Critical'
    },
    {
      id: 'chaser_callout',
      name: 'Expose the Fetish Trap',
      damage: 35,
      recoil: 0,
      quote: '“You want a trans woman in private because you’re terrified of what your frat buddies will think in daylight. That’s pathetic.”',
      type: 'Piercing Truth'
    }
  ];

  const handleAttack = (atk: typeof attacks[number]) => {
    soundEngine.playTension();
    setShake(true);
    setTimeout(() => setShake(false), 400);

    const newEgo = Math.max(0, marcusEgo - atk.damage);
    setMarcusEgo(newEgo);
    if (atk.recoil > 0) setEveHp((prev) => Math.max(10, prev - atk.recoil));

    const logs = [
      `You use ${atk.name}!`,
      atk.quote
    ];

    if (newEgo <= 0) {
      soundEngine.playVictory();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      setIsVictory(true);
      logs.push('Marcus’s ego is completely shattered! He drops his drink, stammers, and shrinks away in total defeat!');
      modifyStats({ confidence: 25, dysphoria: -20 });
    } else {
      // Marcus counter-jab
      setTimeout(() => {
        soundEngine.playHeartbeat();
        const marcusCounters = [
          'Marcus scoffed: "You’re acting crazy, Eve! No one else is gonna treat you like this!"',
          'Marcus fidgets nervously with his Rolex: "Whatever, you’re missing out on a VIP lifestyle!"'
        ];
        const counter = marcusCounters[Math.floor(Math.random() * marcusCounters.length)];
        setCombatLog((prev) => [...prev, counter]);
      }, 700);
    }

    setCombatLog((prev) => [...prev, ...logs]);
  };

  const handleFinishClash = () => {
    soundEngine.playClick();
    setScene('era4_marcus_humiliated');
    setViewMode('novel');
  };

  return (
    <div className={`fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-between p-4 md:p-8 select-none ${shake ? 'animate-shake' : ''}`}>
      {/* Top Header: Arena Battle Meter */}
      <div className="max-w-4xl w-full mx-auto bg-slate-900/90 rounded-3xl p-6 border border-red-500/30 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
            <Swords className="w-4 h-4" /> Boundary Defense Encounter
          </span>
          <span className="text-xs text-slate-400 font-mono">Turn-Based Dialogue Clash</span>
        </div>

        {/* Health / Ego Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eve's Confidence Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-pink-400">Eve's Unshakable Confidence</span>
              <span className="text-white font-mono">{eveHp} / 100</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden border border-pink-500/40 p-0.5">
              <div 
                className="bg-gradient-to-r from-pink-500 to-rose-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${eveHp}%` }}
              />
            </div>
          </div>

          {/* Marcus's Fragile Ego Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-red-400">Marcus's Fragile Bro Ego</span>
              <span className="text-white font-mono">{marcusEgo} / 100</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden border border-red-500/40 p-0.5">
              <div 
                className="bg-gradient-to-r from-red-600 to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${marcusEgo}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Center Stage: Clash Visuals */}
      <div className="flex-1 max-w-4xl w-full mx-auto flex items-center justify-center my-4">
        {isVictory ? (
          <div className="text-center p-8 bg-pink-950/40 border border-pink-500/60 rounded-3xl backdrop-blur-md shadow-2xl animate-fadeIn">
            <Award className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-black text-white mb-2">BOUNDARY ENFORCED! 👑</h2>
            <p className="text-slate-200 text-sm max-w-md mx-auto mb-6">
              You held your ground with unwavering dignity. Marcus has been put in his place, and you have permanently outgrown the validation trap.
            </p>
            <button
              onClick={handleFinishClash}
              className="px-8 py-3.5 bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition"
            >
              Claim Victory & Continue Story
            </button>
          </div>
        ) : (
          <div className="w-full max-h-56 overflow-y-auto bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs md:text-sm font-mono">
            {combatLog.map((log, idx) => (
              <p 
                key={idx} 
                className={idx % 2 === 0 ? 'text-pink-300' : 'text-slate-300'}
              >
                {log}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions Panel */}
      {!isVictory && (
        <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
          {attacks.map((atk) => (
            <button
              key={atk.id}
              onClick={() => handleAttack(atk)}
              className="p-4 rounded-2xl bg-slate-900 hover:bg-pink-950/70 border border-slate-800 hover:border-pink-500/80 text-left transition shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-pink-400">{atk.type}</span>
                <span className="text-xs font-mono font-bold text-emerald-400">-{atk.damage} Ego</span>
              </div>
              <h4 className="font-bold text-sm text-white mb-1">{atk.name}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">{atk.quote}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
