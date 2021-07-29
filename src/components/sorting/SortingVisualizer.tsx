import React, { useState, useEffect } from "react";
import "../../App.css";
import { Bar } from "../../core/model/Bar";
import { finish } from "../../core/sorting/Animation";
import { Col, Container, Row } from "react-bootstrap";
import { AlgorithmButtonGroup } from "./AlgorithmButtonGroup";
import { Panel } from "./Panel";
import { initBars as reset } from "../../utils/Randomize";
import { getAlgorithm } from "../../core/sorting/AlgorithmFactory";

const algorithms = [
  { name: "Insertion Sort", value: "insertion" },
  { name: "Selection Sort", value: "selection" },
  { name: "Bubble Sort", value: "bubble" },
  { name: "Quicksort", value: "quick" },
  { name: "Merge Sort", value: "merge" },
];

export const SortingVisualizer: React.FC = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [num, setNum] = useState<number>(90);
  const [algorithm, setAlgorithm] = useState<string>("insertion");
  const [delay, setDelay] = useState<number>(20);

  useEffect((): void => {
    reset(num, setBars);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sort = async (): Promise<void> => {
    let sorter = getAlgorithm(algorithm);
    await sorter(bars, setBars, delay);
    await finish(bars, setBars);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { value, min, max } = e.target;
    const val = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setNum(val);
    reset(num, setBars);
  };

  const renderBars = (): JSX.Element => (
    <div className="sorting-container">
      {bars.map((bar: Bar, idx) => (
        <div
          key={`b-${idx}`}
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
            setBars={setBars}
            sort={sort}
            delay={delay}
            setDelay={setDelay}
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
