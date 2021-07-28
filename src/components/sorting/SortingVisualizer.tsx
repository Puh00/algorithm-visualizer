import React, { useState, useEffect } from "react";
import "../../App.css";
import { BLUE } from "../../core/model/Color";
import { Bar } from "../../core/model/Bar";
import { Sorter } from "../../core/sorting/Sorter";
import { finish } from "../../core/sorting/Animation";
import { getAlgorithm } from "../../core/sorting/AlgorithmFactory";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  ToggleButton,
} from "react-bootstrap";

const radios = [
  { name: "Insertion Sort", value: "insertion" },
  { name: "Bubble Sort", value: "bubble" },
  { name: "Quicksort", value: "quick" },
  { name: "Merge Sort", value: "merge" },
];

export const SortingVisualizer = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [num, setNum] = useState<number>(90);
  const [radioValue, setRadioValue] = useState("insertion");

  useEffect((): void => {
    reset();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sort = async (): Promise<void> => {
    var sorter: Sorter = getAlgorithm(radioValue);
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

  // TODO: Move to separate component (pass down state and which algos)
  const renderAlgorithmButtons = (): JSX.Element => (
    <ButtonGroup className="p-3">
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          variant="outline-warning"
          name="radio"
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );

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
          <input
            name="no. bars"
            type="number"
            value={num}
            step={5}
            min="5"
            max="150"
            onChange={handleNumberChange}
            onKeyDown={(e) => e.preventDefault()}
          />
          <Button onClick={reset} className="mx-2" variant="danger">
            Reset
          </Button>
          <Button onClick={sort}>Sort</Button>
          {renderAlgorithmButtons()}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="auto">{renderBars()}</Col>
      </Row>
    </Container>
  );
};
