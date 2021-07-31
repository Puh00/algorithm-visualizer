import React from 'react';

import { sleep } from '../../utils';
import { Bar } from '../model/Bar';
import { RED, GREEN, BLUE } from '../model/Color';

const swap = (
  arr: Bar[],
  x: number,
  y: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>
): void => {
  const temp: Bar = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
  setState([...arr]);
};

const animation = async (
  bars: Bar[],
  i: number,
  partitionIndex: number,
  start: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  bars[i].color = GREEN;
  bars[partitionIndex].color = RED;
  setState([...bars]);
  await sleep(delay);
  if (i !== start) {
    // only reset indices after start
    bars[i].color = BLUE;
    bars[partitionIndex].color = BLUE;
  }
};

/**
 * Median of three
 *
 * Puts the median at the last index of the array and returns the pivot value
 *
 * @param bars The array to be sorted.
 * @param start The left index of the array.
 * @param end The right index of the array.
 * @returns The pivot value.
 */
const getMedian = (
  bars: Bar[],
  start: number,
  end: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>
): number => {
  const midpoint: number = Math.floor((start + end) / 2);
  if (bars[start].num > bars[midpoint].num)
    swap(bars, start, midpoint, setState);
  if (bars[start] > bars[end]) swap(bars, start, end, setState);
  if (bars[midpoint] > bars[end]) swap(bars, midpoint, end, setState);

  swap(bars, midpoint, end, setState);
  return bars[end].num;
};

const partition = async (
  bars: Bar[],
  start: number,
  end: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<number> => {
  const pivotIndex: number = end;
  const pivot = getMedian(bars, start, end, setState);
  let partitionIndex = start;

  // Mark pivot
  bars[pivotIndex].color = RED;
  setState([...bars]);

  for (let i = start; i < end; i++) {
    if (bars[i].num <= pivot) {
      swap(bars, i, partitionIndex, setState);

      await animation(bars, i, partitionIndex, start, setState, delay);

      partitionIndex++;
    }
  }

  // Unmark pivot and starting pointer
  bars[start].color = BLUE;
  bars[pivotIndex].color = BLUE;
  setState([...bars]);

  swap(bars, partitionIndex, pivotIndex, setState);
  return partitionIndex;
};

const _sort = async (
  bars: Bar[],
  start: number,
  end: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  if (start < end) {
    const partitionIndex: number = await partition(
      bars,
      start,
      end,
      setState,
      delay
    );
    await _sort(bars, start, partitionIndex - 1, setState, delay);
    await _sort(bars, partitionIndex + 1, end, setState, delay);
  }
};

export const quicksort = async (
  bars: Bar[],
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  await _sort(bars, 0, bars.length - 1, setState, delay);
};
