import { ERA0_COMING_OUT_SCENARIO } from './era0_coming_out';
import { BEA_CONFRONTATION_SCENARIO } from './bea_confrontation';
import { PROLOGUE_SCENARIO } from './prologue';
import { ERA1_SCENARIO } from './era1_dates';
import { ERA2_SCENARIO } from './era2_dates';
import { ERA3_SCENARIO } from './era3_dates';
import { ERA4_SCENARIO } from './era4_climaxes';
import { HEART_EVENTS_SCENARIOS } from './heart_events';
import { NSFW_ENCOUNTERS_SCENARIO } from './nsfw_encounters';
import { ERA0_FAMILY_DINNER_SCENARIO } from './era0_family_dinner';
import { ERA1_BEA_AFTERMATH_SCENARIO } from './era1_bea_aftermath';
import { ERA1_FIRST_SWIMSUIT_SCENARIO } from './era1_first_swimsuit';
import { ERA2_CABARET_AND_INK_SCENARIO } from './era2_cabaret_and_ink';
import { ERA3_NAME_CHANGE_SCENARIO } from './era3_name_change';
import { APARTMENT_SLEEPOVERS_SCENARIO } from './apartment_sleepovers';
import { FRIENDSGIVING_SCENARIO } from './friendsgiving';
import type { DialogueNode, StoryScenario } from '../../types/story';

export { ERA0_COMING_OUT_SCENARIO } from './era0_coming_out';
export { ERA0_FAMILY_DINNER_SCENARIO } from './era0_family_dinner';
export { BEA_CONFRONTATION_SCENARIO } from './bea_confrontation';
export { ERA1_BEA_AFTERMATH_SCENARIO } from './era1_bea_aftermath';
export { ERA1_FIRST_SWIMSUIT_SCENARIO } from './era1_first_swimsuit';
export { ERA2_CABARET_AND_INK_SCENARIO } from './era2_cabaret_and_ink';
export { ERA3_NAME_CHANGE_SCENARIO } from './era3_name_change';
export { NSFW_ENCOUNTERS_SCENARIO } from './nsfw_encounters';
export { APARTMENT_SLEEPOVERS_SCENARIO } from './apartment_sleepovers';
export { FRIENDSGIVING_SCENARIO } from './friendsgiving';

export const ALL_SCENARIOS: Record<string, StoryScenario> = {
  era0_coming_out: ERA0_COMING_OUT_SCENARIO,
  era0_family_dinner: ERA0_FAMILY_DINNER_SCENARIO,
  bea_confrontation: BEA_CONFRONTATION_SCENARIO,
  era1_bea_aftermath: ERA1_BEA_AFTERMATH_SCENARIO,
  prologue: PROLOGUE_SCENARIO,
  era1_dates: ERA1_SCENARIO,
  era1_first_swimsuit: ERA1_FIRST_SWIMSUIT_SCENARIO,
  era2_dates: ERA2_SCENARIO,
  era2_cabaret_and_ink: ERA2_CABARET_AND_INK_SCENARIO,
  era2_cabaret_debut: ERA2_CABARET_AND_INK_SCENARIO,
  era2_jesse_tattoo: ERA2_CABARET_AND_INK_SCENARIO,
  era3_dates: ERA3_SCENARIO,
  era3_name_change: ERA3_NAME_CHANGE_SCENARIO,
  era3_name_change_court: ERA3_NAME_CHANGE_SCENARIO,
  era4_climaxes: ERA4_SCENARIO,
  nsfw_encounters: NSFW_ENCOUNTERS_SCENARIO,
  apartment_sleepovers: APARTMENT_SLEEPOVERS_SCENARIO,
  friendsgiving: FRIENDSGIVING_SCENARIO,
  ...HEART_EVENTS_SCENARIOS,
};

export function getDialogueNode(sceneId: string, currentScenarioId: string = 'prologue'): DialogueNode | null {
  // First search within the current scenario
  if (ALL_SCENARIOS[currentScenarioId]?.nodes[sceneId]) {
    return ALL_SCENARIOS[currentScenarioId].nodes[sceneId];
  }

  // Fallback search across all scenarios
  for (const scenario of Object.values(ALL_SCENARIOS)) {
    if (scenario.nodes[sceneId]) {
      return scenario.nodes[sceneId];
    }
  }

  return null;
}
