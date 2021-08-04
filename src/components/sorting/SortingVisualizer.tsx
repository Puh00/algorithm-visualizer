import React, { useState, useEffect } from 'react';

import '../../App.css';
import { Col, Container, Row } from 'react-bootstrap';

import { Bar } from '../../core/model/Bar';
import { BLUE, GREEN } from '../../core/model/Color';
import { sleep } from '../../utils';
import { getSortingAlgorithm } from '../../utils/AlgorithmFactory';
import { AlgorithmButtonGroup } from '../common/AlgorithmButtonGroup';
import { Panel } from './Panel';

const algorithms = [
  { name: 'Insertion Sort', value: 'insertion' },
  { name: 'Selection Sort', value: 'selection' },
  { name: 'Bubble Sort', value: 'bubble' },
  { name: 'Quicksort', value: 'quick' },
  { name: 'Merge Sort', value: 'merge' },
  { name: 'Cocktail Sort', value: 'cocktail' },
  { name: 'Heap Sort', value: 'heap' },
];

export const SortingVisualizer: React.FC = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [num, setNum] = useState<number>(90);
  const [algorithm, setAlgorithm] = useState<string>('insertion');
  const [delay, setDelay] = useState<number>(20);

  const resetBars = (): void =>
    setBars(
      [...Array(num)].map(() => ({
        num: Math.floor(Math.random() * 80) + 1,
        color: BLUE,
      }))
    );

  useEffect((): void => {
    resetBars();
  }, [num]); // eslint-disable-line react-hooks/exhaustive-deps

  // Green progressive animation
  const finish = async (
    bars: Bar[],
    setState: React.Dispatch<React.SetStateAction<Bar[]>>
  ): Promise<void> => {
    for (let i = 0; i < bars.length; i++) {
      bars[i].color = GREEN;
      setState([...bars]);
      await sleep(1);
    }
  };

  const sort = async (): Promise<void> => {
    const sorter = getSortingAlgorithm(algorithm);
    await sorter(bars, setBars, delay);
    await finish(bars, setBars);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, min, max } = e.target;
    setNum(Math.max(Number(min), Math.min(Number(max), Number(value))));
  };

  const renderBars = (): JSX.Element => (
    <div className="sorting-container">
      {bars.map((bar: Bar, idx) => (
        <div
          key={`b-${idx}`}
          className="bar"
          style={{
            backgroundColor: `${bar.color}`,
            width: '1vw',
            height: `${bar.num}vmin`,
          }}
        />
      ))}
    </div>
  );

  return (
    <Container fluid={true} style={{ padding: '0' }}>
      <Row className="app-vanish text-center justify-content-center">
        <Col md="auto">
          <Panel
            num={num}
            handleNumberChange={handleNumberChange}
            reset={resetBars}
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
