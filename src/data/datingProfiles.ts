import type { DatingAppProfile, ChatThread } from '../types/phone';

export const DATING_APP_PROFILES: DatingAppProfile[] = [
  {
    id: 'liam_profile',
    suitorId: 'liam',
    isFakeOrChaser: false,
    name: 'Liam',
    age: 25,
    distance: '3 miles away',
    occupation: 'Botanical Garden & Landscape Specialist',
    bio: 'Looking for someone who will let me talk about ferns for 20 minutes and not judge my messy car. Plant dad to 42 succulents and real dad to Buster the golden retriever.',
    photos: ['/assets/characters/liam_avatar.png'],
    prompts: [
      {
        question: 'A boundary of mine',
        answer: 'You have to be nice to dogs and waiters. Non-negotiable.'
      },
      {
        question: 'My ideal Sunday',
        answer: 'Farmers market pastries, long walk in the woods, making pasta from scratch while listening to vinyl.'
      },
      {
        question: 'Dating note',
        answer: 'Trans women are women. If you have good vibes and a warm smile, I’d love to buy you coffee.'
      }
    ],
    transDisclosureOpinion: 'Supportive & earnest',
    redFlagsCount: 0,
    matchScore: 92,
  },
  {
    id: 'chloe_profile',
    suitorId: 'chloe',
    isFakeOrChaser: false,
    name: 'Chloe 🎸',
    age: 26,
    distance: '1 mile away',
    occupation: 'Bassist & DIY Audio Engineer',
    bio: 'T4T or bust. If you are also tired of cis men explaining your own hormones to you, come sit with me. I cook ungodly amounts of garlic pasta and my band is playing this Saturday in a damp basement.',
    photos: ['/assets/characters/chloe_avatar.png'],
    prompts: [
      {
        question: 'The key to my heart',
        answer: 'Fuzz pedals, spare bobby pins, and knowing how to hold eye contact.'
      },
      {
        question: 'Green flags I look for',
        answer: 'Emotional honesty, cool combat boots, and not taking yourself too seriously.'
      }
    ],
    transDisclosureOpinion: 'T4T Soulmate',
    redFlagsCount: 0,
    matchScore: 95,
  },
  {
    id: 'julian_profile',
    suitorId: 'julian',
    isFakeOrChaser: false,
    name: 'Julian',
    age: 24,
    distance: '4 miles away',
    occupation: 'Indie Game Programmer',
    bio: 'Building pixel art RPGs by day, overthinking pourover coffee brew recipes by night. I am an introvert who loves deep conversations in quiet places.',
    photos: ['/assets/characters/julian_avatar.png'],
    prompts: [
      {
        question: 'I geek out about',
        answer: 'CRT scanline shaders, vintage mechanical keyboards, and low-tempo jazz.'
      },
      {
        question: 'My communication style',
        answer: 'Direct and gentle. I will never play games with your heart.'
      }
    ],
    transDisclosureOpinion: 'Warm, respectful, zero-drama',
    redFlagsCount: 0,
    matchScore: 90,
  },
  {
    id: 'maya_profile',
    suitorId: 'maya',
    isFakeOrChaser: false,
    name: 'Maya ✨',
    age: 27,
    distance: '2 miles away',
    occupation: 'Ceramicist & Art Curator',
    bio: 'My hands are usually stained with terracotta. I believe romance should feel like a French new wave film. Let me pour you orange wine and read your birth chart on my rooftop studio.',
    photos: ['/assets/characters/maya_avatar.png'],
    prompts: [
      {
        question: 'What I bring to the table',
        answer: 'Fresh sourdough, playlist curation, and boundless adoration.'
      },
      {
        question: 'Together we could',
        answer: 'Sneak into an art gallery after closing and drink champagne on the fire escape.'
      }
    ],
    transDisclosureOpinion: 'Artistic appreciation & sensual warmth',
    redFlagsCount: 1,
    matchScore: 88,
  },
  {
    id: 'marcus_profile',
    suitorId: 'marcus',
    isFakeOrChaser: true,
    name: 'Marcus (DL)',
    age: 28,
    distance: '5 miles away',
    occupation: 'Private Equity / Gym Enthusiast',
    bio: 'Discrete gentlemen only looking for fun with open-minded TS/females. Keep it between us. No drama, no public tagging, high standards only.',
    photos: ['/assets/characters/marcus_avatar.png'],
    prompts: [
      {
        question: 'What I’m looking for',
        answer: 'Late night chill sessions at my high-rise. Do you host or travel?'
      },
      {
        question: 'A weird fact about me',
        answer: 'I only date girls who are "exotic".'
      }
    ],
    transDisclosureOpinion: 'EXTREME CHASER RED FLAG: Fetishistic & secretive',
    redFlagsCount: 5,
    matchScore: 30,
  },
  // --- Funny NPC Profiles to swipe on ---
  {
    id: 'chad_fish',
    isFakeOrChaser: false,
    name: 'Chad',
    age: 27,
    distance: '8 miles away',
    occupation: 'Logistics',
    bio: 'Holding a 30lb largemouth bass in every photo. Just a normal guy looking for a traditional girl to watch football with.',
    photos: ['/assets/characters/npc_fish.png'],
    prompts: [
      {
        question: 'My greatest strength',
        answer: 'Gutting a fish in under 45 seconds.'
      }
    ],
    transDisclosureOpinion: 'Probably hasn’t read a bio since 2018',
    redFlagsCount: 3,
    matchScore: 12,
  },
  {
    id: 'crypto_bro',
    isFakeOrChaser: false,
    name: 'Tyler (Web3 / AI)',
    age: 29,
    distance: '1 mile away',
    occupation: 'DeFi Strategist & Thought Leader',
    bio: 'Disrupting the dating market. If you don’t own cold storage Bitcoin, are you even investing in our future? Let’s grab a $22 green smoothie and talk tokenomics.',
    photos: ['/assets/characters/npc_crypto.png'],
    prompts: [
      {
        question: 'Change my mind',
        answer: 'Fiat currency is a psychological trap.'
      }
    ],
    transDisclosureOpinion: 'Will tokenize your date on the blockchain',
    redFlagsCount: 4,
    matchScore: 18,
  },
  {
    id: 'poly_unicorn',
    isFakeOrChaser: false,
    name: 'Brad & Courtney',
    age: 31,
    distance: '6 miles away',
    occupation: 'Marketing Duo',
    bio: 'Coupled and adventurous! Seeking our special third unicorn to complete our puzzle. Must love craft IPAs, board games, and having zero emotional boundaries.',
    photos: ['/assets/characters/npc_unicorn.png'],
    prompts: [
      {
        question: 'Our love language',
        answer: 'Trapping single queer women into couple therapy sessions.'
      }
    ],
    transDisclosureOpinion: 'Unicorn hunter trap',
    redFlagsCount: 4,
    matchScore: 22,
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'tara',
    participantId: 'tara',
    participantName: 'Tara (BFF 💖)',
    participantAvatar: '/assets/characters/tara_avatar.png',
    lastMessage: 'Girl!! Did you download Bloom yet?? Send me screenshots immediately!!',
    unread: true,
    messages: [
      {
        id: 't1',
        sender: 'tara',
        senderName: 'Tara',
        text: 'EVE!! Emergency protocol activated!! Did you set up the dating app profile yet??',
        timestamp: '6:42 PM'
      },
      {
        id: 't2',
        sender: 'tara',
        senderName: 'Tara',
        text: 'Remember our golden rule: If his bio says "fluent in sarcasm" or he has zero full-body photos, SWIPE LEFT TO HELL.',
        timestamp: '6:43 PM'
      },
      {
        id: 't3',
        sender: 'eve',
        senderName: 'Eve',
        text: 'Tara I am literally shaking putting my lipstick on lmao. What if someone from college sees me?',
        timestamp: '6:45 PM'
      },
      {
        id: 't4',
        sender: 'tara',
        senderName: 'Tara',
        text: 'If anyone from college sees you, they will weep because your skin is glowing and you are stunning. Now go match with someone cute!! My phone is on high volume!',
        timestamp: '6:46 PM'
      }
    ],
    pendingChoices: [
      {
        text: 'I just matched with Liam! He looks like a sweet giant teddy bear.',
        tone: 'flirty',
        statImpact: { confidence: 10 },
        suitorReply: 'OMG SEND PICS RIGHT NOW. Does he have all his teeth? Does he look like he knows how to recycle?'
      },
      {
        text: 'Ugh, I got a super weird DM from a guy asking if I am "discreet".',
        tone: 'cautious',
        statImpact: { confidence: 5 },
        suitorReply: 'BLOCK HIM WITH THE SPEED OF LIGHT. Chasers get zero access to the queen. Keep your crown on!'
      }
    ]
  },
  {
    id: 'the_nest',
    participantId: 'the_nest',
    participantName: 'The Nest 🏳️‍⚧️ (Support Group)',
    participantAvatar: '/assets/characters/the_nest_avatar.png',
    lastMessage: 'Chloe: who stole my spare bottle of spiro from the community fridge',
    unread: true,
    messages: [
      {
        id: 'n1',
        sender: 'group_member',
        senderName: 'Riley',
        text: 'Daily reminder: Drink water, eat a salty pickle, and remember you are a beautiful daughter of estrogen 🥒✨',
        timestamp: '5:15 PM'
      },
      {
        id: 'n2',
        sender: 'group_member',
        senderName: 'Chloe',
        text: 'Also don’t let mediocre cis boys treat you like an exotic museum exhibit. Charge them $50 for the privilege of your presence.',
        timestamp: '5:18 PM'
      },
      {
        id: 'n3',
        sender: 'eve',
        senderName: 'Eve',
        text: 'Taking notes for tonight’s date 🙏',
        timestamp: '5:22 PM'
      }
    ]
  },
  {
    id: 'liam',
    participantId: 'liam',
    participantName: 'Liam Walker 🌿',
    participantAvatar: '/assets/characters/liam_avatar.png',
    lastMessage: 'Hey Eve! Your smile in that cafe photo made my whole evening.',
    unread: true,
    messages: [
      {
        id: 'l1',
        sender: 'suitor',
        senderName: 'Liam',
        text: 'Hey Eve! Your smile in that cafe photo made my whole evening. Hope you’re having a great week!',
        timestamp: '7:01 PM'
      }
    ],
    pendingChoices: [
      {
        text: 'Hey Liam! Thank you, that’s so sweet. How’s your golden retriever doing?',
        tone: 'witty',
        statImpact: { confidence: 5, suitorAffection: 10, suitorRespect: 5 },
        suitorReply: 'Buster is currently sleeping on top of my laundry pile like a goblin haha. Are you free to grab coffee at the Roastery on 5th tomorrow afternoon?'
      },
      {
        text: 'Hi Liam! Just wanted to make sure you saw my bio—I’m trans. Hope that’s cool with you!',
        tone: 'direct',
        statImpact: { confidence: 10, suitorRespect: 15 },
        suitorReply: 'Hey Eve, yes of course I saw! You are gorgeous and I’d love nothing more than to meet you in person. How about coffee tomorrow?'
      }
    ]
  },
  {
    id: 'bea',
    participantId: 'bea',
    participantName: 'Bea (Toxic Ex ⚠️)',
    participantAvatar: '/assets/characters/bea_avatar.png',
    lastMessage: 'Eve, you can’t just cut me out after 2 years. We need to talk.',
    unread: true,
    messages: [
      {
        id: 'b1',
        sender: 'bea',
        senderName: 'Bea',
        text: 'Eve. Look, about what happened with the police that night... I was terrified and under immense stress because of your decision. You have to see my side.',
        timestamp: '3 days ago'
      },
      {
        id: 'b2',
        sender: 'bea',
        senderName: 'Bea',
        text: 'You forced me to move out and took all the furniture. I still have your spare keys. Can we meet for lunch tomorrow? I miss how we used to be before this whole "Eve" thing.',
        timestamp: 'Yesterday'
      },
      {
        id: 'b3',
        sender: 'bea',
        senderName: 'Bea',
        text: 'Eve, you can’t just cut me out after 2 years. We need to talk.',
        timestamp: '2 hours ago'
      }
    ],
    pendingChoices: [
      {
        text: 'You lied to the police saying I had a gun and had me locked in a crisis room for 12 hours. You could have gotten me killed. Never contact me again or I will file for a restraining order.',
        tone: 'boundary',
        statImpact: { confidence: 25 },
        suitorReply: 'You blocked Bea’s number permanently. The knot of fear in your stomach unravels. Your home is a sanctuary now.'
      },
      {
        text: 'Leave the keys with the building super. Do not set foot near my apartment. We are completely done.',
        tone: 'direct',
        statImpact: { confidence: 15 },
        suitorReply: 'Bea: "Fine! Throw away two years of our life over hormones! Don’t come crying back to me when no one wants you!" [Blocked]'
      }
    ]
  }
];
