import {
  carveHorizontaly,
  carveVertically,
  markAllCellsAsWalls,
  popRandomElementFromSet,
} from '../../utils';
import { Cell } from '../model/Cell';

const coinflip = (): boolean => Math.random() > 0.5;

const fillRow = (row: Array<Set<number> | null>): void => {
  for (let i = 0; i < row.length; i++) {
    if (i % 2 === 0) continue;
    if (!row[i]) row[i] = new Set([i]);
  }
};

// idc about performance when n is so small
const mergeSets = (
  set1: Set<number> | null,
  set2: Set<number> | null
): Set<number> => {
  if (!set1 || !set2) throw new Error('undefined sets boi');
  const merged: Set<number> = new Set();
  set1.forEach((value) => merged.add(value));
  set2.forEach((value) => merged.add(value));
  return merged;
};

const mergeCells = async (
  currentRow: Array<Set<number> | null>,
  set1: Set<number> | null,
  set2: Set<number> | null,
  col: number,
  row: number,
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  const merged = mergeSets(set1, set2);
  [currentRow[col], currentRow[col + 2]] = [merged, merged];
  currentRow.forEach((val, index) => {
    if (val === set1 || val === set2) currentRow[index] = merged;
  });
  await carveHorizontaly(grid, col, row, setGrid);
};

const pop = (s: Set<number> | null): void => {
  // if (!s) throw new Error('undef set');
  if (!s) return;
  console.log(s);
  for (let i = s.size; i > 1; i--) if (coinflip()) popRandomElementFromSet(s);
};

export const Eller = async (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  markAllCellsAsWalls(grid, setGrid);

  let currentRow: Array<Set<number> | null> = Array(grid[0].length).fill(null);

  // Horizontal work
  for (let row = 1; row < grid.length; row++) {
    if (row % 2 === 0) continue;

    // give empty cells a set
    fillRow(currentRow);

    if (row === grid.length - 2) console.log('LAST ROWJk');

    for (let col = 1; col < grid[0].length; col++) {
      if (col % 2 === 0) continue;

      // out of bounds
      if (!grid[row][col + 2]) continue;

      const [set1, set2] = [currentRow[col], currentRow[col + 2]];
      console.log(`x: ${col}, y: ${row}`);
      currentRow.forEach((val) => console.dir(val));
      console.log(set1);
      console.log(set2);

      if (row !== grid.length - 2) {
        // not last row
        if (set1 !== set2 && coinflip()) {
          // disjoint and random says yes
          await mergeCells(currentRow, set1, set2, col, row, grid, setGrid);
          console.log('merged!');
        }
      } else {
        // last row, connect all disjoint cells
        if (set1 !== set2)
          await mergeCells(currentRow, set1, set2, col, row, grid, setGrid);
      }
    }

    if (row === grid.length - 2) continue;

    // Vertical work
    console.log('current row');
    console.log(currentRow);
    // randomly pop all (except 1) elements from the set
    const unique = [...new Set(currentRow)];
    console.log('unique');
    console.log(unique);
    for (let i = 1; i < unique.length; i++) {
      pop(unique[i]);
    }
    console.log('popped');
    unique.forEach((val) => console.log(val));
    console.log('end');
    const tempRow: Array<Set<number> | null> = Array(grid[0].length).fill(null);

    // loop each set
    for (let i = 1; i < unique.length; i++) {
      const curr = unique[i];
      if (!curr) {
        console.log('curr empty');
        continue;
      }
      // loop each coordinate to carve
      for (const c of curr) {
        if (c === null) continue;
        await carveVertically(grid, c, row, setGrid);
        tempRow[c] = curr;
      }
    }
    currentRow = tempRow;
  }
};
