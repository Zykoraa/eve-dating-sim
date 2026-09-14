import type { NestMessage } from '../types/phone';
import type { EveStats } from '../types/game';

export const INITIAL_NEST_MESSAGES: NestMessage[] = [
  {
    id: 'n1',
    author: 'Riley (3 yrs on E)',
    avatar: '🌸',
    role: 'Moderator',
    text: 'Good morning ladies, thems, and gems! Friendly reminder that water is your friend, spiro makes you crave sodium, and your worth is non-negotiable. 🥒💧',
    time: '9:15 AM'
  },
  {
    id: 'n2',
    author: 'Chloe (6 yrs on E)',
    avatar: '🎸',
    role: 'Bass Gremlin',
    text: 'If any cis bro on a date asks "what’s your real name?", tell him your name is Vengeance and invoice him $100.',
    time: '9:42 AM'
  },
  {
    id: 'n3',
    author: 'Sasha (1 yr on E)',
    avatar: '✨',
    role: 'Fashion Queen',
    text: 'Eve! How did your first cafe date go? We are literally waiting on pins and needles! 💕',
    time: '10:04 AM'
  }
];

export interface NestResponseResult {
  replies: {
    author: string;
    avatar: string;
    role: string;
    text: string;
    delayMs: number;
  }[];
  statsDiff: Partial<EveStats>;
}

