import type { StoryScenario } from '../../types/story';

export const PROLOGUE_SCENARIO: StoryScenario = {
  id: 'prologue',
  title: 'Chapter 1: The Mirror & The First Bloom',
  chapter: 'Chapter 1',
  era: 1,
  hrtMonth: 1,
  description: 'Month 1 of medical transition. The egg has cracked, the estrogen has begun, and the terrifying world of modern dating awaits.',
  initialSceneId: 'prologue_start',
  nodes: {
    'prologue_start': {
      id: 'prologue_start',
      speaker: 'narrator',
      text: 'A cool autumn breeze slips through the cracked window of your third-floor apartment. On your nightstand sits a small orange prescription bottle: Estradiol 2mg.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'prologue_mirror',
    },
    'prologue_mirror': {
      id: 'prologue_mirror',
      speaker: 'eve',
      eveExpression: 'nervous',
      text: 'Thirty days. One whole month on hormones. My skin feels a tiny bit softer, or maybe I’m just hallucinating because I want it so badly.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'prologue_eyeliner',
    },
    'prologue_eyeliner': {
      id: 'prologue_eyeliner',
      speaker: 'eve',
      eveExpression: 'nervous',
      text: 'I stand in front of the vanity mirror holding a cheap liquid eyeliner pen like it’s an unpinned grenade. My hand is literally vibrating.',
      background: '/assets/backgrounds/eve_room.png',
      choices: [
        {
          text: 'Take a deep breath and go for a sharp, confident wing.',
          tone: 'bold',
          statEffects: { confidence: 5, glam: 5 },
          nextSceneId: 'prologue_makeup_bold',
        },
        {
          text: 'Stick with just a little tinted lip balm. Don’t push your luck.',
          tone: 'cautious',
          statEffects: { comfortRating: 5, dysphoria: -5 },
          nextSceneId: 'prologue_makeup_cautious',
        }
      ]
    },
    'prologue_makeup_bold': {
      id: 'prologue_makeup_bold',
      speaker: 'eve',
      eveExpression: 'smile',
      text: 'One flick... two flicks. It’s slightly crooked if you inspect it with a magnifying glass, but from two feet away? It actually looks like a real woman did it. A real girl. Me.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'prologue_phone_buzz',
    },
    'prologue_makeup_cautious': {
      id: 'prologue_makeup_cautious',
      speaker: 'eve',
      eveExpression: 'smile',
      text: 'Soft cherry sheen on the lips. Simple, comfortable, honest. Baby steps. Rome wasn’t built in a day, and neither is Eve.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'prologue_phone_buzz',
    },
    'prologue_phone_buzz': {
      id: 'prologue_phone_buzz',
      speaker: 'narrator',
      text: 'BZZZZT! Your phone rattles furiously against the wooden vanity table. Three frantic texts from Tara.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playPhonePing',
      nextSceneId: 'prologue_tara_call',
    },
    'prologue_tara_call': {
      id: 'prologue_tara_call',
      speaker: 'tara',
      speakerTitle: 'Tara (On Speakerphone)',
      text: 'EVE! DO NOT TELL ME YOU CHICKENED OUT! Did you download Bloom or are you still sitting in your dysphoria hoodie staring into the abyss?!',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'prologue_eve_reply',
    },
    'prologue_eve_reply': {
      id: 'prologue_eve_reply',
      speaker: 'eve',
      eveExpression: 'nervous',
      text: 'Tara, I am terrified. What if people on dating apps are cruel? What if a guy sees me in daylight and realizes I only have 30 days of estrogen in my veins?',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'prologue_tara_comfort',
    },
    'prologue_tara_comfort': {
      id: 'prologue_tara_comfort',
      speaker: 'tara',
      speakerTitle: 'Tara (On Speakerphone)',
      text: 'Listen to me: You spent twenty-three years living as someone else. You survived that! Swiping on some cute guys and girls on an app is nothing. You deserve romance, Eve. Put your crown on, check your phone, and let’s find you a date!',
      background: '/assets/backgrounds/eve_room.png',
      choices: [
        {
          text: 'Open the phone and set up your dating profile on Bloom.',
          tone: 'bold',
          statEffects: { confidence: 10 },
          setFlag: { key: 'tutorial_complete', value: true },
          openPhone: true,
          nextSceneId: 'prologue_end',
        },
        {
          text: 'Visit the vanity mirror first to pick an outfit for your debut.',
          tone: 'chill',
          openVanity: true,
          nextSceneId: 'prologue_end',
        }
      ]
    },
    'prologue_end': {
      id: 'prologue_end',
      speaker: 'narrator',
      text: 'Your journey has begun. Your phone is loaded with matches, your vanity is ready, and your first romantic dates await in Era 1.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era1_cafe_intro',
    }
  }
};
