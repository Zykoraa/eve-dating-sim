import type { EquippedOutfit } from './outfits';
import type { ChatThread, NestMessage } from './phone';
import type { CustomEveConfig } from './character';

export type TransitionEra = 0 | 1 | 2 | 3 | 4;

export interface EveStats {
  confidence: number;      // 0 to 100: Influences dialogue assertiveness & romantic options
  dysphoria: number;       // 0 to 100: Vulnerability to misgendering/invasive remarks
  hrtMonth: number;        // Month 1 to 24+
  voiceResonance: number;  // 0 to 100: Pitch & resonance training level
  glamRating: number;      // 0 to 100: Presentation polish & high-femme aesthetics
  comfortRating: number;   // 0 to 100: Mental resilience & ease in current clothes
  cash: number;            // Money for outfits, makeup, and date activities
}

export type SuitorId = 'liam' | 'chloe' | 'julian' | 'maya' | 'marcus' | 'jesse';

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
  | 'creator'
  | 'minigame' 
  | 'gallery' 
  | 'flowchart'
  | 'settings' 
  | 'save_load' 
  | 'title'
  | 'city_hub'
  | 'apartment'
  | 'diary'
  | 'daily_summary';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface CalendarState {
  day: number;              // 1 to 120
  dayOfWeek: DayOfWeek;
  timeOfDay: TimeOfDay;
  energy: number;           // 0 to 100
  maxEnergy: number;
  weather: 'sunny' | 'rainy' | 'violet_twilight' | 'clear_starry';
}

export interface DiaryEntry {
  id: string;
  day: number;
  era: TransitionEra;
  title: string;
  content: string;
  mood: 'euphoric' | 'tender' | 'vulnerable' | 'determined' | 'peaceful';
  dateStr: string;
  photoUrl?: string;
  sticker?: string;
}

export interface ApartmentDecorItem {
  id: string;
  name: string;
  category: 'plant' | 'music' | 'tech' | 'art' | 'cozy';
  giver: string;
  description: string;
  statPerk: string;
  icon: string;
  unlocked: boolean;
}

export interface CityActivity {
  id: string;
  name: string;
  category: 'job' | 'training' | 'wellness' | 'hangout' | 'shopping';
  location: string;
  description: string;
  energyCost: number;
  cashReward?: number;
  cashCost?: number;
  statEffects: Partial<EveStats>;
  suitorAffection?: { suitor: SuitorId; amount: number; respect?: number };
  icon: string;
  unlockedEras: TransitionEra[];
  timeAvailability: TimeOfDay[];
  scenarioId?: string;
}

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
  adultContentEnabled: boolean;
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
  calendar?: CalendarState;
  diaryEntries?: DiaryEntry[];
  apartmentDecors?: ApartmentDecorItem[];
  suitorRanks?: Record<SuitorId, number>;
  customEve?: CustomEveConfig;
}

