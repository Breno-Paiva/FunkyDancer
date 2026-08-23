import type { Chart } from './types';

// Timings ported as-is from the Classic edition's lib/sheet.js
// (SongSheet[1]) so this chart is tuned to the same audio file.
export const catzChart: Chart = {
  id: 'catz',
  title: 'Catz',
  audioKey: 'catz',
  audioPath: 'audio/catz.wav',
  leadTime: 1.5,
  notes: [
    { time: 1.65, lane: 1 },
    { time: 2.2, lane: 2 },
    { time: 2.75, lane: 1 },
    { time: 3.3, lane: 2 },
    { time: 3.85, lane: 1 },
    { time: 4.125, lane: 1 },
    { time: 4.4, lane: 3 },
    { time: 4.95, lane: 1 },
    { time: 5.5, lane: 2 },
    { time: 6.05, lane: 1 },
    { time: 6.6, lane: 2 },
    { time: 7.7, lane: 4 },
    { time: 8.8, lane: 1 },
    { time: 9.35, lane: 2 },
    { time: 9.9, lane: 1 },
    { time: 10.45, lane: 2 },
    { time: 11, lane: 3 },
    { time: 12.1, lane: 1 },
    { time: 12.6, lane: 2 },
    { time: 13.15, lane: 1 },
    { time: 14.25, lane: 1 },
    { time: 14.8, lane: 2 },
    { time: 15.35, lane: 1 },
    { time: 16.45, lane: 3 },
    { time: 17, lane: 3 },
  ],
};
