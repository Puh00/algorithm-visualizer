import React from 'react';

import { sleep } from '../../utils';
import { Cell, Coord } from '../model/Cell';

// TODO: Move this to utils/Coordinates.ts
// Direction vectors: [Up, Right, Down, Left] offset by 2
const yDir = [-2, 0, 2, 0];
const xDir = [0, 2, 0, -2];

export const adjacentCoords = (c: Coord, n: number, m: number): Coord[] => {
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
// _______________________________

export const shuffle = <T>(array: T[]): T[] => {
  const temp = [...array];
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]]; // shorthand for swap
  }
  return temp;
};

const markAllCellsAsWalls = (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): void => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      grid[row][col].isWall = true;
    }
  }
  setGrid([...grid]);
};

// possible to merge carveHorizontally with carveVertically?
const carveHorizontaly = async (
  grid: Cell[][],
  x: number,
  y: number,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  for (let i = 0; i < 3; i++) {
    grid[y][x + i].isWall = false;
  }
  setGrid([...grid]);
  await sleep(1);
};

const carveVertically = async (
  grid: Cell[][],
  x: number,
  y: number,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  for (let i = 0; i < 3; i++) {
    grid[y + i][x].isWall = false;
  }
  setGrid([...grid]);
  await sleep(1);
};

const carvePassagesFrom = async (
  x: number,
  y: number,
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  visited: boolean[][]
): Promise<void> => {
  const neighbours = shuffle(
    adjacentCoords({ x: x, y: y }, grid.length, grid[0].length)
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
