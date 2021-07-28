import React, { useState, useEffect } from "react";
import "../../App.css";
import { BLUE } from "../../core/model/Color";
import { Bar } from "../../core/model/Bar";
import { Sorter } from "../../core/sorting/Sorter";
import { finish } from "../../core/sorting/Animation";
import { getAlgorithm } from "../../core/sorting/AlgorithmFactory";
import { Col, Container, Row } from "react-bootstrap";
import { AlgorithmButtonGroup } from "./AlgorithmButtonGroup";
import { Panel } from "./Panel";

const algorithms = [
  { name: "Insertion Sort", value: "insertion" },
  { name: "Selection Sort", value: "selection" },
  { name: "Bubble Sort", value: "bubble" },
  { name: "Quicksort", value: "quick" },
  { name: "Merge Sort", value: "merge" },
];

export const SortingVisualizer = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [num, setNum] = useState<number>(90);
  const [algorithm, setAlgorithm] = useState("insertion");

  useEffect((): void => {
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
        num: Math.floor(Math.random() * 80) + 1,
        color: BLUE,
      }))
    );

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { value, min, max } = e.target;
    const val = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setNum(val);
    reset();
  };

  // Todo: give unique key to each bar
  const renderBars = (): JSX.Element => (
    <div className="sorting-container">
      {bars.map((bar: Bar) => (
        <div
          className="bar"
          style={{
            backgroundColor: `${bar.color}`,
            width: "1vw",
            height: `${bar.num}vmin`,
          }}
        />
      ))}
    </div>
  );

  return (
    <Container fluid={true} style={{ padding: "0" }}>
      <Row className="app-vanish text-center justify-content-center">
        <Col md="auto">
          <Panel
            num={num}
            handleNumberChange={handleNumberChange}
            reset={reset}
            sort={sort}
          />
          <AlgorithmButtonGroup
            defaultAlgorithm={algorithm}
            algorithms={algorithms}
            setAlgorithm={setAlgorithm}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="auto">{renderBars()}</Col>
      </Row>
    </Container>
  );
};
