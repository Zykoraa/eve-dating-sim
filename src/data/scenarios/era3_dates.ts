import type { StoryScenario } from '../../types/story';

export const ERA3_SCENARIO: StoryScenario = {
  id: 'era3_dates',
  title: 'Chapter 3: Rainy Exhibitions & The Disclosure Dilemma',
  chapter: 'Era 3',
  era: 3,
  hrtMonth: 14,
  description: 'Month 14 of transition. Polished aesthetics, passing in everyday public life, and navigating romance and disclosure with Julian Chen.',
  initialSceneId: 'era3_julian_intro',
  nodes: {
    'era3_julian_intro': {
      id: 'era3_julian_intro',
      speaker: 'narrator',
      text: 'Rain taps gently against the glass atrium of the Contemporary Art & Design Museum. Julian Chen is waiting by a kinetic sculpture in an oversized charcoal cardigan, adjusting his round glasses with a shy, earnest smile.',
      background: '/assets/backgrounds/museum.png',
      nextSceneId: 'era3_julian_sees_eve',
    },
    'era3_julian_sees_eve': {
      id: 'era3_julian_sees_eve',
      speaker: 'julian',
      activeSuitor: 'julian',
      suitorExpression: 'blush',
      text: 'Eve... hello. Wow. You look... genuinely breathtaking in that camel coat. I almost didn’t recognize you from your profile—you carry yourself with so much grace.',
      background: '/assets/backgrounds/museum.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era3_eve_response',
    },
    'era3_eve_response': {
      id: 'era3_eve_response',
      speaker: 'eve',
      eveExpression: 'smile',
      activeSuitor: 'julian',
      text: 'Thank you Julian. You look very dashing yourself. Lead the way—show me your favorite exhibit.',
      background: '/assets/backgrounds/museum.png',
      nextSceneId: 'era3_exhibit_walk',
    },
    'era3_exhibit_walk': {
      id: 'era3_exhibit_walk',
      speaker: 'narrator',
      text: 'Julian leads you through an interactive exhibit exploring procedural generation and memory. He speaks with quiet, mesmerizing passion about how digital worlds can preserve moments of emotional truth.',
      background: '/assets/backgrounds/museum.png',
      nextSceneId: 'era3_disclosure_thought',
    },
    'era3_disclosure_thought': {
      id: 'era3_disclosure_thought',
      speaker: 'eve',
      eveExpression: 'nervous',
      activeSuitor: 'julian',
      text: '(Because my transition has progressed so far, people now simply assume I am a cis woman unless I tell them. I know Julian is kind, but the disclosure dilemma always tightens my chest. When is the right moment?)',
      background: '/assets/backgrounds/museum.png',
      choices: [
        {
          text: 'Be completely upfront and open: "Julian, I really value honesty. You know I’m a trans woman, right?"',
          tone: 'bold',
          statEffects: { confidence: 15, suitorRespect: { suitor: 'julian', amount: 25 } },
          nextSceneId: 'era3_julian_respect',
        },
        {
          text: 'Let the romantic connection unfold naturally first over warm tea.',
          tone: 'chill',
          statEffects: { comfortRating: 15, suitorAffection: { suitor: 'julian', amount: 15 } },
          nextSceneId: 'era3_rainy_tea',
        }
      ]
    },
    'era3_julian_respect': {
      id: 'era3_julian_respect',
      speaker: 'julian',
      activeSuitor: 'julian',
      suitorExpression: 'smile',
      text: 'Eve, of course I know. I read your bio before I ever swiped, but more importantly, I’m here because of who you are. Your humor, your mind, your kindness. That is what captivates me.',
      background: '/assets/backgrounds/museum.png',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'era3_hands_touch',
    },
    'era3_rainy_tea': {
      id: 'era3_rainy_tea',
      speaker: 'narrator',
      text: 'You sit together at the museum tearoom watching raindrops race down the glass. The warmth of your porcelain mug seeps into your fingers.',
      background: '/assets/backgrounds/museum.png',
      nextSceneId: 'era3_hands_touch',
    },
    'era3_hands_touch': {
      id: 'era3_hands_touch',
      speaker: 'narrator',
      text: 'Julian places a small handmade wooden USB drive on the table. "I programmed a small lofi sound generator game for you. Every time it rains, it plays chords that match the tempo of falling drops."',
      background: '/assets/backgrounds/museum.png',
      soundEffect: 'playSparkle',
      choices: [
        {
          text: 'Reach across the table and squeeze his hand: "Julian... that is the most romantic thing anyone has ever made for me."',
          tone: 'flirty',
          statEffects: { confidence: 15, suitorAffection: { suitor: 'julian', amount: 30 }, cash: 100 },
          nextSceneId: 'era3_observatory_dome',
        },
        {
          text: 'Give him a warm, tender smile as the rain outside calms: "Let’s listen to it right now."',
          tone: 'chill',
          statEffects: { comfortRating: 20, suitorAffection: { suitor: 'julian', amount: 20 }, cash: 100 },
          nextSceneId: 'era3_observatory_dome',
        }
      ]
    },
    'era3_observatory_dome': {
      id: 'era3_observatory_dome',
      speaker: 'narrator',
      text: 'Julian takes your hand and leads you up a spiraling marble staircase to the museum’s rooftop observatory dome. Below, the city glitters under misty rain like a sea of fallen stars.',
      background: '/assets/backgrounds/rooftop.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era3_observatory_talk',
    },
    'era3_observatory_talk': {
      id: 'era3_observatory_talk',
      speaker: 'julian',
      activeSuitor: 'julian',
      suitorExpression: 'smile',
      text: '“When I was younger, I spent so much time building virtual universes because reality felt cold and lonely. But standing here with you, Eve... reality is a million times more beautiful than anything I could ever code.”',
      background: '/assets/backgrounds/rooftop.png',
      choices: [
        {
          text: 'Step in close, rest your head against his shoulder, and watch the clouds part together.',
          tone: 'vulnerable',
          statEffects: { comfortRating: 25, suitorAffection: { suitor: 'julian', amount: 25 } },
          nextSceneId: 'era3_cozy_apartment_invite',
        },
        {
          text: 'Look into his eyes and whisper: “You don’t have to live in simulations anymore, Julian. I’m right here.”',
          tone: 'bold',
          statEffects: { confidence: 20, suitorAffection: { suitor: 'julian', amount: 35 } },
          nextSceneId: 'era3_cozy_apartment_invite',
        }
      ]
    },
    'era3_cozy_apartment_invite': {
      id: 'era3_cozy_apartment_invite',
      speaker: 'narrator',
      text: 'An hour later, you are in Julian’s warm kitchen, making fresh vegetable dumplings from scratch. Soft lo-fi piano music plays from a vintage speaker on the windowsill.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era3_dumpling_flour',
    },
    'era3_dumpling_flour': {
      id: 'era3_dumpling_flour',
      speaker: 'narrator',
      text: 'As you crimp the delicate edges of the dumpling wrappers, you accidentally brush your cheek with a flour-dusted hand. Julian bursts into quiet, affectionate laughter.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playSparkle',
      choices: [
        {
          text: 'Flick a tiny pinch of flour right back at his nose with a playful laugh!',
          tone: 'humorous',
          statEffects: { confidence: 15, suitorAffection: { suitor: 'julian', amount: 20 } },
          nextSceneId: 'era3_flour_fight',
        },
        {
          text: 'Tilt your chin up softly as Julian steps forward with a clean linen towel.',
          tone: 'flirty',
          statEffects: { confidence: 15, suitorAffection: { suitor: 'julian', amount: 25 } },
          nextSceneId: 'era3_tender_towel',
        }
      ]
    },
    'era3_flour_fight': {
      id: 'era3_flour_fight',
      speaker: 'eve',
      eveExpression: 'smile',
      text: 'Julian gasps as white flour dusts the bridge of his nose! He laughs so hard his glasses slip down. For the first time in years, you feel completely at ease—no armor, no dysphoria, just joyful love.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playVictory',
      nextSceneId: 'era3_tender_towel',
    },
    'era3_tender_towel': {
      id: 'era3_tender_towel',
      speaker: 'narrator',
      text: 'Julian’s hand is remarkably gentle as he dabs the flour from your cheek. His thumb lingers against your cheekbone for a heartbeat. His eyes are full of wonder and quiet devotion.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playHeartbeat',
      choices: [
        {
          text: '[Intimate 18+] Catch Julian’s wrist as his thumb lingers on your cheek, parting your lips softly: "Julian... stay the night. I want you closer than this."',
          tone: 'bold',
          minConfidence: 30,
          statEffects: { confidence: 25, suitorAffection: { suitor: 'julian', amount: 35 }, comfortRating: 20 },
          unlockCG: 'cg_julian_intimacy',
          nextSceneId: 'era3_julian_nsfw_counter_kiss',
        },
        {
          text: 'Lean into his gentle touch with a happy sigh, thanking him for the most heartwarming evening.',
          tone: 'vulnerable',
          statEffects: { confidence: 15, suitorAffection: { suitor: 'julian', amount: 20 } },
          nextSceneId: 'era3_advance_to_era4',
        }
      ]
    },
    'era3_julian_nsfw_counter_kiss': {
      id: 'era3_julian_nsfw_counter_kiss',
      speaker: 'julian',
      activeSuitor: 'julian',
      suitorExpression: 'blush',
      text: 'Julian’s breath catches. He drops the linen towel onto the counter, his hands cradling your jaw before pulling you into a hungry, passionate kiss. His hands slide down to your hips, lifting you effortlessly up onto the kitchen counter so your bodies are flush together.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'era3_julian_nsfw_bedroom',
    },
    'era3_julian_nsfw_bedroom': {
      id: 'era3_julian_nsfw_bedroom',
      speaker: 'narrator',
      text: 'Julian lifts you into his arms and carries you into the bedroom. Clothing slips away in an eager, tender blur. In the soft ambient glow of the room, Julian traces your body from collarbones to hips with reverent awe: “You are so breathtaking, Eve. Every single piece of you.”',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era3_julian_nsfw_sensual_touch',
    },
    'era3_julian_nsfw_sensual_touch': {
      id: 'era3_julian_nsfw_sensual_touch',
      speaker: 'julian',
      activeSuitor: 'julian',
      suitorExpression: 'blush',
      text: 'Julian kisses down your throat to the sensitive curves of your breasts, whispering soft inquiries to ensure you feel cherished and safe. His hands and mouth move between your thighs with tender intuition, honoring every new sensation that hormone therapy has awakened in you.',
      background: '/assets/backgrounds/eve_room.png',
      cgUrl: '/assets/cg/cg_julian_intimacy.png',
      isIntimate: true,
      lightingMood: 'starlight',
      soundEffect: 'playHeartbeat',
      choices: [
        {
          text: '[Sensory Harmony Minigame] Synchronize your rhythm and breathing with Julian in the intimate touch minigame.',
          tone: 'flirty',
          triggerMinigame: 'intimacy_touch',
          statEffects: { confidence: 25, suitorAffection: { suitor: 'julian', amount: 30 } },
          nextSceneId: 'era3_julian_nsfw_climax',
        },
        {
          text: 'Entwine your fingers tightly with his, whispering how safe and desired he makes you feel.',
          tone: 'vulnerable',
          statEffects: { comfortRating: 20, suitorAffection: { suitor: 'julian', amount: 25 } },
          nextSceneId: 'era3_julian_nsfw_climax',
        }
      ]
    },
    'era3_julian_nsfw_climax': {
      id: 'era3_julian_nsfw_climax',
      speaker: 'eve',
      eveExpression: 'blush',
      text: 'I arch into the mattress with a ragged gasp as wave after wave of full-body euphoria crashes through me. Julian moves with deep, steady adoration, his fingers tightly entwined with mine as we peak together in breathless ecstasy, collapsing onto each other’s chests.',
      background: '/assets/backgrounds/eve_room.png',
      cgUrl: '/assets/cg/cg_julian_intimacy.png',
      isIntimate: true,
      lightingMood: 'starlight',
      soundEffect: 'playVictory',
      nextSceneId: 'era3_julian_nsfw_morning',
    },
    'era3_julian_nsfw_morning': {
      id: 'era3_julian_nsfw_morning',
      speaker: 'julian',
      activeSuitor: 'julian',
      suitorExpression: 'smile',
      text: 'Morning light streams across the tangled sheets. Julian sits on the edge of the bed holding two steaming mugs of pour-over coffee, kissing your bare shoulder. “Good morning, my love. Every universe where I get to wake up next to you is the best one.”',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era3_advance_to_era4',
    },
    'era3_advance_to_era4': {
      id: 'era3_advance_to_era4',
      speaker: 'narrator',
      text: 'Month 24 arrives. Two full years of hormones, resilience, laughter, tears, and unconditional growth. You stand before your mirror not as an awkward girl hoping for acceptance, but as an undeniable, radiant force of nature. Welcome to Era 4: Self-Actualized Eve!',
      background: '/assets/backgrounds/eve_room.png',
      advanceEra: 4,
      soundEffect: 'playVictory',
      nextSceneId: 'era4_climax_intro',
    }
  }
};