export function generateNestResponses(userText: string): NestResponseResult {
  const lower = userText.toLowerCase();

  // 1. Support / Dysphoria / Hugs / Emotional Vulnerability
  if (
    lower.includes('support') || 
    lower.includes('hug') || 
    lower.includes('dysphoria') || 
    lower.includes('sad') || 
    lower.includes('cry') || 
    lower.includes('hard') || 
    lower.includes('anxious') || 
    lower.includes('anxiety') || 
    lower.includes('fear') || 
    lower.includes('afraid') || 
    lower.includes('scared') || 
    lower.includes('bad day') ||
    lower.includes('ugly') ||
    lower.includes('overwhelm')
  ) {
    return {
      replies: [
        {
          author: 'Riley (3 yrs on E)',
          avatar: '🌸',
          role: 'Moderator',
          text: 'Oh sweetie, taking a deep breath with you right now. 🫂 Dysphoria waves feel so heavy and all-consuming, but they ALWAYS recede. Your body is doing profound, brave transformation work every second. Wrap up in your softest blanket, drink some water, and remember how far you’ve already walked.',
          delayMs: 1200,
        },
        {
          author: 'Sasha (1 yr on E)',
          avatar: '✨',
          role: 'Fashion Queen',
          text: 'Incoming virtual hug pile!! 💕 Remind yourself: mirrors on bad brain days are distorted funhouse mirrors. We see the real, glowing girl you are even when your brain is being mean. You are so loved here, Eve!',
          delayMs: 2600,
        }
      ],
      statsDiff: {
        confidence: 10,
        comfortRating: 15,
        dysphoria: -15,
      }
    };
  }

  // 2. Date Win / Excitement / Crushes / Romance
  if (
    lower.includes('win') || 
    lower.includes('date') || 
    lower.includes('liam') || 
    lower.includes('kiss') || 
    lower.includes('cute') || 
    lower.includes('happy') || 
    lower.includes('coffee') || 
    lower.includes('cafe') || 
    lower.includes('park') || 
    lower.includes('sweet') || 
    lower.includes('butterflies') ||
    lower.includes('crush')
  ) {
    return {
      replies: [
        {
          author: 'Sasha (1 yr on E)',
          avatar: '✨',
          role: 'Fashion Queen',
          text: 'SCREAMING AND THROWING GLITTER!! 🥳 Look at you out there living your rom-com era!! Did your stomach do the little butterfly flips?? Tell us every single detail!',
          delayMs: 1100,
        },
        {
          author: 'Chloe (6 yrs on E)',
          avatar: '🎸',
          role: 'Bass Gremlin',
          text: 'Hell yeah! Walking with your chin up and taking up the space you deserve. Don’t let anyone make you feel small out there. Proud of you, Eve.',
          delayMs: 2400,
        }
      ],
      statsDiff: {
        confidence: 15,
        comfortRating: 10,
        dysphoria: -5,
      }
    };
  }

  // 3. Chasers / Creeps / Red Flags / Marcus / Invasive
  if (
    lower.includes('creep') || 
    lower.includes('chaser') || 
    lower.includes('marcus') || 
    lower.includes('red flag') || 
    lower.includes('discreet') || 
    lower.includes('gross') || 
    lower.includes('weird') || 
    lower.includes('block') || 
    lower.includes('fetish') || 
    lower.includes('invasive') || 
    lower.includes('rude')
  ) {
    return {
      replies: [
        {
          author: 'Chloe (6 yrs on E)',
          avatar: '🎸',
          role: 'Bass Gremlin',
          text: 'THROW HIM IN THE COMPOST! 🗑️ The second a man says "discreet", he’s advertising that he’s a coward. You are a whole woman to be cherished in broad daylight, not someone’s 2 AM closet experiment. Good riddance!',
          delayMs: 1200,
        },
        {
          author: 'Riley (3 yrs on E)',
          avatar: '🌸',
          role: 'Moderator',
          text: 'Fierce boundaries are the highest form of self-love. You trusted your instincts and protected your peace, Eve. So proud of you for holding your ground.',
          delayMs: 2500,
        }
      ],
      statsDiff: {
        confidence: 15,
        dysphoria: -10,
        comfortRating: 10,
      }
    };
  }

  // 4. Hormones / HRT / Voice / Physical Changes
  if (
    lower.includes('hrt') || 
    lower.includes('estrogen') || 
    lower.includes('spiro') || 
    lower.includes('dose') || 
    lower.includes('voice') || 
    lower.includes('pill') || 
    lower.includes('shot') || 
    lower.includes('skin') || 
    lower.includes('progress')
  ) {
    return {
      replies: [
        {
          author: 'Riley (3 yrs on E)',
          avatar: '🌸',
          role: 'Moderator',
          text: 'Patience is the hardest virtue of second puberty, honey! It feels like watching paint dry at first, but estrogen is doing quiet, miraculous magic under the surface every single hour. Trust the timeline and hydrate! 🌸💧',
          delayMs: 1200,
        },
        {
          author: 'Chloe (6 yrs on E)',
          avatar: '🎸',
          role: 'Bass Gremlin',
          text: 'Just wait until you suddenly start tearing up over a heartwarming pet adoption commercial lmao. The emotional unlock is wild and beautiful.',
          delayMs: 2300,
        }
      ],
      statsDiff: {
        voiceResonance: 5,
        confidence: 10,
        dysphoria: -5,
      }
    };
  }

  // 5. Fashion / Makeup / Outfits / Mirror
  if (
    lower.includes('makeup') || 
    lower.includes('eyeliner') || 
    lower.includes('dress') || 
    lower.includes('outfit') || 
    lower.includes('clothes') || 
    lower.includes('fit') || 
    lower.includes('hair') || 
    lower.includes('lipstick')
  ) {
    return {
      replies: [
        {
          author: 'Sasha (1 yr on E)',
          avatar: '✨',
          role: 'Fashion Queen',
          text: 'DROP THE FIT CHECK IN THE CHAT!! 😍 Winged eyeliner is practically an initiation ritual, and you conquered it! Remember that your style is about what brings YOU euphoria, not anyone else’s rules!',
          delayMs: 1200,
        }
      ],
      statsDiff: {
        glamRating: 10,
        confidence: 10,
      }
    };
  }

  // 6. Dynamic Fallback Pool (varied and rotating)
  const fallbacks = [
    {
      author: 'Riley (3 yrs on E)',
      avatar: '🌸',
      role: 'Moderator',
      text: 'We are cheering for you so hard, Eve! Every day you step out as yourself is a quiet victory. Never forget how much courage that takes. 💖',
    },
    {
      author: 'Sasha (1 yr on E)',
      avatar: '✨',
      role: 'Fashion Queen',
      text: 'Yes girl! Always here if you need outfit feedback or just need to vent. We’re in this together! 💅',
    },
    {
      author: 'Chloe (6 yrs on E)',
      avatar: '🎸',
      role: 'Bass Gremlin',
      text: 'Keep that chin high, Eve. The world takes some time to catch up with our greatness, but you’re paving your own road. Rock on. 🎸🔥',
    }
  ];

  const chosen = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  return {
    replies: [
      {
        ...chosen,
        delayMs: 1300,
      }
    ],
    statsDiff: {
      confidence: 5,
      comfortRating: 5,
    }
  };
}
