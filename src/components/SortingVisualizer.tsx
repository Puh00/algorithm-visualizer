import React, { useState, useEffect } from "react";
import "../App.css";
import { BLUE } from "../core/model/Color";
import { Bar } from "../core/model/Bar";
import { Sorter } from "../core/sorting/Sorter";
import { finish } from "../core/sorting/Animation";
import { getAlgorithm } from "../core/sorting/AlgorithmFactory";

function App() {
  const [bars, setBars] = useState<Bar[]>([]);
  const [algorithm, setAlgorithm] = useState<string>("selection");
  const [num, setNum] = useState<number>(20);

  useEffect(() => {
    reset();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sort = async (): Promise<void> => {
    var sorter: Sorter = getAlgorithm(algorithm);
    await sorter.sort(bars, setBars);
    await finish(bars, setBars);
  };

  const reset = (): void =>
    setBars(
      [...Array(num)].map(() => ({
        num: Math.floor(Math.random() * 200),
        color: BLUE,
      }))
    );

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, min, max } = e.target;
    const val = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setNum(val);
    reset();
  };

  return (
    <div>
      <div className="center">
        <select onChange={(e) => setAlgorithm(e.target.value)}>
          <option selected value="selection">
            Selection sort
          </option>
          <option value="insertion">Insertion sort</option>
          <option value="bubble">Bubble sort</option>
        </select>
        <input
          name="no. bars"
          type="number"
          value={num}
          step={5}
          min="5"
          max="100"
          onChange={handleNumberChange}
          onKeyDown={(e) => e.preventDefault()}
        />
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
