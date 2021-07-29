import React, { SetStateAction } from "react";
import { Bar } from "../model/Bar";

export interface Sorter {
  /**
   * Sorts the bars in ascending order.
   * @param bars the bars to be sorted.
   * @param setState the hook to update the state and rerender the page.
   * @param delay Time in between each animation.
   */
  sort(
    bars: Bar[],
    setState: React.Dispatch<SetStateAction<Bar[]>>,
    delay: number
  ): Promise<void>;
}
