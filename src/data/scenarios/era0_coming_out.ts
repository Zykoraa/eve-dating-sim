import type { StoryScenario } from '../../types/story';

export const ERA0_COMING_OUT_SCENARIO: StoryScenario = {
  id: 'era0_coming_out',
  title: 'Chapter 0: The Cracked Shell & The Fire of Truth',
  chapter: 'Chapter 0',
  era: 0,
  hrtMonth: 0,
  description: 'Pre-HRT and trapped in boy-mode. Facing the terrifying crucible of coming out to parents, discarding toxic friends, and taking the first brave step toward living as Eve.',
  initialSceneId: 'era0_start',
  nodes: {
    'era0_start': {
      id: 'era0_start',
      speaker: 'narrator',
      text: 'You stand in the harsh fluorescent hum of your bathroom at 1:30 AM. In the mirror stands an exhausted, hollow-eyed boy in a shapeless dark navy hoodie. Every breath feels like wearing an iron corset.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era0_mirror_gaze',
    },
    'era0_mirror_gaze': {
      id: 'era0_mirror_gaze',
      speaker: 'eve',
      eveExpression: 'sad',
      text: 'Twenty-three years. Twenty-three fucking years pretending to be someone’s son, someone’s brother, a "chill dude." If I spend another year living this lie, it’s going to kill me. It really is.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era0_tara_knock',
    },
    'era0_tara_knock': {
      id: 'era0_tara_knock',
      speaker: 'narrator',
      text: 'BAM BAM BAM! The front door of your apartment rattles. Tara lets herself in with her spare key, holding two boxes of cheap pizza and an iced matcha.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playDoorKnock',
      nextSceneId: 'era0_tara_confronts',
    },
    'era0_tara_confronts': {
      id: 'era0_tara_confronts',
      speaker: 'tara',
      speakerTitle: 'Tara',
      text: 'Hey. I saw your text from midnight. Put the damn razor down, stop hiding in that miserable potato sack hoodie, and talk to me. Are we doing this or what?',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era0_eve_vulnerable',
    },
    'era0_eve_vulnerable': {
      id: 'era0_eve_vulnerable',
      speaker: 'eve',
      eveExpression: 'nervous',
      text: 'Tara... I’m terrified. My parents have Sunday dinner tomorrow night. If I tell them I’m trans, my mom might have a breakdown, and my dad... God, my dad might just look right through me.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era0_tara_strength',
    },
    'era0_tara_strength': {
      id: 'era0_tara_strength',
      speaker: 'tara',
      speakerTitle: 'Tara',
      text: 'Listen to me, girl. Their comfort is not worth your slow suicide. You don’t owe them a fake son just to keep the peace. You’re coming out to them tomorrow, and I’m sitting in the car parked outside their driveway with the engine running if you need to bolt.',
      background: '/assets/backgrounds/eve_room.png',
      choices: [
        {
          text: '"You’re right. I can’t choke on this secret for another single day. I’m telling them tomorrow."',
          tone: 'bold',
          statEffects: { confidence: 15, dysphoria: -10 },
          nextSceneId: 'era0_family_dinner_prep',
        },
        {
          text: '"What if they disown me? What if I lose the only family I’ve ever known?"',
          tone: 'vulnerable',
          statEffects: { comfortRating: 10, confidence: 5 },
          nextSceneId: 'era0_tara_reassurance',
        }
      ]
    },
    'era0_tara_reassurance': {
      id: 'era0_tara_reassurance',
      speaker: 'tara',
      speakerTitle: 'Tara',
      text: 'If they reject the real you, they never loved you—they loved an imaginary ghost. And you have ME. You have The Nest. You’re going to build a chosen family that loves the real fucking Eve with their whole hearts.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era0_family_dinner_prep',
    },
    'era0_family_dinner_prep': {
      id: 'era0_family_dinner_prep',
      speaker: 'narrator',
      text: 'Sunday evening. The familiar smell of roast beef and old carpeting hangs heavy in your parents’ suburban dining room. The ticking of the grandfather clock sounds like an execution countdown.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era0_parents_table',
    },
    'era0_parents_table': {
      id: 'era0_parents_table',
      speaker: 'parent',
      speakerTitle: 'Mom',
      text: 'You barely touched your potatoes, honey. And what’s with your hair? It’s getting so long and scruffy. Your father and I were saying you should look sharp for job interviews.',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era0_dad_interjects',
    },
    'era0_dad_interjects': {
      id: 'era0_dad_interjects',
      speaker: 'parent',
      speakerTitle: 'Dad',
      text: 'Your mother’s right. A man needs to present himself with authority in the world. You’ve seemed distant lately, son. What’s going on with you?',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era0_eve_climactic_choice',
    },
    'era0_eve_climactic_choice': {
      id: 'era0_eve_climactic_choice',
      speaker: 'eve',
      eveExpression: 'nervous',
      text: 'The word "son" hits like a lead weight in your chest. Your hands tremble beneath the dining room table. This is it. The threshold.',
      background: '/assets/backgrounds/eve_room.png',
      choices: [
        {
          text: '"Mom, Dad... I am not your son. I am a transgender woman. My name is Eve."',
          tone: 'bold',
          statEffects: { confidence: 25, dysphoria: -25 },
          soundEffect: 'playSparkle',
          nextSceneId: 'era0_parents_reaction_raw',
        },
        {
          text: '"I need you both to just listen before you speak. I’ve been in agonizing pain for years... I’m a girl."',
          tone: 'vulnerable',
          statEffects: { confidence: 15, comfortRating: 15 },
          soundEffect: 'playHeartbeat',
          nextSceneId: 'era0_parents_reaction_vulnerable',
        }
      ]
    },
    'era0_parents_reaction_raw': {
      id: 'era0_parents_reaction_raw',
      speaker: 'parent',
      speakerTitle: 'Mom',
      text: 'Mom drops her silverware with a deafening clatter. Her eyes go wide with shock. "A woman?! Is this a joke? Did someone on the internet brainwash you? You were our sweet baby boy!"',
      background: '/assets/backgrounds/eve_room.png',
      shakeScreen: true,
      soundEffect: 'playTension',
      nextSceneId: 'era0_dad_reaction',
    },
    'era0_parents_reaction_vulnerable': {
      id: 'era0_parents_reaction_vulnerable',
      speaker: 'parent',
      speakerTitle: 'Mom',
      text: 'Tears immediately well up in her eyes. "Pain? Why didn’t you talk to us? Why do you have to change your whole body... can’t you just be a gay man? Why does it have to be this extreme?"',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playTension',
      nextSceneId: 'era0_dad_reaction',
    },
    'era0_dad_reaction': {
      id: 'era0_dad_reaction',
      speaker: 'parent',
      speakerTitle: 'Dad',
      text: 'Dad sets his glass down heavily, his jaw set in rigid stone. "Do you have any idea how cruel the world is to people like that? You’re throwing away your entire future. I won’t have you playing dress-up under this roof."',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'era0_eve_stands_ground',
    },
    'era0_eve_stands_ground': {
      id: 'era0_eve_stands_ground',
      speaker: 'eve',
      eveExpression: 'fierce',
      text: 'For the first time in your entire life, the trembling stops. A fiery, incandescent clarity fills your chest.',
      background: '/assets/backgrounds/eve_room.png',
      choices: [
        {
          text: '"I’m not playing dress-up, Dad. I’m saving my own damn life. You can either love your daughter, or mourn a stranger."',
          tone: 'bold',
          statEffects: { confidence: 20 },
          nextSceneId: 'era0_dinner_aftermath',
        },
        {
          text: '"I love you both. But I cannot live as a dead person walking anymore. I hope one day you can see the woman I am."',
          tone: 'vulnerable',
          statEffects: { comfortRating: 20 },
          nextSceneId: 'era0_dinner_aftermath',
        }
      ]
    },
    'era0_dinner_aftermath': {
      id: 'era0_dinner_aftermath',
      speaker: 'narrator',
      text: 'You push back your chair, leave your house keys on the kitchen counter, and walk out the front door into the brisk evening air. Your heart is pounding like a drum, but your lungs have never felt so full of clean oxygen.',
      background: '/assets/backgrounds/street_night.png',
      soundEffect: 'playVictory',
      nextSceneId: 'era0_tara_car',
    },
    'era0_tara_car': {
      id: 'era0_tara_car',
      speaker: 'tara',
      speakerTitle: 'Tara',
      text: 'Tara leans across the passenger seat, kicking the car door open for you. "Get in, bitch! You did it! You actually fucking said it out loud!"',
      background: '/assets/backgrounds/street_night.png',
      nextSceneId: 'era0_clinic_breakthrough',
    },
    'era0_clinic_breakthrough': {
      id: 'era0_clinic_breakthrough',
      speaker: 'narrator',
      text: 'Two weeks later. You sit in the waiting room of the community health center. In your trembling hand sits a small white bag containing your very first vial and prescription of Estradiol.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era0_first_dose',
    },
    'era0_first_dose': {
      id: 'era0_first_dose',
      speaker: 'eve',
      eveExpression: 'smile',
      text: 'I press the tiny sweet-tasting pill under my tongue. It dissolves slowly. Month 0 is officially dead and buried. Welcome to the world, Eve.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playVictory',
      advanceEra: 1,
      choices: [
        {
          text: 'Step forward into Era 1: The Awkward Egg (Begin your romantic journey!)',
          tone: 'bold',
          statEffects: { confidence: 20, cash: 100 },
          advanceEra: 1,
          nextSceneId: 'prologue_start',
        }
      ]
    }
  }
};
