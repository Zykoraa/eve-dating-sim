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

export interface CharacterProfile {
  id: SuitorId | 'eve' | 'tara';
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
