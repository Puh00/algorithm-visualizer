import React from "react";
import { Sorter } from "./Sorter";
import { Bar } from "../model/Bar";
import { sleep } from "../../utils/Sleep";
import { RED, GREEN, BLUE } from "../model/Color";
import { Singleton } from "../../utils/Singleton";

export class QuickSort extends Singleton<QuickSort>() implements Sorter {
  sort = async (
    bars: Bar[],
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ): Promise<void> => {
    this._sort(bars, 0, bars.length - 1, setState);
  };
  private _sort = (
    bars: Bar[],
    start: number,
    end: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ) => {
    if (start < end) {
      let partitionIndex: number = this.partition(bars, start, end, setState);
      this._sort(bars, start, partitionIndex - 1, setState);
      this._sort(bars, partitionIndex + 1, end, setState);
    }
  };

  private partition = (
    bars: Bar[],
    start: number,
    end: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ): number => {
    let pivotIndex: number = end;
    let pivot = this.getMedian(bars, start, end, setState);
    let partitionIndex = start;

    for (let i = start; i < end; i++) {
      if (bars[i].num <= pivot) {
        this.swap(bars, i, partitionIndex, setState);
        partitionIndex++;
      }
    }

    this.swap(bars, partitionIndex, pivotIndex, setState);
    return partitionIndex;
  };

  /**
   * Median of three
   *
   * Puts the median at the last index of the array and returns the pivot value
   *
   * @param bars The array to be sorted.
   * @param start The left index of the array.
   * @param end The right index of the array.
   * @returns The pivot value.
   */
  private getMedian = (
    bars: Bar[],
    start: number,
    end: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ): number => {
    let midpoint: number = Math.floor((start + end) / 2);
    if (bars[start].num > bars[midpoint].num)
      this.swap(bars, start, midpoint, setState);
    if (bars[start] > bars[end]) this.swap(bars, start, end, setState);
    if (bars[midpoint] > bars[end]) this.swap(bars, midpoint, end, setState);

    this.swap(bars, midpoint, end, setState);
    return bars[end].num;
  };

  private swap = (
    arr: Bar[],
    x: number,
    y: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ): void => {
    let temp: Bar = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
    setState([...arr]);
  };
}
