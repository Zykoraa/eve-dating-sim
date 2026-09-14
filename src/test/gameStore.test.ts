import { describe, it, expect } from 'vitest';
import { EVE_ERAS, CHARACTERS } from '../data/characters';
import { WARDROBE_ITEMS } from '../data/outfits';
import { DATING_APP_PROFILES } from '../data/datingProfiles';

describe('Game Data & Progression Integrity', () => {
  it('should define all 4 Transition Eras with perks and descriptions', () => {
    expect(EVE_ERAS[1]).toBeDefined();
    expect(EVE_ERAS[2]).toBeDefined();
    expect(EVE_ERAS[3]).toBeDefined();
    expect(EVE_ERAS[4]).toBeDefined();

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
    expect(store.state.visitedScenes).toContain('prologue_start');
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
});

