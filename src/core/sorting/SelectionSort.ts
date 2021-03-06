import React, { SetStateAction } from 'react';

import { sleep, swap } from '../../utils';
import { Bar } from '../model/Bar';
import { RED, GREEN, BLUE } from '../model/Color';

export const selectionSort = async (
  bars: Bar[],
  setState: React.Dispatch<SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  const n: number = bars.length;
  for (let i = 0; i < n - 1; i++) {
    let iMin: number = i;
    for (let j: number = i + 1; j < n; j++) {
      if (bars[j].num < bars[iMin].num) iMin = j;

      if (j === n - 1) {
        // Mark the smallest element in the unsorted array
        bars[iMin].color = GREEN;
        setState([...bars]);
      }
    }

    swap(bars, i, iMin);

    await sleep(delay);
    bars[iMin].color = BLUE; // Unmark
    bars[i].color = RED;
    setState([...bars]);
  }

  // manually make last element red cause yeah
  bars[bars.length - 1].color = RED;
  setState([...bars]);
};
