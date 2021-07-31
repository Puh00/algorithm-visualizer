import React, { SetStateAction } from 'react';

import { Bar } from '../model/Bar';
import { bubbleSort } from './BubbleSort';
import { cocktailSort } from './CocktailSort';
import { insertionSort } from './InsertionSort';
import { mergeSort } from './MergeSort';
import { quicksort } from './QuickSort';
import { selectionSort } from './SelectionSort';

type func = (
  bars: Bar[],
  setState: React.Dispatch<SetStateAction<Bar[]>>,
  delay: number
) => Promise<void>;

export const getAlgorithm = (algorithmType: string): func => {
  let sorter: func;
  if (algorithmType === 'selection') sorter = selectionSort;
  else if (algorithmType === 'insertion') sorter = insertionSort;
  else if (algorithmType === 'bubble') sorter = bubbleSort;
  else if (algorithmType === 'quick') sorter = quicksort;
  else if (algorithmType === 'merge') sorter = mergeSort;
  else if (algorithmType === 'cocktail') sorter = cocktailSort;
  else throw new Error('Incorrect type for sorting algorithm');
  return sorter;
};
