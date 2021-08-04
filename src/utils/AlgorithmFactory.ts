import React, { SetStateAction } from 'react';

import { Bar } from '../core/model/Bar';
import { Cell, Coord } from '../core/model/Cell';
import { Result } from '../core/model/PQEntry';
import { astar } from '../core/pathfinding/Astar';
import { UCS } from '../core/pathfinding/UCS';
import { bubbleSort } from '../core/sorting/BubbleSort';
import { cocktailSort } from '../core/sorting/CocktailSort';
import { heapSort } from '../core/sorting/HeapSort';
import { insertionSort } from '../core/sorting/InsertionSort';
import { mergeSort } from '../core/sorting/MergeSort';
import { quicksort } from '../core/sorting/QuickSort';
import { selectionSort } from '../core/sorting/SelectionSort';

type sortingFunc = (
  bars: Bar[],
  setState: React.Dispatch<SetStateAction<Bar[]>>,
  delay: number
) => Promise<void>;

type pathfindingFunc = (
  start: Coord,
  finish: Coord,
  grid: Cell[][],
  setGrid: React.Dispatch<SetStateAction<Cell[][]>>
) => Promise<Result>;

export const getSortingAlgorithm = (algorithmType: string): sortingFunc => {
  if (algorithmType === 'selection') return selectionSort;
  else if (algorithmType === 'insertion') return insertionSort;
  else if (algorithmType === 'bubble') return bubbleSort;
  else if (algorithmType === 'quick') return quicksort;
  else if (algorithmType === 'merge') return mergeSort;
  else if (algorithmType === 'cocktail') return cocktailSort;
  else if (algorithmType === 'heap') return heapSort;
  else throw new Error('Incorrect type for sorting algorithm');
};

export const getPathfindingAlgorithm = (
  algorithmType: string
): pathfindingFunc => {
  if (algorithmType === 'ucs') return UCS;
  else if (algorithmType === 'astar') return astar;
  else throw new Error('Incorrect type for pathfinding algorithm');
};
