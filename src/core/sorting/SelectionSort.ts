import React, { SetStateAction } from "react";
import { Sorter } from "./Sorter";
import { Bar } from "../model/Bar";
import { sleep } from "../../utils/Sleep";
import { RED, GREEN, BLUE } from "../model/Color";

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
      for (var j: number = i + 1; j < n; j++) {
        if (bars[j].num < bars[iMin].num) iMin = j;

        if (j === n - 1) {
          // Mark the smallest element in the unsorted array
          bars[iMin].color = GREEN;
          setState([...bars]);
        }
      }

      const temp = bars[i];
      bars[i] = bars[iMin];
      bars[iMin] = temp;

      await sleep(150);
      bars[iMin].color = BLUE; // Unmark
      bars[i].color = RED;
      setState([...bars]);
    }

    // manually make last element red cause yeah
    bars[bars.length - 1].color = RED;
    setState([...bars]);
  };
}
