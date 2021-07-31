import React from 'react';

import { sleep, swap } from '../../utils';
import { Bar } from '../model/Bar';
import { RED, GREEN, BLUE } from '../model/Color';

const animation = async (
  bars: Bar[],
  j: number,
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  bars[j].color = RED;
  bars[j + 1].color = GREEN;
  setState([...bars]);
  await sleep(delay);
  bars[j].color = BLUE;
  bars[j + 1].color = BLUE;
};

export const bubbleSort = async (
  bars: Bar[],
  setState: React.Dispatch<React.SetStateAction<Bar[]>>,
  delay: number
): Promise<void> => {
  const n: number = bars.length;
  let greatestElementIndex: number = bars.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (bars[j].num > bars[j + 1].num) {
        swap(bars, j, j + 1);
        await animation(bars, j, setState, delay);
      }

      if (j === greatestElementIndex - 2) {
        // make the iteration's greatest element green (sorted partition)
        greatestElementIndex--;
        bars[greatestElementIndex].color = RED;
        setState([...bars]);
      }
    }
  }
};
