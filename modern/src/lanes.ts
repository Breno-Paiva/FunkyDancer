import type { Lane } from './charts/types';
import { Theme } from './theme';

export interface LaneConfig {
  lane: Lane;
  key: 'J' | 'K' | 'L' | 'SEMICOLON';
  label: string;
  color: number;
  x: number;
  danceAnim: 'go' | 'slap' | 'spin' | 'zen';
}

// x positions centered in an 800px-wide canvas, 150px apart.
export const LANES: LaneConfig[] = [
  { lane: 1, key: 'J', label: 'J', color: Theme.blue, x: 175, danceAnim: 'go' },
  { lane: 2, key: 'K', label: 'K', color: Theme.pink, x: 325, danceAnim: 'slap' },
  { lane: 3, key: 'L', label: 'L', color: Theme.yellow, x: 475, danceAnim: 'spin' },
  { lane: 4, key: 'SEMICOLON', label: ';', color: Theme.green, x: 625, danceAnim: 'zen' },
];

export const laneConfig = (lane: Lane): LaneConfig => LANES[lane - 1];
