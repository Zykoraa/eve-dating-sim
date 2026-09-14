import type { EquippedOutfit } from '../types/outfits';
import type { TransitionEra } from '../types/game';

export interface EveOutfitVisualInfo {
  spriteUrl: string;
  themeAura: string;
  glowBorderColor: string;
  eveThought: string;
  styleTag: string;
}

export function getEveOutfitVisual(equipped: EquippedOutfit, era: TransitionEra): EveOutfitVisualInfo {
  // If fullbody dress or specific top is equipped:
  if (equipped.fullbody === 'era4_little_black_dress') {
    return {
      spriteUrl: '/assets/characters/eve_era4.png',
      themeAura: 'from-pink-500/30 via-rose-500/20 to-purple-500/30',
      glowBorderColor: '#ec4899',
      styleTag: 'High-Glam Silhouette',
      eveThought: '“I look in the mirror and catch my breath. I am the woman I used to dream about.”',
    };
  }

  if (equipped.top === 'era3_turtleneck_trench' || equipped.fullbody === 'era3_velvet_slip_dress') {
    return {
      spriteUrl: '/assets/characters/eve_era3.png',
      themeAura: 'from-amber-500/25 via-yellow-500/15 to-orange-500/20',
      glowBorderColor: '#f59e0b',
      styleTag: 'Tailored Camel & Elegance',
      eveThought: '“Sleek, statuesque, and polished. Strangers default to ‘miss’ before I even speak.”',
    };
  }

  if (equipped.top === 'era2_band_tee_leather' || equipped.bottom === 'era2_plaid_mini') {
    return {
      spriteUrl: '/assets/characters/eve_era2.png',
      themeAura: 'from-purple-600/30 via-violet-500/20 to-pink-600/25',
      glowBorderColor: '#8b5cf6',
      styleTag: 'Alt-Punk & Combat Boots',
      eveThought: '“Chloe would be proud. Sharp, fierce, and ready to kick a chaser through drywall.”',
    };
  }

  if (equipped.top === 'era1_thrift_cardigan') {
    return {
      spriteUrl: '/assets/characters/eve_era1.png',
      themeAura: 'from-pink-400/25 via-purple-300/15 to-indigo-400/20',
      glowBorderColor: '#c084fc',
      styleTag: 'Soft Lavender Cardigan',
      eveThought: '“Smells like vintage lavender and fresh cedar. Gentle, sweet, and comforting.”',
    };
  }

  if (equipped.top === 'era1_oversized_hoodie') {
    return {
      spriteUrl: '/assets/characters/eve_era1.png',
      themeAura: 'from-slate-600/30 via-slate-700/20 to-slate-800/30',
      glowBorderColor: '#64748b',
      styleTag: 'Dysphoria Armor Hoodie',
      eveThought: '“My trusty emotional forcefield. Zero body perception anxiety, pure cozy warmth.”',
    };
  }

  // Era default fallback
  const eraSprites: Record<TransitionEra, string> = {
    1: '/assets/characters/eve_era1.png',
    2: '/assets/characters/eve_era2.png',
    3: '/assets/characters/eve_era3.png',
    4: '/assets/characters/eve_era4.png',
  };

  return {
    spriteUrl: eraSprites[era] || '/assets/characters/eve_era1.png',
    themeAura: 'from-pink-500/20 via-purple-500/15 to-transparent',
    glowBorderColor: '#ec4899',
    styleTag: `Era ${era} Signature`,
    eveThought: '“Every day is a step closer to becoming fully myself.”',
  };
}
