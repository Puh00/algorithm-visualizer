import {
  adjacentCoords,
  carvePassageBetweenAdjacentCoordinates,
  markAllCellsAsWalls,
  popRandomElementFromSet,
  randomNumber,
  randomOddCoordinates,
} from '../../utils';
import { Cell, Coord } from '../model/Cell';

// Retrieves adjacent coordinates that are passages
const passages = (grid: Cell[][], c: Coord): Coord[] => {
  return adjacentCoords(c, grid.length, grid[0].length, 2).filter(
    (coord) => !grid[coord.y][coord.x].isWall
  );
};

// Retrieves adjacent coordinates that are walls
const walls = (grid: Cell[][], c: Coord): Coord[] => {
  return adjacentCoords(c, grid.length, grid[0].length, 2).filter(
    (coord) => grid[coord.y][coord.x].isWall
  );
};

// Add walls adjacent to the given coordinate, whilst also removing it
const mark = (coord: Coord, grid: Cell[][], frontier: Set<Coord>): void => {
  walls(grid, coord).forEach((item) => frontier.add(item));
  frontier.delete(coord);
};

export const Prim = async (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  markAllCellsAsWalls(grid, setGrid);

  const startCoord = randomOddCoordinates(grid.length, grid[0].length);
  const frontier = new Set<Coord>();

  // need to mark the first cell as path manually otherwise it's gonna crash
  grid[startCoord.y][startCoord.x].isWall = false;
  mark(startCoord, grid, frontier);

  while (frontier.size !== 0) {
    const p = popRandomElementFromSet(frontier);

    // Skip if it has already been converted to a path
    if (!grid[p.y][p.x].isWall) continue;

    const neighbours = passages(grid, p);
    if (neighbours.length !== 0) {
      const q = neighbours[randomNumber(0, neighbours.length - 1)];
      await carvePassageBetweenAdjacentCoordinates(p, q, grid, setGrid);
    }
    mark(p, grid, frontier);
  }
};
