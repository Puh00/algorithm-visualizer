import React from "react";
import { Sorter } from "./Sorter";
import { Bar } from "../model/Bar";
import { sleep } from "../../utils/Sleep";
import { RED, BLUE } from "../model/Color";
import { Singleton } from "../../utils/Singleton";

export class MergeSort extends Singleton<MergeSort>() implements Sorter {
  sort = async (
    bars: Bar[],
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ): Promise<void> => {
    await this._sort(bars, 0, bars.length - 1, setState);
  };

  private _sort = async (
    bars: Bar[],
    start: number,
    end: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ) => {
    if (start === end) return;

    let mid = Math.floor((start + end) / 2);
    await this._sort(bars, start, mid, setState);
    await this._sort(bars, mid + 1, end, setState);

    await this.inPlaceMerge(bars, start, end, setState);
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
   */
  private inPlaceMerge = async (
    bars: Bar[],
    start: number,
    end: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ) => {
    let gap: number = end - start + 1;

    for (gap = this.nextGap(gap); gap > 0; gap = this.nextGap(gap)) {
      for (let i = start; i + gap <= end; i++) {
        let j = i + gap;
        if (bars[i].num > bars[j].num) {
          await this.swap(bars, i, j, setState);
          await this.animation(bars, i, j, setState);
        }
      }
    }
  };

  private nextGap = (gap: number): number =>
    gap <= 1 ? 0 : Math.ceil(gap / 2.0);

  private swap = async (
    arr: Bar[],
    x: number,
    y: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ): Promise<void> => {
    let temp: Bar = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
    setState([...arr]);
  };

  private animation = async (
    bars: Bar[],
    x: number,
    y: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ): Promise<void> => {
    bars[x].color = RED;
    bars[y].color = RED;

    setState([...bars]);
    await sleep(100);

    bars[x].color = BLUE;
    bars[y].color = BLUE;
  };
}
