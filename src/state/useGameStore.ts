import { useState, useEffect } from 'react';
import type { 
  TransitionEra, 
  EveStats, 
  SuitorId, 
  SuitorAffection, 
  GameViewMode, 
  MinigameType, 
  SaveSlot,
  InstaPost,
  InstaComment,
  DailyRoutines,
  GameSettings,
  CalendarState,
  TimeOfDay,
  DayOfWeek,
  DiaryEntry,
  ApartmentDecorItem,
  CityActivity
} from '../types/game';
import type { EquippedOutfit } from '../types/outfits';
import type { ChatThread, NestMessage } from '../types/phone';
import type { CustomEveConfig } from '../types/character';
import { soundEngine } from './useAudioStore';
import { INITIAL_CHAT_THREADS } from '../data/datingProfiles';
import { ALL_SCENARIOS } from '../data/scenarios';
import { INITIAL_NEST_MESSAGES } from '../utils/nestResponses';
import { INITIAL_DIARY_ENTRIES, createDaySummaryDiaryEntry } from '../data/diaryEntries';
import { APARTMENT_DECORS } from '../data/decorItems';
import { DEFAULT_CUSTOM_EVE } from '../data/characterCreationPresets';

export interface GameState {
  viewMode: GameViewMode;
  previousViewMode: GameViewMode;
  activeMinigame: MinigameType;
  transitionEra: TransitionEra;
  customEve: CustomEveConfig;
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
  activePhoneTab: 'bloom' | 'messages' | 'the_nest' | 'voice_coach' | 'memories' | 'instaglam' | 'wellness';
  activeChatThreadId: string | null;
  chatThreads: ChatThread[];
  nestMessages: NestMessage[];
  textSpeedMs: number;
  autoPlay: boolean;
  visitedScenes: string[];
  instaPosts: InstaPost[];
  dailyRoutines: DailyRoutines;
  settings: GameSettings;
  calendar: CalendarState;
  diaryEntries: DiaryEntry[];
  apartmentDecors: ApartmentDecorItem[];
  suitorRanks: Record<SuitorId, number>;
  lastCompletedActivity: string | null;
}

const INITIAL_STATS: EveStats = {
  confidence: 25,
  dysphoria: 65,
  hrtMonth: 0,
  voiceResonance: 15,
  glamRating: 10,
  comfortRating: 40,
  cash: 120,
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
  jesse: {
    id: 'jesse',
    name: 'Jesse Nolan',
    affection: 10,
    respect: 65,
    unlockedDates: 0,
    status: 'locked',
    flags: {},
  },
};

const INITIAL_EQUIPPED: EquippedOutfit = {
  hair: 'era0_messy_mop',
  makeup: 'era0_bare_face',
  top: 'era0_navy_hoodie',
  bottom: 'era0_loose_jeans',
  shoes: 'era0_worn_skaters',
  accessory: 'era0_headphones',
};

const INITIAL_INSTA_POSTS: InstaPost[] = [
  {
    id: 'post_1',
    author: 'Eve ✨',
    authorHandle: '@eve.blossoming',
    avatar: '/assets/characters/eve_avatar.png',
    photoUrl: '/assets/characters/eve_era1.png',
    caption: 'Day 32 HRT. Taking baby steps and trying not to let the mirror win today 🌸 oversized pastel hoodie is my armor.',
    likes: 42,
    isLiked: false,
    time: '2h ago',
    era: 1,
    comments: [
      {
        id: 'c1',
        author: 'Tara Higgins',
        avatar: '/assets/characters/tara_avatar.png',
        text: 'YOU ARE GLOWING MY QUEEN!! Drop the haters in the trash 🔥',
        time: '1h ago',
      },
      {
        id: 'c2',
        author: 'Riley (The Nest)',
        avatar: '/assets/characters/the_nest_avatar.png',
        text: 'The hoodie era is sacred sister!! You are blooming so beautifully 💖',
        time: '45m ago',
      },
      {
        id: 'c3',
        author: 'Liam Walker',
        avatar: '/assets/characters/liam_avatar.png',
        text: 'Soft pastel colors really suit you, Eve. Hope you have a peaceful afternoon ☕🌱',
        time: '30m ago',
      },
    ],
  },
  {
    id: 'post_2',
    author: 'Eve ✨',
    authorHandle: '@eve.blossoming',
    avatar: '/assets/characters/eve_avatar.png',
    photoUrl: '/assets/backgrounds/cafe.png',
    caption: 'First coffee date out in the wild. Hand was shaking, but the cinnamon oat latte tasted like freedom.',
    likes: 67,
    isLiked: false,
    time: 'Yesterday',
    era: 1,
    comments: [
      {
        id: 'c4',
        author: 'Sasha (The Nest)',
        avatar: '/assets/characters/the_nest_avatar.png',
        text: 'Major milestone unlocked!! Next step: ordering with your chin up high 💕',
        time: 'Yesterday',
      },
    ],
  },
];

