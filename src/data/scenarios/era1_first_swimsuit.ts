import type { StoryScenario } from '../../types/story';

export const ERA1_FIRST_SWIMSUIT_SCENARIO: StoryScenario = {
  id: 'era1_first_swimsuit',
  title: 'Sunlight on Bare Skin: The Harborview Pier & The First Swimsuit',
  chapter: 'Harborview Waves',
  era: 1,
  hrtMonth: 4,
  description: 'Conquering one of transition’s most terrifying milestones: stepping onto the sunny coastal boardwalk in a feminine swimsuit and feeling the ocean breeze.',
  initialSceneId: 'era1_swimsuit_start',
  nodes: {
    'era1_first_swimsuit': {
      id: 'era1_first_swimsuit',
      speaker: 'narrator',
      text: 'The ocean wind carries the sharp tang of sea salt and warm sunscreen. Ahead stretches the long cedar boardwalk of Harborview Pier, glistening under the golden late-afternoon sun. Below, turquoise waves crash against weathered wooden pylons.',
      background: '/assets/backgrounds/boardwalk.png',
      eveExpression: 'nervous',
      nextSceneId: 'era1_swimsuit_eve_hesitation',
    },
    'era1_swimsuit_start': {
      id: 'era1_swimsuit_start',
      speaker: 'narrator',
      text: 'The ocean wind carries the sharp tang of sea salt and warm sunscreen. Ahead stretches the long cedar boardwalk of Harborview Pier, glistening under the golden late-afternoon sun. Below, turquoise waves crash against weathered wooden pylons.',
      background: '/assets/backgrounds/boardwalk.png',
      eveExpression: 'nervous',
      nextSceneId: 'era1_swimsuit_eve_hesitation',
    },
    'era1_swimsuit_eve_hesitation': {
      id: 'era1_swimsuit_eve_hesitation',
      speaker: 'eve',
      eveExpression: 'nervous',
      text: 'My fingers clench tightly around the linen edges of my sheer floral beach wrap. Beneath it, I’m wearing a high-waisted navy and white polka-dot one-piece. For months, I survived inside oversized hoodies. Stepping out into broad daylight with bare shoulders and bare legs feels like stepping onto a tightrope with no net.',
      background: '/assets/backgrounds/boardwalk.png',
      nextSceneId: 'era1_swimsuit_tara_encouragement',
    },
    'era1_swimsuit_tara_encouragement': {
      id: 'era1_swimsuit_tara_encouragement',
      speaker: 'tara',
      speakerTitle: 'Tara',
      activeSuitor: 'tara',
      text: 'Tara adjusts her oversized retro tortoiseshell sunglasses, taking a sip of frozen peach lemonade. She turns to you, her expression melting from playful to deeply tender.',
      background: '/assets/backgrounds/boardwalk.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era1_swimsuit_tara_speech',
    },
    'era1_swimsuit_tara_speech': {
      id: 'era1_swimsuit_tara_speech',
      speaker: 'tara',
      speakerTitle: 'Tara',
      activeSuitor: 'tara',
      text: '“Eve. Stop clutching that wrap like a shield. Look at the water. Look at the people having fun. You spent twenty-three years trapped in boy-mode armor. You didn’t fight for your life just to stay in the shade. Let the sun kiss your skin, girl.”',
      background: '/assets/backgrounds/boardwalk.png',
      choices: [
        {
          text: 'Slide the wrap off your shoulders onto the bench: “You’re right. I’m not hiding anymore.”',
          tone: 'bold',
          statEffects: { confidence: 25, dysphoria: -25, glam: 15 },
          soundEffect: 'playVictory',
          nextSceneId: 'era1_swimsuit_bold_reveal',
        },
        {
          text: '“My heart is beating in my throat, Tara... but I really want to feel the ocean breeze.”',
          tone: 'vulnerable',
          statEffects: { comfortRating: 20, confidence: 15, dysphoria: -15 },
          nextSceneId: 'era1_swimsuit_gentle_step',
        }
      ]
    },
    'era1_swimsuit_bold_reveal': {
      id: 'era1_swimsuit_bold_reveal',
      speaker: 'narrator',
      text: 'You let the linen wrap fall softly onto the weathered wood. The warmth of the afternoon sun envelops your bare shoulders, collarbones, and thighs. The ocean breeze ruffles your soft hair. No one gasps. No one points. The world simply keeps turning in lazy, summery peace.',
      background: '/assets/backgrounds/boardwalk.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era1_swimsuit_stranger_compliment',
    },
    'era1_swimsuit_gentle_step': {
      id: 'era1_swimsuit_gentle_step',
      speaker: 'narrator',
      text: 'Tara links her arm through yours with gentle strength. Step by step, you walk out past the souvenir shops and cotton candy carts. With each step, the knot of terror in your chest begins to loosen, replaced by the delicious sensation of cool salt wind against your warm skin.',
      background: '/assets/backgrounds/boardwalk.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era1_swimsuit_stranger_compliment',
    },
    'era1_swimsuit_stranger_compliment': {
      id: 'era1_swimsuit_stranger_compliment',
      speaker: 'narrator',
      text: 'As you lean against the white wooden railing to watch the waves, a stylish young woman carrying a wicker beach tote stops beside you with a warm smile.',
      background: '/assets/backgrounds/boardwalk.png',
      nextSceneId: 'era1_swimsuit_stranger_words',
    },
    'era1_swimsuit_stranger_words': {
      id: 'era1_swimsuit_stranger_words',
      speaker: 'stranger',
      speakerTitle: 'Beachgoer',
      text: '“Excuse me! I just had to tell you—that retro one-piece and your sun hat look absolutely stunning on you. You have such a classic, elegant silhouette!”',
      background: '/assets/backgrounds/boardwalk.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era1_swimsuit_eve_reaction',
    },
    'era1_swimsuit_eve_reaction': {
      id: 'era1_swimsuit_eve_reaction',
      speaker: 'eve',
      eveExpression: 'blush',
      text: 'A blush spreads across your cheeks all the way to the tips of your ears. Not a polite, awkward acknowledgment—just pure, effortless recognition from one woman to another.',
      background: '/assets/backgrounds/boardwalk.png',
      choices: [
        {
          text: '“Thank you so much! That means more to me than you could ever know.”',
          tone: 'flirty',
          statEffects: { confidence: 20, comfortRating: 20 },
          nextSceneId: 'era1_swimsuit_surf_walk',
        },
        {
          text: 'Smile radiantly and touch your brim: “Thank you! Have a wonderful day at the beach!”',
          tone: 'chill',
          statEffects: { confidence: 15, comfortRating: 25 },
          nextSceneId: 'era1_swimsuit_surf_walk',
        }
      ]
    },
    'era1_swimsuit_surf_walk': {
      id: 'era1_swimsuit_surf_walk',
      speaker: 'narrator',
      text: 'You kick off your espadrilles at the bottom of the wooden stairs. The wet sand is cool and soft beneath your bare soles. You walk right up to the water’s edge as a shimmering wave of frothy Atlantic foam rolls over your ankles.',
      background: '/assets/backgrounds/boardwalk.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era1_swimsuit_euphoria_epiphany',
    },
    'era1_swimsuit_euphoria_epiphany': {
      id: 'era1_swimsuit_euphoria_epiphany',
      speaker: 'eve',
      eveExpression: 'smile',
      text: 'For the first time in your life, your body does not feel like an alien vessel or a cage. It feels like home. The cold water, the sun on your skin, the salt in your mouth—you are fully, beautifully, unmistakably alive as Eve.',
      background: '/assets/backgrounds/boardwalk.png',
      soundEffect: 'playVictory',
      nextSceneId: 'era1_swimsuit_sunset_taffy',
    },
    'era1_swimsuit_sunset_taffy': {
      id: 'era1_swimsuit_sunset_taffy',
      speaker: 'tara',
      speakerTitle: 'Tara',
      activeSuitor: 'tara',
      text: 'Tara hands you a striped paper bag of fresh saltwater taffy as the horizon explodes into shades of apricot, plum, and lavender. “Look at you, girl. Four months ago you were crying in your hoodie at midnight. Now look at you: queen of the pier.”',
      background: '/assets/backgrounds/boardwalk.png',
      soundEffect: 'playVictory',
      choices: [
        {
          text: '“I couldn’t have done it without you by my side, Tara. Thank you for never giving up on me.”',
          tone: 'vulnerable',
          statEffects: { comfortRating: 30, confidence: 25, dysphoria: -30 },
          nextSceneId: 'prologue_apartment_intro',
        },
        {
          text: '“This is just the beginning. I’m going to conquer this whole damn city.”',
          tone: 'bold',
          statEffects: { confidence: 35, glam: 20, dysphoria: -30 },
          nextSceneId: 'prologue_apartment_intro',
        }
      ]
    }
  }
};
