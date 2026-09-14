import type { DiaryEntry } from '../types/game';

export const INITIAL_DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: 'diary_day1',
    day: 1,
    era: 1,
    title: 'Stepping Through the Looking Glass',
    dateStr: 'Day 1 — Month 1 HRT',
    content: 'Took my very first dose of estradiol and spironolactone this morning. My hands were shaking so hard I dropped the water glass, but when I looked in the mirror, for the first time in 23 years, the person staring back didn’t feel like a ghost. She felt like someone waiting to be born. I don’t know what dating or the world has in store for me, but today, I chose myself.',
    mood: 'vulnerable',
    sticker: '🌸',
    photoUrl: '/assets/characters/eve_era1.png',
  },
  {
    id: 'diary_day7',
    day: 7,
    era: 1,
    title: 'The Winged Eyeliner Odyssey',
    dateStr: 'Day 7 — Month 1 HRT',
    content: 'Tara came over with three drugstore liquid eyeliners and forced me to sit under the ring light. It took seven attempts and half a pack of micellar wipes, but we got a clean flick. When I stepped back, my eyes looked soft, feline, and alive. I wore my oversized thrift hoodie to the corner bodega and the cashier said "Here you go, miss." I almost burst into tears in the snack aisle.',
    mood: 'euphoric',
    sticker: '✨',
  },
];

export function createDaySummaryDiaryEntry(
  day: number,
  era: 1 | 2 | 3 | 4,
  activityName: string,
  statsDelta: { confidence: number; dysphoria: number }
): DiaryEntry {
  const isHighConfidence = statsDelta.confidence > 10;
  const isDysphoriaDrop = statsDelta.dysphoria < -5;

  const mood = isHighConfidence && isDysphoriaDrop
    ? 'euphoric'
    : isDysphoriaDrop
    ? 'peaceful'
    : isHighConfidence
    ? 'determined'
    : 'tender';

  const reflections = [
    `Day ${day} in the books. Spent the day with "${activityName}". Taking transition one breath, one outfit, and one connection at a time. The world is loud, but I am finding my quiet strength.`,
    `Reflecting on Day ${day}. Transition isn’t a single finish line; it’s a million tiny choices to be gentle with yourself. Grateful for "${activityName}" and the peace it brought today.`,
    `Another milestone behind me. Month by month, the dysphoria fog is thinning out. Engaged in "${activityName}" today and felt truly present in my own skin.`,
  ];

  const pickedText = reflections[day % reflections.length];

  return {
    id: `diary_day_${day}_${Date.now()}`,
    day,
    era,
    title: `Day ${day} Reflections: ${activityName}`,
    dateStr: `Day ${day} — Era ${era}`,
    content: pickedText,
    mood,
    sticker: era === 1 ? '🌱' : era === 2 ? '🎸' : era === 3 ? '🌸' : '👑',
  };
}
