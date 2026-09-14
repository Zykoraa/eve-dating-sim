import type { TransitionEra } from './game';

export type OutfitCategory = 'top' | 'bottom' | 'fullbody' | 'shoes' | 'hair' | 'makeup' | 'accessory';

export interface WardrobeItem {
  id: string;
  name: string;
  category: OutfitCategory;
  description: string;
  flavorText: string;
  minEra: TransitionEra;
  glamBonus: number;
  comfortBonus: number;
  dysphoriaShieldBonus: number;
  cost: number;
  unlocked: boolean;
  idealVenues: string[];
  icon: string;
  previewColor: string;
}

export interface EquippedOutfit {
  hair: string;
  makeup: string;
  top?: string;
  bottom?: string;
  fullbody?: string;
  shoes: string;
  accessory?: string;
}
