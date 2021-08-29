import React from 'react';

import PriorityQueue from 'ts-priority-queue';

import {
  adjacentCoords,
  extractPath,
  mergePath,
  reversePath,
  sleep,
} from '../../utils';
import { Cell, Coord } from '../model/Cell';
import { PQEntry, Result } from '../model/PQEntry';

/**
 * Bidirectional Uniform-Cost Search
 * @param start the starting coordinate.
 * @param goal the target coordinate.
 * @param grid the grid that has the state of every cell.
 * @param setGrid react hook to update the state of the grid.
 * @returns the path from start to goal if the algorithm successfully found the target.
 */
export const Bidirectional = async (
  start: Coord,
  goal: Coord,
  grid: Cell[][],
  setState: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<Result> => {
  const [n, m] = [grid.length, grid[0].length];
  // flip-flop variable saying if the current pqueue is the original or the reversed
  let originalPqueue = true;

  // original pqueue
  let visited: PQEntry[][] = Array.from(Array(n), () => Array(m).fill(null));
  let pqueue = new PriorityQueue<PQEntry>({
    comparator: (p1, p2) => p1.costToHere - p2.costToHere,
  });
  pqueue.queue({ coord: start, costToHere: 0, backPointer: null });

  // reversed pqueue
  let visitedR: PQEntry[][] = Array.from(Array(n), () => Array(m).fill(null));
  let pqueueR = new PriorityQueue<PQEntry>({
    comparator: (p1, p2) => p1.costToHere - p2.costToHere,
  });
  pqueueR.queue({ coord: goal, costToHere: 0, backPointer: null });

  while (pqueue.length !== 0 && pqueueR.length !== 0) {
    const entry = pqueue.dequeue();

    if (visitedR[entry.coord.y][entry.coord.x]) {
      // found a path
      const entryR = reversePath(visitedR[entry.coord.y][entry.coord.x]);
      // reverse the merged path if the current pqueue is not the original one
      const mergedPQEntry = originalPqueue
        ? mergePath(entry, entryR)
        : reversePath(mergePath(entry, entryR));
      return { success: true, path: extractPath(mergedPQEntry) };
    }

    if (
      !visited[entry.coord.y][entry.coord.x] &&
      !grid[entry.coord.y][entry.coord.x].isWall
    ) {
      visited[entry.coord.y][entry.coord.x] = entry;

      // mark visited cells
      grid[entry.coord.y][entry.coord.x].isActive = true;
      setState([...grid]);
      await sleep(1);

      for (const c of adjacentCoords(entry.coord, n, m)) {
        const costToNext = entry.costToHere + 1;
        pqueue.queue({ coord: c, costToHere: costToNext, backPointer: entry });
      }
    }

    // swap sides
    originalPqueue = !originalPqueue;
    [pqueue, pqueueR] = [pqueueR, pqueue];
    [visited, visitedR] = [visitedR, visited];
  }
  return { success: false, path: null };
};
