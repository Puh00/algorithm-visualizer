import React from 'react';

import { Cell } from '../../core/model/Cell';
import { UCS, Result } from '../../core/pathfinding/UCS';
import { sleep } from '../../utils';
import { CellButton } from './CellButton';

interface Props {
  SIZE: number;
}

const finish = async (
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

export const Grid: React.FC<Props> = ({ SIZE }: Props) => {
  const [mouseDown, setMouseDown] = React.useState<boolean>(false);
  const [grid, setGrid] = React.useState<Cell[][]>(resetGrid(SIZE));

  const algo = async (): Promise<void> => {
    // await DFS(1, 1, grid, setGrid);
    await UCS({ x: 10, y: 10 }, { x: 4, y: 0 }, grid, setGrid).then(
      async (res) => {
        await finish(res, grid, setGrid);
      }
    );
  };

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
      <button onClick={algo}>dfs</button>
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
