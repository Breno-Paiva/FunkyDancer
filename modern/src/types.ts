import type { Difficulty } from './charts/types';

export interface GameStats {
  chartTitle: string;
  difficulty: Difficulty;
  score: number;
  perfectCount: number;
  goodCount: number;
  missCount: number;
  totalNotes: number;
  maxCombo: number;
}
