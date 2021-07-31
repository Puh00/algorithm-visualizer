import React from 'react';

import { sleep } from '../../utils';
import { Bar } from '../model/Bar';
import { RED, BLUE } from '../model/Color';

const nextGap = (gap: number): number => (gap <= 1 ? 0 : Math.ceil(gap / 2.0));

const swap = async (
  arr: Bar[],
  x: number,
  y: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>
): Promise<void> => {
  const temp: Bar = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
  setState([...arr]);
};

const animation = async (
  bars: Bar[],
  x: number,
  y: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  bars[x].color = RED;
  bars[y].color = RED;

  setState([...bars]);
  await sleep(delay);

  bars[x].color = BLUE;
  bars[y].color = BLUE;
};

/**
 * In-place Merge Sort
 *
 * Approach 2 from {@link https://www.geeksforgeeks.org/in-place-merge-sort/}.
 *
 * @param bars The array to be sorted.
 * @param start The left index of the array.
 * @param end The right index of the array.
 * @param setState Hook for changing the state.
 * @param delay Time in between each animation.
 */
const inPlaceMerge = async (
  bars: Bar[],
  start: number,
  end: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  let gap: number = end - start + 1;

  for (gap = nextGap(gap); gap > 0; gap = nextGap(gap)) {
    for (let i = start; i + gap <= end; i++) {
      const j = i + gap;
      if (bars[i].num > bars[j].num) {
        await swap(bars, i, j, setState);
        await animation(bars, i, j, setState, delay);
      }
    }
  }
};

const _sort = async (
  bars: Bar[],
  start: number,
  end: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  if (start === end) return;

  const mid = Math.floor((start + end) / 2);
  await _sort(bars, start, mid, setState, delay);
  await _sort(bars, mid + 1, end, setState, delay);

  await inPlaceMerge(bars, start, end, setState, delay);
};

export const mergeSort = async (
  bars: Bar[],
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  await _sort(bars, 0, bars.length - 1, setState, delay);
};
