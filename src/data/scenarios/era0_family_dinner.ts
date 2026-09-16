import type { StoryScenario } from '../../types/story';

export const ERA0_FAMILY_DINNER_SCENARIO: StoryScenario = {
  id: 'era0_family_dinner',
  title: 'Sunday Dinner: The Suffocating Mask & Choosing Life',
  chapter: 'The Sunday Dinner',
  era: 0,
  hrtMonth: 0,
  description: 'Trapped at family dinner in heavy boy-mode clothes that feel like sandpaper, facing painful microaggressions, and finding the courage to declare: "My name is Eve."',
  initialSceneId: 'era0_family_dinner_start',
  nodes: {
    'era0_family_dinner_start': {
      id: 'era0_family_dinner_start',
      speaker: 'narrator',
      text: 'The porcelain clatter of dinner forks against china sounds like ticking clocks. You sit at your parents’ polished mahogany dining table, suffocating inside a shapeless navy collared shirt that chafes against your collarbones like sandpaper.',
      background: '/assets/backgrounds/cafe.png',
      eveExpression: 'nervous',
      nextSceneId: 'era0_family_mother_starts',
    },
    'era0_family_mother_starts': {
      id: 'era0_family_mother_starts',
      speaker: 'parent',
      speakerTitle: 'Mother',
      text: '“You haven’t touched your roast potatoes. And look at your hair—it’s falling all over your forehead like a shaggy mess. When are you going to get a proper young man’s haircut? You look so tired lately.”',
      background: '/assets/backgrounds/cafe.png',
      soundEffect: 'playTension',
      nextSceneId: 'era0_family_brother_cuts_in',
    },
    'era0_family_brother_cuts_in': {
      id: 'era0_family_brother_cuts_in',
      speaker: 'brother',
      speakerTitle: 'Brother',
      text: '“Seriously, man. You barely talk at dinner anymore. You’re always holed up in your apartment staring at your phone. You need to hit the gym with me and get some testosterone pumping. What’s going on with you?”',
      background: '/assets/backgrounds/cafe.png',
      nextSceneId: 'era0_family_father_stares',
    },
    'era0_family_father_stares': {
      id: 'era0_family_father_stares',
      speaker: 'parent',
      speakerTitle: 'Father',
      text: 'Your father wipes his mouth with a stiff linen napkin, his heavy eyes inspecting you across the table. “Your mother and I invested a lot into your future. We expect our son to carry himself with dignity. So answer your mother: when is the haircut?”',
      background: '/assets/backgrounds/cafe.png',
      eveExpression: 'sad',
      nextSceneId: 'era0_family_eve_decision',
    },
    'era0_family_eve_decision': {
      id: 'era0_family_eve_decision',
      speaker: 'eve',
      eveExpression: 'fierce',
      text: 'Every breath in this room tastes like ash. The word \'son\' strikes your chest like a physical blow. You can stay silent and let them shave away your soul, or you can speak the sacred truth burning inside your heart.',
      background: '/assets/backgrounds/cafe.png',
      choices: [
        {
          text: '“I’m not cutting it. In fact... I am never living as a boy again. My name is Eve, and I am a woman.”',
          tone: 'bold',
          statEffects: { confidence: 25, dysphoria: -20 },
          nextSceneId: 'era0_family_explosive_reaction',
        },
        {
          text: '“Stop calling me that. You don’t know who I am, and I refuse to let you dictate my body anymore.”',
          tone: 'deflective',
          statEffects: { confidence: 15, dysphoria: -10 },
          nextSceneId: 'era0_family_deflective_reaction',
        },
        {
          text: '“Excuse me. I’m leaving.” (Stand up and drop your napkin onto the plate)',
          tone: 'cautious',
          statEffects: { comfortRating: 15 },
          nextSceneId: 'era0_family_walkout_storm',
        }
      ]
    },
    'era0_family_explosive_reaction': {
      id: 'era0_family_explosive_reaction',
      speaker: 'parent',
      speakerTitle: 'Mother',
      text: 'Your mother’s fork drops with a violent clatter. Her face drains of color, replaced by scandalized fury. “What did you just say?! \'Eve\'?! Is this some sick internet joke?! How could you do this to our family?!”',
      background: '/assets/backgrounds/cafe.png',
      shakeScreen: true,
      soundEffect: 'playTension',
      nextSceneId: 'era0_family_father_condemns',
    },
    'era0_family_deflective_reaction': {
      id: 'era0_family_deflective_reaction',
      speaker: 'parent',
      speakerTitle: 'Father',
      text: '“Dictate your body?! In this house, you show respect! You’ve been secretive and rebellious ever since you moved downtown. What kind of nonsense are you hiding from us?!”',
      background: '/assets/backgrounds/cafe.png',
      shakeScreen: true,
      soundEffect: 'playTension',
      nextSceneId: 'era0_family_father_condemns',
    },
    'era0_family_father_condemns': {
      id: 'era0_family_father_condemns',
      speaker: 'parent',
      speakerTitle: 'Father',
      text: '“We did not raise a... a freak! If you think you can disrespect our family name with this delusional sickness, you can walk out that door right now and never ask us for another dime!”',
      background: '/assets/backgrounds/cafe.png',
      nextSceneId: 'era0_family_brother_mocks',
    },
    'era0_family_brother_mocks': {
      id: 'era0_family_brother_mocks',
      speaker: 'brother',
      speakerTitle: 'Brother',
      text: '“You’re really losing your mind, dude. No one is ever gonna take you seriously as a chick. You’re six feet tall. Just grow up.”',
      background: '/assets/backgrounds/cafe.png',
      nextSceneId: 'era0_family_eve_stands_tall',
    },
    'era0_family_eve_stands_tall': {
      id: 'era0_family_eve_stands_tall',
      speaker: 'eve',
      eveExpression: 'fierce',
      text: 'For years, their rejection was your worst nightmare. But hearing it aloud, the terror evaporates. What remains is a quiet, diamond-hard clarity: their love was always conditional upon your misery. You are not their son. You are your own creator.',
      background: '/assets/backgrounds/cafe.png',
      choices: [
        {
          text: '“I’d rather be hated for who I truly am than loved as a ghost. Goodbye.”',
          tone: 'bold',
          statEffects: { confidence: 30, dysphoria: -25 },
          nextSceneId: 'era0_family_walkout_storm',
        },
        {
          text: 'Look at them with calm pity, push your chair back, and walk out into the fresh night air.',
          tone: 'chill',
          statEffects: { confidence: 20, comfortRating: 20 },
          nextSceneId: 'era0_family_walkout_storm',
        }
      ]
    },
    'era0_family_walkout_storm': {
      id: 'era0_family_walkout_storm',
      speaker: 'narrator',
      text: 'You push open the front door and step onto the wet sidewalk. A cold autumn drizzle misting your cheeks feels like baptism. The front door slams behind you, but you don’t flinch. You pull your phone from your pocket with shaking fingers.',
      background: '/assets/backgrounds/street_night.png',
      nextSceneId: 'era0_family_tara_arrives',
    },
    'era0_family_tara_arrives': {
      id: 'era0_family_tara_arrives',
      speaker: 'tara',
      speakerTitle: 'Tara',
      activeSuitor: 'tara',
      text: 'A beat-up silver Honda pulls up to the curb with hazard lights blinking. Tara leans across the passenger seat, kicking the door open with a grin that could melt a glacier.',
      background: '/assets/backgrounds/street_night.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era0_family_tara_comfort',
    },
    'era0_family_tara_comfort': {
      id: 'era0_family_tara_comfort',
      speaker: 'tara',
      speakerTitle: 'Tara',
      activeSuitor: 'tara',
      text: '“Get in, queen! I brought extra large salty fries, two milkshakes, and the new Chappell Roan album on repeat. Did you tell them?!”',
      background: '/assets/backgrounds/street_night.png',
      nextSceneId: 'era0_family_eve_tara_dialogue',
    },
    'era0_family_eve_tara_dialogue': {
      id: 'era0_family_eve_tara_dialogue',
      speaker: 'eve',
      eveExpression: 'blush',
      activeSuitor: 'tara',
      text: 'You slide into the warm passenger seat. The aroma of hot fries and vanilla comfort fills the car. Tears finally spill down your cheeks—not of sorrow, but of intoxicating freedom.',
      background: '/assets/backgrounds/street_night.png',
      choices: [
        {
          text: '“I told them my name is Eve. They hated it, Tara. But I’ve never felt more alive.”',
          tone: 'vulnerable',
          statEffects: { confidence: 20, comfortRating: 25 },
          nextSceneId: 'era0_family_finale',
        },
        {
          text: '“They said no one would ever see me as a woman. But looking at you right now... I know I’m gonna be okay.”',
          tone: 'bold',
          statEffects: { confidence: 25, comfortRating: 30 },
          nextSceneId: 'era0_family_finale',
        }
      ]
    },
    'era0_family_finale': {
      id: 'era0_family_finale',
      speaker: 'tara',
      speakerTitle: 'Tara',
      activeSuitor: 'tara',
      text: 'Tara grabs both of your hands across the console, her eyes glistening with fierce protective pride. “They don’t get to define you, Eve. We build our own family here. Tonight, we celebrate the first night of your real life.”',
      background: '/assets/backgrounds/street_night.png',
      soundEffect: 'playVictory',
      nextSceneId: 'prologue_apartment_intro',
    }
  }
};
