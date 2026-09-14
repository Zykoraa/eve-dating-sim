import { 
  X, 
  Wifi, 
  Battery, 
  MessageCircle, 
  Heart, 
  Users, 
  Mic,
  Camera
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { BloomApp } from './BloomApp';
import { MessagesApp } from './MessagesApp';
import { TheNestChat } from './TheNestChat';
import { VoiceCoachApp } from './VoiceCoachApp';
import { PhotoAlbumApp } from './PhotoAlbumApp';

export const PhoneModal: React.FC = () => {
  const { state, setViewMode, setPhoneTab } = useGameStore();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
      {/* Smartphone Device Shell */}
      <div className="relative w-full max-w-[400px] h-[92vh] max-h-[780px] bg-slate-950 rounded-[48px] border-[6px] border-slate-700 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden ring-1 ring-white/10">
        {/* Phone Notch & Status Bar */}
        <div className="bg-slate-950 px-6 pt-3 pb-2 flex items-center justify-between text-xs text-slate-300 select-none z-30">
          <span className="font-mono font-bold text-[11px]">9:41</span>
          
          {/* Dynamic Island / Camera Notch */}
          <div className="w-24 h-4 bg-black rounded-full mx-auto" />

          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-[10px] font-bold text-pink-400">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Top App Bar with Close/Back */}
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            HerSpace OS
          </span>
          <button
            onClick={() => setViewMode('novel')}
            className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
            title="Put Phone Away"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* App Content Display Area */}
        <div className="flex-1 overflow-hidden relative">
          {state.activePhoneTab === 'bloom' && <BloomApp />}
          {state.activePhoneTab === 'messages' && <MessagesApp />}
          {state.activePhoneTab === 'the_nest' && <TheNestChat />}
          {state.activePhoneTab === 'voice_coach' && <VoiceCoachApp />}
          {state.activePhoneTab === 'memories' && <PhotoAlbumApp />}
        </div>

        {/* Phone Bottom Dock Navigation */}
        <div className="bg-slate-950 border-t border-slate-800/80 px-4 py-3 flex items-center justify-between text-slate-400 z-30">
          {/* Bloom App */}
          <button
            onClick={() => setPhoneTab('bloom')}
            className={`flex flex-col items-center gap-1 transition ${
              state.activePhoneTab === 'bloom' ? 'text-pink-400 scale-110' : 'hover:text-slate-200'
            }`}
          >
            <Heart className="w-5 h-5 fill-current" />
            <span className="text-[9px] font-bold">Bloom</span>
          </button>

          {/* Messages App */}
          <button
            onClick={() => setPhoneTab('messages')}
            className={`relative flex flex-col items-center gap-1 transition ${
              state.activePhoneTab === 'messages' ? 'text-pink-400 scale-110' : 'hover:text-slate-200'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[9px] font-bold">Chats</span>
            {state.unreadPhoneCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* The Nest App */}
          <button
            onClick={() => setPhoneTab('the_nest')}
            className={`flex flex-col items-center gap-1 transition ${
              state.activePhoneTab === 'the_nest' ? 'text-pink-400 scale-110' : 'hover:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[9px] font-bold">The Nest</span>
          </button>

          {/* Voice Coach App */}
          <button
            onClick={() => setPhoneTab('voice_coach')}
            className={`flex flex-col items-center gap-1 transition ${
              state.activePhoneTab === 'voice_coach' ? 'text-pink-400 scale-110' : 'hover:text-slate-200'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span className="text-[9px] font-bold">Voice</span>
          </button>

          {/* Memories Polaroid App */}
          <button
            onClick={() => setPhoneTab('memories')}
            className={`flex flex-col items-center gap-1 transition ${
              state.activePhoneTab === 'memories' ? 'text-pink-400 scale-110' : 'hover:text-slate-200'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="text-[9px] font-bold">Snaps</span>
          </button>
        </div>

        {/* Home Indicator Bar */}
        <div className="bg-slate-950 pb-2 flex justify-center">
          <div className="w-32 h-1 bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
};
