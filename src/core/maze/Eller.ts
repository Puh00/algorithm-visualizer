import {
  carveHorizontaly,
  carveVertically,
  markAllCellsAsWalls,
  popRandomElementFromSet,
} from '../../utils';
import { Cell } from '../model/Cell';

const coinflip = (): boolean => Math.random() > 0.5;

/**
 * Replaces all of the null values in the current row with a new set
 * @param sets the array containing the sets of the current row.
 */
const populate = (sets: Array<Set<number> | null>): void => {
  for (let i = 1; i < sets.length; i += 2) if (!sets[i]) sets[i] = new Set([i]);
};

const _mergeSets = (
  set1: Set<number> | null,
  set2: Set<number> | null
): Set<number> => {
  if (!set1 || !set2) throw new Error("Can't merge undefined sets");
  const merged: Set<number> = new Set();
  set1.forEach((value) => merged.add(value));
  set2.forEach((value) => merged.add(value));
  return merged;
};

/**
 * Merge two sets if and only if they are disjoint.
 *
 * Also updates previous sets to match with the newly merged set.
 *
 * @param sets the array containing the sets of the current row.
 * @param set1 the first coordinate's set.
 * @param set2 the second coordinate's set.
 * @param col x coordinate.
 * @param row y coordinate.
 * @param grid the grid to work with.
 * @param setGrid react hook to update the state of the grid.
 */
const mergeSets = async (
  sets: Array<Set<number> | null>,
  set1: Set<number> | null,
  set2: Set<number> | null,
  col: number,
  row: number,
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  if (set1 === set2) return;
  const merged = _mergeSets(set1, set2);
  [sets[col], sets[col + 2]] = [merged, merged];
  // manually update earlier identical sets
  sets.forEach((val, index) => {
    if (val === set1 || val === set2) sets[index] = merged;
  });
  await carveHorizontaly(grid, col, row, setGrid);
};

/**
 * For each element in the set, randomly decide whether to remove it or not.
 * Ensures that there is at least one element left in the set.
 * @param s the set to manipulate.
 */
const removeRandomElements = (s: Set<number> | null): void => {
  if (!s) throw new Error("Can't pop undefined set");
  for (let i = s.size; i > 1; i--) if (coinflip()) popRandomElementFromSet(s);
};

const horizontalConnections = async (
  sets: Array<Set<number> | null>,
  row: number,
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  for (let col = 1; col < grid[0].length; col += 2) {
    // skip if out of bounds
    if (!grid[row][col + 2]) continue;

    const [set1, set2] = [sets[col], sets[col + 2]];

    if (row !== grid.length - 2) {
      if (coinflip())
        // randomly join adjacent cells, given that they are disjoint
        await mergeSets(sets, set1, set2, col, row, grid, setGrid);
    }
    // last row, connect all adjacent disjoint sets
    else await mergeSets(sets, set1, set2, col, row, grid, setGrid);
  }
};

/**
 * Randomly create vertical connections downward to the next row
 *
 * @param sets the array containing the state of the current row.
 * @param row y coordinate.
 * @param grid the grid to work with.
 * @param setGrid react hook to update the state of the grid.
 * @returns the sets in the next row.
 */
const verticalConnections = async (
  sets: Array<Set<number> | null>,
  row: number,
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<Array<Set<number> | null>> => {
  const unique = [...new Set(sets)];
  for (let i = 1; i < unique.length; i++) removeRandomElements(unique[i]);

  const nextRow: Array<Set<number> | null> = Array(grid[0].length).fill(null);

  for (let i = 1; i < unique.length; i++) {
    const set = unique[i];
    if (!set) throw new Error('Undefined set');
    for (const col of set) {
      await carveVertically(grid, col, row, setGrid);
      nextRow[col] = set;
    }
  }
  return nextRow;
};

export const Eller = async (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  markAllCellsAsWalls(grid, setGrid);
  const [n, m] = [grid.length, grid[0].length];

  // each cell in the row belongs to a set
  // cells that share a set, also shares a path
  let sets: Array<Set<number> | null> = Array(m).fill(null);

  for (let row = 1; row < n; row += 2) {
    // give undiscovered cells from previous iteration a set
    populate(sets);

    await horizontalConnections(sets, row, grid, setGrid);
    // last row: skip creating vertical connections at the bottom of the grid
    if (row === n - 2) return;
    sets = await verticalConnections(sets, row, grid, setGrid);
  }
};
