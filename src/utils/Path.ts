import { Coord } from '../core/model/Cell';
import { PQEntry } from '../core/model/PQEntry';

/**
 * Extract the full path from start to goal
 * @param entry the final priority queue entry
 * @returns the path from start to goal as a list of cells
 */
export const extractPath = (entry: PQEntry): Coord[] => {
  const path = [];
  let pqe: PQEntry | null = entry;
  while (pqe !== null) {
    path.unshift(pqe.coord);
    pqe = pqe.backPointer;
  }
  return path;
};
