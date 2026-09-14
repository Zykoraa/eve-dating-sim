import { describe, it, expect } from 'vitest';
import { ALL_SCENARIOS, getDialogueNode } from '../data/scenarios';

describe('Story Dialogue Graph & Branching Integrity', () => {
  it('should have all main story scenarios loaded', () => {
    expect(ALL_SCENARIOS.prologue).toBeDefined();
    expect(ALL_SCENARIOS.era1_dates).toBeDefined();
    expect(ALL_SCENARIOS.era2_dates).toBeDefined();
    expect(ALL_SCENARIOS.era3_dates).toBeDefined();
    expect(ALL_SCENARIOS.era4_climaxes).toBeDefined();
  });

  it('should resolve initial scene node for all scenarios', () => {
    for (const [id, scenario] of Object.entries(ALL_SCENARIOS)) {
      const initialNode = getDialogueNode(scenario.initialSceneId, id);
      expect(initialNode, `Scenario ${id} should have initial node ${scenario.initialSceneId}`).toBeDefined();
      expect(initialNode?.text.length).toBeGreaterThan(0);
    }
  });

  it('should verify all choices in scenarios link to valid nodes or end gracefully', () => {
    for (const [scenarioId, scenario] of Object.entries(ALL_SCENARIOS)) {
      for (const [nodeId, node] of Object.entries(scenario.nodes)) {
        if (node.choices) {
          for (const choice of node.choices) {
            const targetNode = getDialogueNode(choice.nextSceneId, scenarioId);
            expect(
              targetNode, 
              `Node ${nodeId} choice '${choice.text}' links to missing node '${choice.nextSceneId}'`
            ).toBeDefined();
          }
        } else if (node.nextSceneId) {
          const targetNode = getDialogueNode(node.nextSceneId, scenarioId);
          expect(
            targetNode, 
            `Node ${nodeId} nextSceneId links to missing node '${node.nextSceneId}'`
          ).toBeDefined();
        }
      }
    }
  });
});
