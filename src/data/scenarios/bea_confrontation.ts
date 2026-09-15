import type { StoryScenario } from '../../types/story';

export const BEA_CONFRONTATION_SCENARIO: StoryScenario = {
  id: 'bea_confrontation',
  title: 'Facing Bea: The Deceitful Ex & The Broken Shadow',
  chapter: 'Facing Bea',
  era: 1,
  hrtMonth: 3,
  description: 'Months after kicking Bea out for her fabricated 911 gun report, she ambushes you on the street attempting to gaslight you and "fix things." Stand your ground and shatter her hold forever.',
  initialSceneId: 'bea_ambush_start',
  nodes: {
    'bea_ambush_start': {
      id: 'bea_ambush_start',
      speaker: 'narrator',
      text: 'You step out of the corner bakery holding a fresh iced lavender latte. The crisp autumn air feels invigorating on your skin. Suddenly, the sharp clatter of designer heels clicks across the brick sidewalk, and a cold, familiar voice freezes you in your tracks.',
      background: '/assets/backgrounds/street_night.png',
      nextSceneId: 'bea_steps_forward',
    },
    'bea_steps_forward': {
      id: 'bea_steps_forward',
      speaker: 'bea',
      speakerTitle: 'Bea',
      activeSuitor: 'bea',
      text: '“I knew it was you. Even with the self-cut bangs and the soft pastel clothes. So you’re really doing this, huh? You’re playing this whole \'Eve\' role for real.”',
      background: '/assets/backgrounds/street_night.png',
      soundEffect: 'playTension',
      nextSceneId: 'eve_bea_initial_response',
    },
    'eve_bea_initial_response': {
      id: 'eve_bea_initial_response',
      speaker: 'eve',
      eveExpression: 'fierce',
      activeSuitor: 'bea',
      text: 'Your stomach tightens into a hard knot, but your spine remains rigid. Standing before you in her immaculately tailored beige trench coat is the woman you shared two years of your life with—and who nearly got you killed.',
      background: '/assets/backgrounds/street_night.png',
      choices: [
        {
          text: '“My name is Eve, Bea. And you have zero right to ever stand in my way or speak to me again.”',
          tone: 'bold',
          statEffects: { confidence: 15 },
          nextSceneId: 'bea_gaslight_victimhood',
        },
        {
          text: '“Keep walking, Bea. Every single second you spend in my presence is an unwanted violation.”',
          tone: 'cautious',
          statEffects: { comfortRating: 15 },
          nextSceneId: 'bea_gaslight_victimhood',
        }
      ]
    },
    'bea_gaslight_victimhood': {
      id: 'bea_gaslight_victimhood',
      speaker: 'bea',
      speakerTitle: 'Bea',
      activeSuitor: 'bea',
      text: '“God, why do you always have to make yourself the victim?! I’m trying to be the bigger person here! Do you know what our mutual friends say about me? They think I’m a monster for moving out! I was just stressed out that night! You backed me into a corner with your sudden demands!”',
      background: '/assets/backgrounds/street_night.png',
      shakeScreen: true,
      nextSceneId: 'eve_calls_out_gun_lie',
    },
    'eve_calls_out_gun_lie': {
      id: 'eve_calls_out_gun_lie',
      speaker: 'eve',
      eveExpression: 'fierce',
      activeSuitor: 'bea',
      text: '“You didn’t \'move out\' because of stress, Bea. You called 911, fabricated a lie that I had a gun and was going to hurt myself, and watched in cold satisfaction as police handcuffed me and locked me in a hospital crisis evaluation room for twelve agonizing hours. And when the doctors cleared me and I walked back in to kick you out, you acted like you were the victim.”',
      background: '/assets/backgrounds/street_night.png',
      soundEffect: 'playTension',
      nextSceneId: 'bea_darvo_reaction',
    },
    'bea_darvo_reaction': {
      id: 'bea_darvo_reaction',
      speaker: 'bea',
      speakerTitle: 'Bea',
      activeSuitor: 'bea',
      text: '“I thought I saw one in your desk drawer! Anyone would have panicked seeing their partner lose their mind! If you hadn’t brought up those disgusting hormones, none of that would have happened! Can’t we just put it behind us? I miss our apartment. I can forgive you if you just apologize.”',
      background: '/assets/backgrounds/street_night.png',
      shakeScreen: true,
      nextSceneId: 'eve_final_shutdown_choices',
    },
    'eve_final_shutdown_choices': {
      id: 'eve_final_shutdown_choices',
      speaker: 'eve',
      eveExpression: 'fierce',
      activeSuitor: 'bea',
      text: 'The sheer, narcissistic audacity takes your breath away. She weaponized armed police against your life, and now she is standing on the street demanding that YOU apologize to HER.',
      background: '/assets/backgrounds/street_night.png',
      choices: [
        {
          text: '“Forgive ME?! You are a pathological liar and a danger to my life. If you ever contact me, show up at my building, or speak to my friends, I will file a criminal report for false emergency reporting. Get the fuck out of my sight.”',
          tone: 'bold',
          statEffects: { confidence: 35, dysphoria: -30 },
          setFlag: { key: 'bea_exorcised', value: true },
          soundEffect: 'playVictory',
          nextSceneId: 'bea_humiliated_retreat',
        },
        {
          text: '“I don’t hate you, Bea. I don’t feel anything for you at all anymore. You’re just a dishonest, broken ghost from a past life I have completely outgrown. Goodbye.”',
          tone: 'vulnerable',
          statEffects: { confidence: 25, comfortRating: 25 },
          setFlag: { key: 'bea_exorcised', value: true },
          soundEffect: 'playSparkle',
          nextSceneId: 'bea_humiliated_retreat',
        },
        {
          text: '“Tara! Come out here and look who decided to crawl out of the gutter!” (Call Tara over from the bakery)',
          tone: 'humorous',
          statEffects: { confidence: 30, comfortRating: 20 },
          setFlag: { key: 'bea_exorcised', value: true },
          nextSceneId: 'tara_humiliates_bea',
        }
      ]
    },
    'tara_humiliates_bea': {
      id: 'tara_humiliates_bea',
      speaker: 'tara',
      speakerTitle: 'Tara',
      activeSuitor: 'tara',
      text: 'Tara strolls out of the bakery holding two iced matcha lattes, her sunglasses pushed down her nose. “Well, well. If it isn’t Miss Felony Swatting herself. Does your corporate PR firm know you weaponize false 911 gun reports against queer women, Bea? Because I’m two clicks away from emailing your managing partner the police incident log.”',
      background: '/assets/backgrounds/street_night.png',
      soundEffect: 'playVictory',
      nextSceneId: 'bea_humiliated_retreat',
    },
    'bea_humiliated_retreat': {
      id: 'bea_humiliated_retreat',
      speaker: 'bea',
      speakerTitle: 'Bea',
      activeSuitor: 'bea',
      text: 'Bea’s face drains of all color. Her perfectly practiced corporate mask shatters into pure humiliation. She takes three frantic steps backward, clutching her designer handbag like a defensive shield. “You’re both insane! You’re going to die alone!” She spins around on her heels and speed-walks frantically away into the city traffic.',
      background: '/assets/backgrounds/street_night.png',
      shakeScreen: true,
      nextSceneId: 'bea_closure_reflection',
    },
    'bea_closure_reflection': {
      id: 'bea_closure_reflection',
      speaker: 'eve',
      eveExpression: 'smile',
      text: 'You take a deep, slow breath of the clean autumn air. The cold phantom terror that lived in your chest since that terrifying night with the police has completely evaporated. She has no power over you. Your home is safe. Your transition is yours. And your future is limitless.',
      background: '/assets/backgrounds/street_night.png',
      soundEffect: 'playSparkle',
      choices: [
        {
          text: 'Return to Eve’s Apartment Sanctuary with unshakeable peace of mind',
          tone: 'bold',
          statEffects: { confidence: 20, comfortRating: 25 },
          nextSceneId: 'era0_first_dose',
        }
      ]
    }
  }
};
