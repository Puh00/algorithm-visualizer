import React from 'react';

import {
  adjacentCoords,
  carveHorizontaly,
  carveVertically,
  markAllCellsAsWalls,
} from '../../utils';
import { Cell } from '../model/Cell';

export const shuffle = <T>(array: T[]): T[] => {
  const temp = [...array];
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]]; // shorthand for swap
  }
  return temp;
};

const carvePassagesFrom = async (
  x: number,
  y: number,
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  visited: boolean[][]
): Promise<void> => {
  const neighbours = shuffle(
    adjacentCoords({ x: x, y: y }, grid.length, grid[0].length, 2)
  );
  visited[y][x] = true;

  for (const n of neighbours) {
    if (!visited[n.y][n.x]) {
      visited[n.y][n.x] = true;
      // check the direction between the coordinates
      if (Math.max(y, n.y) - Math.min(y, n.y) === 0)
        await carveHorizontaly(grid, Math.min(x, n.x), y, setGrid);
      else await carveVertically(grid, x, Math.min(y, n.y), setGrid);
      await carvePassagesFrom(n.x, n.y, grid, setGrid, visited);
    }
  }
};

export const RecursiveBacktracking = async (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  markAllCellsAsWalls(grid, setGrid);
  const visited: boolean[][] = Array.from(Array(grid.length), () =>
    Array(grid[0].length).fill(false)
  );
  await carvePassagesFrom(1, 1, grid, setGrid, visited);
};
