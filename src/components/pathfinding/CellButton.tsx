import React from 'react';

import { Cell } from '../../core/model/Cell';

interface Props {
  cell: Cell;
  mouseDown: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

export const CellButton: React.FC<Props> = ({
  cell,
  mouseDown,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: Props) => {
  const cellColor = (cell: Cell): string => {
    if (cell.isWall) return 'grey';
    else if (cell.isStart) return 'yellow';
    else if (cell.isFinish) return 'blue';
    else if (cell.isPath) return 'Chartreuse';
    else if (cell.isActive) return 'red';
    else return '';
  };

  return (
    <button
      style={{
        marginBottom: '-3px',
        width: '30px',
        height: '30px',
        backgroundColor: cellColor(cell),
      }}
      onMouseEnter={() => {
        if (mouseDown) onMouseEnter(cell.coord.y, cell.coord.x);
      }}
      onMouseDown={() => onMouseDown(cell.coord.y, cell.coord.x)}
      onMouseUp={onMouseUp}
    />
  );
};
