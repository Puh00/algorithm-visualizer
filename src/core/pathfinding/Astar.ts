import React from 'react';

import PriorityQueue from 'ts-priority-queue';

import { adjacentCoords, extractPath, isSameCoord, sleep } from '../../utils';
import { Cell, Coord } from '../model/Cell';
import { PQEntry, Result } from '../model/PQEntry';

// _____Different tie breakers_____
/**
 * Calulates the Manhattan distance between the given coordinates.
 * @param p the first coordinate.
 * @param q the second coordinate.
 * @returns the Manhattan distance between the two coordinates.
 */
const manhattanDistance = (p: Coord, q: Coord): number =>
  Math.abs(p.x - q.x) + Math.abs(p.y - q.y);

/**
 * Nudge the scale of [h] slightly so that the heuristic favours nodes closer to the goal.
 * - Inadmissible heuristic
 * From {@link https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html}
 * @param p the current coordinate.
 * @param q the target coordinate.
 * @returns modified heuristic.
 */
const fudge = (p: Coord, q: Coord): number => {
  const heuristic = manhattanDistance(p, q);
  return heuristic * (1 + 1 / 1000);
};

/**
 * Heuristic that prefers a path that lies along the straight line from the start to the
 * goal
 * - Inadmissible heuristic
 * From {@link https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html}
 * @param start starting coordinate.
 * @param p the current coordinate.
 * @param q the target coordinate.
 * @returns modified heuristic.
 */
const crossProduct = (start: Coord, p: Coord, q: Coord): number => {
  const dx1 = p.x - q.x;
  const dy1 = p.y - q.y;
  const dx2 = start.x - q.x;
  const dy2 = start.y - q.y;
  const cross = Math.abs(dx1 * dy2 - dx2 * dy1);
  const heuristic = manhattanDistance(p, q);
  return heuristic + cross * 0.001;
};

// Delegate calculation of heuristic
const guessCost = (
  start: Coord,
  p: Coord,
  q: Coord,
  heuristic = 'manhattan'
): number => {
  if (heuristic === 'manhattan') return manhattanDistance(p, q);
  else if (heuristic === 'fudge') return fudge(p, q);
  else if (heuristic === 'cross') return crossProduct(start, p, q);
  else throw new Error('Invalid heuristic type');
};

/**
 * A* search algorithm
 * @param start the starting coordinate.
 * @param goal the target coordinate.
 * @param grid the grid that has the state of every cell.
 * @param setGrid react hook to update the state of the grid.
 * @returns the path from start to goal if the algorithm successfully found the target.
 */
export const astar = async (
  start: Coord,
  goal: Coord,
  grid: Cell[][],
  setState: React.Dispatch<React.SetStateAction<Cell[][]>>,
  heuristic?: string
): Promise<Result> => {
  const [n, m] = [grid.length, grid[0].length];

  // Auxiliary array keeping track of visited cells
  const visited: boolean[][] = Array.from(Array(n), () => Array(m).fill(false));

  const pq = new PriorityQueue<PQEntry>({
    comparator: (p1, p2) => {
      // bug: 'if (p1.guessCost)' will return false if p1.guessCost is 0
      if (
        typeof p1.guessCost !== 'undefined' &&
        typeof p2.guessCost !== 'undefined'
      )
        return p1.costToHere + p1.guessCost - (p2.costToHere + p2.guessCost);
      else throw new Error("Undefined field 'guessCost' in PQEntry");
    },
  });

  // Add starting cell to be searched
  pq.queue({
    coord: start,
    costToHere: 0,
    backPointer: null,
    guessCost: guessCost(start, start, goal, heuristic),
  });

  while (pq.length !== 0) {
    const entry = pq.dequeue();

    if (isSameCoord(entry.coord, goal))
      return { success: true, path: extractPath(entry) };

    if (
      !visited[entry.coord.y][entry.coord.x] &&
      !grid[entry.coord.y][entry.coord.x].isWall
    ) {
      visited[entry.coord.y][entry.coord.x] = true;

      // mark visited cells
      grid[entry.coord.y][entry.coord.x].isActive = true;
      setState([...grid]);
      await sleep(1);

      for (const c of adjacentCoords(entry.coord, n, m)) {
        const costToNext = entry.costToHere + 1;
        pq.queue({
          coord: c,
          costToHere: costToNext,
          backPointer: entry,
          guessCost: guessCost(start, c, goal, heuristic),
        });
      }
    }
  }
  return { success: false, path: null };
};
