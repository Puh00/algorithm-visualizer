import React, { SetStateAction } from "react";
import { Sorter } from "./Sorter";
import { Bar } from "../model/Bar";
import { sleep } from "../../utils/Sleep";
import { RED, GREEN } from "../model/Color";

export class InsertionSort implements Sorter {
  private static instance: InsertionSort;

  private constructor() {}

  static getInstance(): InsertionSort {
    if (!this.instance) this.instance = new this();
    return this.instance;
  }

  public sort = async (
    bars: Bar[],
    setState: React.Dispatch<SetStateAction<Bar[]>>
  ): Promise<void> => {
    const n: number = bars.length;

    bars[0].color = RED;

    for (var i = 1; i < n; i++) {
      var value: Bar = bars[i];
      var hole: number = i;

      bars[hole].color = RED;

      while (hole > 0 && bars[hole - 1].num > value.num) {
        await sleep(150);
        bars[hole] = bars[hole - 1];

        bars[hole].color = GREEN;
        if (hole + 1 < bars.length) bars[hole + 1].color = RED;

        setState([...bars]);
        hole--;
      }

      bars[hole].color = RED;

      bars[hole] = value;
      setState([...bars]);
    }
  };
}