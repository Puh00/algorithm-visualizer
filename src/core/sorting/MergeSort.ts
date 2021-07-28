import React from "react";
import { Sorter } from "./Sorter";
import { Bar } from "../model/Bar";
import { sleep } from "../../utils/Sleep";
import { RED, GREEN, BLUE } from "../model/Color";
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
        if (bars[i].num > bars[j].num) await this.swap(bars, i, j, setState);
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
    await sleep(100);
  };
}
