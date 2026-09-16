import type { CustomEveConfig } from '../types/character';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  undertone?: string;
}

export interface HairStyleOption {
  id: string;
  name: string;
  description: string;
  category: 'short' | 'medium' | 'long' | 'updo';
}

export interface SilhouetteOption {
  id: CustomEveConfig['bodySilhouette'];
  name: string;
  description: string;
}

export const SKIN_TONE_OPTIONS: ColorOption[] = [
  { id: 'porcelain', name: 'Porcelain Ivory', hex: '#fae0d4', undertone: 'cool' },
  { id: 'fair_peach', name: 'Fair Peach', hex: '#f7d5c5', undertone: 'warm' },
  { id: 'warm_beige', name: 'Warm Honey Beige', hex: '#eab897', undertone: 'warm' },
  { id: 'golden_olive', name: 'Golden Olive', hex: '#d59d74', undertone: 'olive' },
  { id: 'caramel_bronze', name: 'Caramel Bronze', hex: '#b8754b', undertone: 'warm' },
  { id: 'deep_chestnut', name: 'Deep Chestnut', hex: '#8c5332', undertone: 'neutral' },
  { id: 'rich_espresso', name: 'Rich Espresso', hex: '#523223', undertone: 'deep' },
];

export const HAIR_COLOR_OPTIONS: ColorOption[] = [
  { id: 'midnight_black', name: 'Midnight Raven', hex: '#18181b' },
  { id: 'espresso_brown', name: 'Dark Espresso', hex: '#382419' },
  { id: 'chestnut_brunette', name: 'Chestnut Brown', hex: '#633820' },
  { id: 'honey_blonde', name: 'Warm Honey Blonde', hex: '#d99b43' },
  { id: 'platinum_silk', name: 'Platinum Frost', hex: '#e2e8f0' },
  { id: 'pastel_pink', name: 'Cotton Candy Pink', hex: '#f472b6' },
  { id: 'lavender_frost', name: 'Lilac Dream', hex: '#c084fc' },
  { id: 'copper_sunset', name: 'Vibrant Copper Ginger', hex: '#c2410c' },
];

export const HAIR_STYLE_OPTIONS: HairStyleOption[] = [
  { id: 'era0_messy_mop', name: 'Unkempt Boy Shag', description: 'Overgrown, unstyled masculine cut from before coming out', category: 'short' },
  { id: 'era1_messy_bangs', name: 'Curtain Fringe Bangs', description: 'Freshly self-cut bangs that frame your forehead and cheekbones', category: 'medium' },
  { id: 'era2_wavy_bob', name: 'Textured Wavy Bob', description: 'Shoulder-length wavy cut with playful volume', category: 'medium' },
  { id: 'era3_long_layers', name: 'Glossy Layered Waves', description: 'Silk-conditioned waves cascading past your collarbones', category: 'long' },
  { id: 'era4_signature_waves', name: 'Siren Beach Waves', description: 'Voluminous red-carpet waves that turn heads everywhere', category: 'long' },
  { id: 'pixie_sidepart', name: 'Chic Side-Part Pixie', description: 'Edgy, stylish short cut that highlights your eyes and jawline', category: 'short' },
  { id: 'high_ponytail', name: 'Sleek High Ponytail', description: 'Snag-free high ponytail with cascading ponytail tail', category: 'updo' },
];

export const EYE_COLOR_OPTIONS: ColorOption[] = [
  { id: 'warm_hazel', name: 'Warm Hazel', hex: '#854d0e' },
  { id: 'deep_brown', name: 'Velvet Brown', hex: '#451a03' },
  { id: 'emerald_green', name: 'Emerald Forest', hex: '#059669' },
  { id: 'sapphire_blue', name: 'Sapphire Ocean', hex: '#2563eb' },
  { id: 'violet_amethyst', name: 'Amethyst Violet', hex: '#7c3aed' },
  { id: 'cool_slate', name: 'Stormy Slate', hex: '#475569' },
];

