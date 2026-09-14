import { PROLOGUE_SCENARIO } from './prologue';
import { ERA1_SCENARIO } from './era1_dates';
import { ERA2_SCENARIO } from './era2_dates';
import { ERA3_SCENARIO } from './era3_dates';
import { ERA4_SCENARIO } from './era4_climaxes';
import type { DialogueNode, StoryScenario } from '../../types/story';

export const ALL_SCENARIOS: Record<string, StoryScenario> = {
  prologue: PROLOGUE_SCENARIO,
  era1_dates: ERA1_SCENARIO,
  era2_dates: ERA2_SCENARIO,
  era3_dates: ERA3_SCENARIO,
  era4_climaxes: ERA4_SCENARIO,
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
