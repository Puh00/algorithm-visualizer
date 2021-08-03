import React from 'react';

import { Cell } from '../../core/model/Cell';
import { DFS, resetGrid } from '../../core/pathfinding/DepthFirstSearch';
import { UCS, Result } from '../../core/pathfinding/UCS';
import { sleep } from '../../utils';
import { CellButton } from './CellButton';

interface Props {
  SIZE: number;
  draw: boolean;
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

export const Grid: React.FC<Props> = ({ SIZE, draw }: Props) => {
  const [mouseDown, setMouseDown] = React.useState<boolean>(false);
  const [grid, setGrid] = React.useState<Cell[][]>(resetGrid(SIZE));

  const algo = async (): Promise<void> => {
    // await DFS(1, 1, grid, setGrid);
    await UCS({ x: 0, y: 1 }, { x: 4, y: 0 }, grid, setGrid).then(
      async (res) => {
        await finish(res, grid, setGrid);
      }
    );
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
              <CellButton cell={c} mouseDown={mouseDown} draw={draw} key={j} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
