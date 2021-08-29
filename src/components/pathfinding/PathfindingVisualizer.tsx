import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { getMazeAlgorithm } from '../../core/maze/MazeFactory';
import { Cell, Coord } from '../../core/model/Cell';
import { Result } from '../../core/model/PQEntry';
import { getPathfindingAlgorithm } from '../../core/pathfinding/PathfindingFactory';
import { closestOddCoord, sleep } from '../../utils';
import { AlgorithmButtonGroup } from '../common/AlgorithmButtonGroup';
import { Grid } from './Grid';
import { Panel } from './Panel';

const algorithms = [
  { name: 'UCS', value: 'ucs' },
  { name: 'A*', value: 'astar' },
  { name: 'Bidirectional search', value: 'bidirectional' },
];
const mazes = [
  { name: 'Recursive Division', value: 'division' },
  { name: 'Recursive Backtracking', value: 'backtracking' },
  { name: 'Binary Tree (Southeast bias)', value: 'binary' },
  { name: "Prim's Algorithm", value: 'prim' },
  { name: "Kruskal's Algorithm", value: 'kruskal' },
  { name: "Eller's Algorithm", value: 'eller' },
];
const heuristics = [
  { name: 'Manhattan distance', value: 'manhattan' },
  { name: 'Fudge', value: 'fudge' },
  { name: 'Cross', value: 'cross' },
];

// Calculate how many cells fit the screen horizontally and vertically
const calculateCells = (): [number, number] => {
  const noHorizontalCells = Math.floor(window.innerWidth / 30);
  const noVerticalCells = Math.floor((window.innerHeight - 130) / 30);
  // maze algorithm requires maze to have odd size
  return [
    noHorizontalCells % 2 === 0 ? noHorizontalCells - 1 : noHorizontalCells,
    noVerticalCells % 2 === 0 ? noVerticalCells - 1 : noVerticalCells,
  ];
};

const newGrid = (start: Coord, finish: Coord): Cell[][] => {
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

const removePath = (
  grid: Cell[][],
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
): void => {
  for (let row = 0; row < grid.length; row++)
    for (let col = 0; col < grid[0].length; col++) {
      const cell = grid[row][col];
      if (cell.isPath) cell.isPath = false;
      if (cell.isActive) cell.isActive = false;
    }
  setGrid([...grid]);
};

// Draw the path received from pathfinding algorithm
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
  const [grid, setGrid] = React.useState<Cell[][]>(newGrid(start, finish));
  const [mode, setMode] = React.useState<string>('wall');
  const [heuristic, setHeuristic] = React.useState<string>('manhattan');

  const search = async (): Promise<void> => {
    const searcher = getPathfindingAlgorithm(algorithm);
    setSearching(true);
    await searcher(start, finish, grid, setGrid, heuristic).then(
      async (res) => {
        if (res.success) await drawPath(res, grid, setGrid);
      }
    );
    setSearching(false);
  };

  // Move start and finish to odd coordinates (if they aren't already on odd coordinates)
  const relocateStartAndFinishToOddCoords = (): void => {
    grid[start.y][start.x].isStart = false;
    grid[finish.y][finish.x].isFinish = false;
    const newStart = closestOddCoord(start);
    const newFinish = closestOddCoord(finish);
    grid[newStart.y][newStart.x].isStart = true;
    grid[newFinish.y][newFinish.x].isFinish = true;
    setGrid([...grid]);
    setStart(newStart);
    setFinish(newFinish);
  };

  const generateMaze = async (algorithmType: string): Promise<void> => {
    relocateStartAndFinishToOddCoords();
    const mazeGenerator = getMazeAlgorithm(algorithmType);
    await mazeGenerator(grid, setGrid);
  };

  return (
    <Container fluid={true} style={{ padding: '0' }}>
      <Row>
        <Col>
          <Panel
            AlgorithmButtonGroup={
              <AlgorithmButtonGroup
                defaultAlgorithm={algorithm}
                algorithms={algorithms}
                setAlgorithm={setAlgorithm}
              />
            }
            algorithm={algorithm}
            heuristic={heuristic}
            heuristics={heuristics}
            setHeuristic={setHeuristic}
            resetGrid={() => setGrid(newGrid(start, finish))}
            removePath={() => removePath(grid, setGrid)}
            search={search}
            mazes={mazes}
            generateMaze={generateMaze}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="auto" className="app-center">
          <Grid
            grid={grid}
            mode={mode}
            setMode={setMode}
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
