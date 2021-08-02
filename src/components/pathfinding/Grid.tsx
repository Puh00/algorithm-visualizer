import React from 'react';

import { Cell } from '../../core/model/Cell';
import { DFS, resetGrid } from '../../core/pathfinding/DepthFirstSearch';
import { CellButton } from './CellButton';

interface Props {
  SIZE: number;
  draw: boolean;
}

export const Grid: React.FC<Props> = ({ SIZE, draw }: Props) => {
  const [mouseDown, setMouseDown] = React.useState<boolean>(false);
  const [grid, setGrid] = React.useState<Cell[][]>(resetGrid(SIZE));

  const algo = async (): Promise<void> => {
    await DFS(0, 0, grid, setGrid);
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
