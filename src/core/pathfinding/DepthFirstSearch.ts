import React from 'react';

import { sleep } from '../../utils';
import { Cell } from '../model/Cell';

// Direction vectors: [Up, Right, Down, Left]
const yDir = [-1, 0, 1, 0];
const xDir = [0, 1, 0, -1];
type coord = {
  x: number;
  y: number;
};

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

export const DFS = async (
  row: number,
  col: number,
  grid: Cell[][],
  setState: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  const visited: boolean[][] = Array.from(Array(grid.length), () =>
    Array(grid.length).fill(false)
  );

  const stack: coord[] = [];
  stack.push({ x: row, y: col });

  while (stack.length !== 0) {
    const curr = stack.pop();
    if (!curr) {
      console.log('no data');
      continue;
    }
    row = curr.x;
    col = curr.y;

    if (!isValid(grid.length, visited, row, col)) continue;
    console.log(`r: ${row}, c: ${col}`);

    visited[row][col] = true;

    grid[row][col].isActive = true;
    setState([...grid]);
    await sleep(1000);
    grid[row][col].isActive = false;
    setState([...grid]);

    // push adjacent cells
    for (let i = 0; i < 4; i++) {
      const y = row + yDir[i];
      const x = col + xDir[i];
      stack.push({ x: x, y: y });
      console.log(`PUSH: row: ${y}, col: ${x}`);
    }
  }
  console.log('End of trail');
};
