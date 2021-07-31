import React from 'react';

import { sleep, swap } from '../../utils';
import { Bar } from '../model/Bar';
import { RED, GREEN, BLUE } from '../model/Color';

export const cocktailSort = async (
  bars: Bar[],
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  let swapped = true;
  let start = 0;
  let end = bars.length;

  while (swapped) {
    swapped = false;

    // bottom to top
    for (let i = start; i < end - 1; i++) {
      if (bars[i].num > bars[i + 1].num) {
        swap(bars, i, i + 1);
        bars[i].color = BLUE;
        bars[i + 1].color = GREEN;
        setState([...bars]);
        swapped = true;
      }
      bars[i].color = BLUE;
      bars[i + 1].color = GREEN;
      setState([...bars]);
      await sleep(delay);
    }

    // mark this iterations greatest element
    bars[end - 1].color = RED;
    setState([...bars]);

    // exit if sorted
    if (!swapped) break;

    swapped = false;
    end--;

    // top to bottom
    for (let i = end - 1; i >= start; i--) {
      if (bars[i].num > bars[i + 1].num) {
        swap(bars, i, i + 1);
        swapped = true;
      }
      if (i !== end - 1) bars[i + 1].color = BLUE;
      bars[i].color = GREEN;
      setState([...bars]);
      await sleep(delay);
    }
    // mark this iterations smallest element
    bars[start].color = RED;
    setState([...bars]);

    start++;
  }
};
