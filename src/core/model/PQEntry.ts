import { Coord } from './Cell';

export interface PQEntry {
  coord: Coord;
  costToHere: number;
  backPointer: PQEntry | null;
  guessCost?: number;
}

export interface Result {
  success: boolean;
  path: Coord[] | null;
}
