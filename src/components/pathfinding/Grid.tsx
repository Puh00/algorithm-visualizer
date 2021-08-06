import React from 'react';

import { Cell, Coord } from '../../core/model/Cell';
import { CellButton } from './CellButton';

interface Props {
  grid: Cell[][];
  mode: string;
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>;
  start: Coord;
  setStart: React.Dispatch<React.SetStateAction<Coord>>;
  finish: Coord;
  setFinish: React.Dispatch<React.SetStateAction<Coord>>;
  searching: boolean;
}

export const Grid: React.FC<Props> = ({
  grid,
  mode,
  setGrid,
  start,
  setStart,
  finish,
  setFinish,
  searching,
}: Props) => {
  const [mouseDown, setMouseDown] = React.useState<boolean>(false);

  const toggleWall = (row: number, col: number): void => {
    const cell = grid[row][col];
    if (!cell.isStart && !cell.isFinish) {
      cell.isWall = !cell.isWall;
      setGrid([...grid]);
    }
  };

  const moveStart = (row: number, col: number): void => {
    grid[start.y][start.x].isStart = false;
    const cell: Cell = grid[row][col];
    cell.isStart = true;
    setStart(cell.coord);
    setGrid([...grid]);
  };

  const moveFinish = (row: number, col: number): void => {
    grid[finish.y][finish.x].isFinish = false;
    const cell = grid[row][col];
    cell.isFinish = true;
    setFinish(cell.coord);
    setGrid([...grid]);
  };

  const handleMouseUp = (): void => setMouseDown(false);

  const handleMouseDown = (row: number, col: number): void => {
    if (mode === 'wall') toggleWall(row, col);
    else if (mode === 'start' && !searching) moveStart(row, col);
    else if (mode === 'finish' && !searching) moveFinish(row, col);
    setMouseDown(true);
  };

  const handleMouseEnter = (row: number, col: number): void => {
    if (mouseDown) {
      if (mode === 'wall') toggleWall(row, col);
      else if (mode === 'start' && !searching) moveStart(row, col);
      else if (mode === 'finish' && !searching) moveFinish(row, col);
    }
  };

  return (
    <div>
      <div
        onMouseDown={() => {
          setMouseDown(true);
        }}
        onMouseUp={() => {
          setMouseDown(false);
        }}
        onMouseLeave={() => {
          setMouseDown(false);
        }}
      >
        {grid.map((row, i) => (
          <div key={i}>
            {row.map((c, j) => (
              <CellButton
                cell={c}
                key={j}
                mouseDown={mouseDown}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
