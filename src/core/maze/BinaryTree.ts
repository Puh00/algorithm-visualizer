import {
  carveHorizontaly,
  carveVertically,
  markAllCellsAsWalls,
  randomNumber,
} from '../../utils';
import { Cell } from '../model/Cell';

// Binary Tree with Southeast bias
export const BinaryTree = async (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  markAllCellsAsWalls(grid, setGrid);

  for (let row = 1; row < grid.length; row++) {
    if (row % 2 === 0) continue;
    for (let col = 1; col < grid[0].length; col++) {
      if (col % 2 === 0) continue;
      const dirs: string[] = [];
      // if within bounds add the direction
      if (col + 2 < grid[0].length - 1) dirs.push('EAST');
      if (row + 2 < grid.length - 1) dirs.push('SOUTH');

      const dir = dirs[randomNumber(0, dirs.length - 1)];
      if (dir === 'EAST') await carveHorizontaly(grid, col, row, setGrid);
      else if (dir === 'SOUTH') await carveVertically(grid, col, row, setGrid);
    }
  }
};
