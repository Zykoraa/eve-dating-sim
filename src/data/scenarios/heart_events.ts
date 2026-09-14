import type { StoryScenario } from '../../types/story';

export const HEART_EVENTS_SCENARIOS: Record<string, StoryScenario> = {
  liam_events: {
    id: 'liam_events',
    title: 'Liam Walker — Heart Events',
    chapter: 'Verdant Heart',
    era: 2,
    hrtMonth: 6,
    description: 'Episodic romance encounters cultivating tenderness with Liam at the botanical center.',
    initialSceneId: 'liam_rank2_start',
    nodes: {
      'liam_rank2_start': {
        id: 'liam_rank2_start',
        speaker: 'narrator',
        text: 'The glass dome of Verdant Glow Conservatory is filled with warm, humid mist and the earthy scent of peat moss. Liam is kneeling beside a workbench of white phalaenopsis orchids.',
        background: '/assets/backgrounds/cafe.png',
        nextSceneId: 'liam_rank2_dialogue',
      },
      'liam_rank2_dialogue': {
        id: 'liam_rank2_dialogue',
        speaker: 'liam',
        activeSuitor: 'liam',
        suitorExpression: 'smile',
        text: '“Hey Eve. Look at this one—it lost all its blooms last winter when the greenhouse heater broke. Everyone told me to compost it. But look closely at the node... a fresh stem is budding. Plants don’t care about past frost; they only care about light.”',
        background: '/assets/backgrounds/cafe.png',
        choices: [
          {
            text: 'Touch the velvet petal gently: "Sounds like someone I know. Transition felt like a long winter, but spring always arrives."',
            tone: 'vulnerable',
            statEffects: { confidence: 15, comfortRating: 15, suitorAffection: { suitor: 'liam', amount: 20 }, suitorRespect: { suitor: 'liam', amount: 15 } },
            nextSceneId: 'liam_rank2_outcome',
          },
          {
            text: 'Smile warmly: "You have a gift for seeing life where others give up, Liam. It’s what makes you so special."',
            tone: 'flirty',
            statEffects: { confidence: 10, comfortRating: 20, suitorAffection: { suitor: 'liam', amount: 25 }, suitorRespect: { suitor: 'liam', amount: 15 } },
            nextSceneId: 'liam_rank2_outcome',
          }
        ]
      },
      'liam_rank2_outcome': {
        id: 'liam_rank2_outcome',
        speaker: 'liam',
        activeSuitor: 'liam',
        suitorExpression: 'blush',
        text: 'Liam looks up at you through his honey-brown bangs, his cheeks flushing pink. He gently places a small potted moon orchid in your hands. “I want you to have this on your windowsill. Whenever you look at it, remember how proud I am of the woman you are.”',
        background: '/assets/backgrounds/cafe.png',
        soundEffect: 'playVictory',
      },

      'liam_rank6_start': {
        id: 'liam_rank6_start',
        speaker: 'narrator',
        text: 'A summer thunderstorm rattles the glass roof of the greenhouse after hours. Rain cascading in sheets over the emerald leaves outside. Liam lights two beeswax candles on the potting table.',
        background: '/assets/backgrounds/cafe.png',
        nextSceneId: 'liam_rank6_dance',
      },
      'liam_rank6_dance': {
        id: 'liam_rank6_dance',
        speaker: 'liam',
        activeSuitor: 'liam',
        suitorExpression: 'smile',
        text: 'Liam extends his calloused hand, his eyes shining in the golden candlelight. “No crowds, no stares, no expectations. Just you and me. May I have this dance, Eve?”',
        background: '/assets/backgrounds/cafe.png',
        choices: [
          {
            text: 'Step into his arms, resting your head on his shoulder as you sway to the rhythm of rain.',
            tone: 'flirty',
            statEffects: { confidence: 25, comfortRating: 25, dysphoria: -20, suitorAffection: { suitor: 'liam', amount: 30 }, suitorRespect: { suitor: 'liam', amount: 20 } },
            nextSceneId: 'liam_rank6_end',
          }
        ]
      },
      'liam_rank6_end': {
        id: 'liam_rank6_end',
        speaker: 'narrator',
        text: 'His arms are steady, sheltering, and completely devoid of doubt. He breathes in the lavender scent of your hair and whispers softly: “You are everything I’ve ever hoped to find in this life.”',
        background: '/assets/backgrounds/cafe.png',
        soundEffect: 'playSparkle',
      }
    }
  },

  chloe_events: {
    id: 'chloe_events',
    title: 'Chloe Vasquez — Heart Events',
    chapter: 'Riot & Resonance',
    era: 2,
    hrtMonth: 8,
    description: 'Electric T4T punk rock episodes and late-night intimacy with Chloe.',
    initialSceneId: 'chloe_rank2_start',
    nodes: {
      'chloe_rank2_start': {
        id: 'chloe_rank2_start',
        speaker: 'chloe',
        activeSuitor: 'chloe',
        suitorExpression: 'smile',
        text: 'Chloe slides her heavy seafoam green bass guitar strap over your shoulder. The low wood vibrations thrum straight through your chest. “Hear that low E string? That rumble right there? That’s pure T4T power. Play this fret right here!”',
        background: '/assets/backgrounds/punk_club.png',
        choices: [
          {
            text: 'Pluck the string with confidence: "How’s that for an indie debut?"',
            tone: 'bold',
            statEffects: { confidence: 20, glam: 15, suitorAffection: { suitor: 'chloe', amount: 20 }, suitorRespect: { suitor: 'chloe', amount: 20 } },
            nextSceneId: 'chloe_rank2_end',
          },
          {
            text: 'Lean into her shoulder: "My fingers feel clumsy, but standing here with you makes me feel invincible."',
            tone: 'flirty',
            statEffects: { comfortRating: 20, confidence: 15, suitorAffection: { suitor: 'chloe', amount: 25 }, suitorRespect: { suitor: 'chloe', amount: 15 } },
            nextSceneId: 'chloe_rank2_end',
          }
        ]
      },
      'chloe_rank2_end': {
        id: 'chloe_rank2_end',
        speaker: 'chloe',
        activeSuitor: 'chloe',
        suitorExpression: 'blush',
        text: 'Chloe laughs with infectious joy, wrapping her arm around your waist to guide your fingers. “You’ve got the groove in your soul, baby. We’re gonna take over this city together.”',
        background: '/assets/backgrounds/punk_club.png',
        soundEffect: 'playVictory',
      },

      'chloe_rank6_start': {
        id: 'chloe_rank6_start',
        speaker: 'narrator',
        text: 'Backstage at the Riot Cellar after an electric sold-out set. The adrenaline is fading, and Chloe sits slumped on an amp case, hands curled into her lap, looking uncharacteristically quiet.',
        background: '/assets/backgrounds/punk_club.png',
        nextSceneId: 'chloe_rank6_vulnerable',
      },
      'chloe_rank6_vulnerable': {
        id: 'chloe_rank6_vulnerable',
        speaker: 'chloe',
        activeSuitor: 'chloe',
        suitorExpression: 'sad',
        text: '“Everyone expects me to be this 24/7 fearless punk riot queen who never bleeds. But sometimes... I look in the mirror after these shows and the voice in my head tells me I’m just pretending. God, I hate feeling weak in front of you.”',
        background: '/assets/backgrounds/punk_club.png',
        choices: [
          {
            text: 'Kneel in front of her, cup her face tenderly: "You don’t have to be a warrior with me, Chloe. You’re allowed to just be a girl who needs to be held."',
            tone: 'vulnerable',
            statEffects: { confidence: 25, comfortRating: 30, dysphoria: -25, suitorAffection: { suitor: 'chloe', amount: 35 }, suitorRespect: { suitor: 'chloe', amount: 30 } },
            nextSceneId: 'chloe_rank6_end',
          }
        ]
      },
      'chloe_rank6_end': {
        id: 'chloe_rank6_end',
        speaker: 'chloe',
        activeSuitor: 'chloe',
        suitorExpression: 'blush',
        text: 'Chloe lets out a shuddering breath, burying her face into your neck. Her arms grip you tight as a wave of relief washes over both of you. “Thank you for loving me, Eve. Real, messy, soft me.”',
        background: '/assets/backgrounds/punk_club.png',
        soundEffect: 'playSparkle',
      }
    }
  },

  julian_events: {
    id: 'julian_events',
    title: 'Julian Chen — Heart Events',
    chapter: 'Starlight Algorithms',
    era: 3,
    hrtMonth: 14,
    description: 'Quiet indie game development, observatory stargazing, and kitchen dumplings with Julian.',
    initialSceneId: 'julian_rank2_start',
    nodes: {
      'julian_rank2_start': {
        id: 'julian_rank2_start',
        speaker: 'narrator',
        text: 'Julian’s apartment is quiet, illuminated by multiple high-res monitors displaying pixel art trees and floating islands. A cardboard box of warm steamed dumplings sits on the desk.',
        background: '/assets/backgrounds/eve_room.png',
        nextSceneId: 'julian_rank2_recording',
      },
      'julian_rank2_recording': {
        id: 'julian_rank2_recording',
        speaker: 'julian',
        activeSuitor: 'julian',
        suitorExpression: 'smile',
        text: '“Eve, listen to this sound effect! I tweaked the synth flute. Now when the player character awakens her wings... I wanted to ask, would you let me record your laughter for the celestial fairy guide? Your laugh is my favorite sound in the world.”',
        background: '/assets/backgrounds/eve_room.png',
        choices: [
          {
            text: 'Giggle into the studio mic with playful warmth: "Only if I get executive producer credit in the game credits!"',
            tone: 'flirty',
            statEffects: { voiceResonance: 20, confidence: 20, suitorAffection: { suitor: 'julian', amount: 25 }, suitorRespect: { suitor: 'julian', amount: 20 } },
            nextSceneId: 'julian_rank2_end',
          }
        ]
      },
      'julian_rank2_end': {
        id: 'julian_rank2_end',
        speaker: 'julian',
        activeSuitor: 'julian',
        suitorExpression: 'blush',
        text: 'Julian records the waveform, his dark eyes sparkling behind his glasses. “Executive producer of the game... and keeper of my heart. Deal.”',
        background: '/assets/backgrounds/eve_room.png',
        soundEffect: 'playVictory',
      },

      'julian_rank6_start': {
        id: 'julian_rank6_start',
        speaker: 'narrator',
        text: 'At the Starlight Observatory dome, the two of you lie on cushioned loungers under the projection of deep nebulae. Julian holds your hand, tracing the lines of your palm with gentle reverie.',
        background: '/assets/backgrounds/street_night.png',
        nextSceneId: 'julian_rank6_confession',
      },
      'julian_rank6_confession': {
        id: 'julian_rank6_confession',
        speaker: 'julian',
        activeSuitor: 'julian',
        suitorExpression: 'blush',
        text: '“In astronomy, binary stars orbit around a shared center of gravity. That’s how I feel whenever I’m near you, Eve. You ground me, and you make me want to reach for things I was too scared to dream about.”',
        background: '/assets/backgrounds/street_night.png',
        choices: [
          {
            text: 'Squeeze his hand and lean in to kiss his cheek: "We orbit together, Julian. Always."',
            tone: 'flirty',
            statEffects: { confidence: 25, comfortRating: 25, suitorAffection: { suitor: 'julian', amount: 30 }, suitorRespect: { suitor: 'julian', amount: 25 } },
            nextSceneId: 'julian_rank6_end',
          }
        ]
      },
      'julian_rank6_end': {
        id: 'julian_rank6_end',
        speaker: 'narrator',
        text: 'Under a sky of projected violet stars, Julian smiles with peaceful reverence, wrapping you in his oversized knit sweater as the planets turn overhead.',
        background: '/assets/backgrounds/street_night.png',
        soundEffect: 'playSparkle',
      }
    }
  }
};
