import React from 'react';

import { Cell } from '../model/Cell';
import { BinaryTree } from './BinaryTree';
import { Eller } from './Eller';
import { Kruskal } from './Kruskal';
import { Prim } from './Prim';
import { RecursiveBacktracking } from './RecursiveBacktracking';
import { RecursiveDivision } from './RecursiveDivision';

type mazeFunc = (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
) => Promise<void>;

export const getMazeAlgorithm = (algorithmType: string): mazeFunc => {
  if (algorithmType === 'division') return RecursiveDivision;
  else if (algorithmType === 'backtracking') return RecursiveBacktracking;
  else if (algorithmType === 'binary') return BinaryTree;
  else if (algorithmType === 'prim') return Prim;
  else if (algorithmType === 'kruskal') return Kruskal;
  else if (algorithmType === 'eller') return Eller;
  else throw new Error('Invalid argument for Maze Algorithm');
};
