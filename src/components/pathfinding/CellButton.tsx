import React from 'react';

import { Cell } from '../../core/model/Cell';

interface Props {
  cell: Cell;
  mouseDown: boolean;
  draw: boolean;
}

export const CellButton: React.FC<Props> = ({
  cell,
  mouseDown,
  draw,
}: Props) => {
  const [colored, setColored] = React.useState(false);

  const cellColor = (cell: Cell): string => {
    if (cell.isWall) return 'grey';
    else if (cell.isPath) return 'Chartreuse';
    else if (cell.isActive) return 'red';
    else return '';
  };

  return (
    <button
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: cellColor(cell),
      }}
      onMouseEnter={() => {
        if (mouseDown) {
          if (draw) {
            cell.isWall = true;
          } else setColored(false);
        }
      }}
    />
  );
};
