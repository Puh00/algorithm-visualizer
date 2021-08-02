import React from 'react';

import { sleep } from '../../utils';
import { Cell } from '../model/Cell';
import { BLUE, RED } from '../model/Color';

// Direction vectors: [Left, Up, Right, Down]
const xDir = [-1, 0, 1, 0];
const yDir = [0, 1, 0, -1];

const isValid = (
  gridSize: number,
  visited: boolean[][],
  row: number,
  col: number
): boolean => {
  // within bounds
  if (row < 0 || col < 0 || row >= gridSize || col >= gridSize) return false;

  if (visited[row][col]) return false;
  return true;
};

export const resetGrid = (size: number): Cell[][] => {
  return [...Array(size)].map(() => {
    return [...Array(size)].map(() => ({
      color: BLUE,
    }));
  });
};

export const DFS = async (
  row: number,
  col: number,
  grid: Cell[][],
  setState: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  const visited: boolean[][] = Array.from(Array(grid.length), () =>
    Array(grid.length).fill(false)
  );

  const stack = [];
  stack.push([row, col]);

  while (stack.length !== 0) {
    const curr = stack.pop();
    if (!curr) {
      console.log('no data');
      continue;
    }
    row = curr[0];
    col = curr[1];

    if (!isValid(grid.length, visited, row, col)) continue;
    console.log(`r: ${row}, c: ${col}`);

    visited[row][col] = true;

    grid[row][col].color = RED;
    setState([...grid]);
    await sleep(1000);
    grid[row][col].color = BLUE;
    setState([...grid]);

    // push adjacent cells
    for (let i = 0; i < 4; i++) {
      const x = row + xDir[i];
      const y = col + yDir[i];
      stack.push([x, y]);
      console.log(`PUSH: x: ${x}, y: ${y}`);
    }
  }
  console.log('End of trail');
};