const INITIAL_ROUTINES: DailyRoutines = {
  hrtLogged: false,
  waterLogged: false,
  skincareLogged: false,
  voiceWarmupLogged: false,
  streakDays: 3,
};

const INITIAL_SETTINGS: GameSettings = {
  dyslexiaFont: false,
  fontSize: 'md',
  contentIntensity: 'standard',
  autoAdvanceDelayMs: 2200,
  bgmVolume: 0.6,
  sfxVolume: 0.8,
  ambientVolume: 0.5,
  adultContentEnabled: true,
};

const INITIAL_STATE: GameState = {
  viewMode: 'title',
  previousViewMode: 'title',
  activeMinigame: 'none',
  transitionEra: 0,
  customEve: DEFAULT_CUSTOM_EVE,
  stats: INITIAL_STATS,
  equippedOutfit: INITIAL_EQUIPPED,
  unlockedOutfits: [
    'era0_messy_mop',
    'era0_bare_face',
    'era0_navy_hoodie',
    'era0_loose_jeans',
    'era0_worn_skaters',
    'era0_headphones',
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
  currentScenarioId: 'era0_coming_out',
  currentSceneId: 'era0_start',
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
  visitedScenes: ['era0_start'],
  instaPosts: INITIAL_INSTA_POSTS,
  dailyRoutines: INITIAL_ROUTINES,
  settings: INITIAL_SETTINGS,
  calendar: {
    day: 1,
    dayOfWeek: 'Monday',
    timeOfDay: 'morning',
    energy: 100,
    maxEnergy: 100,
    weather: 'sunny',
  },
  diaryEntries: INITIAL_DIARY_ENTRIES,
  apartmentDecors: APARTMENT_DECORS,
  suitorRanks: {
    liam: 1,
    chloe: 1,
    julian: 1,
    maya: 1,
    marcus: 1,
    jesse: 1,
  },
  lastCompletedActivity: null,
};

// Simple reactive store hook
let globalState = { ...INITIAL_STATE };
const listeners = new Set<(state: GameState) => void>();

function notify() {
  listeners.forEach((listener) => listener(globalState));
}



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
    let targetSceneId = sceneId;

    if (!targetScenarioId) {
      if (ALL_SCENARIOS[sceneId]) {
        targetScenarioId = sceneId;
        if (!ALL_SCENARIOS[sceneId].nodes[sceneId]) {
          targetSceneId = ALL_SCENARIOS[sceneId].initialSceneId;
        }
      } else {
        for (const [sId, sData] of Object.entries(ALL_SCENARIOS)) {
          if (sData.nodes[sceneId]) {
            targetScenarioId = sId;
            break;
          }
        }
      }
    } else if (ALL_SCENARIOS[targetScenarioId] && !ALL_SCENARIOS[targetScenarioId].nodes[targetSceneId]) {
      targetSceneId = ALL_SCENARIOS[targetScenarioId].initialSceneId;
    }

    const targetEra = targetScenarioId ? ALL_SCENARIOS[targetScenarioId]?.era : undefined;
    const shouldAdvanceEra = targetEra !== undefined && targetEra > globalState.transitionEra;

    const visited = globalState.visitedScenes.includes(targetSceneId)
      ? globalState.visitedScenes
      : [...globalState.visitedScenes, targetSceneId];

    globalState = {
      ...globalState,
      currentSceneId: targetSceneId,
      visitedScenes: visited,
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
    if (diff.hrtMonth !== undefined) s.hrtMonth = Math.max(0, s.hrtMonth + diff.hrtMonth);
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
    const defaultHrtMonth = era === 0 ? 0 : era === 1 ? 1 : era === 2 ? 6 : era === 3 ? 14 : 24;
    globalState = {
      ...globalState,
      transitionEra: era,
      stats: {
        ...globalState.stats,
        hrtMonth: newHrtMonth !== undefined ? newHrtMonth : defaultHrtMonth,
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
    globalState = { 
      ...globalState, 
      activeMinigame: game, 
      previousViewMode: globalState.viewMode !== 'minigame' ? globalState.viewMode : globalState.previousViewMode,
      viewMode: game !== 'none' ? 'minigame' : (globalState.previousViewMode || 'novel') 
    };
    notify();
  };

  const fastTravelToScene = (sceneId: string, scenarioId?: string) => {
    soundEngine.playSparkle();
    setScene(sceneId, scenarioId);
    setViewMode('novel');
  };

  const toggleAutoPlay = () => {
    globalState = { ...globalState, autoPlay: !globalState.autoPlay };
    notify();
  };

  const addInstaPost = (post: InstaPost) => {
    soundEngine.playCameraSnap();
    globalState = {
      ...globalState,
      instaPosts: [post, ...globalState.instaPosts],
      stats: {
        ...globalState.stats,
        confidence: Math.min(100, globalState.stats.confidence + 5),
        glamRating: Math.min(100, globalState.stats.glamRating + 5),
      }
    };
    notify();
  };

  const toggleLikeInstaPost = (postId: string) => {
    soundEngine.playClick();
    globalState = {
      ...globalState,
      instaPosts: globalState.instaPosts.map(p => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return { ...p, isLiked, likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1) };
        }
        return p;
      })
    };
    notify();
  };

  const addInstaComment = (postId: string, comment: InstaComment) => {
    globalState = {
      ...globalState,
      instaPosts: globalState.instaPosts.map(p => {
        if (p.id === postId) {
          return { ...p, comments: [...p.comments, comment] };
        }
        return p;
      })
    };
    notify();
  };

  const toggleDailyRoutine = (key: keyof Omit<DailyRoutines, 'streakDays'>) => {
    const isChecking = !globalState.dailyRoutines[key];
    if (isChecking) {
      soundEngine.playSuccessChime();
    } else {
      soundEngine.playClick();
    }
    const updated = {
      ...globalState.dailyRoutines,
      [key]: isChecking,
    };
    const allDone = updated.hrtLogged && updated.waterLogged && updated.skincareLogged && updated.voiceWarmupLogged;
    if (allDone && isChecking) {
      soundEngine.playVictory();
      updated.streakDays += 1;
    }
    globalState = {
      ...globalState,
      dailyRoutines: updated,
      stats: {
        ...globalState.stats,
        dysphoria: isChecking ? Math.max(0, globalState.stats.dysphoria - 6) : globalState.stats.dysphoria,
        confidence: isChecking ? Math.min(100, globalState.stats.confidence + 4) : globalState.stats.confidence,
      }
    };
    notify();
  };

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    soundEngine.playClick();
    if (newSettings.sfxVolume !== undefined) soundEngine.setVolume(newSettings.sfxVolume);
    if (newSettings.ambientVolume !== undefined) soundEngine.setAmbientVolume(newSettings.ambientVolume);
    globalState = {
      ...globalState,
      settings: { ...globalState.settings, ...newSettings }
    };
    notify();
  };

  const updateCustomEve = (partial: Partial<CustomEveConfig>) => {
    globalState = {
      ...globalState,
      customEve: {
        ...globalState.customEve,
        ...partial,
      },
    };
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
      unlockedCGs: globalState.unlockedCGs,
      flags: globalState.flags,
      unlockedEndings: globalState.unlockedEndings,
      suitors: globalState.suitors,
      chatThreads: globalState.chatThreads,
      nestMessages: globalState.nestMessages,
      visitedScenes: globalState.visitedScenes,
      instaPosts: globalState.instaPosts,
      calendar: globalState.calendar,
      diaryEntries: globalState.diaryEntries,
      apartmentDecors: globalState.apartmentDecors,
      suitorRanks: globalState.suitorRanks,
      customEve: globalState.customEve,
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
        unlockedCGs: slot.unlockedCGs || globalState.unlockedCGs,
        flags: slot.flags || globalState.flags,
        unlockedEndings: slot.unlockedEndings || globalState.unlockedEndings,
        suitors: slot.suitors,
        chatThreads: slot.chatThreads || INITIAL_CHAT_THREADS,
        nestMessages: slot.nestMessages || INITIAL_NEST_MESSAGES,
        visitedScenes: slot.visitedScenes || ['prologue_start'],
        instaPosts: slot.instaPosts || INITIAL_INSTA_POSTS,
        dailyRoutines: slot.dailyRoutines || INITIAL_ROUTINES,
        calendar: slot.calendar || globalState.calendar,
        diaryEntries: slot.diaryEntries || globalState.diaryEntries,
        apartmentDecors: slot.apartmentDecors || globalState.apartmentDecors,
        suitorRanks: slot.suitorRanks || globalState.suitorRanks,
        customEve: slot.customEve || DEFAULT_CUSTOM_EVE,
      };
      notify();
      return true;
    } catch {
      return false;
    }
  };

  const advanceTime = (costEnergy: number = 20) => {
    const timeOrder: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'night'];
    const currentIdx = timeOrder.indexOf(globalState.calendar.timeOfDay);
    const newEnergy = Math.max(0, globalState.calendar.energy - costEnergy);

    if (currentIdx === timeOrder.length - 1) {
      advanceDay();
    } else {
      globalState = {
        ...globalState,
        calendar: {
          ...globalState.calendar,
          timeOfDay: timeOrder[currentIdx + 1],
          energy: newEnergy,
        },
      };
      notify();
    }
  };

  const advanceDay = () => {
    soundEngine.playSparkle();
    const nextDay = globalState.calendar.day + 1;
    const WEEKDAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const nextWeekday = WEEKDAYS[(nextDay - 1) % 7];
    const weathers: ('sunny' | 'rainy' | 'violet_twilight' | 'clear_starry')[] = ['sunny', 'rainy', 'violet_twilight', 'clear_starry'];
    const nextWeather = weathers[nextDay % weathers.length];

    const completedCount = [
      globalState.dailyRoutines.hrtLogged,
      globalState.dailyRoutines.waterLogged,
      globalState.dailyRoutines.skincareLogged,
      globalState.dailyRoutines.voiceWarmupLogged,
    ].filter(Boolean).length;

    const streakIncrement = completedCount >= 2 ? 1 : 0;
    const newStreak = globalState.dailyRoutines.streakDays + streakIncrement;

    const diary = createDaySummaryDiaryEntry(
      globalState.calendar.day,
      globalState.transitionEra,
      globalState.lastCompletedActivity || 'Reflecting at home',
      { confidence: completedCount * 3, dysphoria: -completedCount * 3 }
    );

    let nextEra = globalState.transitionEra;
    if (nextDay >= 91 && globalState.transitionEra < 4) nextEra = 4;
    else if (nextDay >= 61 && globalState.transitionEra < 3) nextEra = 3;
    else if (nextDay >= 31 && globalState.transitionEra < 2) nextEra = 2;

    globalState = {
      ...globalState,
      transitionEra: nextEra,
      calendar: {
        day: nextDay,
        dayOfWeek: nextWeekday,
        timeOfDay: 'morning',
        energy: 100,
        maxEnergy: 100,
        weather: nextWeather,
      },
      diaryEntries: [diary, ...globalState.diaryEntries],
      dailyRoutines: {
        hrtLogged: false,
        waterLogged: false,
        skincareLogged: false,
        voiceWarmupLogged: false,
        streakDays: newStreak,
      },
      lastCompletedActivity: null,
      viewMode: 'daily_summary',
    };
    notify();
  };

  const performCityActivity = (activity: CityActivity) => {
    soundEngine.playSparkle();
    const newCash = globalState.stats.cash + (activity.cashReward || 0) - (activity.cashCost || 0);
    const updatedStats = { ...globalState.stats, cash: Math.max(0, newCash) };

    if (activity.statEffects.confidence) updatedStats.confidence = Math.min(100, Math.max(0, updatedStats.confidence + activity.statEffects.confidence));
    if (activity.statEffects.dysphoria) updatedStats.dysphoria = Math.min(100, Math.max(0, updatedStats.dysphoria + activity.statEffects.dysphoria));
    if (activity.statEffects.comfortRating) updatedStats.comfortRating = Math.min(100, Math.max(0, updatedStats.comfortRating + activity.statEffects.comfortRating));
    if (activity.statEffects.glamRating) updatedStats.glamRating = Math.min(100, Math.max(0, updatedStats.glamRating + activity.statEffects.glamRating));
    if (activity.statEffects.voiceResonance) updatedStats.voiceResonance = Math.min(100, Math.max(0, updatedStats.voiceResonance + activity.statEffects.voiceResonance));

    const suitors = { ...globalState.suitors };
    if (activity.suitorAffection) {
      const suitorId = activity.suitorAffection.suitor;
      const cur = suitors[suitorId];
      if (cur) {
        suitors[suitorId] = {
          ...cur,
          affection: Math.min(100, cur.affection + activity.suitorAffection.amount),
          respect: Math.min(100, cur.respect + (activity.suitorAffection.respect || 10)),
        };
      }
    }

    const timeOrder: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'night'];
    const currentIdx = timeOrder.indexOf(globalState.calendar.timeOfDay);
    const nextTime = currentIdx < timeOrder.length - 1 ? timeOrder[currentIdx + 1] : 'night';

    globalState = {
      ...globalState,
      stats: updatedStats,
      suitors,
      lastCompletedActivity: activity.name,
      calendar: {
        ...globalState.calendar,
        energy: Math.max(0, globalState.calendar.energy - activity.energyCost),
        timeOfDay: nextTime,
      },
    };

    if (activity.scenarioId) {
      setScene(activity.scenarioId);
      setViewMode('novel');
    } else {
      notify();
    }
  };

  const addDiaryEntry = (entry: DiaryEntry) => {
    soundEngine.playSparkle();
    globalState = {
      ...globalState,
      diaryEntries: [entry, ...globalState.diaryEntries],
    };
    notify();
  };

  const unlockApartmentDecor = (decorId: string) => {
    soundEngine.playVictory();
    globalState = {
      ...globalState,
      apartmentDecors: globalState.apartmentDecors.map((d) =>
        d.id === decorId ? { ...d, unlocked: true } : d
      ),
    };
    notify();
  };

  const raiseSuitorRank = (suitorId: SuitorId) => {
    soundEngine.playVictory();
    const currentRank = globalState.suitorRanks[suitorId] || 1;
    const nextRank = Math.min(10, currentRank + 1);

    globalState = {
      ...globalState,
      suitorRanks: {
        ...globalState.suitorRanks,
        [suitorId]: nextRank,
      },
    };
    notify();
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

export const gameStoreActions = {
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
  updateCustomEve,
  resetGame,
  fastTravelToScene,
  toggleAutoPlay,
  addInstaPost,
  toggleLikeInstaPost,
  addInstaComment,
  toggleDailyRoutine,
  updateSettings,
  advanceTime,
  advanceDay,
  performCityActivity,
  addDiaryEntry,
  unlockApartmentDecor,
  raiseSuitorRank,
};

export function useGameStore() {
  const [state, setState] = useState<GameState>(globalState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    state,
    ...gameStoreActions,
  };
}

useGameStore.getState = () => ({
  state: globalState,
  ...gameStoreActions,
});
