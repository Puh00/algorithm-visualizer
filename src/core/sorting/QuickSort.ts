import React from "react";
import { Sorter } from "./Sorter";
import { Bar } from "../model/Bar";
import { sleep } from "../../utils/Sleep";
import { RED, GREEN, BLUE } from "../model/Color";
import { Singleton } from "../../utils/Singleton";

export class QuickSort extends Singleton<QuickSort>() implements Sorter {
  sort = async (
    bars: Bar[],
    setState: React.Dispatch<React.SetStateAction<Bar[]>>,
    delay: number
  ): Promise<void> => {
    await this._sort(bars, 0, bars.length - 1, setState, delay);
  };

  private _sort = async (
    bars: Bar[],
    start: number,
    end: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>,
    delay: number
  ) => {
    if (start < end) {
      let partitionIndex: number = await this.partition(
        bars,
        start,
        end,
        setState,
        delay
      );
      await this._sort(bars, start, partitionIndex - 1, setState, delay);
      await this._sort(bars, partitionIndex + 1, end, setState, delay);
    }
  };

  private partition = async (
    bars: Bar[],
    start: number,
    end: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>,
    delay: number
  ): Promise<number> => {
    let pivotIndex: number = end;
    let pivot = this.getMedian(bars, start, end, setState);
    let partitionIndex = start;

    // Mark pivot
    bars[pivotIndex].color = RED;
    setState([...bars]);

    for (let i = start; i < end; i++) {
      if (bars[i].num <= pivot) {
        this.swap(bars, i, partitionIndex, setState);

        await this.animation(bars, i, partitionIndex, start, setState, delay);

        partitionIndex++;
      }
    }

    // Unmark pivot and starting pointer
    bars[start].color = BLUE;
    bars[pivotIndex].color = BLUE;
    setState([...bars]);

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

  private animation = async (
    bars: Bar[],
    i: number,
    partitionIndex: number,
    start: number,
    setState: React.Dispatch<React.SetStateAction<Bar[]>>,
    delay: number
  ): Promise<void> => {
    bars[i].color = GREEN;
    bars[partitionIndex].color = RED;
    setState([...bars]);
    await sleep(delay);
    if (i !== start) {
      // only reset indices after start
      bars[i].color = BLUE;
      bars[partitionIndex].color = BLUE;
    }
  };
}
