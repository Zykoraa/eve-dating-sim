import type { EquippedOutfit, WardrobeItem } from '../types/outfits';
import type { TransitionEra, SuitorId } from '../types/game';
import { WARDROBE_ITEMS } from '../data/outfits';

export interface SuitorAffinityReaction {
  suitorId: SuitorId;
  name: string;
  reaction: string;
  bonus: number;
}

export interface EveOutfitVisualInfo {
  spriteUrl: string;
  themeAura: string;
  glowBorderColor: string;
  eveThought: string;
  styleTag: string;
  dominantVibe: 'cozy' | 'alt_punk' | 'tailored_chic' | 'high_glam' | 'sundress_soft';
  totalGlam: number;
  totalComfort: number;
  totalShield: number;
  equippedItems: {
    hair?: WardrobeItem;
    makeup?: WardrobeItem;
    top?: WardrobeItem;
    fullbody?: WardrobeItem;
    bottom?: WardrobeItem;
    shoes?: WardrobeItem;
    accessory?: WardrobeItem;
  };
  suitorReactions: SuitorAffinityReaction[];
}

export function getEveOutfitVisual(equipped: EquippedOutfit, era: TransitionEra): EveOutfitVisualInfo {
  const itemMap = new Map<string, WardrobeItem>();
  for (const item of WARDROBE_ITEMS) {
    itemMap.set(item.id, item);
  }

  const hairItem = equipped.hair ? itemMap.get(equipped.hair) : undefined;
  const makeupItem = equipped.makeup ? itemMap.get(equipped.makeup) : undefined;
  const topItem = equipped.top ? itemMap.get(equipped.top) : undefined;
  const fullbodyItem = equipped.fullbody ? itemMap.get(equipped.fullbody) : undefined;
  const bottomItem = equipped.bottom ? itemMap.get(equipped.bottom) : undefined;
  const shoesItem = equipped.shoes ? itemMap.get(equipped.shoes) : undefined;
  const accessoryItem = equipped.accessory ? itemMap.get(equipped.accessory) : undefined;

  const activeItems = [hairItem, makeupItem, fullbodyItem || topItem, bottomItem, shoesItem, accessoryItem].filter(Boolean) as WardrobeItem[];

  // Calculate live cumulative stat bonuses
  const totalGlam = activeItems.reduce((sum, i) => sum + i.glamBonus, 0);
  const totalComfort = activeItems.reduce((sum, i) => sum + i.comfortBonus, 0);
  const totalShield = activeItems.reduce((sum, i) => sum + i.dysphoriaShieldBonus, 0);

  // Determine dominant aesthetic score
  let era1Score = 0;
  let era2Score = 0;
  let era3Score = 0;
  let era4Score = 0;

  activeItems.forEach((i) => {
    if (i.minEra === 1) era1Score += 1;
    if (i.minEra === 2) era2Score += 2;
    if (i.minEra === 3) era3Score += 3;
    if (i.minEra === 4) era4Score += 4;
  });

  // Specific high-priority hero pieces
  const hasLBD = equipped.fullbody === 'era4_little_black_dress';
  const hasVelvet = equipped.fullbody === 'era3_velvet_slip_dress';
  const hasSundress = equipped.fullbody === 'era2_floral_sundress';
  const hasPunkLeather = equipped.top === 'era2_band_tee_leather' || equipped.bottom === 'era2_plaid_mini' || equipped.shoes === 'era2_combat_boots';
  const hasTrench = equipped.top === 'era3_turtleneck_trench';
  const hasHoodie = equipped.top === 'era1_oversized_hoodie';
  const hasCardigan = equipped.top === 'era1_thrift_cardigan';

  let spriteUrl = `/assets/characters/eve_era${era}.png`;
  let themeAura = 'from-pink-500/25 via-purple-500/15 to-transparent';
  let glowBorderColor = '#ec4899';
  let styleTag = `Era ${era} Signature`;
  let dominantVibe: EveOutfitVisualInfo['dominantVibe'] = 'cozy';
  let eveThought = '“Every single step in front of this mirror brings me closer to the woman I know I am.”';

  if (hasLBD || era4Score >= 6) {
    spriteUrl = '/assets/characters/eve_era4.png';
    themeAura = 'from-rose-500/35 via-pink-600/25 to-amber-500/30';
    glowBorderColor = '#f43f5e';
    styleTag = 'High-Glam Silhouette';
    dominantVibe = 'high_glam';
    eveThought = '“I look in the mirror and catch my breath. The silhouette is hypnotic, elegant, and completely mine.”';
  } else if (hasVelvet || hasTrench || era3Score >= 5) {
    spriteUrl = '/assets/characters/eve_era3.png';
    themeAura = 'from-amber-500/30 via-yellow-600/20 to-emerald-600/25';
    glowBorderColor = '#f59e0b';
    styleTag = 'Tailored Elegance & Grace';
    dominantVibe = 'tailored_chic';
    eveThought = '“Polished, confident, and magnetic. Strangers default to ‘miss’ before I even speak a word.”';
  } else if (hasSundress) {
    spriteUrl = '/assets/characters/eve_era2.png';
    themeAura = 'from-amber-400/30 via-emerald-400/20 to-teal-500/20';
    glowBorderColor = '#10b981';
    styleTag = 'Sun-Drenched Floral Glow';
    dominantVibe = 'sundress_soft';
    eveThought = '“The daisy fabric moves with the breeze. Soft, carefree, and radiating pure summertime euphoria.”';
  } else if (hasPunkLeather || era2Score >= 4) {
    spriteUrl = '/assets/characters/eve_era2.png';
    themeAura = 'from-purple-700/40 via-violet-600/25 to-pink-600/30';
    glowBorderColor = '#a855f7';
    styleTag = 'Alt-Punk Rebellion';
    dominantVibe = 'alt_punk';
    eveThought = '“Chloe would be so proud. Razor-sharp eyeliner, heavy boots, and zero tolerance for fools.”';
  } else if (hasCardigan) {
    spriteUrl = '/assets/characters/eve_era1.png';
    themeAura = 'from-purple-400/30 via-pink-300/20 to-indigo-400/25';
    glowBorderColor = '#c084fc';
    styleTag = 'Vintage Lavender Thrifter';
    dominantVibe = 'cozy';
    eveThought = '“Smells like vintage cedar and lavender tea. Gentle, sweet, and comforting on tender days.”';
  } else if (hasHoodie) {
    spriteUrl = '/assets/characters/eve_era1.png';
    themeAura = 'from-slate-700/40 via-slate-800/30 to-slate-900/40';
    glowBorderColor = '#64748b';
    styleTag = 'Dysphoria Armor Hoodie';
    dominantVibe = 'cozy';
    eveThought = '“My trusted emotional fortress. Zero perception anxiety, just warm plush cotton and safety.”';
  }

  // Calculate suitor reactions based on outfit
  const suitorReactions: SuitorAffinityReaction[] = [
    {
      suitorId: 'liam',
      name: 'Liam',
      reaction: hasSundress || hasCardigan 
        ? 'Liam’s eyes light up warmly: "That look is so genuine and cozy... you look breathtaking."' 
        : 'Liam smiles sweetly: "You always look wonderful, Eve."',
      bonus: (hasSundress || hasCardigan) ? 20 : 5,
    },
    {
      suitorId: 'chloe',
      name: 'Chloe',
      reaction: hasPunkLeather
        ? 'Chloe grins wide: "HELL yeah! You’re looking like a riot grrrl queen ready to kick over an amp!"'
        : 'Chloe nods approvingly: "Cute fit, Eve. Loving the vibe."',
      bonus: hasPunkLeather ? 25 : 8,
    },
    {
      suitorId: 'julian',
      name: 'Julian',
      reaction: hasVelvet || hasTrench || hasCardigan
        ? 'Julian blushes slightly: "The texture and colors are so thoughtful... you look like poetry in motion."'
        : 'Julian adjusts his glasses: "Very charming style choice, Eve."',
      bonus: (hasVelvet || hasTrench || hasCardigan) ? 20 : 6,
    },
    {
      suitorId: 'maya',
      name: 'Maya',
      reaction: hasLBD || hasVelvet || hasSundress
        ? 'Maya clasps her hands: "An absolute muse! The lines drape over you like classical marble sculpture!"'
        : 'Maya beams: "Radiant energy as always, my love."',
      bonus: (hasLBD || hasVelvet || hasSundress) ? 22 : 7,
    },
    {
      suitorId: 'marcus',
      name: 'Marcus',
      reaction: hasLBD
        ? 'Marcus smirks, scanning you up and down: "Damn, Eve. You belong in a penthouse lounge tonight."'
        : 'Marcus shrugs: "Not bad. Could be higher-end though."',
      bonus: hasLBD ? 20 : -5,
    }
  ];

  return {
    spriteUrl,
    themeAura,
    glowBorderColor,
    eveThought,
    styleTag,
    dominantVibe,
    totalGlam,
    totalComfort,
    totalShield,
    equippedItems: {
      hair: hairItem,
      makeup: makeupItem,
      top: topItem,
      fullbody: fullbodyItem,
      bottom: bottomItem,
      shoes: shoesItem,
      accessory: accessoryItem,
    },
    suitorReactions,
  };
}
