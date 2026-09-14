import React, { useState } from 'react';
import { Heart, X, AlertTriangle, Info } from 'lucide-react';
import { DATING_APP_PROFILES } from '../../data/datingProfiles';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import confetti from 'canvas-confetti';

export const BloomApp: React.FC = () => {
  const { updateSuitor, modifyStats, updateChatThreads, setActiveChatThread, setPhoneTab } = useGameStore();
  const [profileIndex, setProfileIndex] = useState(0);
  const [matchAlert, setMatchAlert] = useState<string | null>(null);
  const [matchedSuitorId, setMatchedSuitorId] = useState<string | null>(null);

  const currentProfile = DATING_APP_PROFILES[profileIndex % DATING_APP_PROFILES.length];

  const handleSwipeRight = () => {
    soundEngine.playSparkle();
    
    if (currentProfile.isFakeOrChaser) {
      soundEngine.playTension();
      modifyStats({ dysphoria: 10, confidence: -5 });
    } else if (currentProfile.suitorId) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      const sId = currentProfile.suitorId;
      updateSuitor(sId, { status: 'matched' });
      modifyStats({ confidence: 10 });
      setMatchedSuitorId(sId);
      setMatchAlert(`It's a Match with ${currentProfile.name}! 💕`);

      // Ensure thread exists in chatThreads
      updateChatThreads((prev) => {
        if (prev.some((t) => t.id === sId)) return prev;
        const newThread = {
          id: sId,
          participantId: sId,
          participantName: currentProfile.name,
          participantAvatar: currentProfile.photos[0],
          lastMessage: `You matched with ${currentProfile.name}! Say hi!`,
          unread: true,
          messages: [
            {
              id: `init_${Date.now()}`,
              sender: 'suitor' as const,
              senderName: currentProfile.name,
              text: `Hey Eve! Really loved your profile. Would love to get to know you!`,
              timestamp: 'Just now'
            }
          ],
          pendingChoices: [
            {
              text: `Hey ${currentProfile.name}! Thanks for saying hi. How has your week been?`,
              tone: 'flirty' as const,
              statImpact: { confidence: 10, suitorAffection: 15 },
              suitorReply: 'Much better now that I am talking to you! What are you up to tonight?'
            }
          ]
        };
        return [...prev, newThread];
      });

      setTimeout(() => {
        setMatchAlert(null);
        setMatchedSuitorId(null);
      }, 4000);
    }

    setProfileIndex((prev) => prev + 1);
  };

  const handleSwipeLeft = () => {
    soundEngine.playClick();
    if (currentProfile.isFakeOrChaser) {
      // Good dodge!
      soundEngine.playVictory();
      modifyStats({ confidence: 5 });
    }
    setProfileIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 p-4 relative overflow-hidden">
      {/* Bloom Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">
            Bloom 🌸
          </span>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          {profileIndex + 1} of {DATING_APP_PROFILES.length}
        </div>
      </div>

      {/* Match Banner Notification with Direct Chat Action */}
      {matchAlert && (
        <div className="absolute top-14 left-4 right-4 z-50 bg-gradient-to-r from-pink-600 to-rose-500 text-white p-3.5 rounded-2xl text-center font-bold text-xs shadow-2xl animate-bounce flex items-center justify-between border border-pink-300/40">
          <span>{matchAlert}</span>
          {matchedSuitorId && (
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveChatThread(matchedSuitorId);
                setPhoneTab('messages');
              }}
              className="px-3 py-1 bg-white hover:bg-pink-100 text-pink-600 rounded-xl text-xs font-bold transition shadow-md"
            >
              Chat Now 💬
            </button>
          )}
        </div>
      )}

      {/* Main Profile Card */}
      <div className="flex-1 overflow-y-auto mt-3 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col shadow-xl">
        {/* Photo Container */}
        <div className="relative h-64 bg-slate-800 overflow-hidden">
          <img 
            src={currentProfile.photos[0]} 
            alt={currentProfile.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          
          {/* Floating Badges */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <p className="text-xs text-pink-300">{currentProfile.occupation}</p>
            </div>
            <span className="text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700">
              {currentProfile.distance}
            </span>
          </div>
        </div>

        {/* Bio & Details */}
        <div className="p-4 space-y-4 text-xs">
          {/* Red Flag Warning Indicator */}
          {currentProfile.redFlagsCount > 0 && (
            <div className={`p-2.5 rounded-xl flex items-center gap-2.5 border ${
              currentProfile.redFlagsCount >= 3 
                ? 'bg-red-950/40 border-red-500/50 text-red-200' 
                : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
            }`}>
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>
                <strong>Red Flag Radar:</strong> {currentProfile.redFlagsCount} suspicious tags detected in bio.
              </span>
            </div>
          )}

          {/* Bio text */}
          <div>
            <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-1">About Me</h4>
            <p className="text-slate-200 leading-relaxed text-sm">{currentProfile.bio}</p>
          </div>

          {/* Prompts */}
          {currentProfile.prompts.map((prompt, idx) => (
            <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider block mb-1">
                {prompt.question}
              </span>
              <p className="text-slate-200 font-medium">{prompt.answer}</p>
            </div>
          ))}

          {/* Trans Disclosure Stance */}
          <div className="bg-pink-950/30 border border-pink-500/30 p-3 rounded-xl">
            <span className="text-[10px] text-pink-300 font-bold uppercase block mb-1 flex items-center gap-1">
              <Info className="w-3 h-3" /> Trans Dating Compatibility
            </span>
            <p className="text-slate-200 text-xs">{currentProfile.transDisclosureOpinion}</p>
          </div>
        </div>
      </div>

      {/* Swipe Action Buttons */}
      <div className="pt-3 flex items-center justify-center gap-6">
        <button
          onClick={handleSwipeLeft}
          className="w-14 h-14 rounded-full bg-slate-800 hover:bg-red-950 border border-slate-700 hover:border-red-500 flex items-center justify-center text-red-400 shadow-xl transition hover:scale-110 active:scale-95"
          title="Swipe Left / Pass"
        >
          <X className="w-6 h-6" />
        </button>

        <button
          onClick={handleSwipeRight}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 border border-pink-400 flex items-center justify-center text-white shadow-xl transition hover:scale-110 active:scale-95"
          title="Swipe Right / Like"
        >
          <Heart className="w-6 h-6 fill-white" />
        </button>
      </div>
    </div>
  );
};
