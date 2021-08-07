/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { sleep } from '../../utils';
import { Cell } from '../model/Cell';

// inclusive: [min, max]
const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

const addHWall = async (
  grid: Cell[][],
  minX: number,
  maxX: number,
  y: number,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  visited: boolean[][]
): Promise<void> => {
  const hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;
  for (let i = minX; i <= maxX; i++) {
    if (i === hole) visited[y][i] = true;
    else if (!visited[y][i] && !grid[y][i].isStart && !grid[y][i].isFinish)
      grid[y][i].isWall = true;
  }
  setGrid([...grid]);
  await sleep(1);
};

const addVWall = async (
  grid: Cell[][],
  minY: number,
  maxY: number,
  x: number,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  visited: boolean[][]
): Promise<void> => {
  const hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
  for (let i = minY; i <= maxY; i++) {
    if (i === hole) visited[i][x] = true;
    else if (!visited[i][x] && !grid[i][x].isStart && !grid[i][x].isFinish)
      grid[i][x].isWall = true;
  }
  setGrid([...grid]);
  await sleep(1);
};

const addOuterWalls = async (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  // vertical walls
  for (let i = 0; i < grid.length; i++) {
    grid[i][0].isWall = true;
    grid[i][grid[0].length - 1].isWall = true;
  }
  // horizontal walls
  for (let i = 0; i < grid[0].length; i++) {
    grid[0][i].isWall = true;
    grid[grid.length - 1][i].isWall = true;
  }
  setGrid([...grid]);
};

const divideHorizontally = async (
  grid: Cell[][],
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  visited: boolean[][]
): Promise<void> => {
  const y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
  await addHWall(grid, minX, maxX, y, setGrid, visited);
  // upper chamber
  await divide(grid, minX, maxX, minY, y - 1, setGrid, visited);
  // lower chamber
  await divide(grid, minX, maxX, y + 1, maxY, setGrid, visited);
};

const divideVertically = async (
  grid: Cell[][],
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  visited: boolean[][]
): Promise<void> => {
  const x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
  await addVWall(grid, minY, maxY, x, setGrid, visited);
  // left chamber
  await divide(grid, minX, x - 1, minY, maxY, setGrid, visited);
  // right chamber
  await divide(grid, x + 1, maxX, minY, maxY, setGrid, visited);
};

const divide = async (
  grid: Cell[][],
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  visited: boolean[][]
): Promise<void> => {
  if (maxX - minX < 2 || maxY - minY < 2) return;
  if (maxX - minX < maxY - minY) {
    divideHorizontally(grid, minX, maxX, minY, maxY, setGrid, visited);
  } else if (maxY - minY < maxX - minX) {
    divideVertically(grid, minX, maxX, minY, maxY, setGrid, visited);
  } else {
    if (randomNumber(0, 1) === 0)
      divideHorizontally(grid, minX, maxX, minY, maxY, setGrid, visited);
    else divideVertically(grid, minX, maxX, minY, maxY, setGrid, visited);
  }
};

export const RecursiveDivision = async (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  const visited: boolean[][] = Array.from(Array(grid.length), () =>
    Array(grid[0].length).fill(false)
  );
  await addOuterWalls(grid, setGrid);
  await divide(
    grid,
    1,
    grid[0].length - 2,
    1,
    grid.length - 2,
    setGrid,
    visited
  );
};
