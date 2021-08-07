import { sleep } from '.';
import { Cell } from '../core/model/Cell';

export const markAllCellsAsWalls = (
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

export const carveHorizontaly = async (
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

export const carveVertically = async (
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
