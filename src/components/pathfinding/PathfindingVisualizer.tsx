import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { Cell } from '../../core/model/Cell';
import { UCS, Result } from '../../core/pathfinding/UCS';
import { sleep } from '../../utils';
import { Grid } from './Grid';
import { Panel } from './Panel';

const gridSize = 30;

const resetGrid = (size: number): Cell[][] => {
  return [...Array(size)].map((_, i) => {
    return [...Array(size)].map((_, j) => ({
      coord: { x: j, y: i },
      isWall: false,
      isActive: false,
      isPath: false,
    }));
  });
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
  const [grid, setGrid] = React.useState<Cell[][]>(resetGrid(gridSize));

  const reset = (): void => setGrid(resetGrid(gridSize));

  const search = async (): Promise<void> => {
    await UCS({ x: 10, y: 10 }, { x: 4, y: 0 }, grid, setGrid).then(
      async (res) => {
        if (res.success) await drawPath(res, grid, setGrid);
      }
    );
  };

  return (
    <Container fluid={true} style={{ padding: '0' }}>
      <Row>
        <Col className="text-center">
          <Panel resetGrid={reset} search={search} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="auto">
          <Grid grid={grid} setGrid={setGrid} />
        </Col>
      </Row>
    </Container>
  );
};
