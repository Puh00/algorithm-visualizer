import {
  carvePassageBetweenAdjacentCoordinates,
  markAllCellsAsWalls,
  popRandomElementFromSet,
} from '../../utils';
import { Cell, Coord } from '../model/Cell';

interface Edge {
  p: Coord;
  q: Coord;
}

// Simple Tree data structure to see if two "sets" are disjoint
class Tree {
  parent: Tree | undefined;

  root(): Tree {
    return this.parent ? this.parent.root() : this;
  }

  isConnected(tree: Tree): boolean {
    return this.root() === tree.root();
  }

  connect(tree: Tree): void {
    tree.root().parent = this;
  }
}

// Returns a set of all possible edges in the given grid
const setOfPossibleEdges = (grid: Cell[][]): Set<Edge> => {
  const edges = new Set<Edge>();
  for (let row = 1; row < grid.length; row++) {
    if (row % 2 === 0) continue;
    for (let col = 1; col < grid[0].length; col++) {
      if (col % 2 === 0) continue;
      const x = col + 2;
      const y = row + 2;
      // East neighbour
      if (x < grid[0].length - 1)
        edges.add({ p: { x: col, y: row }, q: { x: x, y: row } });
      // South neighbour
      if (y < grid.length - 1)
        edges.add({ p: { x: col, y: row }, q: { x: col, y } });
    }
  }
  return edges;
};

export const Kruskal = async (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  markAllCellsAsWalls(grid, setGrid);

  // each cell is assigned a set to indicate who they belong to
  const sets: Tree[][] = Array.from(Array(grid.length), () =>
    Array.from(Array(grid[0].length), () => new Tree())
  );

  const edges = setOfPossibleEdges(grid);

  while (edges.size !== 0) {
    const { p, q } = popRandomElementFromSet(edges);
    const [set1, set2] = [sets[p.y][p.x], sets[q.y][q.x]];
    if (!set1.isConnected(set2)) {
      set1.connect(set2);
      await carvePassageBetweenAdjacentCoordinates(p, q, grid, setGrid);
    }
  }
};
