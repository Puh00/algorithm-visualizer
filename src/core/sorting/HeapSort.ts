import React from 'react';

import { sleep, swap } from '../../utils';
import { Bar } from '../model/Bar';
import { RED, BLUE } from '../model/Color';

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
  setState([...bars]);
};

const heapify = async (
  bars: Bar[],
  n: number,
  i: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && bars[left].num > bars[largest].num) largest = left;

  if (right < n && bars[right].num > bars[largest].num) largest = right;

  if (largest !== i) {
    swap(bars, i, largest);
    await animation(bars, i, largest, setState, delay);
    // recursively heapify sub-tree
    await heapify(bars, n, largest, setState, delay);
  }
};

export const heapSort = async (
  bars: Bar[],
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  const n = bars.length;

  // build max-heap
  for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
    await heapify(bars, n, i, setState, delay);
  }

  for (let i = n - 1; i > 0; i--) {
    // Move root to the end
    swap(bars, 0, i, setState);

    // mark sorted partition
    bars[i].color = RED;

    // heapify reduced heap
    await heapify(bars, i, 0, setState, delay);
  }
};
