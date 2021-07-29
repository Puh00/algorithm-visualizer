import React from "react";
import { Sorter } from "./Sorter";
import { Bar } from "../model/Bar";
import { sleep } from "../../utils/Sleep";
import { RED, GREEN, BLUE } from "../model/Color";
import { Singleton } from "../../utils/Singleton";

export class BubbleSort extends Singleton<BubbleSort>() implements Sorter {
  sort = async (
    bars: Bar[],
    setState: React.Dispatch<React.SetStateAction<Bar[]>>,
    delay: number
  ): Promise<void> => {
    const n: number = bars.length;
    let greatestElementIndex: number = bars.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (bars[j].num > bars[j + 1].num) {
          let swap = bars[j];
          bars[j] = bars[j + 1];
          bars[j + 1] = swap;

          // animation
          bars[j].color = RED;
          bars[j + 1].color = GREEN;
          setState([...bars]);
          await sleep(delay);
          bars[j].color = BLUE;
          bars[j + 1].color = BLUE;
        }

        if (j === greatestElementIndex - 2) {
          // make the iteration's greatest element green (sorted partition)
          greatestElementIndex--;
          bars[greatestElementIndex].color = RED;
          setState([...bars]);
        }
      }
    }
  };
}
