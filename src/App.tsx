import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [nums, setNums] = useState<number[]>([]);

  useEffect(() => {
    reset();
  }, []);

  const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  // selection sort
  const sort = async (): Promise<void> => {
    var arr = [...nums];
    const n: number = nums.length;
    for (var i = 0; i < n - 1; i++) {
      var iMin: number = i;
      for (var j: number = i + 1; j < n; j++) if (arr[j] < arr[iMin]) iMin = j;

      const temp = arr[i];
      arr[i] = arr[iMin];
      arr[iMin] = temp;

      await sleep(500);
      setNums([...arr]);
    }
  };

  const reset = (): void =>
    setNums([...Array(20)].map(() => Math.floor(Math.random() * 300)));

  return (
    <div>
      <div className="center">
        <button onClick={sort}> sort! </button>
        <button onClick={reset}> reset! </button>
      </div>

      <div className="center">
        <div style={{ display: "flex" }}>
          {nums.map((num: number) => {
            return (
              <div
                style={{
                  backgroundColor: "blue",
                  width: "10px",
                  height: `${num}px`,
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

