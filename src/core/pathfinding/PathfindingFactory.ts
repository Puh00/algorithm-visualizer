import { Cell, Coord } from '../model/Cell';
import { Result } from '../model/PQEntry';
import { astar } from './Astar';
import { Bidirectional } from './Bidirectional';
import { UCS } from './UCS';

type pathfindingFunc = (
  start: Coord,
  finish: Coord,
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>,
  heuristic?: string
) => Promise<Result>;

export const getPathfindingAlgorithm = (algorithm: string): pathfindingFunc => {
  if (algorithm === 'ucs') return UCS;
  else if (algorithm === 'astar') return astar;
  else if (algorithm === 'bidirectional') return Bidirectional;
  else throw new Error('Incorrect type for pathfinding algorithm');
};
