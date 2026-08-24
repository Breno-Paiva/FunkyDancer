import type { Lane } from './charts/types';
import { Theme } from './theme';

export interface LaneDef {
  lane: Lane;
  key: 'J' | 'K' | 'L' | 'SEMICOLON';
  label: string;
  color: number;
  danceAnim: 'go' | 'slap' | 'spin' | 'zen';
}

const LANE_DEFS: LaneDef[] = [
  { lane: 1, key: 'J', label: 'J', color: Theme.blue, danceAnim: 'go' },
  { lane: 2, key: 'K', label: 'K', color: Theme.pink, danceAnim: 'slap' },
  { lane: 3, key: 'L', label: 'L', color: Theme.yellow, danceAnim: 'spin' },
  { lane: 4, key: 'SEMICOLON', label: ';', color: Theme.green, danceAnim: 'zen' },
];

export const LANES = LANE_DEFS;

export const laneConfig = (lane: Lane): LaneDef => LANE_DEFS[lane - 1];

// Lane x positions as a fraction of canvas width, so the same layout
// code works whether the game is running at a wide landscape logical
// resolution or a narrow portrait one. Ratios reproduce the original
// hand-tuned 800px-wide landscape layout (margin 175px, spacing 150px)
// exactly at width=800, and scale proportionally at other widths.
const MARGIN_RATIO = 175 / 800;
const SPACING_RATIO = 150 / 800;

export function laneX(lane: Lane, width: number): number {
  return width * MARGIN_RATIO + width * SPACING_RATIO * (lane - 1);
}

export function laneSpacing(width: number): number {
  return width * SPACING_RATIO;
}
