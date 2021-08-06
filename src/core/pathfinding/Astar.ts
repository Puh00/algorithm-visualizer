import React from 'react';

import PriorityQueue from 'ts-priority-queue';

import { adjacentCoords, extractPath, isSameCoord, sleep } from '../../utils';
import { Cell, Coord } from '../model/Cell';
import { PQEntry, Result } from '../model/PQEntry';

// Euclidian distance between the coordinates
const guessCost = (p: Coord, q: Coord): number => {
  return Math.hypot(p.x - q.x, p.y - q.y);
};

export const astar = async (
  start: Coord,
  goal: Coord,
  grid: Cell[][],
  setState: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<Result> => {
  // n * m length of grid
  const n = grid.length;
  const m = grid[0].length;

  // Auxiliary array keeping track of visited cells
  const visited: boolean[][] = Array.from(Array(n), () => Array(m).fill(false));

  const pq = new PriorityQueue<PQEntry>({
    comparator: (p1, p2) => {
      // bug: 'if (p1.guessCost)' will return false if p1.guessCost is 0
      if (
        typeof p1.guessCost !== 'undefined' &&
        typeof p2.guessCost !== 'undefined'
      )
        return p1.costToHere + p1.guessCost - (p2.costToHere + p2.guessCost);
      else throw new Error("Undefined field 'guessCost' in PQEntry");
    },
  });

  // Add starting cell to be searched
  pq.queue({
    coord: start,
    costToHere: 0,
    backPointer: null,
    guessCost: guessCost(start, goal),
  });

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
        pq.queue({
          coord: c,
          costToHere: costToNext,
          backPointer: entry,
          guessCost: guessCost(c, goal),
        });
      }
    }
  }
  return { success: false, path: null };
};
