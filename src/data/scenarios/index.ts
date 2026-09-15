import { ERA0_COMING_OUT_SCENARIO } from './era0_coming_out';
import { BEA_CONFRONTATION_SCENARIO } from './bea_confrontation';
import { PROLOGUE_SCENARIO } from './prologue';
import { ERA1_SCENARIO } from './era1_dates';
import { ERA2_SCENARIO } from './era2_dates';
import { ERA3_SCENARIO } from './era3_dates';
import { ERA4_SCENARIO } from './era4_climaxes';
import { HEART_EVENTS_SCENARIOS } from './heart_events';
import { NSFW_ENCOUNTERS_SCENARIO } from './nsfw_encounters';
import type { DialogueNode, StoryScenario } from '../../types/story';

export { ERA0_COMING_OUT_SCENARIO } from './era0_coming_out';
export { BEA_CONFRONTATION_SCENARIO } from './bea_confrontation';
export { NSFW_ENCOUNTERS_SCENARIO } from './nsfw_encounters';

export const ALL_SCENARIOS: Record<string, StoryScenario> = {
  era0_coming_out: ERA0_COMING_OUT_SCENARIO,
  bea_confrontation: BEA_CONFRONTATION_SCENARIO,
  prologue: PROLOGUE_SCENARIO,
  era1_dates: ERA1_SCENARIO,
  era2_dates: ERA2_SCENARIO,
  era3_dates: ERA3_SCENARIO,
  era4_climaxes: ERA4_SCENARIO,
  nsfw_encounters: NSFW_ENCOUNTERS_SCENARIO,
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
