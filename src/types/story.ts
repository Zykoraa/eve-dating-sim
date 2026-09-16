import type { CharacterExpression } from './character';
import type { MinigameType, SuitorId, TransitionEra } from './game';

export type ChoiceTone = 'bold' | 'vulnerable' | 'humorous' | 'deflective' | 'chill' | 'flirty' | 'cautious';

export interface ChoiceOption {
  text: string;
  subtext?: string;
  tone?: ChoiceTone;
  minConfidence?: number;
  minEra?: TransitionEra;
  statEffects?: {
    confidence?: number;
    dysphoria?: number;
    cash?: number;
    glam?: number;
    voiceResonance?: number;
    comfortRating?: number;
    suitorAffection?: { suitor: SuitorId; amount: number };
    suitorRespect?: { suitor: SuitorId; amount: number };
  };
  setFlag?: { key: string; value: boolean };
  triggerMinigame?: MinigameType;
  openPhone?: boolean;
  openVanity?: boolean;
  advanceEra?: TransitionEra;
  unlockCG?: string;
  soundEffect?: string;
  nextSceneId: string;
}

export interface DialogueNode {
  id: string;
  speaker: 'eve' | 'narrator' | SuitorId | 'tara' | 'bea' | 'cop' | 'waiter' | 'stranger' | 'bouncer' | 'bartender' | 'parent' | 'friend' | string;
  speakerTitle?: string;
  text: string;
  eveExpression?: CharacterExpression;
  suitorExpression?: CharacterExpression;
  activeSuitor?: SuitorId | 'tara' | 'bea' | string;
  background: string;
  cgUrl?: string;
  isIntimate?: boolean;
  lightingMood?: 'candlelight' | 'neon' | 'starlight' | 'warm_amber' | 'rose_glow' | 'daylight';
  ambientSound?: string;
  soundEffect?: string;
  shakeScreen?: boolean;
  choices?: ChoiceOption[];
  advanceEra?: TransitionEra;
  setFlag?: { key: string; value: boolean };
  nextSceneId?: string;
}

export interface StoryScenario {
  id: string;
  title: string;
  chapter: string;
  era: TransitionEra;
  hrtMonth: number;
  description: string;
  initialSceneId: string;
  nodes: Record<string, DialogueNode>;
}
