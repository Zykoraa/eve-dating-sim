import { useState, useEffect } from 'react';
import type { 
  TransitionEra, 
  EveStats, 
  SuitorId, 
  SuitorAffection, 
  GameViewMode, 
  MinigameType, 
  SaveSlot 
} from '../types/game';
import type { EquippedOutfit } from '../types/outfits';
import type { ChatThread, NestMessage } from '../types/phone';
import { soundEngine } from './useAudioStore';
import { INITIAL_CHAT_THREADS } from '../data/datingProfiles';
import { ALL_SCENARIOS } from '../data/scenarios';
import { INITIAL_NEST_MESSAGES } from '../utils/nestResponses';

export interface GameState {
  viewMode: GameViewMode;
  previousViewMode: GameViewMode;
  activeMinigame: MinigameType;
  transitionEra: TransitionEra;
  stats: EveStats;
  equippedOutfit: EquippedOutfit;
  unlockedOutfits: string[];
  activeSuitor: SuitorId | null;
  suitors: Record<SuitorId, SuitorAffection>;
  flags: Record<string, boolean>;
  currentScenarioId: string;
  currentSceneId: string;
  dialogueHistory: { speaker: string; text: string }[];
  unlockedCGs: string[];
  unlockedEndings: string[];
  unreadPhoneCount: number;
  activePhoneTab: 'bloom' | 'messages' | 'the_nest' | 'voice_coach' | 'memories';
  activeChatThreadId: string | null;
  chatThreads: ChatThread[];
  nestMessages: NestMessage[];
  textSpeedMs: number;
  autoPlay: boolean;
}

const INITIAL_STATS: EveStats = {
  confidence: 35,
  dysphoria: 45,
  hrtMonth: 1,
  voiceResonance: 20,
  glamRating: 25,
  comfortRating: 60,
  cash: 180,
};

const INITIAL_SUITORS: Record<SuitorId, SuitorAffection> = {
  liam: {
    id: 'liam',
    name: 'Liam Walker',
    affection: 10,
    respect: 50,
    unlockedDates: 0,
    status: 'locked',
    flags: {},
  },
  chloe: {
    id: 'chloe',
    name: 'Chloe Vasquez',
    affection: 15,
    respect: 60,
    unlockedDates: 0,
    status: 'locked',
    flags: {},
  },
  julian: {
    id: 'julian',
    name: 'Julian Chen',
    affection: 10,
    respect: 70,
    unlockedDates: 0,
    status: 'locked',
    flags: {},
  },
  maya: {
    id: 'maya',
    name: 'Maya Lindqvist',
    affection: 15,
    respect: 45,
    unlockedDates: 0,
    status: 'locked',
    flags: {},
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Vance',
    affection: 25,
    respect: 15,
    unlockedDates: 0,
    status: 'locked',
    flags: {},
  },
};

const INITIAL_EQUIPPED: EquippedOutfit = {
  hair: 'era1_messy_bangs',
  makeup: 'era1_first_eyeliner',
  top: 'era1_oversized_hoodie',
  bottom: 'era1_pleated_skirt',
  shoes: 'era1_worn_sneakers',
  accessory: 'era1_choker',
};

const INITIAL_STATE: GameState = {
  viewMode: 'title',
  previousViewMode: 'title',
  activeMinigame: 'none',
  transitionEra: 1,
  stats: INITIAL_STATS,
  equippedOutfit: INITIAL_EQUIPPED,
  unlockedOutfits: [
    'era1_messy_bangs',
    'era1_first_eyeliner',
    'era1_oversized_hoodie',
    'era1_pleated_skirt',
    'era1_worn_sneakers',
    'era1_choker',
    'era1_thrift_cardigan',
    'era1_mom_jeans',
  ],
  activeSuitor: null,
  suitors: INITIAL_SUITORS,
  flags: {
    tutorial_complete: false,
    came_out_on_apps: false,
    first_date_done: false,
    met_chloe: false,
    met_liam: false,
    dodged_marcus_redflag: false,
  },
  currentScenarioId: 'prologue',
  currentSceneId: 'prologue_start',
  dialogueHistory: [],
  unlockedCGs: [],
  unlockedEndings: [],
  unreadPhoneCount: 2,
  activePhoneTab: 'bloom',
  activeChatThreadId: 'tara',
  chatThreads: INITIAL_CHAT_THREADS,
  nestMessages: INITIAL_NEST_MESSAGES,
  textSpeedMs: 25,
  autoPlay: false,
};

