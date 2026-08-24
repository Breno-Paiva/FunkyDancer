export type Lane = 1 | 2 | 3 | 4;
export type Difficulty = 'fun' | 'funky';

export interface ChartNote {
  time: number;
  lane: Lane;
}

export interface Chart {
  id: string;
  title: string;
  audioKey: string;
  audioPath: string;
  leadTime: number;
  notes: Record<Difficulty, ChartNote[]>;
}
