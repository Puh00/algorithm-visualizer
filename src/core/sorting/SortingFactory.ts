import { Bar } from '../model/Bar';
import { bubbleSort } from './BubbleSort';
import { cocktailSort } from './CocktailSort';
import { heapSort } from './HeapSort';
import { insertionSort } from './InsertionSort';
import { mergeSort } from './MergeSort';
import { quicksort } from './QuickSort';
import { selectionSort } from './SelectionSort';

type sortingFunc = (
  bars: Bar[],
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
) => Promise<void>;

export const getSortingAlgorithm = (algorithm: string): sortingFunc => {
  if (algorithm === 'selection') return selectionSort;
  else if (algorithm === 'insertion') return insertionSort;
  else if (algorithm === 'bubble') return bubbleSort;
  else if (algorithm === 'quick') return quicksort;
  else if (algorithm === 'merge') return mergeSort;
  else if (algorithm === 'cocktail') return cocktailSort;
  else if (algorithm === 'heap') return heapSort;
  else throw new Error('Incorrect type for sorting algorithm');
};
