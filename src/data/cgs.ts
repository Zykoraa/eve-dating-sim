import type { SuitorId, TransitionEra } from '../types/game';

export interface CGDef {
  id: string;
  title: string;
  subtitle: string;
  suitorId?: SuitorId | 'eve';
  suitorName: string;
  quote: string;
  description: string;
  imageUrl: string;
  era: TransitionEra;
  category: 'intimacy' | 'milestone' | 'ending';
  lightingMood: 'candlelight' | 'neon' | 'starlight' | 'warm_amber' | 'rose_glow' | 'daylight';
  hint: string;
}

export const CG_GALLERY_ITEMS: CGDef[] = [
  {
    id: 'cg_chloe_intimacy',
    title: 'Velvet Riot & Neon Sheets',
    subtitle: 'Chloe Vasquez • T4T Passion & Intimacy (18+)',
    suitorId: 'chloe',
    suitorName: 'Chloe Vasquez',
    quote: '“I’m trans too, Eve. Every single inch of you is a woman, and I’m going to worship every piece of you tonight.”',
    description: 'An electric, tender after-hours encounter with Chloe in her loft under glowing neon magenta fairy lights after a riotous punk show.',
    imageUrl: '/assets/cg/cg_chloe_intimacy.png',
    era: 2,
    category: 'intimacy',
    lightingMood: 'neon',
    hint: 'Experience an after-hours rendezvous with Chloe in After-Dark or Chapter 2.',
  },
  {
    id: 'cg_liam_intimacy',
    title: 'Hearthside Blossom & Cedar Embers',
    subtitle: 'Liam Walker • Fireside Devotion & Intimacy (18+)',
    suitorId: 'liam',
    suitorName: 'Liam Walker',
    quote: '“Eve... you’re trembling. Let me hold you. There is nowhere else on earth I’d rather be than right here with you.”',
    description: 'Gentle, reverent romantic devotion by the fireplace at Liam’s rustic botanical cottage on a rainy autumn night.',
    imageUrl: '/assets/cg/cg_liam_intimacy.png',
    era: 1,
    category: 'intimacy',
    lightingMood: 'warm_amber',
    hint: 'Spend a rainy evening by the hearth at Liam’s cottage in After-Dark or Chapter 1.',
  },
  {
    id: 'cg_julian_intimacy',
    title: 'Twilight Starlight & Infinite Horizons',
    subtitle: 'Julian Chen • Electric Chemistry & Intimacy (18+)',
    suitorId: 'julian',
    suitorName: 'Julian Chen',
    quote: '“Every line of code, every game universe I ever built... none of it compares to holding you in my arms tonight.”',
    description: 'Sensual, breathless chemistry with Julian on his loft platform bed, bathed in soft cyan monitor glow and skyline starlight.',
    imageUrl: '/assets/cg/cg_julian_intimacy.png',
    era: 3,
    category: 'intimacy',
    lightingMood: 'starlight',
    hint: 'Stay late at Julian’s creative tech loft after co-op testing in After-Dark or Chapter 3.',
  },
  {
    id: 'cg_maya_intimacy',
    title: 'Candlelit Silk & Sapphic Adoration',
    subtitle: 'Maya Lindqvist • Velvet Adoration & Intimacy (18+)',
    suitorId: 'maya',
    suitorName: 'Maya Lindqvist',
    quote: '“Women are the only true divinity in this cold world, Eve. And you have fought so hard for your joy. Let me adore your temple.”',
    description: 'Luxurious, poetic romance with elder sister Maya in her candlelit art loft surrounded by burgundy silk and fragrant jasmine incense.',
    imageUrl: '/assets/cg/cg_maya_intimacy.png',
    era: 2,
    category: 'intimacy',
    lightingMood: 'candlelight',
    hint: 'Accept Maya’s after-hours invitation to her candlelit art loft in After-Dark.',
  },
  {
    id: 'cg_jesse_intimacy',
    title: 'Chrome & Thorn: Inked Collarbone & Highway Soul',
    subtitle: 'Jesse Nolan • Sacred Ink & Motorcycle Loft (18+)',
    suitorId: 'jesse',
    suitorName: 'Jesse Nolan',
    quote: '“Any time the world gets too loud or cruel, Eve... you ride straight here. You will always have a sanctuary with me.”',
    description: 'Passionate, deeply affirming lovemaking with Jesse in their brick-and-timber loft above the motorcycle garage.',
    imageUrl: '/assets/cg/cg_jesse_intimacy.png',
    era: 2,
    category: 'intimacy',
    lightingMood: 'warm_amber',
    hint: 'Ride Jesse’s motorcycle back to their workshop loft in After-Dark or Chapter 2.',
  },
  {
    id: 'cg_eve_euphoria',
    title: 'The Awakening: Mirror of Pure Euphoria',
    subtitle: 'Eve Herself • Body Neutrality & Self-Actualization',
    suitorId: 'eve',
    suitorName: 'Eve Herself',
    quote: '“For the first time in twenty-three years, my body does not feel like an alien vessel or a cage. It feels like home.”',
    description: 'Eve in her private bedroom at sunset, dressed in silk lingerie, celebrating her authentic curves and loving herself unconditionally.',
    imageUrl: '/assets/cg/cg_eve_euphoria.png',
    era: 1,
    category: 'milestone',
    lightingMood: 'rose_glow',
    hint: 'Complete the bedroom mirror dressing ritual or first swimsuit milestone.',
  },
];
