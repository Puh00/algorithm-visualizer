import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { RecursiveDivision } from '../../core/maze/RecursiveDivision';
import { Cell, Coord } from '../../core/model/Cell';
import { Result } from '../../core/model/PQEntry';
import { sleep, getPathfindingAlgorithm } from '../../utils';
import { AlgorithmButtonGroup } from '../common/AlgorithmButtonGroup';
import { Grid } from './Grid';
import { Panel } from './Panel';

const algorithms = [
  { name: 'UCS', value: 'ucs' },
  { name: 'A*', value: 'astar' },
];
const modes = [
  { name: 'Wall', value: 'wall' },
  { name: 'Start', value: 'start' },
  { name: 'Finish', value: 'finish' },
];

// Calculate how many cells fit the screen horizontally and vertically
const calculateCells = (): [number, number] => {
  const noHorizontalCells = Math.floor(window.innerWidth / 30);
  const noVerticalCells = Math.floor((window.innerHeight - 160) / 30);
  // maze algorithm requires maze to have odd size
  return [
    noHorizontalCells % 2 === 0 ? noHorizontalCells - 1 : noHorizontalCells,
    noVerticalCells % 2 === 0 ? noVerticalCells - 1 : noVerticalCells,
  ];
};

const resetGrid = (start: Coord, finish: Coord): Cell[][] => {
  // n * m size of the grid
  const [n, m] = calculateCells();
  const grid: Cell[][] = [...Array(m)].map((_, i) => {
    return [...Array(n)].map((_, j) => ({
      coord: { x: j, y: i },
      isActive: false,
      isPath: false,
      isStart: false,
      isFinish: false,
      isWall: false,
    }));
  });
  grid[start.y][start.x].isStart = true;
  grid[finish.y][finish.x].isFinish = true;
  return grid;
};

// Mark the path received from pathfinding algorithm
const drawPath = async (
  res: Result,
  grid: Cell[][],
  setState: React.Dispatch<React.SetStateAction<Cell[][]>>
): Promise<void> => {
  if (res.path) {
    for (const c of res.path) {
      grid[c.y][c.x].isPath = true;
      setState([...grid]);
      await sleep(1);
    }
  }
};

export const PathfindingVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = React.useState<string>('ucs');
  // to disable moving starting and finish cells during search
  const [searching, setSearching] = React.useState<boolean>(false);
  const [start, setStart] = React.useState<Coord>({ x: 1, y: 3 });
  const [finish, setFinish] = React.useState<Coord>({ x: 7, y: 3 });
  const [grid, setGrid] = React.useState<Cell[][]>(resetGrid(start, finish));
  const [mode, setMode] = React.useState<string>('wall');

  const reset = (): void => setGrid(resetGrid(start, finish));

  const search = async (): Promise<void> => {
    const searcher = getPathfindingAlgorithm(algorithm);
    setSearching(true);
    await searcher(start, finish, grid, setGrid).then(async (res) => {
      if (res.success) await drawPath(res, grid, setGrid);
    });
    setSearching(false);
  };

  const generateMaze = async (): Promise<void> => {
    await RecursiveDivision(
      grid,
      1,
      grid[0].length - 2,
      1,
      grid.length - 2,
      setGrid
    );
  };

  return (
    <Container fluid={true} style={{ padding: '0' }}>
      <Row>
        <Col className="text-center">
          <Panel
            resetGrid={reset}
            search={search}
            mode={mode}
            setMode={setMode}
            modes={modes}
            generateMaze={generateMaze}
          />
          <AlgorithmButtonGroup
            defaultAlgorithm={algorithm}
            algorithms={algorithms}
            setAlgorithm={setAlgorithm}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="auto">
          <Grid
            grid={grid}
            mode={mode}
            setGrid={setGrid}
            start={start}
            setStart={setStart}
            finish={finish}
            setFinish={setFinish}
            searching={searching}
          />
        </Col>
      </Row>
    </Container>
  );
};
