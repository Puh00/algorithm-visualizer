import React, { SetStateAction } from "react";
import { Bar } from "../model/Bar";
import { GREEN } from "../model/Color";
import { sleep } from "../../utils/Sleep";

// Green progressive animation
export const finish = async (
  bars: Bar[],
  setState: React.Dispatch<SetStateAction<Bar[]>>
): Promise<void> => {
  for (var i: number = 0; i < bars.length; i++) {
    bars[i].color = GREEN;
    setState([...bars]);
    await sleep(5);
  }
};
