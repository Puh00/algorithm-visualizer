import React, { SetStateAction } from 'react';

import { sleep } from '../../utils';
import { Bar } from '../model/Bar';
import { GREEN } from '../model/Color';

// Green progressive animation
export const finish = async (
  bars: Bar[],
  setState: React.Dispatch<SetStateAction<Bar[]>>
): Promise<void> => {
  for (let i = 0; i < bars.length; i++) {
    bars[i].color = GREEN;
    setState([...bars]);
    await sleep(1);
  }
};
