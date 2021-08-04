import { Coord } from './Cell';

export interface PQEntry {
  coord: Coord;
  costToHere: number;
  backPointer: PQEntry | null;
}

export interface Result {
  success: boolean;
  path: Coord[] | null;
}
