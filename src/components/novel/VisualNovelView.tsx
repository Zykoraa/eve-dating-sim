import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Sparkles, 
  Smartphone, 
  Sparkle, 
  Save, 
  Settings, 
  ChevronRight, 
  Volume2, 
  VolumeX,
  History,
  DollarSign,
  Home,
  GitFork,
  FastForward,
  Heart,
  Compass,
  Palette
} from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { getDialogueNode } from '../../data/scenarios';
import { EVE_ERAS, CHARACTERS } from '../../data/characters';
import { soundEngine } from '../../state/useAudioStore';
import { ParticleAtmosphere } from './ParticleAtmosphere';
import { EveCompositeSprite } from '../character/EveCompositeSprite';
import type { ChoiceOption } from '../../types/story';
import type { SuitorId } from '../../types/game';
import confetti from 'canvas-confetti';

export const VisualNovelView: React.FC = () => {
  const { 
    state, 
    setViewMode, 
    setScene, 
    addDialogueHistory, 
    modifyStats, 
    advanceEra, 
    updateSuitor, 
    setFlag, 
    triggerMinigame,
    unlockEnding,
    toggleAutoPlay
  } = useGameStore();

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [shake, setShake] = useState(false);

  const activeNode = getDialogueNode(state.currentSceneId, state.currentScenarioId);
  const textIntervalRef = useRef<number | null>(null);

  // Trigger typewriter effect whenever active node changes
  useEffect(() => {
    if (!activeNode) return;

    if (activeNode.shakeScreen) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    if (activeNode.soundEffect === 'playSparkle') soundEngine.playSparkle();
    if (activeNode.soundEffect === 'playPhonePing') soundEngine.playPhonePing();
    if (activeNode.soundEffect === 'playHeartbeat') soundEngine.playHeartbeat();
    if (activeNode.soundEffect === 'playVictory') {
      soundEngine.playVictory();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
    if (activeNode.soundEffect === 'playTension') soundEngine.playTension();

    if (activeNode.id.startsWith('ending_')) {
      unlockEnding(activeNode.id);
    }

    // Typewriter
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    const fullText = activeNode.text;

    if (textIntervalRef.current) clearInterval(textIntervalRef.current);

    textIntervalRef.current = window.setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index % 3 === 0) soundEngine.playClick();

      if (index >= fullText.length) {
        if (textIntervalRef.current) clearInterval(textIntervalRef.current);
        setIsTyping(false);
        addDialogueHistory(activeNode.speakerTitle || activeNode.speaker, fullText);
      }
    }, state.textSpeedMs);

    return () => {
      if (textIntervalRef.current) clearInterval(textIntervalRef.current);
    };
  }, [state.currentSceneId]);

  // Auto-play timer effect
  useEffect(() => {
    if (!state.autoPlay || isTyping || !activeNode) return;
    if (activeNode.choices && activeNode.choices.length > 0) return;

    if (activeNode.nextSceneId) {
      const delay = state.settings?.autoAdvanceDelayMs || 2200;
      const timer = window.setTimeout(() => {
        if (activeNode.advanceEra) advanceEra(activeNode.advanceEra);
        setScene(activeNode.nextSceneId!);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [state.autoPlay, isTyping, state.currentSceneId]);

  const handleSkip = () => {
    if (!activeNode) return;
    soundEngine.playClick();
    if (isTyping) {
      if (textIntervalRef.current) clearInterval(textIntervalRef.current);
      setDisplayedText(activeNode.text);
      setIsTyping(false);
      addDialogueHistory(activeNode.speakerTitle || activeNode.speaker, activeNode.text);
    } else if (!activeNode.choices && activeNode.nextSceneId) {
      if (activeNode.advanceEra) advanceEra(activeNode.advanceEra);
      setScene(activeNode.nextSceneId);
    }
  };

  const handleBoxClick = () => {
    if (!activeNode) return;
    if (isTyping) {
      // Fast forward text
      if (textIntervalRef.current) clearInterval(textIntervalRef.current);
      setDisplayedText(activeNode.text);
      setIsTyping(false);
      addDialogueHistory(activeNode.speakerTitle || activeNode.speaker, activeNode.text);
    } else if (!activeNode.choices && activeNode.nextSceneId) {
      soundEngine.playClick();
      if (activeNode.setFlag) {
        setFlag(activeNode.setFlag.key, activeNode.setFlag.value);
      }
      if (activeNode.advanceEra) {
        advanceEra(activeNode.advanceEra);
      }
      setScene(activeNode.nextSceneId);
    }
  };

  const handleChoice = (choice: ChoiceOption) => {
    soundEngine.playClick();
    if (choice.statEffects) {
      modifyStats({
        confidence: choice.statEffects.confidence,
        dysphoria: choice.statEffects.dysphoria,
        glamRating: choice.statEffects.glam,
        voiceResonance: choice.statEffects.voiceResonance,
        comfortRating: choice.statEffects.comfortRating,
        cash: choice.statEffects.cash,
      });

      if (choice.statEffects.suitorAffection) {
        const sId = choice.statEffects.suitorAffection.suitor;
        updateSuitor(sId, {
          affection: (state.suitors[sId]?.affection || 0) + choice.statEffects.suitorAffection.amount,
        });
      }
      if (choice.statEffects.suitorRespect) {
        const sId = choice.statEffects.suitorRespect.suitor;
        updateSuitor(sId, {
          respect: (state.suitors[sId]?.respect || 0) + choice.statEffects.suitorRespect.amount,
        });
      }
    }

    if (choice.setFlag) setFlag(choice.setFlag.key, choice.setFlag.value);
    if (choice.advanceEra) advanceEra(choice.advanceEra);
    if (choice.triggerMinigame) triggerMinigame(choice.triggerMinigame);
    if (choice.openPhone) setViewMode('phone');
    if (choice.openVanity) setViewMode('vanity');

    setScene(choice.nextSceneId);
  };

  const toggleMute = () => {
    const next = !isMuted;
    soundEngine.setMuted(next);
    setIsMuted(next);
  };

  const currentEraData = EVE_ERAS[state.transitionEra];
  
  const charKey = activeNode?.activeSuitor || (
    activeNode?.speaker && activeNode.speaker !== 'eve' && activeNode.speaker !== 'narrator'
      ? activeNode.speaker
      : null
  );
  const suitorProfile = charKey && (charKey in CHARACTERS) 
    ? CHARACTERS[charKey as keyof typeof CHARACTERS] 
    : null;

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-slate-950 flex flex-col justify-between ${shake ? 'animate-shake' : ''}`}>
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter brightness-90 scale-105"
        style={{ backgroundImage: `url(${activeNode?.background || '/assets/backgrounds/title_bg.jpg'})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      {/* Dynamic Atmospheric Particle Canvas */}
      <ParticleAtmosphere background={activeNode?.background || ''} />

      {/* Top Status & HUD Bar */}
      <header className="relative z-20 w-full px-4 sm:px-6 py-3 flex items-center justify-between bg-slate-950/75 backdrop-blur-md border-b border-pink-500/20 shadow-lg">
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Transition Era Badge */}
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/40 px-3.5 py-1.5 rounded-full shadow-inner">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-300">
              Era {state.transitionEra}: {currentEraData.title}
            </span>
            <span className="text-xs text-purple-300 font-mono hidden sm:inline">
              Month {state.stats.hrtMonth} on E
            </span>
          </div>

          {/* Suitor Dual Metric Pill (Affection & Respect) */}
          {suitorProfile && activeNode?.activeSuitor && (activeNode.activeSuitor in state.suitors) && (
            <div className="hidden lg:flex items-center gap-3 bg-slate-900/80 border border-purple-500/30 px-3 py-1 rounded-full text-xs">
              <span className="text-pink-300 font-bold flex items-center gap-1" title="Romance Affection">
                <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                {state.suitors[activeNode.activeSuitor as SuitorId].affection}%
              </span>
              <span className="text-purple-300 font-bold flex items-center gap-1" title="Mutual Respect (Guards against chaser dynamics)">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                {state.suitors[activeNode.activeSuitor as SuitorId].respect}% Respect
              </span>
            </div>
          )}

          {/* Stats Badges */}
          <div className="hidden md:flex items-center gap-3">
            {/* Confidence */}
            <div className="flex items-center gap-1.5" title="Confidence: Enables bold dialogue options">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full transition-all duration-500"
                  style={{ width: `${state.stats.confidence}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-amber-300">{state.stats.confidence}</span>
            </div>

            {/* Dysphoria Shield */}
            <div className="flex items-center gap-1.5" title="Dysphoria Shield: Mental resilience">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full transition-all duration-500"
                  style={{ width: `${Math.max(10, 100 - state.stats.dysphoria)}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-emerald-300">{100 - state.stats.dysphoria}%</span>
            </div>

            {/* Cash */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <DollarSign className="w-3 h-3" />
              <span>{state.stats.cash}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Auto Button */}
          <button
            onClick={toggleAutoPlay}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              state.autoPlay 
                ? 'bg-pink-600 text-white border-pink-400 animate-pulse'
                : 'bg-slate-800/70 text-slate-300 border-white/10 hover:text-white'
            }`}
            title="Toggle Auto Advance"
          >
            Auto
          </button>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-1"
            title="Fast forward dialogue"
          >
            <FastForward className="w-3 h-3" />
            <span className="hidden sm:inline">Skip</span>
          </button>

          {/* Story Flowchart Tree Button */}
          <button 
            onClick={() => setViewMode('flowchart')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-900/40 to-slate-800 text-purple-200 text-xs px-3 py-1.5 rounded-xl border border-purple-500/40 transition-all hover:scale-105"
            title="Story Flowchart & Timeline"
          >
            <GitFork className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Tree</span>
          </button>

          {/* HerSpace Phone Button */}
          <button 
            onClick={() => setViewMode('phone')}
            className="relative flex items-center gap-1.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-xs px-3 py-1.5 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-pink-400/50"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Phone</span>
            {state.unreadPhoneCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-slate-950 animate-bounce">
                {state.unreadPhoneCount}
              </span>
            )}
          </button>

          {/* Styling / Character Creator Button */}
          <button 
            onClick={() => setViewMode('creator')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-900/60 to-pink-900/60 hover:from-purple-800 hover:to-pink-800 text-pink-200 text-xs px-2.5 py-1.5 rounded-xl border border-pink-500/40 transition-all hover:scale-105"
            title="Character Creator & Appearance Studio"
          >
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          {/* Vanity Mirror Button */}
          <button 
            onClick={() => setViewMode('vanity')}
            className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-pink-200 text-xs px-2.5 py-1.5 rounded-xl border border-pink-500/30 transition-all hover:scale-105"
            title="Wardrobe & Vanity Mirror"
          >
            <Sparkle className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Vanity</span>
          </button>

          {/* Sanctuary Home Button */}
          <button 
            onClick={() => setViewMode('apartment')}
            className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-pink-200 text-xs px-2.5 py-1.5 rounded-xl border border-pink-500/30 transition-all hover:scale-105"
            title="Eve's Apartment Sanctuary"
          >
            <Home className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Room</span>
          </button>

          {/* City Map Hub */}
          <button 
            onClick={() => setViewMode('city_hub')}
            className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-indigo-200 text-xs px-2.5 py-1.5 rounded-xl border border-indigo-500/30 transition-all hover:scale-105"
            title="City Districts & Activities"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">City</span>
          </button>

          {/* Backlog / History */}
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-xl transition"
            title="Dialogue Log"
          >
            <History className="w-3.5 h-3.5" />
          </button>

          {/* Audio Mute */}
          <button 
            onClick={toggleMute}
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-xl transition"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Save / Load */}
          <button 
            onClick={() => setViewMode('save_load')}
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-xl transition"
            title="Save / Load Game"
          >
            <Save className="w-3.5 h-3.5" />
          </button>

          {/* Settings */}
          <button 
            onClick={() => setViewMode('settings')}
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 rounded-xl transition"
            title="Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Central Character Stage (Positioned behind UI to prevent layout push-down) */}
      <div className="absolute inset-0 z-10 flex items-end justify-center px-4 md:px-16 pointer-events-none pb-28 md:pb-36">
        {/* Eve Character Sprite (Left / Center) */}
        <div className="relative max-h-[62vh] md:max-h-[68vh] flex justify-end transition-all duration-700 transform hover:scale-105">
          <EveCompositeSprite
            customConfig={state.customEve}
            equipped={state.equippedOutfit}
            era={state.transitionEra}
            expression={activeNode?.eveExpression || 'neutral'}
            mode="fullbody"
            className="max-h-[60vh] md:max-h-[66vh] w-auto animate-fadeIn"
          />
        </div>

        {/* Suitor Character Sprite (Right) */}
        {suitorProfile && (
          <div className="relative max-h-[64vh] md:max-h-[70vh] flex justify-start transition-all duration-700 transform animate-float">
            <img 
              src={suitorProfile.spriteUrl || suitorProfile.avatarUrl} 
              alt={suitorProfile.name} 
              className="max-h-[62vh] md:max-h-[68vh] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] filter contrast-105"
            />
          </div>
        )}
      </div>

      {/* Spacer to push dialogue to bottom */}
      <div className="flex-1" />

      {/* Dialogue Box & Interactive Choices */}
      <div className="relative z-30 w-full max-w-5xl mx-auto px-3 sm:px-4 pb-3 sm:pb-5">
        {/* Branching Choices Overlay */}
        {activeNode?.choices && (
          <div className="mb-3 max-h-[44vh] overflow-y-auto space-y-2.5 pr-2 animate-fadeIn">
            {activeNode.choices.map((choice, idx) => {
              const isLocked = choice.minConfidence && state.stats.confidence < choice.minConfidence;
              return (
                <button
                  key={idx}
                  disabled={Boolean(isLocked)}
                  onClick={() => handleChoice(choice)}
                  className={`w-full text-left p-3 md:p-3.5 rounded-xl transition-all duration-200 flex items-center justify-between border ${
                    isLocked 
                      ? 'bg-slate-900/80 border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                      : 'bg-slate-950/95 hover:bg-pink-950/90 border-pink-500/50 hover:border-pink-400 text-slate-100 hover:text-white shadow-2xl hover:translate-x-1 backdrop-blur-md'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold border border-pink-500/30 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs sm:text-sm md:text-base leading-snug">{choice.text}</p>
                      {choice.tone && (
                        <span className="text-[10px] uppercase tracking-wider text-pink-400 font-semibold">
                          [{choice.tone}]
                        </span>
                      )}
                    </div>
                  </div>
                  {isLocked ? (
                    <span className="text-[11px] text-red-400 font-mono ml-2 flex-shrink-0">Requires {choice.minConfidence} Confidence</span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-pink-400 opacity-60 group-hover:opacity-100 ml-2 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Leaf Scene / Epilogue Navigation Actions */}
        {!isTyping && (!activeNode?.choices || activeNode.choices.length === 0) && !activeNode?.nextSceneId && (
          <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900/95 via-purple-950/90 to-slate-900/95 border border-pink-500/50 shadow-2xl backdrop-blur-xl animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Sparkle className="w-5 h-5 text-amber-400 animate-spin" />
                <div>
                  <h4 className="font-black text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200">
                    {activeNode?.id?.startsWith('ending_') ? 'Episode Cleared — Ending Unlocked! 💖' : 'Scene Complete'}
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    {activeNode?.id?.startsWith('ending_') 
                      ? 'Congratulations on reaching your finale! Your memories have been recorded.' 
                      : 'You reached the end of this chapter node. Where to next?'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setViewMode('title')}
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-lg shadow-pink-600/30 transition flex items-center gap-1.5"
                >
                  <Home className="w-4 h-4" /> Title Menu
                </button>
                <button
                  onClick={() => setViewMode('vanity')}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-pink-400" /> Wardrobe
                </button>
                <button
                  onClick={() => setViewMode('save_load')}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-purple-400" /> Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Dialogue Panel */}
        <div 
          onClick={handleBoxClick}
          className="cursor-pointer bg-slate-950/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-pink-500/40 shadow-2xl transition-all hover:border-pink-500/70 min-h-[110px] sm:min-h-[125px] flex flex-col justify-between"
        >
          <div>
            {/* Speaker Nameplate */}
            <div className="flex items-center justify-between mb-2">
              <span 
                className="font-bold text-base md:text-lg tracking-wide uppercase px-3 py-1 rounded-md"
                style={{
                  color: activeNode?.speaker === 'eve' ? '#ec4899' : suitorProfile?.themeColor || '#c084fc',
                  backgroundColor: 'rgba(30, 27, 75, 0.5)'
                }}
              >
                {activeNode?.speakerTitle || (activeNode?.speaker === 'eve' ? (state.customEve?.name || 'Eve') : suitorProfile?.name || activeNode?.speaker)}
              </span>
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                {state.autoPlay && <span className="text-pink-400 font-bold">[Auto-Playing] • </span>}
                {isTyping ? 'Typing...' : (activeNode?.choices || activeNode?.nextSceneId ? 'Click to continue ▼' : 'Episode complete ★')}
              </span>
            </div>

            {/* Spoken Text */}
            <p className={`text-slate-100 leading-relaxed ${state.settings?.dyslexiaFont ? 'font-mono tracking-wide' : 'font-sans'} ${
              state.settings?.fontSize === 'sm' 
                ? 'text-xs md:text-sm' 
                : state.settings?.fontSize === 'lg' 
                ? 'text-base md:text-xl' 
                : state.settings?.fontSize === 'xl' 
                ? 'text-lg md:text-2xl' 
                : 'text-sm md:text-lg'
            }`}>
              {displayedText}
            </p>
          </div>
        </div>
      </div>

      {/* Backlog / History Drawer */}
      {showHistory && (
        <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-xl p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <h2 className="text-xl font-bold text-pink-400 flex items-center gap-2">
              <History className="w-5 h-5" /> Dialogue Backlog
            </h2>
            <button 
              onClick={() => setShowHistory(false)}
              className="text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg text-sm"
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-4">
            {state.dialogueHistory.map((item, idx) => (
              <div key={idx} className="border-b border-slate-900 pb-3">
                <span className="text-xs font-bold text-pink-400 block mb-1">{item.speaker}</span>
                <p className="text-slate-200 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
