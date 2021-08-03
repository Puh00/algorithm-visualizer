import React from 'react';

import PriorityQueue from 'ts-priority-queue';

import { sleep } from '../../utils';
import { Cell, Coord } from '../model/Cell';

interface PQEntry {
  node: Coord;
  costToHere: number;
  backPointer: PQEntry | null;
}

export interface Result {
  success: boolean;
  path: Coord[] | null;
}

// Direction vectors: [Up, Right, Down, Left]
const yDir = [-1, 0, 1, 0];
const xDir = [0, 1, 0, -1];

// Returns adjacent coordinates that are within bounds
const adjacentCoords = (c: Coord, n: number, m: number): Coord[] => {
  const coords: Coord[] = [];
  for (let i = 0; i < 4; i++) {
    const row = c.y + yDir[i];
    const col = c.x + xDir[i];
    if (row >= 0 && col >= 0 && row < n && col < m) {
      coords.push({ x: col, y: row });
    }
  }
  return coords;
};

// Since Typescript compare by references...
const isSameCoord = (c1: Coord, c2: Coord): boolean =>
  c1.x === c2.x && c1.y === c2.y;

const extractPath = (entry: PQEntry): Coord[] => {
  const path = [];
  let pqe: PQEntry | null = entry;
  while (pqe !== null) {
    path.unshift(pqe.node);
    pqe = pqe.backPointer;
  }
  return path;
};

export const UCS = async (
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
    comparator: (p1, p2) => p1.costToHere - p2.costToHere,
  });

  // Add starting cell to be searched
  pq.queue({ node: start, costToHere: 0, backPointer: null });

  while (pq.length !== 0) {
    const entry = pq.dequeue();

    if (isSameCoord(entry.node, goal))
      return { success: true, path: extractPath(entry) };

    if (!visited[entry.node.y][entry.node.x]) {
      visited[entry.node.y][entry.node.x] = true;

      grid[entry.node.y][entry.node.x].isActive = true;
      setState([...grid]);
      await sleep(10);

      for (const c of adjacentCoords(entry.node, n, m)) {
        const costToNext = entry.costToHere + 1;
        pq.queue({ node: c, costToHere: costToNext, backPointer: entry });
      }
    }
  }
  return { success: false, path: null };
};