export const LIP_COLOR_OPTIONS: ColorOption[] = [
  { id: 'natural_rose', name: 'Natural Rose Tint', hex: '#f43f5e' },
  { id: 'berry_stain', name: 'Dark Berry Stain', hex: '#9f1239' },
  { id: 'nude_gloss', name: 'Dewy Nude Gloss', hex: '#fca5a5' },
  { id: 'velvet_ruby', name: 'Velvet Ruby Red', hex: '#be123c' },
  { id: 'peach_sorbet', name: 'Peach Coral Sorbet', hex: '#fb923c' },
];

export const BLUSH_COLOR_OPTIONS: ColorOption[] = [
  { id: 'soft_peach', name: 'Soft Peach Glow', hex: '#fb7185' },
  { id: 'rose_petal', name: 'Rose Petal Flush', hex: '#f43f5e' },
  { id: 'sun_kissed', name: 'Sun-Kissed Terracotta', hex: '#ea580c' },
  { id: 'berry_pop', name: 'Berry Plum Rush', hex: '#db2777' },
];

export const SILHOUETTE_OPTIONS: SilhouetteOption[] = [
  { id: 'slender', name: 'Slender & Lithe', description: 'Delicate shoulders, elongated limbs, subtle feminine waist' },
  { id: 'soft_curves', name: 'Soft Curves', description: 'Classic feminine balance with soft hips and gentle silhouette' },
  { id: 'curvy', name: 'Full Curves', description: 'Curvaceous hips, defined waist cinch, and feminine presence' },
  { id: 'athletic', name: 'Toned Athletic', description: 'Confident posture, toned shoulders, lithe athletic build' },
];

export const PRONOUN_OPTIONS = [
  'She/Her',
  'She/They',
  'They/Them',
  'Fae/Faer',
  'Custom',
];

export const DEFAULT_CUSTOM_EVE: CustomEveConfig = {
  name: 'Eve',
  pronouns: 'She/Her',
  skinTone: '#fae0d4',
  skinToneName: 'Porcelain Ivory',
  hairColor: '#382419',
  hairColorName: 'Dark Espresso',
  hairStyle: 'era0_messy_mop',
  eyeColor: '#854d0e',
  eyeColorName: 'Warm Hazel',
  bodySilhouette: 'soft_curves',
  makeupStyle: 'era0_bare_face',
  lipColor: '#f43f5e',
  lipColorName: 'Natural Rose',
  blushColor: '#fb7185',
  blushColorName: 'Soft Peach',
  showStubbleShadow: false,
  beautyMark: true,
  selectedOutfitId: 'outfit_era1_thrift_sweater',
  selectedSpriteUrl: '/assets/characters/eve_era1.png',
  voiceFocus: 'warm',
  vibeArchetype: 'romantic',
  auraGlowColor: '#ec4899',
};

export interface VisualOutfitOption {
  id: string;
  name: string;
  era: 0 | 1 | 2 | 3 | 4;
  spriteUrl: string;
  tagline: string;
  description: string;
  aesthetic: string;
  vibe: 'cozy' | 'alt_punk' | 'tailored_chic' | 'high_glam' | 'sundress_soft';
  defaultItems: {
    hair?: string;
    top?: string;
    bottom?: string;
    shoes?: string;
    fullbody?: string;
    makeup?: string;
    accessory?: string;
  };
  statBonuses: {
    glam: number;
    comfort: number;
    shield: number;
  };
  paletteColor: string;
}

