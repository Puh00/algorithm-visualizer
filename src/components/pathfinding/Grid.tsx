import React from 'react';

import { Cell } from '../../core/model/Cell';
import { CellButton } from './CellButton';

interface Props {
  grid: Cell[][];
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>;
}

export const Grid: React.FC<Props> = ({ grid, setGrid }: Props) => {
  const [mouseDown, setMouseDown] = React.useState<boolean>(false);

  const toggleWall = (row: number, col: number): void => {
    const cell = grid[row][col];
    cell.isWall = !cell.isWall;
    setGrid([...grid]);
  };

  const handleMouseUp = (): void => setMouseDown(false);

  const handleMouseDown = (row: number, col: number): void => {
    toggleWall(row, col);
    setMouseDown(true);
  };

  const handleMouseEnter = (row: number, col: number): void => {
    if (mouseDown) toggleWall(row, col);
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
