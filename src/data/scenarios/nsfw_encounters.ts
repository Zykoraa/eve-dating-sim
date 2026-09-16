import type { StoryScenario } from '../../types/story';

export const NSFW_ENCOUNTERS_SCENARIO: StoryScenario = {
  id: 'nsfw_encounters',
  title: 'After Dark: Adult Romance & Visual Intimacy (18+)',
  chapter: 'After Dark',
  era: 2,
  hrtMonth: 6,
  description: 'Multi-phase 18+ adult encounters exploring deep romantic passion, T4T intimacy, body euphoria, full-screen CG visual art, and tender aftercare.',
  initialSceneId: 'nsfw_hub',
  nodes: {
    'nsfw_hub': {
      id: 'nsfw_hub',
      speaker: 'narrator',
      text: 'The city night turns electric, breathless, and full of unspoken longing. Whose sanctuary, loft, or bedroom are you sneaking off to tonight for an intimate rendezvous?',
      background: '/assets/backgrounds/street_night.png',
      choices: [
        {
          text: 'Go back to Chloe’s loft after her basement punk show (T4T Passion & Neon Sheets).',
          tone: 'bold',
          unlockCG: 'cg_chloe_intimacy',
          nextSceneId: 'nsfw_chloe_start',
        },
        {
          text: 'Spend a rainy night by the fireplace at Liam’s rustic botanical cottage (Hearthside Devotion).',
          tone: 'flirty',
          unlockCG: 'cg_liam_intimacy',
          nextSceneId: 'nsfw_liam_start',
        },
        {
          text: 'Stay over at Julian’s tech studio after a late-night co-op gaming marathon (Starlight Chemistry).',
          tone: 'vulnerable',
          unlockCG: 'cg_julian_intimacy',
          nextSceneId: 'nsfw_julian_start',
        },
        {
          text: 'Accept Maya’s after-hours invitation to her candlelit art loft (Silk, Wine & Sapphic Adoration).',
          tone: 'flirty',
          unlockCG: 'cg_maya_intimacy',
          nextSceneId: 'nsfw_maya_start',
        },
        {
          text: 'Ride on Jesse’s motorcycle back to their workshop loft (Sacred Ink & Highway Soul).',
          tone: 'flirty',
          unlockCG: 'cg_jesse_intimacy',
          nextSceneId: 'nsfw_jesse_start',
        },
        {
          text: 'Spend a quiet, sensual evening admiring your body’s awakening in the mirror (Self-Love & Euphoria Milestone).',
          tone: 'vulnerable',
          unlockCG: 'cg_eve_euphoria',
          nextSceneId: 'nsfw_eve_euphoria_start',
        },
        {
          text: 'Shut down Marcus’s late-night penthouse proposition once and for all (Raw Boundary Beatdown).',
          tone: 'bold',
          nextSceneId: 'nsfw_marcus_shutoff_start',
        },
        {
          text: 'Return home to your apartment sanctuary and rest peacefully in your own bed.',
          tone: 'chill',
          nextSceneId: 'nsfw_return_home',
        }
      ]
    },

    // =========================================================================
    // --- CHLOE: T4T PASSION & UNFILTERED ROMANCE (CG: cg_chloe_intimacy) ---
    // =========================================================================
    'nsfw_chloe_start': {
      id: 'nsfw_chloe_start',
      speaker: 'chloe',
      activeSuitor: 'chloe',
      speakerTitle: 'Chloe',
      text: 'Chloe kicks her apartment door shut behind you, drops her heavy bass guitar in the corner, and pulls you gently against the wall. Her hands tangle into your hair, her breath hot against your lips in the dim hallway.',
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
      text: 'She leads you by the hand onto her low loft bed beneath a canopy of glowing neon magenta fairy lights. The pulse of the bass and the coolness of the sheets contrast with the intense heat radiating between your bodies.',
      background: '/assets/backgrounds/punk_club.png',
      cgUrl: '/assets/cg/cg_chloe_intimacy.png',
      isIntimate: true,
      lightingMood: 'neon',
      soundEffect: 'playSparkle',
      nextSceneId: 'nsfw_chloe_passion',
    },
    'nsfw_chloe_passion': {
      id: 'nsfw_chloe_passion',
      speaker: 'chloe',
      activeSuitor: 'chloe',
      speakerTitle: 'Chloe',
      text: 'Chloe kisses down your jawline to your throat, her fingers gently parting your clothing. “Look at how beautiful you are under these lights, Eve. I want you to feel how desired you are—not in spite of who you are, but because of everything you are.”',
      background: '/assets/backgrounds/punk_club.png',
      cgUrl: '/assets/cg/cg_chloe_intimacy.png',
      isIntimate: true,
      lightingMood: 'neon',
      soundEffect: 'playHeartbeat',
      choices: [
        {
          text: 'Entwine your legs with hers and guide her hands, surrendering completely to the moment.',
          tone: 'bold',
          statEffects: { confidence: 20, suitorAffection: { suitor: 'chloe', amount: 25 } },
          nextSceneId: 'nsfw_chloe_climax',
        },
        {
          text: 'Bury your face in her neck, whispering words of sweet praise as pleasure surges.',
          tone: 'vulnerable',
          statEffects: { comfortRating: 20, suitorAffection: { suitor: 'chloe', amount: 20 } },
          nextSceneId: 'nsfw_chloe_climax',
        }
      ]
    },
    'nsfw_chloe_climax': {
      id: 'nsfw_chloe_climax',
      speaker: 'narrator',
      text: 'Gasps and soft cries fill the dim room as pleasure builds in rolling, full-body waves—electric, affirming, and boundless. For the first time, your mind isn’t trapped in dissociation; you are completely present in your body, trembling in raw, joyful release in Chloe’s arms.',
      background: '/assets/backgrounds/punk_club.png',
      cgUrl: '/assets/cg/cg_chloe_intimacy.png',
      isIntimate: true,
      lightingMood: 'neon',
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
        },
        {
          text: 'Kiss her goodbye tenderly at dawn and return home to your apartment sanctuary.',
          tone: 'vulnerable',
          statEffects: { confidence: 20, comfortRating: 25 },
          nextSceneId: 'nsfw_return_home',
        }
      ]
    },

    // =========================================================================
    // --- LIAM: GENTLE & PASSIONATE DEVOTION (CG: cg_liam_intimacy) ---
    // =========================================================================
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
      text: 'He lays you back onto the soft sheepskin rug before the blazing hearth. The warm amber firelight glows across the curves of your skin as his hands and mouth move with devoted, patient heat.',
      background: '/assets/backgrounds/eve_room.png',
      cgUrl: '/assets/cg/cg_liam_intimacy.png',
      isIntimate: true,
      lightingMood: 'warm_amber',
      soundEffect: 'playSparkle',
      nextSceneId: 'nsfw_liam_climax',
    },
    'nsfw_liam_climax': {
      id: 'nsfw_liam_climax',
      speaker: 'narrator',
      text: 'The rhythm is sweet and breathless, rising to an overwhelming crescendo that leaves you crying out against his shoulder, holding onto his broad back as pure physical ecstasy washes away every lingering ounce of self-doubt.',
      background: '/assets/backgrounds/eve_room.png',
      cgUrl: '/assets/cg/cg_liam_intimacy.png',
      isIntimate: true,
      lightingMood: 'warm_amber',
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
        },
        {
          text: 'Kiss his cheek in the morning and return home to your apartment with a peaceful heart.',
          tone: 'chill',
          statEffects: { confidence: 20, comfortRating: 25 },
          nextSceneId: 'nsfw_return_home',
        }
      ]
    },

    // =========================================================================
    // --- JULIAN: QUIET, SENSUAL CHEMISTRY (CG: cg_julian_intimacy) ---
    // =========================================================================
    'nsfw_julian_start': {
      id: 'nsfw_julian_start',
      speaker: 'julian',
      activeSuitor: 'julian',
      speakerTitle: 'Julian',
      text: '3:00 AM in Julian’s cozy highrise loft. The dual ultrawide monitors cast soft cyan illumination behind you. Julian reaches over, takes off his wireframe glasses, and sets them on his desk. The shy coder boy is gone—replaced by intense, smoldering intent.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'nsfw_julian_pull',
    },
    'nsfw_julian_pull': {
      id: 'nsfw_julian_pull',
      speaker: 'julian',
      activeSuitor: 'julian',
      speakerTitle: 'Julian',
      text: 'He pulls you down into his lap on the sofa, his hands resting firmly at the small of your back. “I spent all night pretending to debug code while all I could think about was tasting your lips.”',
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
          nextSceneId: 'nsfw_julian_bed',
        },
        {
          text: 'Melt into his embrace, letting him take total control of the night.',
          tone: 'flirty',
          statEffects: { comfortRating: 15, suitorAffection: { suitor: 'julian', amount: 20 } },
          nextSceneId: 'nsfw_julian_bed',
        }
      ]
    },
    'nsfw_julian_bed': {
      id: 'nsfw_julian_bed',
      speaker: 'julian',
      activeSuitor: 'julian',
      speakerTitle: 'Julian',
      text: 'Julian lifts you in his arms and carries you onto the platform bed by the floor-to-ceiling glass window, with the starlit skyline twinkling far below. “Every line of code, every world I’ve ever built... none of it compares to holding you.”',
      background: '/assets/backgrounds/eve_room.png',
      cgUrl: '/assets/cg/cg_julian_intimacy.png',
      isIntimate: true,
      lightingMood: 'starlight',
      soundEffect: 'playSparkle',
      nextSceneId: 'nsfw_julian_climax',
    },
    'nsfw_julian_climax': {
      id: 'nsfw_julian_climax',
      speaker: 'narrator',
      text: 'The intimacy is electric, smart, and intensely communicative. Julian whispers endless quiet praise against your skin as the skyline glimmers, until you both shatter together in breathless, dizzying ecstasy.',
      background: '/assets/backgrounds/eve_room.png',
      cgUrl: '/assets/cg/cg_julian_intimacy.png',
      isIntimate: true,
      lightingMood: 'starlight',
      soundEffect: 'playVictory',
      choices: [
        {
          text: 'Rest in Julian’s arms as morning sunlight filters across the tangled sheets, then return to your apartment.',
          tone: 'vulnerable',
          statEffects: { confidence: 25, comfortRating: 25 },
          nextSceneId: 'nsfw_return_home',
        },
        {
          text: 'Return to the midnight city map.',
          tone: 'chill',
          nextSceneId: 'nsfw_hub',
        }
      ]
    },

    // =========================================================================
    // --- MAYA: BOHEMIAN SAPPHIC REVERENCE (CG: cg_maya_intimacy) ---
    // =========================================================================
    'nsfw_maya_start': {
      id: 'nsfw_maya_start',
      speaker: 'maya',
      activeSuitor: 'maya',
      speakerTitle: 'Maya',
      text: 'Candlelight flickers against the raw brick walls of Maya’s contemporary gallery loft. Scent of amber incense, natural wine, and dried lavender fills the air. Maya wraps a sheer gold silk scarf around your bare shoulders, her dark eyes filled with adoration.',
      background: '/assets/backgrounds/rooftop_lounge.png',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'nsfw_maya_devotion',
    },
    'nsfw_maya_devotion': {
      id: 'nsfw_maya_devotion',
      speaker: 'maya',
      activeSuitor: 'maya',
      speakerTitle: 'Maya',
      text: '“Women are the only true divinity in this cold world, Eve. And you... you have fought with so much courage to exist. Let me worship your temple tonight.”',
      background: '/assets/backgrounds/rooftop_lounge.png',
      nextSceneId: 'nsfw_maya_touch',
    },
    'nsfw_maya_touch': {
      id: 'nsfw_maya_touch',
      speaker: 'narrator',
      text: 'She dips her fingers in fragrant warm jasmine oil, trailing them along your collarbones, down your ribs, and over the curve of your hips. Her lips follow, tasting every inch of skin with unhurried, intoxicating Sapphic mastery.',
      background: '/assets/backgrounds/rooftop_lounge.png',
      cgUrl: '/assets/cg/cg_maya_intimacy.png',
      isIntimate: true,
      lightingMood: 'candlelight',
      soundEffect: 'playSparkle',
      nextSceneId: 'nsfw_maya_climax',
    },
    'nsfw_maya_climax': {
      id: 'nsfw_maya_climax',
      speaker: 'narrator',
      text: 'A night of decadent, transcendent bliss where every touch celebrates your womanhood without shame or hesitation. You fall asleep entangled in burgundy silk sheets, feeling completely reborn in her embrace.',
      background: '/assets/backgrounds/rooftop_lounge.png',
      cgUrl: '/assets/cg/cg_maya_intimacy.png',
      isIntimate: true,
      lightingMood: 'candlelight',
      soundEffect: 'playVictory',
      choices: [
        {
          text: 'Wake at sunrise bathed in golden gallery light, hug Maya goodbye, and return home to your sanctuary.',
          tone: 'vulnerable',
          statEffects: { confidence: 25, comfortRating: 25 },
          nextSceneId: 'nsfw_return_home',
        },
        {
          text: 'Return to the midnight city map.',
          tone: 'chill',
          nextSceneId: 'nsfw_hub',
        }
      ]
    },

    // =========================================================================
    // --- JESSE: MOTORCYCLE LOFT & RAW INK PASSION (CG: cg_jesse_intimacy) ---
    // =========================================================================
    'nsfw_jesse_start': {
      id: 'nsfw_jesse_start',
      speaker: 'jesse',
      activeSuitor: 'jesse',
      speakerTitle: 'Jesse',
      text: 'Jesse pulls down the heavy steel security gate of Chrome & Thorn with a satisfying mechanical clank, turning off the neon street signs. They hang up their keys and gesture up the open wrought-iron spiral staircase.',
      background: '/assets/backgrounds/tattoo_shop.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'nsfw_jesse_loft',
    },
    'nsfw_jesse_loft': {
      id: 'nsfw_jesse_loft',
      speaker: 'jesse',
      activeSuitor: 'jesse',
      speakerTitle: 'Jesse',
      text: 'Upstairs, Jesse’s loft is warm with exposed brick, dim amber filament bulbs, and an old record player spinning slow jazz. Jesse shrugs off their leather vest, leaving them in a soft fitted black tank that highlights their inked shoulders and toned arms.',
      background: '/assets/backgrounds/tattoo_shop.png',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'nsfw_jesse_kiss',
    },
    'nsfw_jesse_kiss': {
      id: 'nsfw_jesse_kiss',
      speaker: 'jesse',
      activeSuitor: 'jesse',
      speakerTitle: 'Jesse',
      text: 'Jesse steps close, their hands resting firmly and tenderly on your hips. Their hazel eyes search yours with pure, unapologetic hunger. “Eve... I’ve wanted you in my arms like this since the minute you walked through my door. You take my breath away.”',
      background: '/assets/backgrounds/tattoo_shop.png',
      choices: [
        {
          text: 'Slide your hands up Jesse’s chest and pull them down into a fierce, deep kiss.',
          tone: 'bold',
          statEffects: { confidence: 20, suitorAffection: { suitor: 'jesse', amount: 25 } },
          nextSceneId: 'nsfw_jesse_touch',
        },
        {
          text: '“Jesse... I’ve never felt this safe with someone. Please don’t hold back.”',
          tone: 'vulnerable',
          statEffects: { comfortRating: 25, suitorAffection: { suitor: 'jesse', amount: 20 } },
          nextSceneId: 'nsfw_jesse_touch',
        }
      ]
    },
    'nsfw_jesse_touch': {
      id: 'nsfw_jesse_touch',
      speaker: 'narrator',
      text: 'Jesse’s mouth crashes into yours—passionate, tender, and possessive in the most affirming way. Their calloused hands slide gently beneath your top, lifting it over your head. Their fingers trace the fresh, delicate curves of your chest and ribs before kissing the newly inked violet butterfly on your collarbone with reverent devotion.',
      background: '/assets/backgrounds/tattoo_shop.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'nsfw_jesse_bed',
    },
    'nsfw_jesse_bed': {
      id: 'nsfw_jesse_bed',
      speaker: 'jesse',
      activeSuitor: 'jesse',
      speakerTitle: 'Jesse',
      text: 'Jesse tumbles you onto their low platform bed beneath heavy wool blankets. Their hands are everywhere—tracing your hips, your waist, your inner thighs. “You are breathtaking, Eve. Every single curve of you. Look at me... you are completely mine tonight.”',
      background: '/assets/backgrounds/tattoo_shop.png',
      cgUrl: '/assets/cg/cg_jesse_intimacy.png',
      isIntimate: true,
      lightingMood: 'warm_amber',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'nsfw_jesse_climax',
    },
    'nsfw_jesse_climax': {
      id: 'nsfw_jesse_climax',
      speaker: 'narrator',
      text: 'Rhythmic, breathless gasps echo against the brick walls. Pleasure builds in cascading, full-body surges of intense euphoria. In Jesse’s strong embrace, there is zero shame, zero dysphoria, only raw, mutual ecstasy and the overwhelming sensation of being profoundly desired as a woman.',
      background: '/assets/backgrounds/tattoo_shop.png',
      cgUrl: '/assets/cg/cg_jesse_intimacy.png',
      isIntimate: true,
      lightingMood: 'warm_amber',
      soundEffect: 'playVictory',
      nextSceneId: 'nsfw_jesse_aftercare',
    },
    'nsfw_jesse_aftercare': {
      id: 'nsfw_jesse_aftercare',
      speaker: 'jesse',
      activeSuitor: 'jesse',
      speakerTitle: 'Jesse',
      text: 'Lying tangled in the dark hours before sunrise, Jesse pulls you against their chest, one arm wrapped securely around your waist while their thumb idly strokes your collarbone. “Any time the world gets too loud or cruel, Eve... you ride straight here. You’ll always have a home with me.”',
      background: '/assets/backgrounds/tattoo_shop.png',
      soundEffect: 'playSparkle',
      choices: [
        {
          text: 'Rest your head against Jesse’s chest and drift to sleep, returning home at sunrise.',
          tone: 'vulnerable',
          statEffects: { confidence: 25, comfortRating: 30, dysphoria: -25 },
          nextSceneId: 'nsfw_return_home',
        },
        {
          text: 'Kiss Jesse’s jaw and return to the midnight city map.',
          tone: 'chill',
          statEffects: { confidence: 20 },
          nextSceneId: 'nsfw_hub',
        }
      ]
    },

    // =========================================================================
    // --- EVE SOLO: THE AWAKENING: MIRROR OF EUPHORIA (CG: cg_eve_euphoria) ---
    // =========================================================================
    'nsfw_eve_euphoria_start': {
      id: 'nsfw_eve_euphoria_start',
      speaker: 'eve',
      eveExpression: 'blush',
      text: 'You lock your apartment door, dim the ceiling lights, and light your lavender candle. The golden hour sunset streams through your sheer curtains, casting warm amber and rose radiance across your bedroom.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'nsfw_eve_euphoria_mirror',
    },
    'nsfw_eve_euphoria_mirror': {
      id: 'nsfw_eve_euphoria_mirror',
      speaker: 'eve',
      eveExpression: 'smile',
      text: 'You slip into delicate blush silk lingerie that you bought last weekend. Stepping in front of the full-length mirror, you pause. For twenty-three years, this reflection brought only distress and disconnection. But tonight...',
      background: '/assets/backgrounds/eve_room.png',
      cgUrl: '/assets/cg/cg_eve_euphoria.png',
      isIntimate: true,
      lightingMood: 'rose_glow',
      soundEffect: 'playHeartbeat',
      nextSceneId: 'nsfw_eve_euphoria_touch',
    },
    'nsfw_eve_euphoria_touch': {
      id: 'nsfw_eve_euphoria_touch',
      speaker: 'narrator',
      text: 'Your hands trace the gentle, blossoming curves of your hips and the soft contours of your chest. The estrogen has softened your skin to velvet. Tears of profound relief prick at the corners of your eyes: “This is me. I didn’t just survive transition... I became her.”',
      background: '/assets/backgrounds/eve_room.png',
      cgUrl: '/assets/cg/cg_eve_euphoria.png',
      isIntimate: true,
      lightingMood: 'rose_glow',
      soundEffect: 'playVictory',
      nextSceneId: 'nsfw_eve_euphoria_peace',
    },
    'nsfw_eve_euphoria_peace': {
      id: 'nsfw_eve_euphoria_peace',
      speaker: 'eve',
      eveExpression: 'smile',
      text: 'You blow out the candle and curl into your plush bedsheets, feeling thoroughly loved, healed, and whole. You do not need anyone else’s permission to exist in your beauty.',
      background: '/assets/backgrounds/eve_room.png',
      choices: [
        {
          text: 'Rest with deep contentment, fully celebrating your womanhood.',
          tone: 'chill',
          statEffects: { confidence: 30, dysphoria: -35, comfortRating: 30 },
          nextSceneId: 'nsfw_return_home',
        }
      ]
    },

    // =========================================================================
    // --- MARCUS: RAW BOUNDARY BEATDOWN ---
    // =========================================================================
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
          text: 'Breathe in the cool city air and smile. You are nobody’s dirty secret. Return home to your sanctuary.',
          tone: 'bold',
          statEffects: { confidence: 25 },
          nextSceneId: 'nsfw_return_home',
        },
        {
          text: 'Return to the midnight city map.',
          tone: 'chill',
          nextSceneId: 'nsfw_hub',
        }
      ]
    },
    'nsfw_return_home': {
      id: 'nsfw_return_home',
      speaker: 'narrator',
      text: 'You return home to your warm apartment as morning sunlight begins to paint the horizon in soft lavender and gold. Your heart is serene, your body humming with gender euphoria and peaceful satisfaction. You slide under the down duvet and drift off to sweet, deep rest.',
      background: '/assets/backgrounds/eve_room.png',
      soundEffect: 'playSparkle',
      choices: [
        {
          text: 'Rest comfortably in your bed, ready to live your authentic truth.',
          tone: 'chill',
          statEffects: { comfortRating: 25, dysphoria: -20 },
          nextSceneId: 'era1_thrift_weekend_hook',
        }
      ]
    }
  }
};
