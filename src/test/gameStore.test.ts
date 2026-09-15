import { describe, it, expect } from 'vitest';
import { EVE_ERAS, CHARACTERS } from '../data/characters';
import { WARDROBE_ITEMS } from '../data/outfits';
import { DATING_APP_PROFILES } from '../data/datingProfiles';

describe('Game Data & Progression Integrity', () => {
  it('should define all Transition Eras (0 through 4) with perks and descriptions', () => {
    expect(EVE_ERAS[0]).toBeDefined();
    expect(EVE_ERAS[1]).toBeDefined();
    expect(EVE_ERAS[2]).toBeDefined();
    expect(EVE_ERAS[3]).toBeDefined();
    expect(EVE_ERAS[4]).toBeDefined();

    expect(EVE_ERAS[0].title).toBe('The Closeted Chrysalis');
    expect(EVE_ERAS[1].title).toBe('The Awkward Egg');
    expect(EVE_ERAS[4].title).toBe('Radiant & Unapologetic');
  });

  it('should define all primary suitors and Eve profile', () => {
    expect(CHARACTERS.eve).toBeDefined();
    expect(CHARACTERS.liam).toBeDefined();
    expect(CHARACTERS.chloe).toBeDefined();
    expect(CHARACTERS.julian).toBeDefined();
    expect(CHARACTERS.maya).toBeDefined();
    expect(CHARACTERS.marcus).toBeDefined();
    expect(CHARACTERS.tara).toBeDefined();
  });

  it('should have wardrobe items across all categories and eras', () => {
    const categories = new Set(WARDROBE_ITEMS.map((item) => item.category));
    expect(categories.has('top')).toBe(true);
    expect(categories.has('bottom')).toBe(true);
    expect(categories.has('hair')).toBe(true);
    expect(categories.has('makeup')).toBe(true);
    expect(categories.has('shoes')).toBe(true);
    expect(categories.has('accessory')).toBe(true);
  });

  it('should include suitors and chaser profiles in dating app roster', () => {
    const liam = DATING_APP_PROFILES.find((p) => p.suitorId === 'liam');
    const chloe = DATING_APP_PROFILES.find((p) => p.suitorId === 'chloe');
    const marcus = DATING_APP_PROFILES.find((p) => p.suitorId === 'marcus');

    expect(liam).toBeDefined();
    expect(chloe).toBeDefined();
    expect(marcus).toBeDefined();
    expect(marcus?.isFakeOrChaser).toBe(true);
    expect(marcus?.redFlagsCount).toBeGreaterThanOrEqual(3);
  });

  it('should correctly map outfit visuals and reflections dynamically', async () => {
    const { getEveOutfitVisual } = await import('../utils/outfitVisuals');
    
    const visualEra0 = getEveOutfitVisual({ hair: 'era0_messy_mop', top: 'era0_navy_hoodie', makeup: 'era0_bare_face', shoes: 'era0_worn_skaters' }, 0);
    expect(visualEra0.spriteUrl).toContain('eve_era0.png');
    expect(visualEra0.styleTag).toBe('Closeted Boy-Mode Disguise');

    const visualEra1 = getEveOutfitVisual({ hair: 'era1_messy_bangs', top: 'era1_thrift_cardigan', makeup: '', shoes: '' }, 1);
    expect(visualEra1.spriteUrl).toContain('eve_era1.png');
    expect(visualEra1.eveThought).toBeDefined();

    const visualEra4 = getEveOutfitVisual({ hair: '', fullbody: 'era4_little_black_dress', makeup: '', shoes: '' }, 4);
    expect(visualEra4.spriteUrl).toContain('eve_era4.png');
    expect(visualEra4.styleTag).toBe('High-Glam Silhouette');
  });

  it('should generate context-aware compassionate responses when asking for support in The Nest', async () => {
    const { generateNestResponses } = await import('../utils/nestResponses');
    const result = generateNestResponses('Having a little dysphoria wave today, could use some hugs 🥺');
    
    expect(result.replies.length).toBeGreaterThanOrEqual(2);
    expect(result.replies[0].author).toContain('Riley');
    expect(result.replies[0].text).toContain('Dysphoria waves');
    expect(result.statsDiff.dysphoria).toBeLessThan(0);
    expect(result.statsDiff.comfortRating).toBeGreaterThan(0);
  });

  it('should verify Maya Lindqvist mentorship scenario is registered in era 2', async () => {
    const { getDialogueNode } = await import('../data/scenarios/index');
    const mayaScene = getDialogueNode('era2_maya_mentorship');
    expect(mayaScene).toBeDefined();
    expect(mayaScene?.text).toContain('Page & Petal');

    const mayaGreeting = getDialogueNode('era2_maya_greeting');
    expect(mayaGreeting).toBeDefined();
    expect(mayaGreeting?.speaker).toBe('maya');
    expect(mayaGreeting?.choices?.length).toBeGreaterThanOrEqual(2);
  });

  it('should support tracking visited scenes and daily wellness routines in gameStore', async () => {
    const { useGameStore } = await import('../state/useGameStore');
    const store = useGameStore.getState();

    // Verify initial state
    expect(store.state.visitedScenes).toContain('era0_start');
    expect(store.state.transitionEra).toBe(0);
    expect(store.state.stats.hrtMonth).toBe(0);
    expect(store.state.settings.adultContentEnabled).toBe(true);
    expect(store.state.dailyRoutines.streakDays).toBeGreaterThanOrEqual(1);

    // Toggle a routine
    store.toggleDailyRoutine('hrtLogged');
    expect(useGameStore.getState().state.dailyRoutines.hrtLogged).toBe(true);

    // Test settings update
    store.updateSettings({ dyslexiaFont: true, contentIntensity: 'authentic' });
    expect(useGameStore.getState().state.settings.dyslexiaFont).toBe(true);
    expect(useGameStore.getState().state.settings.contentIntensity).toBe('authentic');

    // Test fast travel to scene
    store.fastTravelToScene('era2_maya_mentorship');
    expect(useGameStore.getState().state.currentSceneId).toBe('era2_maya_mentorship');
    expect(useGameStore.getState().state.visitedScenes).toContain('era2_maya_mentorship');
    expect(useGameStore.getState().state.viewMode).toBe('novel');

    // Test InstaGlam post creation and interaction
    const initialPostsCount = useGameStore.getState().state.instaPosts.length;
    store.addInstaPost({
      id: 'test_post_1',
      author: 'Eve ✨',
      authorHandle: '@eve.blossoming',
      avatar: '/assets/characters/eve_avatar.png',
      photoUrl: '/assets/characters/eve_era2.png',
      caption: 'Testing post',
      likes: 10,
      isLiked: false,
      time: 'Just now',
      era: 2,
      comments: [],
    });
    expect(useGameStore.getState().state.instaPosts.length).toBe(initialPostsCount + 1);

    store.toggleLikeInstaPost('test_post_1');
    expect(useGameStore.getState().state.instaPosts[0].likes).toBe(11);
    expect(useGameStore.getState().state.instaPosts[0].isLiked).toBe(true);
  });

  it('should progress time, days, energy, and diary entries in the life sim calendar', async () => {
    const { useGameStore } = await import('../state/useGameStore');
    const { CITY_ACTIVITIES } = await import('../data/activities');
    const store = useGameStore.getState();

    // Verify initial calendar state
    const initialDay = store.state.calendar.day;
    expect(store.state.calendar.timeOfDay).toBe('morning');
    expect(store.state.calendar.energy).toBe(100);

    // Advance time slot
    store.advanceTime(25);
    expect(useGameStore.getState().state.calendar.timeOfDay).toBe('afternoon');
    expect(useGameStore.getState().state.calendar.energy).toBe(75);

    // Perform a city activity
    const baristaJob = CITY_ACTIVITIES.find(a => a.id === 'job_barista');
    expect(baristaJob).toBeDefined();

    const cashBefore = useGameStore.getState().state.stats.cash;
    store.performCityActivity(baristaJob!);
    expect(useGameStore.getState().state.stats.cash).toBe(cashBefore + baristaJob!.cashReward!);
    expect(useGameStore.getState().state.calendar.timeOfDay).toBe('evening');

    // Advance day (sleep)
    const initialDiaryCount = useGameStore.getState().state.diaryEntries.length;
    store.advanceDay();
    expect(useGameStore.getState().state.calendar.day).toBe(initialDay + 1);
    expect(useGameStore.getState().state.calendar.timeOfDay).toBe('morning');
    expect(useGameStore.getState().state.calendar.energy).toBe(100);
    expect(useGameStore.getState().state.diaryEntries.length).toBe(initialDiaryCount + 1);
    expect(useGameStore.getState().state.viewMode).toBe('daily_summary');

    // Test decor unlocking
    expect(useGameStore.getState().state.apartmentDecors.find(d => d.id === 'decor_orchid')?.unlocked).toBe(false);
    store.unlockApartmentDecor('decor_orchid');
    expect(useGameStore.getState().state.apartmentDecors.find(d => d.id === 'decor_orchid')?.unlocked).toBe(true);
  });

  it('should verify all suitor episodic heart event scenarios are registered', async () => {
    const { getDialogueNode } = await import('../data/scenarios/index');
    
    // Liam Heart Event
    const liamRank2 = getDialogueNode('liam_rank2_start');
    expect(liamRank2).toBeDefined();
    expect(liamRank2?.text).toContain('Verdant Glow Conservatory');

    // Chloe Heart Event
    const chloeRank2 = getDialogueNode('chloe_rank2_start');
    expect(chloeRank2).toBeDefined();
    expect(chloeRank2?.speaker).toBe('chloe');

    // Julian Heart Event
    const julianRank2 = getDialogueNode('julian_rank2_start');
    expect(julianRank2).toBeDefined();
    expect(julianRank2?.text).toContain('pixel art');
  });

  it('should verify Era 0 Coming Out scenario and 18+ Adult Encounters scenario', async () => {
    const { getDialogueNode, ALL_SCENARIOS } = await import('../data/scenarios/index');
    expect(ALL_SCENARIOS.era0_coming_out).toBeDefined();
    expect(ALL_SCENARIOS.nsfw_encounters).toBeDefined();

    const era0Start = getDialogueNode('era0_start');
    expect(era0Start).toBeDefined();
    expect(era0Start?.text).toContain('bathroom');

    const nsfwHub = getDialogueNode('nsfw_hub');
    expect(nsfwHub).toBeDefined();
    expect(nsfwHub?.choices?.length).toBeGreaterThanOrEqual(4);
  });
});