export const VISUAL_OUTFIT_PRESETS: VisualOutfitOption[] = [
  {
    id: 'outfit_era0_boymode',
    name: 'Closeted Boy-Mode Disguise',
    era: 0,
    spriteUrl: '/assets/characters/eve_era0.png',
    tagline: 'The heavy armor you wore before you chose to live.',
    description: 'Shapeless navy hoodie, loose washed jeans, worn skater sneakers, and tired, hidden eyes.',
    aesthetic: 'Closeted & Protective',
    vibe: 'cozy',
    defaultItems: {
      hair: 'era0_messy_mop',
      top: 'era0_navy_hoodie',
      bottom: 'era0_loose_jeans',
      shoes: 'era0_worn_skaters',
      accessory: 'era0_headphones',
      makeup: 'era0_bare_face',
    },
    statBonuses: { glam: 5, comfort: 30, shield: 15 },
    paletteColor: '#475569',
  },
  {
    id: 'outfit_era1_thrift_sweater',
    name: 'First Steps: Ribbed Knit & Skirt',
    era: 1,
    spriteUrl: '/assets/characters/eve_era1.png',
    tagline: 'Your first tentative, beautiful feminine steps.',
    description: 'Oversized ribbed wool sweater, pleated skater skirt, dark tights, cute brown boots, and self-cut curtain bangs.',
    aesthetic: 'Awkward & Endearing',
    vibe: 'cozy',
    defaultItems: {
      hair: 'era1_messy_bangs',
      top: 'era1_thrift_cardigan',
      bottom: 'era1_pleated_skirt',
      shoes: 'era1_worn_sneakers',
      makeup: 'era1_first_eyeliner',
      accessory: 'era1_choker',
    },
    statBonuses: { glam: 25, comfort: 35, shield: 30 },
    paletteColor: '#a855f7',
  },
  {
    id: 'outfit_era1_dysphoria_hoodie',
    name: 'The "Dysphoria Armor" Hoodie',
    era: 1,
    spriteUrl: '/assets/characters/eve_outfit_hoodie.png',
    tagline: 'An emotional forcefield for tender days.',
    description: 'Immense charcoal fleece zip hoodie with sweater paws, black leggings, and cute brown boots.',
    aesthetic: 'Fortress of Comfort',
    vibe: 'cozy',
    defaultItems: {
      hair: 'era1_messy_bangs',
      top: 'era1_oversized_hoodie',
      bottom: 'era1_pleated_skirt',
      shoes: 'era1_worn_sneakers',
      makeup: 'era1_first_eyeliner',
    },
    statBonuses: { glam: 10, comfort: 50, shield: 50 },
    paletteColor: '#334155',
  },
  {
    id: 'outfit_era1_vintage_cardigan',
    name: 'Lavender Cardigan & Vintage Denim',
    era: 1,
    spriteUrl: '/assets/characters/eve_outfit_vintage.png',
    tagline: 'Wholesome thrift-market joy with Tara.',
    description: 'Soft lilac button-up knit cardigan over a white camisole, high-rise vintage light-wash jeans, and white retro sneakers.',
    aesthetic: 'Pastel Thrifter Chic',
    vibe: 'cozy',
    defaultItems: {
      hair: 'era1_messy_bangs',
      top: 'era1_thrift_cardigan',
      bottom: 'era1_mom_jeans',
      shoes: 'era1_worn_sneakers',
      makeup: 'era1_first_eyeliner',
    },
    statBonuses: { glam: 35, comfort: 40, shield: 35 },
    paletteColor: '#c084fc',
  },
  {
    id: 'outfit_era2_riot_grrrl',
    name: 'Riot Grrrl: Biker Leather & Tartan',
    era: 2,
    spriteUrl: '/assets/characters/eve_era2.png',
    tagline: 'Fearless T4T punk rock power with Chloe.',
    description: 'Cropped moto biker leather jacket, "Soundwave Rising" band tee, pleated red tartan mini, fishnets, combat boots, and star clips.',
    aesthetic: 'T4T Punk Rebellion',
    vibe: 'alt_punk',
    defaultItems: {
      hair: 'era2_wavy_bob',
      top: 'era2_band_tee_leather',
      bottom: 'era2_plaid_mini',
      shoes: 'era2_combat_boots',
      makeup: 'era2_bold_winged',
      accessory: 'era2_safety_pin_earrings',
    },
    statBonuses: { glam: 50, comfort: 25, shield: 35 },
    paletteColor: '#ef4444',
  },
  {
    id: 'outfit_era2_daisy_sundress',
    name: 'Daisy Meadow Floral Sundress',
    era: 2,
    spriteUrl: '/assets/characters/eve_outfit_sundress.png',
    tagline: 'Pure gender euphoria spinning in the summer breeze.',
    description: 'Sunny yellow daisy print sundress with sweetheart neckline, flutter sleeves, white canvas sneakers, and wavy brunette locks.',
    aesthetic: 'Sun-Drenched Bloom',
    vibe: 'sundress_soft',
    defaultItems: {
      hair: 'era2_wavy_bob',
      fullbody: 'era2_floral_sundress',
      shoes: 'era1_worn_sneakers',
      makeup: 'era3_soft_glam',
      accessory: 'era2_barrettes',
    },
    statBonuses: { glam: 55, comfort: 30, shield: 25 },
    paletteColor: '#eab308',
  },
  {
    id: 'outfit_era3_camel_trench',
    name: 'Architectural Chic: Camel Trench',
    era: 3,
    spriteUrl: '/assets/characters/eve_era3.png',
    tagline: 'Effortless, sophisticated metropolitan beauty.',
    description: 'Tailored wool camel coat over cream ribbed turtleneck, pressed charcoal trousers, polished boots, and flowing chestnut waves.',
    aesthetic: 'Tailored Quiet Luxury',
    vibe: 'tailored_chic',
    defaultItems: {
      hair: 'era3_long_layers',
      top: 'era3_turtleneck_trench',
      bottom: 'era3_tailored_trousers',
      shoes: 'era3_chelsea_boots',
      makeup: 'era3_soft_glam',
      accessory: 'era3_silk_scarf',
    },
    statBonuses: { glam: 65, comfort: 35, shield: 45 },
    paletteColor: '#d97706',
  },
  {
    id: 'outfit_era3_velvet_slip',
    name: 'Emerald Silk-Velvet Slip Dress',
    era: 3,
    spriteUrl: '/assets/characters/eve_outfit_slipdress.png',
    tagline: 'Candlelit romance and sensual confidence with Julian or Maya.',
    description: 'Jewel-tone emerald silk velvet cowl slip dress, delicate silver pendant, and strappy black evening heels.',
    aesthetic: 'Sapphic Romance & Silk',
    vibe: 'tailored_chic',
    defaultItems: {
      hair: 'era3_long_layers',
      fullbody: 'era3_velvet_slip_dress',
      shoes: 'era4_strappy_stilettos',
      makeup: 'era3_soft_glam',
      accessory: 'era4_pearl_choker',
    },
    statBonuses: { glam: 75, comfort: 30, shield: 40 },
    paletteColor: '#059669',
  },
  {
    id: 'outfit_era4_little_black_dress',
    name: 'The Sovereign Little Black Dress',
    era: 4,
    spriteUrl: '/assets/characters/eve_era4.png',
    tagline: 'Unapologetic, magnetic, fully self-actualized womanhood.',
    description: 'Sculpted black cocktail wrap dress with sweetheart neckline, stiletto heels, pearl drop earrings, and voluminous siren waves.',
    aesthetic: 'Radiant Self-Actualized',
    vibe: 'high_glam',
    defaultItems: {
      hair: 'era4_signature_waves',
      fullbody: 'era4_little_black_dress',
      shoes: 'era4_strappy_stilettos',
      makeup: 'era4_editorial_chic',
      accessory: 'era4_pearl_choker',
    },
    statBonuses: { glam: 90, comfort: 30, shield: 55 },
    paletteColor: '#f43f5e',
  },
];
