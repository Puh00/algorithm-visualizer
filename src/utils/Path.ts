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
  console.log(path.length);
  return path;
};

// essentially reverse a linked list
export const reversePath = (entry: PQEntry): PQEntry => {
  let prev: PQEntry | null = null;
  let current: PQEntry | null = entry;
  let next: PQEntry | null = null;
  while (current != null) {
    next = current.backPointer;
    current.backPointer = prev;
    prev = current;
    current = next;
  }
  if (prev === null) throw new Error("Couldn't reverse path");
  return prev;
};

/**
 * Merges two PQEntries.
 * @param pqe1 First PQEntry.
 * @param pqe2 Second PQEntry.
 * @returns a merged PQEntry.
 */
export const mergePath = (pqe1: PQEntry, pqe2: PQEntry): PQEntry => {
  // traverse to head
  let pqe: PQEntry = pqe2;
  while (pqe.backPointer !== null) pqe = pqe.backPointer;
  // link together the PQEntries
  pqe.backPointer = pqe1;
  return pqe2;
};
