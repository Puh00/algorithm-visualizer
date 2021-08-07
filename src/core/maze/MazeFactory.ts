import React from 'react';

import { Cell } from '../model/Cell';
import { RecursiveBacktracking } from './RecursiveBacktracking';
import { RecursiveDivision } from './RecursiveDivision';

type mazeFunc = (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
) => Promise<void>;

export const getMazeAlgorithm = (algorithmType: string): mazeFunc => {
  if (algorithmType === 'division') return RecursiveDivision;
  else if (algorithmType === 'backtracking') return RecursiveBacktracking;
  else throw new Error('Invalid argument for Maze Algorithm');
};
