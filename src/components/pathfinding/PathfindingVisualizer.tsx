import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { Cell, Coord } from '../../core/model/Cell';
import { UCS, Result } from '../../core/pathfinding/UCS';
import { sleep } from '../../utils';
import { Grid } from './Grid';
import { Panel } from './Panel';

const gridSize = 30;

const modes = [
  { name: 'Wall', value: 'wall' },
  { name: 'Start', value: 'start' },
  { name: 'Finish', value: 'finish' },
];

const resetGrid = (size: number, start: Coord, finish: Coord): Cell[][] => {
  const grid: Cell[][] = [...Array(size)].map((_, i) => {
    return [...Array(size)].map((_, j) => ({
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
      await sleep(50);
    }
  }
};

export const PathfindingVisualizer: React.FC = () => {
  // to disable moving starting and finish cells during search
  const [searching, setSearching] = React.useState<boolean>(false);
  const [start, setStart] = React.useState<Coord>({ x: 10, y: 10 });
  const [finish, setFinish] = React.useState<Coord>({ x: 4, y: 0 });
  const [grid, setGrid] = React.useState<Cell[][]>(
    resetGrid(gridSize, start, finish)
  );
  const [mode, setMode] = React.useState<string>('wall');

  const reset = (): void => setGrid(resetGrid(gridSize, start, finish));

  const search = async (): Promise<void> => {
    setSearching(true);
    await UCS(start, finish, grid, setGrid).then(async (res) => {
      if (res.success) await drawPath(res, grid, setGrid);
    });
    setSearching(false);
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
