import React, { SetStateAction } from "react";
import { Sorter } from "./Sorter";
import { Bar } from "../model/Bar";
import { sleep } from "../../utils/Sleep";

export class SelectionSort implements Sorter {
  private static instance: SelectionSort;

  private constructor() {}

  static getInstance(): SelectionSort {
    if (!this.instance) this.instance = new this();
    return this.instance;
  }

  public sort = async (
    bars: Bar[],
    setState: React.Dispatch<SetStateAction<Bar[]>>
  ): Promise<void> => {
    const n: number = bars.length;
    for (var i = 0; i < n - 1; i++) {
      var iMin: number = i;
      for (var j: number = i + 1; j < n; j++)
        if (bars[j].num < bars[iMin].num) iMin = j;

      const temp = bars[i];
      bars[i] = bars[iMin];
      bars[iMin] = temp;

      await sleep(500);
      setState([...bars]);
    }
  };
}
