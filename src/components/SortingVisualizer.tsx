import React, { useState, useEffect } from "react";
import "../App.css";
import { BLUE } from "../core/model/Color";
import { Bar } from "../core/model/Bar";
import { SelectionSort } from "../core/sorting/SelectionSort";
import { Sorter } from "../core/sorting/Sorter";

function App() {
  const [nums, setNums] = useState<Bar[]>([]);

  useEffect(() => {
    reset();
  }, []);

  const sort = async (): Promise<void> => {
    const sorter: Sorter = SelectionSort.getInstance();
    sorter.sort(nums, setNums);
  };

  const reset = (): void =>
    setNums(
      [...Array(20)].map(() => ({
        num: Math.floor(Math.random() * 200),
        color: BLUE,
      }))
    );

  return (
    <div>
      <div className="center">
        <button onClick={sort}> sort! </button>
        <button onClick={reset}> reset! </button>
      </div>

      <div className="center">
        <div style={{ display: "flex" }}>
          {nums.map((bar: Bar) => {
            return (
              <div
                style={{
                  backgroundColor: "blue",
                  width: "10px",
                  height: `${bar.num}px`,
                  marginRight: "1px",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
