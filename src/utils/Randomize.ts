import React, { SetStateAction } from 'react';

import { Bar } from '../core/model/Bar';
import { BLUE } from '../core/model/Color';

export const initBars = (
  num: number,
  setBars: React.Dispatch<SetStateAction<Bar[]>>
): void =>
  setBars(
    [...Array(num)].map(() => ({
      num: Math.floor(Math.random() * 80) + 1,
      color: BLUE,
    }))
  );
