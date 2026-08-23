export type Lane = 1 | 2 | 3 | 4;

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
  notes: ChartNote[];
}
