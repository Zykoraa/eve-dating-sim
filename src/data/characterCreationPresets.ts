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
};
