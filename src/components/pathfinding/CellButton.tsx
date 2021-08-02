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

  return (
    <button
      style={{
        width: '40px',
        height: '40px',
        /* background: colored ? 'red' : 'none', */
        backgroundColor: cell.color,
      }}
      onMouseEnter={() => {
        if (mouseDown) {
          if (draw) setColored(true);
          else setColored(false);
        }
      }}
    />
  );
};
