import React from 'react';

import PriorityQueue from 'ts-priority-queue';

import { adjacentCoords, extractPath, isSameCoord, sleep } from '../../utils';
import { Cell, Coord } from '../model/Cell';
import { PQEntry, Result } from '../model/PQEntry';

/**
 * Uniform-Cost Search
 * @param start the starting coordinate.
 * @param goal the target coordinate.
 * @param grid the grid that has the state of every cell.
 * @param setGrid react hook to update the state of the grid.
 * @returns the path from start to goal if the algorithm successfully found the target.
 */
export const UCS = async (
  start: Coord,
  goal: Coord,
  grid: Cell[][],
  setState: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<Result> => {
  const [n, m] = [grid.length, grid[0].length];

  // Auxiliary array keeping track of visited cells
  const visited: boolean[][] = Array.from(Array(n), () => Array(m).fill(false));

  const pq = new PriorityQueue<PQEntry>({
    comparator: (p1, p2) => p1.costToHere - p2.costToHere,
  });

  // Add starting cell to be searched
  pq.queue({ coord: start, costToHere: 0, backPointer: null });

  while (pq.length !== 0) {
    const entry = pq.dequeue();

    if (isSameCoord(entry.coord, goal))
      return { success: true, path: extractPath(entry) };

    if (
      !visited[entry.coord.y][entry.coord.x] &&
      !grid[entry.coord.y][entry.coord.x].isWall
    ) {
      visited[entry.coord.y][entry.coord.x] = true;

      // mark visited cells
      grid[entry.coord.y][entry.coord.x].isActive = true;
      setState([...grid]);
      await sleep(1);

      for (const c of adjacentCoords(entry.coord, n, m)) {
        const costToNext = entry.costToHere + 1;
        pq.queue({ coord: c, costToHere: costToNext, backPointer: entry });
      }
    }
  }
  return { success: false, path: null };
};
