import React, { useState, useEffect } from "react";
import "../App.css";
import { BLUE } from "../core/model/Color";
import { Bar } from "../core/model/Bar";
import { SelectionSort } from "../core/sorting/SelectionSort";
import { InsertionSort } from "../core/sorting/InsertionSort";
import { Sorter } from "../core/sorting/Sorter";
import { finish } from "../core/sorting/Animation";

function App() {
  const [bars, setBars] = useState<Bar[]>([]);
  const [algorithm, setAlgorithm] = useState<string>("selection");

  useEffect(() => {
    reset();
  }, []);

  const sort = async (): Promise<void> => {
    // TODO: Fix this smelly code
    var sorter: Sorter;
    if (algorithm === "selection") {
      sorter = SelectionSort.getInstance();
    } else if (algorithm === "insertion") {
      sorter = InsertionSort.getInstance();
    } else return;
    await sorter.sort(bars, setBars);
    await finish(bars, setBars);
  };

  const reset = (): void =>
    setBars(
      [...Array(20)].map(() => ({
        num: Math.floor(Math.random() * 200),
        color: BLUE,
      }))
    );

  return (
    <div>
      <div className="center">
        <select onChange={(e) => setAlgorithm(e.target.value)}>
          <option selected value="selection">
            Selection sort
          </option>
          <option value="insertion">Insertion sort</option>
        </select>
        <button onClick={sort}> sort! </button>
        <button onClick={reset}> reset! </button>
      </div>

      <div className="center">
        <div style={{ display: "flex" }}>
          {bars.map((bar: Bar) => {
            return (
              <div
                style={{
                  backgroundColor: bar.color,
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
