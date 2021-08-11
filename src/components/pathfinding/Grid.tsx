import React from 'react';

import { Cell, Coord } from '../../core/model/Cell';
import { CellButton } from './CellButton';

interface Props {
  grid: Cell[][];
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
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
  setMode,
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
    if (grid[row][col].isStart) setMode('start');
    else if (grid[row][col].isFinish) setMode('finish');
    else {
      setMode('wall');
      toggleWall(row, col);
    }
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
      {/* 🐰 🥚 */}
      <button
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          display: 'block',
          height: '5px',
          width: '5px',
          cursor: 'pointer',
          marginBottom: '5px',
        }}
        onClick={() => {
          for (let i = 0; i < grid.length; i++) {
            grid[i][0].isWall = true;
            grid[i][grid[0].length - 1].isWall = true;
          }
          // horizontal walls
          for (let i = 0; i < grid[0].length; i++) {
            grid[0][i].isWall = true;
            grid[grid.length - 1][i].isWall = true;
          }
          for (let i = 0; i < grid.length - 1; i++) {
            for (let j = 0; j < grid[0].length - 1; j++) {
              if (i % 2 === 0 && j % 2 === 0) grid[i][j].isWall = true;
            }
          }
          setGrid([...grid]);
        }}
      />
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
