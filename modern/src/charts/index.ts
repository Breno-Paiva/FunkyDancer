import type { Chart } from './types';
import catzData from './catz.json';
import datFunkData from './datFunk.json';
import laVemKikoData from './laVemKiko.json';

// JSON imports type as plain `number`/`string`, not the literal unions
// (e.g. Lane) the game logic needs - the shape is trusted here since
// these files are only ever produced by hand or by tools/autochart.
export const CHARTS: Chart[] = [catzData, datFunkData, laVemKikoData] as Chart[];

export function getChart(id: string): Chart {
  const chart = CHARTS.find((c) => c.id === id);
  if (!chart) throw new Error(`Unknown chart id: ${id}`);
  return chart;
}
