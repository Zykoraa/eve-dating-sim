import type { SuitorId, TransitionEra } from './game';

export type CharacterExpression = 
  | 'neutral'
  | 'smile'
  | 'laugh'
  | 'blush'
  | 'nervous'
  | 'sad'
  | 'surprised'
  | 'fierce'
  | 'smirk'
  | 'eyeroll';

export type CharacterId = SuitorId | 'eve' | 'tara' | 'bea' | 'roxy' | 'dr_shaw';

export interface CharacterProfile {
  id: CharacterId;
  name: string;
  age: number;
  pronouns: string;
  tagline: string;
  occupation: string;
  bio: string;
  aesthetic: string;
  greenFlags: string[];
  redFlags: string[];
  idealDate: string;
  favoriteTopics: string[];
  themeColor: string;
  accentColor: string;
  avatarUrl: string;
  spriteUrl?: string;
  sleepwearSpriteUrl?: string;
}

export interface EveEraVisual {
  era: TransitionEra;
  title: string;
  subtitle: string;
  description: string;
  defaultHair: string;
  defaultMakeup: string;
  spriteUrl: string;
  perks: string[];
}

export interface CustomEveConfig {
  name: string;
  pronouns: string;
  skinTone: string;
  skinToneName: string;
  hairColor: string;
  hairColorName: string;
  hairStyle: string;
  eyeColor: string;
  eyeColorName: string;
  bodySilhouette: 'slender' | 'soft_curves' | 'curvy' | 'athletic';
  makeupStyle: string;
  lipColor: string;
  lipColorName: string;
  blushColor: string;
  blushColorName: string;
  showStubbleShadow: boolean;
  beautyMark: boolean;
  selectedOutfitId?: string;
  selectedSpriteUrl?: string;
  voiceFocus?: 'bright' | 'warm' | 'sultry';
  vibeArchetype?: 'romantic' | 'rebel' | 'dreamer' | 'siren';
  auraGlowColor?: string;
  previewEra?: TransitionEra;
}
