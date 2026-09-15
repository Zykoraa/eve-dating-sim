import type { StoryScenario } from '../../types/story';

export const NSFW_ENCOUNTERS_SCENARIO: StoryScenario = {
  id: 'nsfw_encounters',
  title: 'After Dark: Adult Romance & Explicit Intimacy (18+)',
  chapter: 'After Dark',
  era: 2,
  hrtMonth: 6,
  description: 'Uncensored 18+ adult encounters exploring deep romantic passion, T4T intimacy, body euphoria, and overcoming vulnerability in the bedroom.',
  initialSceneId: 'nsfw_hub',
  nodes: {
    'nsfw_hub': {
      id: 'nsfw_hub',
      speaker: 'narrator',
      text: 'The city night turns electric and breathless. Whose bedroom, studio, or loft are you sneaking off to tonight for an intimate after-hours rendezvous?',
      background: '/assets/backgrounds/street_night.png',
      choices: [
        {
          text: 'Go back to Chloe’s apartment after her basement punk show (T4T Passion & Body Affirmation).',
          tone: 'bold',
          nextSceneId: 'nsfw_chloe_start',
        },
        {
          text: 'Spend a rainy night by the fireplace at Liam’s rustic botanical cottage (Gentle & Passionate Devotion).',
          tone: 'flirty',
          nextSceneId: 'nsfw_liam_start',
        },
        {
          text: 'Stay over at Julian’s studio after a late-night co-op gaming marathon (Quiet, Sensual Chemistry).',
          tone: 'vulnerable',
          nextSceneId: 'nsfw_julian_start',
        },
        {
          text: 'Accept Maya’s after-hours invitation to her candlelit art loft (Silk, Wine & Sapphic Reverence).',
          tone: 'flirty',
          nextSceneId: 'nsfw_maya_start',
        },
        {
          text: 'Shut down Marcus’s late-night penthouse proposition once and for all (Raw Boundary Beatdown).',
          tone: 'bold',
          nextSceneId: 'nsfw_marcus_shutoff_start',
        }
      ]
    },

    // --- CHLOE: T4T PASSION & UNFILTERED ROMANCE ---
    'nsfw_chloe_start': {
      id: 'nsfw_chloe_start',
      speaker: 'chloe',
      activeSuitor: 'chloe',
      speakerTitle: 'Chloe',
      text: 'Chloe kicks her apartment door shut behind you, drops her heavy bass guitar in the corner, and slams you gently against the wall. Her hands tangle into your hair, her breath hot against your lips.',
      background: '/assets/backgrounds/punk_club.png',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'nsfw_chloe_kiss',
    },
    'nsfw_chloe_kiss': {
      id: 'nsfw_chloe_kiss',
      speaker: 'chloe',
      activeSuitor: 'chloe',
      speakerTitle: 'Chloe',
      text: '“God, Eve... you have no fucking idea how badly I’ve wanted to get you alone all night. You looked so goddamn gorgeous in the crowd I could barely keep time on the bass.”',
      background: '/assets/backgrounds/punk_club.png',
      nextSceneId: 'nsfw_chloe_touch',
    },
    'nsfw_chloe_touch': {
      id: 'nsfw_chloe_touch',
      speaker: 'eve',
      eveExpression: 'blush',
      text: 'Her lips crash into yours—raw, desperate, tasting like cider and black cherry lip balm. Her hands slide beneath your top, calloused musician fingers tracing the warm curve of your ribs and tender breast buds.',
      background: '/assets/backgrounds/punk_club.png',
      choices: [
        {
          text: 'Pull her closer, arching your back and tangling your hands beneath her leather jacket.',
          tone: 'bold',
          statEffects: { confidence: 15, suitorAffection: { suitor: 'chloe', amount: 20 } },
          nextSceneId: 'nsfw_chloe_bed',
        },
        {
          text: 'Whisper: "Chloe... I’m a little nervous about my body tonight. Estrogen has made me so sensitive."',
          tone: 'vulnerable',
          statEffects: { comfortRating: 15, suitorRespect: { suitor: 'chloe', amount: 20 } },
          nextSceneId: 'nsfw_chloe_affirmation',
        }
      ]
    },
    'nsfw_chloe_affirmation': {
      id: 'nsfw_chloe_affirmation',
      speaker: 'chloe',
      activeSuitor: 'chloe',
      speakerTitle: 'Chloe',
      text: 'Chloe softens immediately, cupping your jaw with astonishing gentleness. “Hey. Look at me. I’m trans too, Eve. I know every single demon that talks in your ear. There is zero pressure here. We go at your speed. Every inch of you is a woman, and I’m going to worship every single piece of you.”',
      background: '/assets/backgrounds/punk_club.png',
      nextSceneId: 'nsfw_chloe_bed',
    },
    'nsfw_chloe_bed': {
      id: 'nsfw_chloe_bed',
      speaker: 'narrator',
      text: 'She tumbles you onto her unmade mattress under the glow of neon fairy lights. Her kisses trail down your jaw, burning across your throat and collarbones. Every stroke of her hands is intuitive, knowing exactly where to touch and where to affirm.',
      background: '/assets/backgrounds/punk_club.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'nsfw_chloe_climax',
    },
    'nsfw_chloe_climax': {
      id: 'nsfw_chloe_climax',
      speaker: 'narrator',
      text: 'Gasps and soft curses fill the dim room as pleasure builds in rolling, full-body waves—electric and intense. For the first time, your mind isn’t trapped in dissociation; you are completely present in your body, trembling in raw, joyful release in Chloe’s arms.',
      background: '/assets/backgrounds/punk_club.png',
      soundEffect: 'playVictory',
      nextSceneId: 'nsfw_chloe_aftercare',
    },
    'nsfw_chloe_aftercare': {
      id: 'nsfw_chloe_aftercare',
      speaker: 'chloe',
      activeSuitor: 'chloe',
      speakerTitle: 'Chloe',
      text: 'Curled together under a tangle of blankets on the fire escape later, the cool night breeze on your bare shoulders. Chloe kisses your temple softly. “You’re magic, Eve. Best fucking decision I ever made was talking to you.”',
      background: '/assets/backgrounds/street_night.png',
      choices: [
        {
          text: 'Wrap the blanket tighter around both of you and smile into her shoulder.',
          tone: 'flirty',
          statEffects: { confidence: 20, dysphoria: -25 },
          nextSceneId: 'nsfw_hub',
        }
      ]
    },

    // --- LIAM: GENTLE & PASSIONATE DEVOTION ---
    'nsfw_liam_start': {
      id: 'nsfw_liam_start',
      speaker: 'liam',
      activeSuitor: 'liam',
      speakerTitle: 'Liam',
      text: 'Rain lashes against the glass of Liam’s sunroom cottage. The hearth crackles with cedar embers, casting amber light across the hardwood floor. Liam brings you a cup of spiced tea, his amber eyes burning with quiet, steady hunger.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'nsfw_liam_embrace',
    },
    'nsfw_liam_embrace': {
      id: 'nsfw_liam_embrace',
      speaker: 'liam',
      activeSuitor: 'liam',
      speakerTitle: 'Liam',
      text: 'He sets the mug aside and sits beside you on the rug, gently pulling you into his lap. “You’ve been so quiet tonight, Eve. You’re always taking care of everyone else... let me take care of you tonight.”',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'nsfw_liam_undress',
    },
    'nsfw_liam_undress': {
      id: 'nsfw_liam_undress',
      speaker: 'narrator',
      text: 'His strong, calloused hands slowly unbutton your cardigan with reverence, as if unveiling sacred art. When your chest is bare in the firelight, his breath catches in his throat.',
      background: '/assets/backgrounds/eve_room.png',
      choices: [
        {
          text: 'Cup his face with both hands and pull him into a deep, desperate kiss.',
          tone: 'bold',
          statEffects: { confidence: 15, suitorAffection: { suitor: 'liam', amount: 20 } },
          nextSceneId: 'nsfw_liam_passion',
        },
        {
          text: 'Look down shyly: "Liam... you really think I’m beautiful? Even with everything?"',
          tone: 'vulnerable',
          statEffects: { comfortRating: 20, suitorRespect: { suitor: 'liam', amount: 20 } },
          nextSceneId: 'nsfw_liam_devotion',
        }
      ]
    },
    'nsfw_liam_devotion': {
      id: 'nsfw_liam_devotion',
      speaker: 'liam',
      activeSuitor: 'liam',
      speakerTitle: 'Liam',
      text: 'Liam rests his forehead against yours, his hands warm and protective on your hips. “Eve, look at me. You are the most breathtaking, intoxicating woman I have ever held. Everything about you drives me wild. Don’t you dare doubt how real you are.”',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'nsfw_liam_passion',
    },
    'nsfw_liam_passion': {
      id: 'nsfw_liam_passion',
      speaker: 'narrator',
      text: 'He lays you back onto the soft sheepskin rug before the blazing hearth. His kisses are deep, patient, and intoxicating, trailing down your neck, stomach, and thighs with steady, worshipful heat.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'nsfw_liam_climax',
    },
    'nsfw_liam_climax': {
      id: 'nsfw_liam_climax',
      speaker: 'narrator',
      text: 'The rhythm is sweet and breathless, rising to an overwhelming crescendo that leaves you crying out against his shoulder, holding onto his broad back as pure physical ecstasy washes away every lingering ounce of self-doubt.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playVictory',
      nextSceneId: 'nsfw_liam_aftercare',
    },
    'nsfw_liam_aftercare': {
      id: 'nsfw_liam_aftercare',
      speaker: 'liam',
      activeSuitor: 'liam',
      speakerTitle: 'Liam',
      text: 'Tucked together beneath thick wool blankets, the rain whispering outside. Liam strokes your hair gently until your breathing steadies. “I’m not letting you go anytime soon, sweetheart.”',
      background: '/assets/backgrounds/eve_room.png',
      choices: [
        {
          text: 'Rest your head against his chest, listening to his heartbeat.',
          tone: 'vulnerable',
          statEffects: { confidence: 25, dysphoria: -25 },
          nextSceneId: 'nsfw_hub',
        }
      ]
    },

    // --- JULIAN: QUIET, SENSUAL CHEMISTRY ---
    'nsfw_julian_start': {
      id: 'nsfw_julian_start',
      speaker: 'julian',
      activeSuitor: 'julian',
      speakerTitle: 'Julian',
      text: '3:00 AM in Julian’s cozy loft. The dual monitors glow softly behind you. Julian reaches over, takes off his wireframe glasses, and sets them on his desk. The quiet, shy boy is completely gone—replaced by focused, smoldering intent.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'nsfw_julian_pull',
    },
    'nsfw_julian_pull': {
      id: 'nsfw_julian_pull',
      speaker: 'julian',
      activeSuitor: 'julian',
      speakerTitle: 'Julian',
      text: 'He pulls you down into his lap on the sofa, his hands resting firmly at the small of your back. “I spent all night pretending to read code while all I could think about was tasting you.”',
      background: '/assets/backgrounds/eve_room.png',
      nextSceneId: 'nsfw_julian_kiss',
    },
    'nsfw_julian_kiss': {
      id: 'nsfw_julian_kiss',
      speaker: 'narrator',
      text: 'His kiss is surprisingly commanding, deep and hungry. His hands slide over your silk camisole, learning the curves of your body with meticulous, breathless reverence that leaves you trembling.',
      background: '/assets/backgrounds/eve_room.png',
      choices: [
        {
          text: 'Guide his hands where you want them most, whispering what feels good.',
          tone: 'bold',
          statEffects: { confidence: 20, suitorAffection: { suitor: 'julian', amount: 20 } },
          nextSceneId: 'nsfw_julian_climax',
        },
        {
          text: 'Melt into his embrace, letting him take total control of the night.',
          tone: 'flirty',
          statEffects: { comfortRating: 15, suitorAffection: { suitor: 'julian', amount: 20 } },
          nextSceneId: 'nsfw_julian_climax',
        }
      ]
    },
    'nsfw_julian_climax': {
      id: 'nsfw_julian_climax',
      speaker: 'narrator',
      text: 'The intimacy is electric, smart, and intensely communicative. Julian whispers endless quiet praise against your skin until you both shatter together in breathless, dizzying ecstasy.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playVictory',
      nextSceneId: 'nsfw_hub',
    },

    // --- MAYA: BOHEMIAN SAPPHIC REVERENCE ---
    'nsfw_maya_start': {
      id: 'nsfw_maya_start',
      speaker: 'maya',
      activeSuitor: 'maya',
      speakerTitle: 'Maya',
      text: 'Candlelight flickers against the raw brick walls of Maya’s contemporary gallery loft. Scent of amber incense and natural wine. Maya wraps a sheer gold silk scarf around your bare shoulders, her eyes dark with devotion.',
      background: '/assets/backgrounds/rooftop_lounge.png',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'nsfw_maya_devotion',
    },
    'nsfw_maya_devotion': {
      id: 'nsfw_maya_devotion',
      speaker: 'maya',
      activeSuitor: 'maya',
      speakerTitle: 'Maya',
      text: '“Women are the only true divinity in this cold world, Eve. And you... you have fought so hard to exist. Let me worship your temple tonight.”',
      background: '/assets/backgrounds/rooftop_lounge.png',
      nextSceneId: 'nsfw_maya_touch',
    },
    'nsfw_maya_touch': {
      id: 'nsfw_maya_touch',
      speaker: 'narrator',
      text: 'She dips her fingers in fragrant warm jasmine oil, trailing them along your collarbones, down your ribs, and over the curve of your hips. Her lips follow, tasting every inch of skin with unhurried, intoxicating Sapphic mastery.',
      background: '/assets/backgrounds/rooftop_lounge.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'nsfw_maya_climax',
    },
    'nsfw_maya_climax': {
      id: 'nsfw_maya_climax',
      speaker: 'narrator',
      text: 'A night of decadent, transcendent bliss where every touch celebrates your womanhood without shame or hesitation. You fall asleep entangled in silk sheets, feeling completely reborn.',
      background: '/assets/backgrounds/rooftop_lounge.png',
      soundEffect: 'playVictory',
      nextSceneId: 'nsfw_hub',
    },

    // --- MARCUS: RAW BOUNDARY BEATDOWN ---
    'nsfw_marcus_shutoff_start': {
      id: 'nsfw_marcus_shutoff_start',
      speaker: 'marcus',
      activeSuitor: 'marcus',
      speakerTitle: 'Marcus',
      text: 'Marcus pours expensive bourbon in his penthouse suite at 11:45 PM. He turns around, unbuttoning his shirt with a condescending smirk. “Glad you came, Eve. Keep it low-key, don’t post anything online. You know what you are, and you know how good I can treat you behind closed doors.”',
      background: '/assets/backgrounds/rooftop_lounge.png',
      shakeScreen: true,
      soundEffect: 'playTension',
      nextSceneId: 'nsfw_marcus_fury',
    },
    'nsfw_marcus_fury': {
      id: 'nsfw_marcus_fury',
      speaker: 'eve',
      eveExpression: 'fierce',
      text: 'You look at his slick grin, his Rolex, and his cowardice. The disgust rises in your throat like battery acid.',
      background: '/assets/backgrounds/rooftop_lounge.png',
      choices: [
        {
          text: '"You pathetic, cowardly chaser piece of shit. Did you really think because I’m trans, I’d let you fuck me in the dark while you hide me from your friends?"',
          tone: 'bold',
          statEffects: { confidence: 30, dysphoria: -30 },
          soundEffect: 'playVictory',
          nextSceneId: 'nsfw_marcus_destruction',
        }
      ]
    },
    'nsfw_marcus_destruction': {
      id: 'nsfw_marcus_destruction',
      speaker: 'narrator',
      text: 'You dump your drink straight into his ice bucket, shove him back onto his expensive Italian leather sofa, and slam his penthouse suite door so hard the glass vibrates. You step out onto the midnight city streets with absolute, untouchable sovereign dignity.',
      background: '/assets/backgrounds/street_night.png',
      soundEffect: 'playVictory',
      choices: [
        {
          text: 'Breathe in the cool city air and smile. You are nobody’s dirty secret.',
          tone: 'bold',
          statEffects: { confidence: 25 },
          nextSceneId: 'nsfw_hub',
        }
      ]
    }
  }
};
