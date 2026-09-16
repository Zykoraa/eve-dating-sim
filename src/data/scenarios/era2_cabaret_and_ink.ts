import type { StoryScenario } from '../../types/story';

export const ERA2_CABARET_AND_INK_SCENARIO: StoryScenario = {
  id: 'era2_cabaret_and_ink',
  title: 'The Velvet Siren & Sacred Ink: Roxie & Jesse',
  chapter: 'Chrysalis Stage & Midnight Steel',
  era: 2,
  hrtMonth: 6,
  description: 'Taking center stage at Roxie’s legendary Chrysalis Ball, and getting your first gender-affirming tattoo from Jesse before a midnight highway motorcycle ride.',
  initialSceneId: 'era2_cabaret_intro',
  nodes: {
    // --- PART 1: ROXIE & THE VELVET SIREN CABARET ---
    'era2_cabaret_debut': {
      id: 'era2_cabaret_debut',
      speaker: 'narrator',
      text: 'Bass vibrates through the plush carpet of The Velvet Siren. The air smells of French vanilla perfume, champagne fizz, and warm theater spotlights. Red velvet curtains cascade from the ceiling like royal banners.',
      background: '/assets/backgrounds/cabaret.png',
      nextSceneId: 'era2_roxy_greets_eve',
    },
    'era2_cabaret_intro': {
      id: 'era2_cabaret_intro',
      speaker: 'narrator',
      text: 'Bass vibrates through the plush carpet of The Velvet Siren. The air smells of French vanilla perfume, champagne fizz, and warm theater spotlights. Red velvet curtains cascade from the ceiling like royal banners.',
      background: '/assets/backgrounds/cabaret.png',
      nextSceneId: 'era2_roxy_greets_eve',
    },
    'era2_roxy_greets_eve': {
      id: 'era2_roxy_greets_eve',
      speaker: 'roxy',
      speakerTitle: 'Roxie',
      activeSuitor: 'roxy',
      text: '“¡MIRA QUE HERMOSA! Look at you, Eve! Honey, you’re turning heads before you even step past the coat check! Come backstage right now—I saved you the lighted Hollywood mirror!”',
      background: '/assets/backgrounds/cabaret.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era2_roxy_backstage_contour',
    },
    'era2_roxy_backstage_contour': {
      id: 'era2_roxy_backstage_contour',
      speaker: 'roxy',
      speakerTitle: 'Roxie',
      activeSuitor: 'roxy',
      text: 'Roxie swirls a velvet makeup brush with lightning speed, blending rose-gold highlight across your cheekbone. “Listen to me, mi vida. Transitioning isn’t about apologizing for taking up space. It’s about demanding the center spotlight because you earned every damn inch of your joy.”',
      background: '/assets/backgrounds/cabaret.png',
      choices: [
        {
          text: '“Roxie, I used to be terrified of people looking at me. Now... I want them to look.”',
          tone: 'bold',
          statEffects: { confidence: 25, glam: 20 },
          nextSceneId: 'era2_roxy_stage_call',
        },
        {
          text: '“Your confidence is infectious, Roxie. Thank you for showing me how radiant sisterhood can be.”',
          tone: 'vulnerable',
          statEffects: { comfortRating: 25, confidence: 15 },
          nextSceneId: 'era2_roxy_stage_call',
        }
      ]
    },
    'era2_roxy_stage_call': {
      id: 'era2_roxy_stage_call',
      speaker: 'roxy',
      speakerTitle: 'Roxie',
      activeSuitor: 'roxy',
      text: 'Roxie clicks her heels and grabs her vintage chrome microphone. “Ladies, lovers, and beautiful queens! Tonight we celebrate our newest blossoming sister! Put your hands together for the radiant EVE!”',
      background: '/assets/backgrounds/cabaret.png',
      soundEffect: 'playVictory',
      shakeScreen: true,
      nextSceneId: 'era2_eve_center_stage',
    },
    'era2_eve_center_stage': {
      id: 'era2_eve_center_stage',
      speaker: 'eve',
      eveExpression: 'smile',
      text: 'You step into the warm, blinding spotlight. The crowd erupts into deafening cheers. You see Chloe cheering and pumping her fist, Tara waving a light stick, and Liam clapping with tears of wonder in his eyes. Pure, incandescent gender euphoria floods your veins.',
      background: '/assets/backgrounds/cabaret.png',
      soundEffect: 'playVictory',
      nextSceneId: 'era2_jesse_intro_branch',
    },

    // --- PART 2: JESSE & CHROME & THORN TATTOO ---
    'era2_jesse_tattoo': {
      id: 'era2_jesse_tattoo',
      speaker: 'narrator',
      text: 'The humid evening air pulls you toward the Industrial Arts district. Neon cyan letters glow through rain-slicked glass: CHROME & THORN TATTOO CO. The faint hum of a rotary tattoo machine mingles with slow indie bass.',
      background: '/assets/backgrounds/tattoo_shop.png',
      nextSceneId: 'era2_jesse_welcomes_eve',
    },
    'era2_jesse_intro_branch': {
      id: 'era2_jesse_intro_branch',
      speaker: 'narrator',
      text: 'Later that week, the humid evening air pulls you toward the Industrial Arts district. Neon cyan letters glow through rain-slicked glass: CHROME & THORN TATTOO CO. The faint hum of a rotary tattoo machine mingles with slow indie bass.',
      background: '/assets/backgrounds/tattoo_shop.png',
      nextSceneId: 'era2_jesse_welcomes_eve',
    },
    'era2_jesse_welcomes_eve': {
      id: 'era2_jesse_welcomes_eve',
      speaker: 'jesse',
      speakerTitle: 'Jesse',
      activeSuitor: 'jesse',
      text: 'Jesse looks up from their drafting bench, adjusting their worn leather vest. Their hazel eyes warm instantly. “Hey, Eve. Right on time. I’ve got the stencil ready—fine-line violet chrysalis with floral linework. Take a look.”',
      background: '/assets/backgrounds/tattoo_shop.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era2_eve_looks_stencil',
    },
    'era2_eve_looks_stencil': {
      id: 'era2_eve_looks_stencil',
      speaker: 'eve',
      eveExpression: 'smile',
      activeSuitor: 'jesse',
      text: 'The drawing is exquisite. Delicate wings breaking free from an intricate botanical cocoon. Exactly where you want it: just along your collarbone.',
      background: '/assets/backgrounds/tattoo_shop.png',
      choices: [
        {
          text: '“Jesse, it’s breathtaking. It feels like putting a permanent seal on my freedom.”',
          tone: 'vulnerable',
          statEffects: { suitorAffection: { suitor: 'jesse', amount: 20 }, confidence: 15 },
          nextSceneId: 'era2_jesse_applies_ink',
        },
        {
          text: '“Will it hurt? I can take estrogen injections, but needles still give me a tiny shiver.”',
          tone: 'humorous',
          statEffects: { suitorAffection: { suitor: 'jesse', amount: 15 }, comfortRating: 15 },
          nextSceneId: 'era2_jesse_comforts_needle',
        }
      ]
    },
    'era2_jesse_comforts_needle': {
      id: 'era2_jesse_comforts_needle',
      speaker: 'jesse',
      speakerTitle: 'Jesse',
      activeSuitor: 'jesse',
      text: 'Jesse chuckles softly, pulling on black nitrile gloves with practiced ease. “You’ve endured way worse than a 3-round liner, Eve. I’ve got a feather-light hand. If you need a break, just squeeze my shoulder.”',
      background: '/assets/backgrounds/tattoo_shop.png',
      nextSceneId: 'era2_jesse_applies_ink',
    },
    'era2_jesse_applies_ink': {
      id: 'era2_jesse_applies_ink',
      speaker: 'narrator',
      text: 'The rhythmic buzzing of the machine is hypnotic. Jesse’s touch is steady, gentle, and profoundly reverent. With every line of ink traced onto your skin, the old dysphoria of feeling like a stranger in your body melts away. You are writing your own history in indelible violet.',
      background: '/assets/backgrounds/tattoo_shop.png',
      nextSceneId: 'era2_jesse_finishes_tattoo',
    },
    'era2_jesse_finishes_tattoo': {
      id: 'era2_jesse_finishes_tattoo',
      speaker: 'jesse',
      speakerTitle: 'Jesse',
      activeSuitor: 'jesse',
      text: 'Jesse gently wipes the area with green soap and holds up the handheld mirror. “Look at that, Eve. It’s like it was always meant to be there. Perfect.”',
      background: '/assets/backgrounds/tattoo_shop.png',
      soundEffect: 'playSparkle',
      nextSceneId: 'era2_jesse_invites_ride',
    },
    'era2_jesse_invites_ride': {
      id: 'era2_jesse_invites_ride',
      speaker: 'jesse',
      speakerTitle: 'Jesse',
      activeSuitor: 'jesse',
      text: 'Jesse hangs up their apron and reaches for a sleek matte-black helmet, offering it to you with an alluring, boyish grin. “Studio’s closed. The highway’s empty. What do you say we take the bike up to Whispering Pines Overlook?”',
      background: '/assets/backgrounds/tattoo_shop.png',
      choices: [
        {
          text: 'Take the helmet and wrap your arms around Jesse’s waist: “Let’s fly.”',
          tone: 'flirty',
          statEffects: { suitorAffection: { suitor: 'jesse', amount: 25 }, confidence: 20 },
          nextSceneId: 'era2_overlook_midnight_ride',
        },
        {
          text: '“I’ve never ridden on a motorcycle before, but with you... I feel safe.”',
          tone: 'vulnerable',
          statEffects: { suitorAffection: { suitor: 'jesse', amount: 20 }, comfortRating: 25 },
          nextSceneId: 'era2_overlook_midnight_ride',
        }
      ]
    },
    'era2_overlook_midnight_ride': {
      id: 'era2_overlook_midnight_ride',
      speaker: 'narrator',
      text: 'The cafe racer roars through the night. You lean into Jesse, feeling the deep rumble of the engine against your chest and the cool wind rushing past your helmet. Below, the entire city glitters like an ocean of fallen stars.',
      background: '/assets/backgrounds/overlook.png',
      soundEffect: 'playVictory',
      nextSceneId: 'era2_overlook_confession',
    },
    'era2_overlook_confession': {
      id: 'era2_overlook_confession',
      speaker: 'jesse',
      speakerTitle: 'Jesse',
      activeSuitor: 'jesse',
      text: 'Jesse kills the engine. Standing at the wooden guardrail under the crescent moon, Jesse brushes a stray strand of hair behind your ear. “You’re incredible, Eve. Not because of what you’ve survived, but because of the woman you chose to become. Don’t ever let anyone dull that.”',
      background: '/assets/backgrounds/overlook.png',
      soundEffect: 'playVictory',
      nextSceneId: 'prologue_apartment_intro',
    }
  }
};
