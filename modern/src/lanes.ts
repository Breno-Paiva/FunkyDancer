import Phaser from 'phaser';
import type { Lane } from './charts/types';
import { Theme } from './theme';

export type LaneShape = 'circle' | 'square' | 'triangle' | 'diamond';

export interface LaneDef {
  lane: Lane;
  key: 'J' | 'K' | 'L' | 'SEMICOLON';
  label: string;
  color: number;
  shape: LaneShape;
}

// Shape is the primary way lanes read apart at a glance (color is the
// secondary cue, not the only one) - readable at speed and doesn't rely
// on color vision to tell lanes apart.
const LANE_DEFS: LaneDef[] = [
  { lane: 1, key: 'J', label: 'J', color: Theme.blue, shape: 'circle' },
  { lane: 2, key: 'K', label: 'K', color: Theme.pink, shape: 'square' },
  { lane: 3, key: 'L', label: 'L', color: Theme.yellow, shape: 'triangle' },
  { lane: 4, key: 'SEMICOLON', label: ';', color: Theme.green, shape: 'diamond' },
];

export const LANES = LANE_DEFS;

export const laneConfig = (lane: Lane): LaneDef => LANE_DEFS[lane - 1];

// Draws a lane's shape as a plain Phaser Shape game object - Arc,
// Rectangle and Triangle all share the same setFillStyle/setStrokeStyle
// API, so callers (target markers, falling notes) can treat the result
// uniformly regardless of which shape a given lane uses.
export function createLaneShape(
  scene: Phaser.Scene,
  shape: LaneShape,
  x: number,
  y: number,
  size: number,
  color: number,
  alpha = 1,
): Phaser.GameObjects.Shape {
  switch (shape) {
    case 'circle':
      return scene.add.circle(x, y, size, color, alpha);
    case 'square':
      return scene.add.rectangle(x, y, size * 1.7, size * 1.7, color, alpha);
    case 'diamond':
      return scene.add.rectangle(x, y, size * 1.5, size * 1.5, color, alpha).setRotation(Math.PI / 4);
    case 'triangle': {
      // Phaser's Triangle computes its display origin assuming the local
      // points span [0, width] x [0, height] (its own default points are
      // (0,128),(64,0),(128,128) - a top-left-origin box, not one centered
      // on zero). Points defined in a zero-centered space throw the origin
      // off and the shape renders offset from (x, y) - e.g. the lane label
      // text sitting on top of it lands off-center. Define the triangle in
      // that [0, w] x [0, h] convention instead so it centers correctly.
      const w = size * 1.9;
      const h = size * 2;
      return scene.add.triangle(x, y, w / 2, 0, 0, h, w, h, color, alpha);
    }
  }
}

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
