import type { EquippedOutfit } from './outfits';
import type { ChatThread, NestMessage } from './phone';

export type TransitionEra = 1 | 2 | 3 | 4;

export interface EveStats {
  confidence: number;      // 0 to 100: Influences dialogue assertiveness & romantic options
  dysphoria: number;       // 0 to 100: Vulnerability to misgendering/invasive remarks
  hrtMonth: number;        // Month 1 to 24+
  voiceResonance: number;  // 0 to 100: Pitch & resonance training level
  glamRating: number;      // 0 to 100: Presentation polish & high-femme aesthetics
  comfortRating: number;   // 0 to 100: Mental resilience & ease in current clothes
  cash: number;            // Money for outfits, makeup, and date activities
}

export type SuitorId = 'liam' | 'chloe' | 'julian' | 'maya' | 'marcus';

export interface SuitorAffection {
  id: SuitorId;
  name: string;
  affection: number;       // 0 to 100
  respect: number;         // 0 to 100: Crucial metric (especially vs chasers like Marcus)
  unlockedDates: number;
  status: 'locked' | 'matched' | 'dating' | 'partner' | 'rejected' | 'dumped';
  flags: Record<string, boolean>;
}

export type GameViewMode = 
  | 'novel' 
  | 'phone' 
  | 'vanity' 
  | 'minigame' 
  | 'gallery' 
  | 'flowchart'
  | 'settings' 
  | 'save_load' 
  | 'title';

export type MinigameType = 'boundary_clash' | 'vibe_check' | 'voice_tuner' | 'eyeliner' | 'mirror_monologue' | 'none';

export interface InstaComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

export interface InstaPost {
  id: string;
  author: string;
  authorHandle: string;
  avatar: string;
  photoUrl: string;
  caption: string;
  likes: number;
  isLiked?: boolean;
  time: string;
  comments: InstaComment[];
  era: TransitionEra;
}

export interface DailyRoutines {
  hrtLogged: boolean;
  waterLogged: boolean;
  skincareLogged: boolean;
  voiceWarmupLogged: boolean;
  streakDays: number;
}

export interface GameSettings {
  dyslexiaFont: boolean;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  contentIntensity: 'gentle' | 'standard' | 'authentic';
  autoAdvanceDelayMs: number;
  bgmVolume: number;
  sfxVolume: number;
}

export interface SaveSlot {
  id: number;
  title: string;
  timestamp: string;
  era: TransitionEra;
  hrtMonth: number;
  currentScenarioId?: string;
  currentSceneId: string;
  stats: EveStats;
  equippedOutfit: EquippedOutfit;
  unlockedOutfits?: string[];
  flags?: Record<string, boolean>;
  unlockedEndings?: string[];
  suitors: Record<SuitorId, SuitorAffection>;
  chatThreads?: ChatThread[];
  nestMessages?: NestMessage[];
  visitedScenes?: string[];
  instaPosts?: InstaPost[];
  dailyRoutines?: DailyRoutines;
}