// Simple reactive store hook
let globalState = { ...INITIAL_STATE };
const listeners = new Set<(state: GameState) => void>();

function notify() {
  listeners.forEach((listener) => listener(globalState));
}

export function useGameStore() {
  const [state, setState] = useState<GameState>(globalState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const setViewMode = (mode: GameViewMode) => {
    soundEngine.playClick();
    globalState = { 
      ...globalState, 
      previousViewMode: globalState.viewMode, 
      viewMode: mode 
    };
    notify();
  };

  const setScene = (sceneId: string, scenarioId?: string) => {
    let targetScenarioId = scenarioId;
    if (!targetScenarioId) {
      for (const [sId, sData] of Object.entries(ALL_SCENARIOS)) {
        if (sData.nodes[sceneId]) {
          targetScenarioId = sId;
          break;
        }
      }
    }
    const targetEra = targetScenarioId ? ALL_SCENARIOS[targetScenarioId]?.era : undefined;
    const shouldAdvanceEra = targetEra && targetEra > globalState.transitionEra;

    globalState = {
      ...globalState,
      currentSceneId: sceneId,
      ...(targetScenarioId ? { currentScenarioId: targetScenarioId } : {}),
      ...(shouldAdvanceEra ? { transitionEra: targetEra } : {}),
    };
    notify();
  };

  const addDialogueHistory = (speaker: string, text: string) => {
    const updated = [...globalState.dialogueHistory, { speaker, text }];
    if (updated.length > 50) updated.shift();
    globalState = { ...globalState, dialogueHistory: updated };
    notify();
  };

  const modifyStats = (diff: Partial<EveStats>) => {
    const s = { ...globalState.stats };
    if (diff.confidence !== undefined) s.confidence = Math.max(0, Math.min(100, s.confidence + diff.confidence));
    if (diff.dysphoria !== undefined) s.dysphoria = Math.max(0, Math.min(100, s.dysphoria + diff.dysphoria));
    if (diff.hrtMonth !== undefined) s.hrtMonth = Math.max(1, s.hrtMonth + diff.hrtMonth);
    if (diff.voiceResonance !== undefined) s.voiceResonance = Math.max(0, Math.min(100, s.voiceResonance + diff.voiceResonance));
    if (diff.glamRating !== undefined) s.glamRating = Math.max(0, Math.min(100, s.glamRating + diff.glamRating));
    if (diff.comfortRating !== undefined) s.comfortRating = Math.max(0, Math.min(100, s.comfortRating + diff.comfortRating));
    if (diff.cash !== undefined) s.cash = Math.max(0, s.cash + diff.cash);

    globalState = { ...globalState, stats: s };
    notify();
  };

  const advanceEra = (era: TransitionEra, newHrtMonth?: number) => {
    soundEngine.playVictory();
    const cashBonus = era === 2 ? 100 : era === 3 ? 150 : era === 4 ? 200 : 0;
    globalState = {
      ...globalState,
      transitionEra: era,
      stats: {
        ...globalState.stats,
        hrtMonth: newHrtMonth || (era === 2 ? 6 : era === 3 ? 14 : era === 4 ? 24 : 1),
        confidence: Math.min(100, globalState.stats.confidence + 15),
        dysphoria: Math.max(10, globalState.stats.dysphoria - 10),
        voiceResonance: Math.min(100, globalState.stats.voiceResonance + 20),
        glamRating: Math.min(100, globalState.stats.glamRating + 20),
        cash: Math.max(0, globalState.stats.cash + cashBonus),
      }
    };
    notify();
  };

  const updateSuitor = (id: SuitorId, update: Partial<SuitorAffection>) => {
    const existing = globalState.suitors[id];
    if (!existing) return;
    const affection = update.affection !== undefined ? Math.max(0, Math.min(100, update.affection)) : existing.affection;
    const respect = update.respect !== undefined ? Math.max(0, Math.min(100, update.respect)) : existing.respect;

    globalState = {
      ...globalState,
      suitors: {
        ...globalState.suitors,
        [id]: {
          ...existing,
          ...update,
          affection,
          respect,
        }
      }
    };
    notify();
  };

  const setFlag = (key: string, value: boolean) => {
    globalState = {
      ...globalState,
      flags: { ...globalState.flags, [key]: value },
    };
    notify();
  };

  const equipItem = (category: keyof EquippedOutfit, itemId: string) => {
    soundEngine.playClick();
    globalState = {
      ...globalState,
      equippedOutfit: {
        ...globalState.equippedOutfit,
        [category]: itemId,
      }
    };
    notify();
  };

  const unlockOutfit = (itemId: string) => {
    if (!globalState.unlockedOutfits.includes(itemId)) {
      globalState = {
        ...globalState,
        unlockedOutfits: [...globalState.unlockedOutfits, itemId],
      };
      notify();
    }
  };

  const unlockCG = (cgId: string) => {
    if (!globalState.unlockedCGs.includes(cgId)) {
      globalState = {
        ...globalState,
        unlockedCGs: [...globalState.unlockedCGs, cgId],
      };
      notify();
    }
  };

  const unlockEnding = (endingId: string) => {
    if (!globalState.unlockedEndings.includes(endingId)) {
      globalState = {
        ...globalState,
        unlockedEndings: [...globalState.unlockedEndings, endingId],
      };
      notify();
    }
  };

  const setPhoneTab = (tab: GameState['activePhoneTab']) => {
    soundEngine.playClick();
    globalState = { ...globalState, activePhoneTab: tab };
    notify();
  };

  const setActiveChatThread = (threadId: string | null) => {
    soundEngine.playClick();
    globalState = { ...globalState, activeChatThreadId: threadId };
    notify();
  };

  const triggerMinigame = (game: MinigameType) => {
    globalState = { ...globalState, activeMinigame: game, viewMode: game !== 'none' ? 'minigame' : 'novel' };
    notify();
  };

  const saveGame = (slotId: number, title?: string) => {
    soundEngine.playSparkle();
    const slot: SaveSlot = {
      id: slotId,
      title: title || `Chapter: ${globalState.currentScenarioId} (Era ${globalState.transitionEra})`,
      timestamp: new Date().toLocaleString(),
      era: globalState.transitionEra,
      hrtMonth: globalState.stats.hrtMonth,
      currentScenarioId: globalState.currentScenarioId,
      currentSceneId: globalState.currentSceneId,
      stats: globalState.stats,
      equippedOutfit: globalState.equippedOutfit,
      unlockedOutfits: globalState.unlockedOutfits,
      flags: globalState.flags,
      unlockedEndings: globalState.unlockedEndings,
      suitors: globalState.suitors,
      chatThreads: globalState.chatThreads,
      nestMessages: globalState.nestMessages,
    };
    try {
      localStorage.setItem(`eve_save_slot_${slotId}`, JSON.stringify(slot));
    } catch {}
  };

  const loadGame = (slotId: number): boolean => {
    try {
      const data = localStorage.getItem(`eve_save_slot_${slotId}`);
      if (!data) return false;
      const slot: SaveSlot = JSON.parse(data);
      soundEngine.playSparkle();
      globalState = {
        ...globalState,
        viewMode: 'novel',
        transitionEra: slot.era,
        currentScenarioId: slot.currentScenarioId || globalState.currentScenarioId,
        currentSceneId: slot.currentSceneId,
        stats: slot.stats,
        equippedOutfit: slot.equippedOutfit,
        unlockedOutfits: slot.unlockedOutfits || globalState.unlockedOutfits,
        flags: slot.flags || globalState.flags,
        unlockedEndings: slot.unlockedEndings || globalState.unlockedEndings,
        suitors: slot.suitors,
        chatThreads: slot.chatThreads || INITIAL_CHAT_THREADS,
        nestMessages: slot.nestMessages || INITIAL_NEST_MESSAGES,
      };
      notify();
      return true;
    } catch {
      return false;
    }
  };

  const updateChatThreads = (updater: (prev: ChatThread[]) => ChatThread[]) => {
    globalState = {
      ...globalState,
      chatThreads: updater(globalState.chatThreads),
    };
    notify();
  };

  const updateNestMessages = (updater: (prev: NestMessage[]) => NestMessage[]) => {
    globalState = {
      ...globalState,
      nestMessages: updater(globalState.nestMessages),
    };
    notify();
  };

  const resetGame = () => {
    globalState = { ...INITIAL_STATE };
    notify();
  };

  return {
    state,
    setViewMode,
    setScene,
    addDialogueHistory,
    modifyStats,
    advanceEra,
    updateSuitor,
    setFlag,
    equipItem,
    unlockOutfit,
    unlockCG,
    unlockEnding,
    setPhoneTab,
    setActiveChatThread,
    updateChatThreads,
    updateNestMessages,
    triggerMinigame,
    saveGame,
    loadGame,
    resetGame,
  };
}
