import { describe, it, expect } from 'vitest';
import { EVE_ERAS, CHARACTERS } from '../data/characters';
import { WARDROBE_ITEMS } from '../data/outfits';
import { DATING_APP_PROFILES } from '../data/datingProfiles';

if (typeof globalThis.localStorage === 'undefined') {
  const store: Record<string, string> = {};
  globalThis.localStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, val: string) => { store[key] = val; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
    key: (idx: number) => Object.keys(store)[idx] || null,
    length: 0,
  } as any;
}

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

    // Test newly added authentic transparent visual novel sprites
    const visualSundress = getEveOutfitVisual({ hair: 'era2_wavy_bob', fullbody: 'era2_floral_sundress' }, 2);
    expect(visualSundress.spriteUrl).toContain('eve_outfit_sundress.png');
    expect(visualSundress.dominantVibe).toBe('sundress_soft');

    const visualSlipDress = getEveOutfitVisual({ hair: 'era3_long_layers', fullbody: 'era3_velvet_slip_dress' }, 3);
    expect(visualSlipDress.spriteUrl).toContain('eve_outfit_slipdress.png');
    expect(visualSlipDress.styleTag).toBe('Emerald Silk-Velvet Slip');

    const visualHoodie = getEveOutfitVisual({ hair: 'era1_messy_bangs', top: 'era1_oversized_hoodie' }, 1);
    expect(visualHoodie.spriteUrl).toContain('eve_outfit_hoodie.png');
    expect(visualHoodie.styleTag).toBe('Dysphoria Armor Hoodie');

    const visualVintage = getEveOutfitVisual({ hair: 'era1_messy_bangs', top: 'era1_thrift_cardigan', bottom: 'era1_mom_jeans' }, 1);
    expect(visualVintage.spriteUrl).toContain('eve_outfit_vintage.png');
    expect(visualVintage.styleTag).toBe('Vintage Lavender Thrifter');
  });

  it('should verify all 9 selectable Visual Novel outfit presets exist and have valid artwork paths', async () => {
    const { VISUAL_OUTFIT_PRESETS } = await import('../data/characterCreationPresets');
    expect(VISUAL_OUTFIT_PRESETS.length).toBe(9);

    const presetIds = VISUAL_OUTFIT_PRESETS.map((p) => p.id);
    expect(presetIds).toContain('outfit_era0_boymode');
    expect(presetIds).toContain('outfit_era1_thrift_sweater');
    expect(presetIds).toContain('outfit_era1_dysphoria_hoodie');
    expect(presetIds).toContain('outfit_era1_vintage_cardigan');
    expect(presetIds).toContain('outfit_era2_riot_grrrl');
    expect(presetIds).toContain('outfit_era2_daisy_sundress');
    expect(presetIds).toContain('outfit_era3_camel_trench');
    expect(presetIds).toContain('outfit_era3_velvet_slip');
    expect(presetIds).toContain('outfit_era4_little_black_dress');

    VISUAL_OUTFIT_PRESETS.forEach((preset) => {
      expect(preset.spriteUrl).toMatch(/^\/assets\/characters\/.+\.png$/);
      expect(preset.statBonuses.glam).toBeGreaterThanOrEqual(5);
      expect(preset.statBonuses.comfort).toBeGreaterThanOrEqual(20);
      expect(preset.statBonuses.shield).toBeGreaterThanOrEqual(15);
    });
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

  it('should verify Bea character profile, chat thread, and confrontation scenario', async () => {
    const { CHARACTERS } = await import('../data/characters');
    expect(CHARACTERS.bea).toBeDefined();
    expect(CHARACTERS.bea.name).toContain('Bea');
    expect(CHARACTERS.bea.redFlags.some((f: string) => f.includes('POLICE WEAPONIZER'))).toBe(true);
    expect(CHARACTERS.bea.spriteUrl).toBe('/assets/characters/bea.png');

    const { getDialogueNode, ALL_SCENARIOS } = await import('../data/scenarios/index');
    expect(ALL_SCENARIOS.bea_confrontation).toBeDefined();

    const beaAmbush = getDialogueNode('bea_ambush_start');
    expect(beaAmbush).toBeDefined();
    expect(beaAmbush?.text).toContain('bakery');

    const beaGunLie = getDialogueNode('eve_calls_out_gun_lie');
    expect(beaGunLie).toBeDefined();
    expect(beaGunLie?.text).toContain('gun');
    expect(beaGunLie?.text).toContain('crisis evaluation room');

    const { INITIAL_CHAT_THREADS } = await import('../data/datingProfiles');
    const beaThread = INITIAL_CHAT_THREADS.find(t => t.participantId === 'bea');
    expect(beaThread).toBeDefined();
    expect(beaThread?.messages.some(m => m.text.includes('police'))).toBe(true);
  });

  it('should verify character creation presets, customEve store state and persistence', async () => {
    const { 
      SKIN_TONE_OPTIONS, 
      HAIR_STYLE_OPTIONS, 
      HAIR_COLOR_OPTIONS, 
      EYE_COLOR_OPTIONS, 
      SILHOUETTE_OPTIONS, 
      DEFAULT_CUSTOM_EVE 
    } = await import('../data/characterCreationPresets');

    expect(SKIN_TONE_OPTIONS.length).toBeGreaterThanOrEqual(6);
    expect(HAIR_STYLE_OPTIONS.length).toBeGreaterThanOrEqual(6);
    expect(HAIR_COLOR_OPTIONS.length).toBeGreaterThanOrEqual(6);
    expect(EYE_COLOR_OPTIONS.length).toBeGreaterThanOrEqual(6);
    expect(SILHOUETTE_OPTIONS.length).toBe(4);

    const { useGameStore } = await import('../state/useGameStore');
    const store = useGameStore.getState();

    expect(store.state.customEve).toBeDefined();
    expect(store.state.customEve.name).toBe('Eve');
    expect(store.state.customEve.skinTone).toBe(DEFAULT_CUSTOM_EVE.skinTone);

    // Test updating custom Eve
    store.updateCustomEve({
      name: 'Evelyn',
      hairColor: '#f472b6',
      hairColorName: 'Cotton Candy Pink',
      hairStyle: 'era3_long_layers',
      bodySilhouette: 'curvy',
    });

    const updated = useGameStore.getState().state.customEve;
    expect(updated.name).toBe('Evelyn');
    expect(updated.hairColor).toBe('#f472b6');
    expect(updated.hairStyle).toBe('era3_long_layers');
    expect(updated.bodySilhouette).toBe('curvy');

    // Test Save / Load persistence with customEve
    store.saveGame(3, 'Custom Eve Test Save');
    const savedData = localStorage.getItem('eve_save_slot_3');
    expect(savedData).toBeDefined();
    const parsed = JSON.parse(savedData!);
    expect(parsed.customEve).toBeDefined();
    expect(parsed.customEve.name).toBe('Evelyn');

    // Reset and Load
    store.resetGame();
    expect(useGameStore.getState().state.customEve.name).toBe('Eve');
    store.loadGame(3);
    expect(useGameStore.getState().state.customEve.name).toBe('Evelyn');
  });

  it('should verify Era 0 12-hour hospital crisis hold nodes and discharge clearance', async () => {
    const { getDialogueNode } = await import('../data/scenarios/index');

    const detentionNode = getDialogueNode('era0_police_detention');
    expect(detentionNode).toBeDefined();
    expect(detentionNode?.text).toContain('protective custody');
    expect(detentionNode?.text).toContain('involuntary psychiatric evaluation');

    const crisisRoomNode = getDialogueNode('era0_crisis_room_ordeal');
    expect(crisisRoomNode).toBeDefined();
    expect(crisisRoomNode?.text).toContain('Hospital Crisis Evaluation Unit');
    expect(crisisRoomNode?.text).toContain('paper scrubs');

    const hoursPassNode = getDialogueNode('era0_crisis_hours_pass');
    expect(hoursPassNode).toBeDefined();
    expect(hoursPassNode?.text).toContain('Twelve hours');

    const psychClearanceNode = getDialogueNode('era0_psych_evaluation_clearance');
    expect(psychClearanceNode).toBeDefined();
    expect(psychClearanceNode?.text).toContain('Dr. Vance');
    expect(psychClearanceNode?.text).toContain('passed every mental status examination');
    expect(psychClearanceNode?.text).toContain('weaponized emergency services');

    const evictionNode = getDialogueNode('era0_eve_evicts_bea');
    expect(evictionNode).toBeDefined();
    expect(evictionNode?.choices?.[0].text).toContain('hospital crisis room for 12 hours');
  });

  it('should verify date intimacy branching paths for Liam, Chloe, Julian, Heart Events, and City activity', async () => {
    const { getDialogueNode } = await import('../data/scenarios/index');
    const { CITY_ACTIVITIES } = await import('../data/activities');

    // Liam date intimacy
    const liamFarewell = getDialogueNode('era1_fountain_farewell');
    expect(liamFarewell?.choices?.some(c => c.text.includes('18+') && c.nextSceneId === 'era1_liam_nsfw_walk')).toBe(true);
    const liamWalk = getDialogueNode('era1_liam_nsfw_walk');
    expect(liamWalk).toBeDefined();
    const liamBedroom = getDialogueNode('era1_liam_nsfw_bedroom');
    expect(liamBedroom).toBeDefined();
    const liamClimax = getDialogueNode('era1_liam_nsfw_climax');
    expect(liamClimax).toBeDefined();

    // Chloe date intimacy
    const chloeKiss = getDialogueNode('era2_loft_kiss');
    expect(chloeKiss?.choices?.some(c => c.text.includes('18+') && c.nextSceneId === 'era2_chloe_nsfw_bedroom')).toBe(true);
    const chloeBedroom = getDialogueNode('era2_chloe_nsfw_bedroom');
    expect(chloeBedroom).toBeDefined();
    const chloeTouch = getDialogueNode('era2_chloe_nsfw_touch');
    expect(chloeTouch).toBeDefined();
    expect(chloeTouch?.text).toContain('trans women');

    // Julian date intimacy
    const julianTowel = getDialogueNode('era3_tender_towel');
    expect(julianTowel?.choices?.some(c => c.text.includes('18+') && c.nextSceneId === 'era3_julian_nsfw_counter_kiss')).toBe(true);
    const julianCounter = getDialogueNode('era3_julian_nsfw_counter_kiss');
    expect(julianCounter).toBeDefined();
    const julianMorning = getDialogueNode('era3_julian_nsfw_morning');
    expect(julianMorning).toBeDefined();

    // Heart Events Rank 6 intimacy
    const liamRank6End = getDialogueNode('liam_rank6_end');
    expect(liamRank6End?.choices?.some(c => c.text.includes('18+'))).toBe(true);
    const liamCottage = getDialogueNode('liam_rank6_nsfw_cottage');
    expect(liamCottage).toBeDefined();

    const chloeRank6End = getDialogueNode('chloe_rank6_end');
    expect(chloeRank6End?.choices?.some(c => c.text.includes('18+'))).toBe(true);
    const chloeBackstage = getDialogueNode('chloe_rank6_nsfw_backstage');
    expect(chloeBackstage).toBeDefined();

    const julianRank6End = getDialogueNode('julian_rank6_end');
    expect(julianRank6End?.choices?.some(c => c.text.includes('18+'))).toBe(true);
    const julianDome = getDialogueNode('julian_rank6_nsfw_dome');
    expect(julianDome).toBeDefined();

    // City after-dark activity
    const afterDarkAct = CITY_ACTIVITIES.find(a => a.id === 'hangout_after_dark');
    expect(afterDarkAct).toBeDefined();
    expect(afterDarkAct?.scenarioId).toBe('nsfw_hub');
  });

  it('should verify new characters (Jesse, Roxie, Dr. Shaw) and dating/chat integration', async () => {
    const { CHARACTERS } = await import('../data/characters');
    const { DATING_APP_PROFILES, INITIAL_CHAT_THREADS } = await import('../data/datingProfiles');
    const { useGameStore } = await import('../state/useGameStore');

    // Characters definition
    expect(CHARACTERS.jesse).toBeDefined();
    expect(CHARACTERS.jesse.name).toBe('Jesse Nolan');
    expect(CHARACTERS.jesse.pronouns).toBe('They/He');
    expect(CHARACTERS.jesse.spriteUrl).toContain('jesse.png');

    expect(CHARACTERS.roxy).toBeDefined();
    expect(CHARACTERS.roxy.name).toBe('Roxie (Roxanne) Cruz');
    expect(CHARACTERS.roxy.spriteUrl).toContain('roxy.png');

    expect(CHARACTERS.dr_shaw).toBeDefined();
    expect(CHARACTERS.dr_shaw.name).toBe('Dr. Evelyn Shaw, MD');
    expect(CHARACTERS.dr_shaw.spriteUrl).toContain('dr_shaw.png');

    // Dating app & chat
    const jesseDating = DATING_APP_PROFILES.find(p => p.suitorId === 'jesse');
    expect(jesseDating).toBeDefined();
    expect(jesseDating?.bio).toContain('Chrome & Thorn');

    const jesseChat = INITIAL_CHAT_THREADS.find(t => t.id === 'jesse');
    expect(jesseChat).toBeDefined();
    expect(jesseChat?.participantName).toContain('Jesse Nolan');

    const roxyChat = INITIAL_CHAT_THREADS.find(t => t.id === 'roxy');
    expect(roxyChat).toBeDefined();

    const shawChat = INITIAL_CHAT_THREADS.find(t => t.id === 'dr_shaw');
    expect(shawChat).toBeDefined();

    // Game state suitors
    const state = useGameStore.getState().state;
    expect(state.suitors.jesse).toBeDefined();
    expect(state.suitorRanks.jesse).toBe(1);
  });

  it('should verify all 5 new scenarios and their dialogue node flows', async () => {
    const { ALL_SCENARIOS, getDialogueNode } = await import('../data/scenarios/index');

    // 1. era0_family_dinner
    expect(ALL_SCENARIOS.era0_family_dinner).toBeDefined();
    const familyStart = getDialogueNode('era0_family_dinner_start');
    expect(familyStart).toBeDefined();
    const familyDecision = getDialogueNode('era0_family_eve_decision');
    expect(familyDecision?.choices?.[0].text).toContain('My name is Eve, and I am a woman');

    // 2. era1_bea_aftermath
    expect(ALL_SCENARIOS.era1_bea_aftermath).toBeDefined();
    const crisisFlashback = getDialogueNode('era1_bea_crisis_flashback');
    expect(crisisFlashback?.text).toContain('handcuffs');
    const doctorRelease = getDialogueNode('era1_bea_doctor_release');
    expect(doctorRelease?.speaker).toBe('dr_shaw');
    const darvoSpeech = getDialogueNode('era1_bea_darvo_speech');
    expect(darvoSpeech?.speaker).toBe('bea');

    // 3. era1_first_swimsuit
    expect(ALL_SCENARIOS.era1_first_swimsuit).toBeDefined();
    const swimsuitStart = getDialogueNode('era1_swimsuit_start');
    expect(swimsuitStart?.background).toContain('boardwalk.png');
    const swimsuitSpeech = getDialogueNode('era1_swimsuit_tara_speech');
    expect(swimsuitSpeech?.choices?.[0].text).toContain('not hiding anymore');

    // 4. era2_cabaret_and_ink
    expect(ALL_SCENARIOS.era2_cabaret_and_ink).toBeDefined();
    const cabaretIntro = getDialogueNode('era2_cabaret_intro');
    expect(cabaretIntro?.background).toContain('cabaret.png');
    const tattooBranch = getDialogueNode('era2_jesse_intro_branch');
    expect(tattooBranch?.background).toContain('tattoo_shop.png');
    const tattooNode = getDialogueNode('era2_jesse_tattoo');
    expect(tattooNode).toBeDefined();
    const overlookRide = getDialogueNode('era2_overlook_midnight_ride');
    expect(overlookRide?.background).toContain('overlook.png');

    // 5. era3_name_change
    expect(ALL_SCENARIOS.era3_name_change).toBeDefined();
    const courtSteps = getDialogueNode('era3_courthouse_steps');
    expect(courtSteps?.background).toContain('courthouse.png');
    const courtNode = getDialogueNode('era3_name_change_court');
    expect(courtNode).toBeDefined();
    const judgeCalls = getDialogueNode('era3_judge_calls_case');
    expect(judgeCalls?.text).toContain('legal change of name');
  });

  it('should verify Jesse adult romance route in nsfw_encounters', async () => {
    const { getDialogueNode } = await import('../data/scenarios/index');

    const hub = getDialogueNode('nsfw_hub');
    expect(hub?.choices?.some(c => c.text.includes('Jesse') && c.nextSceneId === 'nsfw_jesse_start')).toBe(true);

    const jesseStart = getDialogueNode('nsfw_jesse_start');
    expect(jesseStart).toBeDefined();
    expect(jesseStart?.speaker).toBe('jesse');

    const jesseKiss = getDialogueNode('nsfw_jesse_kiss');
    expect(jesseKiss?.choices?.length).toBeGreaterThanOrEqual(2);

    const jesseTouch = getDialogueNode('nsfw_jesse_touch');
    expect(jesseTouch?.text).toContain('violet butterfly');

    const jesseBed = getDialogueNode('nsfw_jesse_bed');
    expect(jesseBed?.text).toContain('Every single curve of you');

    const jesseClimax = getDialogueNode('nsfw_jesse_climax');
    expect(jesseClimax).toBeDefined();

    const jesseAftercare = getDialogueNode('nsfw_jesse_aftercare');
    expect(jesseAftercare?.choices?.some(c => c.nextSceneId === 'nsfw_return_home')).toBe(true);
  });

  it('should verify new city activities and execution flow', async () => {
    const { CITY_ACTIVITIES } = await import('../data/activities');
    const { useGameStore } = await import('../state/useGameStore');

    const jesseAct = CITY_ACTIVITIES.find(a => a.id === 'hangout_jesse_garage');
    expect(jesseAct).toBeDefined();
    expect(jesseAct?.scenarioId).toBe('era2_jesse_tattoo');

    const roxyAct = CITY_ACTIVITIES.find(a => a.id === 'hangout_roxy_cabaret');
    expect(roxyAct).toBeDefined();
    expect(roxyAct?.scenarioId).toBe('era2_cabaret_debut');

    const courtAct = CITY_ACTIVITIES.find(a => a.id === 'activity_courthouse_prep');
    expect(courtAct).toBeDefined();
    expect(courtAct?.scenarioId).toBe('era3_name_change_court');

    const pierAct = CITY_ACTIVITIES.find(a => a.id === 'hangout_boardwalk_sunset');
    expect(pierAct).toBeDefined();
    expect(pierAct?.scenarioId).toBe('era1_first_swimsuit');

    const spaAct = CITY_ACTIVITIES.find(a => a.id === 'wellness_spa_retreat');
    expect(spaAct).toBeDefined();

    const clinicAct = CITY_ACTIVITIES.find(a => a.id === 'wellness_clinic_visit');
    expect(clinicAct).toBeDefined();

    // Test executing an activity via store action
    const store = useGameStore.getState();
    const initialEnergy = store.state.calendar.energy;
    store.performCityActivity(spaAct!);

    const updatedState = useGameStore.getState().state;
    expect(updatedState.lastCompletedActivity).toBe(spaAct!.name);
    expect(updatedState.calendar.energy).toBe(initialEnergy - spaAct!.energyCost);
  });

  it('should verify CG gallery registry, visual intimacy encounters, and unlock mechanics', async () => {
    const { CG_GALLERY_ITEMS } = await import('../data/cgs');
    const { getDialogueNode } = await import('../data/scenarios/index');
    const { useGameStore } = await import('../state/useGameStore');

    // 1. Verify all 6 CG gallery items exist
    expect(CG_GALLERY_ITEMS.length).toBe(6);
    const cgIds = CG_GALLERY_ITEMS.map(c => c.id);
    expect(cgIds).toContain('cg_chloe_intimacy');
    expect(cgIds).toContain('cg_liam_intimacy');
    expect(cgIds).toContain('cg_julian_intimacy');
    expect(cgIds).toContain('cg_maya_intimacy');
    expect(cgIds).toContain('cg_jesse_intimacy');
    expect(cgIds).toContain('cg_eve_euphoria');

    // 2. Verify Chloe visual intimacy node
    const chloeBed = getDialogueNode('nsfw_chloe_bed');
    expect(chloeBed).toBeDefined();
    expect(chloeBed?.cgUrl).toBe('/assets/cg/cg_chloe_intimacy.png');
    expect(chloeBed?.isIntimate).toBe(true);
    expect(chloeBed?.lightingMood).toBe('neon');

    // 3. Verify Liam visual intimacy node
    const liamPassion = getDialogueNode('nsfw_liam_passion');
    expect(liamPassion).toBeDefined();
    expect(liamPassion?.cgUrl).toBe('/assets/cg/cg_liam_intimacy.png');
    expect(liamPassion?.isIntimate).toBe(true);
    expect(liamPassion?.lightingMood).toBe('warm_amber');

    // 4. Verify Julian visual intimacy node
    const julianBed = getDialogueNode('nsfw_julian_bed');
    expect(julianBed).toBeDefined();
    expect(julianBed?.cgUrl).toBe('/assets/cg/cg_julian_intimacy.png');
    expect(julianBed?.isIntimate).toBe(true);
    expect(julianBed?.lightingMood).toBe('starlight');

    // 5. Verify Maya visual intimacy node
    const mayaTouch = getDialogueNode('nsfw_maya_touch');
    expect(mayaTouch).toBeDefined();
    expect(mayaTouch?.cgUrl).toBe('/assets/cg/cg_maya_intimacy.png');
    expect(mayaTouch?.isIntimate).toBe(true);
    expect(mayaTouch?.lightingMood).toBe('candlelight');

    // 6. Verify Jesse visual intimacy node
    const jesseBedNode = getDialogueNode('nsfw_jesse_bed');
    expect(jesseBedNode).toBeDefined();
    expect(jesseBedNode?.cgUrl).toBe('/assets/cg/cg_jesse_intimacy.png');
    expect(jesseBedNode?.isIntimate).toBe(true);
    expect(jesseBedNode?.lightingMood).toBe('warm_amber');

    // 7. Verify Eve solo euphoria visual node
    const eveMirror = getDialogueNode('nsfw_eve_euphoria_mirror');
    expect(eveMirror).toBeDefined();
    expect(eveMirror?.cgUrl).toBe('/assets/cg/cg_eve_euphoria.png');
    expect(eveMirror?.isIntimate).toBe(true);
    expect(eveMirror?.lightingMood).toBe('rose_glow');

    // 8. Verify unlockCG store action
    const store = useGameStore.getState();
    store.unlockCG('cg_chloe_intimacy');
    expect(useGameStore.getState().state.unlockedCGs).toContain('cg_chloe_intimacy');

    // Check no duplicate unlocks
    store.unlockCG('cg_chloe_intimacy');
    const filtered = useGameStore.getState().state.unlockedCGs.filter(id => id === 'cg_chloe_intimacy');
    expect(filtered.length).toBe(1);

    // 9. Verify saveGame and loadGame retains unlockedCGs
    store.unlockCG('cg_liam_intimacy');
    store.saveGame(99, 'Test CG Slot');
    store.loadGame(99);
    expect(useGameStore.getState().state.unlockedCGs).toContain('cg_liam_intimacy');

    // 10. Verify intimacy_touch minigame choice integration
    const chloePassionNode = getDialogueNode('nsfw_chloe_passion');
    expect(chloePassionNode?.choices?.some(c => c.triggerMinigame === 'intimacy_touch')).toBe(true);

    store.triggerMinigame('intimacy_touch');
    expect(useGameStore.getState().state.activeMinigame).toBe('intimacy_touch');
    expect(useGameStore.getState().state.viewMode).toBe('minigame');
    store.triggerMinigame('none');
    expect(useGameStore.getState().state.activeMinigame).toBe('none');
  });

  it('should verify procedural ambient soundscapes and audio store methods', async () => {
    const { soundEngine } = await import('../state/useAudioStore');
    expect(soundEngine).toBeDefined();

    // Verify ambient type tracking
    soundEngine.playAmbient('rain');
    expect(soundEngine.getCurrentAmbient()).toBe('rain');

    soundEngine.playAmbient('fireplace');
    expect(soundEngine.getCurrentAmbient()).toBe('fireplace');

    soundEngine.playAmbient('vinyl');
    expect(soundEngine.getCurrentAmbient()).toBe('vinyl');

    soundEngine.playAmbient('city');
    expect(soundEngine.getCurrentAmbient()).toBe('city');

    soundEngine.setAmbientVolume(0.75);
    expect(soundEngine.getAmbientVolume()).toBe(0.75);

    soundEngine.stopAmbient();
    expect(soundEngine.getCurrentAmbient()).toBe('none');
  });

  it('should verify all 5 suitor keepsakes exist in APARTMENT_DECORS and are unlockable', async () => {
    const { APARTMENT_DECORS } = await import('../data/decorItems');
    const { useGameStore } = await import('../state/useGameStore');

    const liamOrchid = APARTMENT_DECORS.find(d => d.id === 'decor_orchid');
    const chloePick = APARTMENT_DECORS.find(d => d.id === 'decor_bass_pick');
    const julianCat = APARTMENT_DECORS.find(d => d.id === 'decor_cat_plush');
    const mayaMug = APARTMENT_DECORS.find(d => d.id === 'decor_ceramic_mug');
    const jesseWristband = APARTMENT_DECORS.find(d => d.id === 'decor_leather_wristband');

    expect(liamOrchid).toBeDefined();
    expect(liamOrchid?.giver).toBe('Liam Walker');

    expect(chloePick).toBeDefined();
    expect(chloePick?.giver).toBe('Chloe Vasquez');

    expect(julianCat).toBeDefined();
    expect(julianCat?.giver).toBe('Julian Chen');

    expect(mayaMug).toBeDefined();
    expect(mayaMug?.giver).toBe('Maya Lindqvist');

    expect(jesseWristband).toBeDefined();
    expect(jesseWristband?.giver).toBe('Jesse Nolan');

    // Test store action unlockApartmentDecor
    const store = useGameStore.getState();
    store.unlockApartmentDecor('decor_leather_wristband');
    const updated = useGameStore.getState().state.apartmentDecors.find(d => d.id === 'decor_leather_wristband');
    expect(updated?.unlocked).toBe(true);
  });

  it('should verify Apartment Sleepovers scenario data integrity and suitor branches', async () => {
    const { APARTMENT_SLEEPOVERS_SCENARIO } = await import('../data/scenarios/apartment_sleepovers');
    const { getDialogueNode } = await import('../data/scenarios');

    expect(APARTMENT_SLEEPOVERS_SCENARIO).toBeDefined();
    expect(APARTMENT_SLEEPOVERS_SCENARIO.id).toBe('apartment_sleepovers');

    // Verify all 5 suitor starting nodes exist and have ambient audio + mood lighting
    const liamNode = getDialogueNode('sleepover_liam_start', 'apartment_sleepovers');
    expect(liamNode).toBeDefined();
    expect(liamNode?.ambientSound).toBe('rain');
    expect(liamNode?.lightingMood).toBe('warm_amber');

    const chloeNode = getDialogueNode('sleepover_chloe_start', 'apartment_sleepovers');
    expect(chloeNode).toBeDefined();
    expect(chloeNode?.ambientSound).toBe('vinyl');

    const julianNode = getDialogueNode('sleepover_julian_start', 'apartment_sleepovers');
    expect(julianNode).toBeDefined();
    expect(julianNode?.ambientSound).toBe('city');

    const jesseNode = getDialogueNode('sleepover_jesse_start', 'apartment_sleepovers');
    expect(jesseNode).toBeDefined();
    expect(jesseNode?.ambientSound).toBe('fireplace');

    const mayaNode = getDialogueNode('sleepover_maya_start', 'apartment_sleepovers');
    expect(mayaNode).toBeDefined();
    expect(mayaNode?.ambientSound).toBe('vinyl');

    // Verify decor unlocks in gift nodes
    const liamGiftNode = getDialogueNode('sleepover_liam_gift_desc', 'apartment_sleepovers');
    expect(liamGiftNode?.unlockDecor).toBe('decor_orchid');

    const chloeGiftNode = getDialogueNode('sleepover_chloe_gift_desc', 'apartment_sleepovers');
    expect(chloeGiftNode?.unlockDecor).toBe('decor_bass_pick');

    const jesseGiftNode = getDialogueNode('sleepover_jesse_gift_desc', 'apartment_sleepovers');
    expect(jesseGiftNode?.unlockDecor).toBe('decor_leather_wristband');

    // Verify intimacy_touch minigame choice triggers
    const liamIntimacyNode = getDialogueNode('sleepover_liam_intimacy_prompt', 'apartment_sleepovers');
    expect(liamIntimacyNode?.choices?.some(c => c.triggerMinigame === 'intimacy_touch')).toBe(true);
  });

  it('should verify Trans Friendsgiving scenario integrity and chosen family toasts', async () => {
    const { FRIENDSGIVING_SCENARIO } = await import('../data/scenarios/friendsgiving');
    const { getDialogueNode } = await import('../data/scenarios');

    expect(FRIENDSGIVING_SCENARIO).toBeDefined();
    expect(FRIENDSGIVING_SCENARIO.id).toBe('friendsgiving');

    const startNode = getDialogueNode('friendsgiving_start', 'friendsgiving');
    expect(startNode).toBeDefined();
    expect(startNode?.ambientSound).toBe('vinyl');

    // Verify chosen family toast options
    const toastNode = getDialogueNode('friendsgiving_toast_prompt', 'friendsgiving');
    expect(toastNode).toBeDefined();
    expect(toastNode?.choices?.length).toBe(3);
    expect(toastNode?.choices?.some(c => c.setFlag?.key === 'friendsgiving_toast_resilience')).toBe(true);
    expect(toastNode?.choices?.some(c => c.setFlag?.key === 'friendsgiving_toast_family')).toBe(true);
    expect(toastNode?.choices?.some(c => c.setFlag?.key === 'friendsgiving_toast_joy')).toBe(true);

    // Verify polaroid wall decor unlock
    const polaroidNode = getDialogueNode('friendsgiving_polaroid_moment', 'friendsgiving');
    expect(polaroidNode?.unlockDecor).toBe('decor_polaroid_wall');
  });

  it('should verify Suitor Sleepwear Sprites and CharacterProfile configuration', async () => {
    const { CHARACTERS } = await import('../data/characters');

    expect(CHARACTERS.liam.sleepwearSpriteUrl).toBe('/assets/characters/liam_sleepwear.png');
    expect(CHARACTERS.chloe.sleepwearSpriteUrl).toBe('/assets/characters/chloe_sleepwear.png');
    expect(CHARACTERS.julian.sleepwearSpriteUrl).toBe('/assets/characters/julian_sleepwear.png');
    expect(CHARACTERS.jesse.sleepwearSpriteUrl).toBe('/assets/characters/jesse_sleepwear.png');
    expect(CHARACTERS.maya.sleepwearSpriteUrl).toBe('/assets/characters/maya_sleepwear.png');
  });

  it('should verify VoiceTunerMinigame trigger and state integration', async () => {
    const { useGameStore } = await import('../state/useGameStore');
    const store = useGameStore.getState();

    store.triggerMinigame('voice_tuner');
    expect(useGameStore.getState().state.activeMinigame).toBe('voice_tuner');
    expect(useGameStore.getState().state.viewMode).toBe('minigame');

    store.triggerMinigame('none');
    expect(useGameStore.getState().state.activeMinigame).toBe('none');
  });
});



