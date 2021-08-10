import { alignmentBetweenCoordinates, sleep } from '.';
import { Cell, Coord } from '../core/model/Cell';

/**
 * Convert each cell in the grid to a wall.
 * @param grid the grid that has the state of every cell.
 * @param setGrid react hook to update the state of the grid.
 */
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

/**
 * Carves to the right from the given coordinate.
 * @param grid the grid to carve upon.
 * @param x x coordinate.
 * @param y y coordinate.
 * @param setGrid react hook to update the state of the grid.
 */
export const carveHorizontaly = async (
  grid: Cell[][],
  x: number,
  y: number,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  for (let i = 0; i < 3; i++) grid[y][x + i].isWall = false;
  setGrid([...grid]);
  await sleep(1);
};

/**
 * Carves downwards from the given coordinate.
 * @param grid the grid to carve upon.
 * @param x x coordinate.
 * @param y y coordinate.
 * @param setGrid react hook to update the state of the grid.
 */
export const carveVertically = async (
  grid: Cell[][],
  x: number,
  y: number,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  for (let i = 0; i < 3; i++) grid[y + i][x].isWall = false;
  setGrid([...grid]);
  await sleep(1);
};

/**
 * Carve a passage between two coordinates if and only if they are adjacent
 * and vertically or horizontally aligned.
 * @param p starting coordinate.
 * @param q target coordinate.
 * @param grid the grid to carve upon.
 * @param setGrid react hook to update the state.
 */
export const carvePassageBetweenAdjacentCoordinates = async (
  p: Coord,
  q: Coord,
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  const alignment = alignmentBetweenCoordinates(p, q);
  if (alignment === 'HORIZONTAL')
    // current cell and neighbour are horizontally aligned
    await carveHorizontaly(grid, Math.min(p.x, q.x), p.y, setGrid);
  else if (alignment === 'VERTICAL')
    // ...vertically aligned
    await carveVertically(grid, p.x, Math.min(p.y, q.y), setGrid);
};
