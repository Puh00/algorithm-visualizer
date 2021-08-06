import React from 'react';

import { Button } from 'react-bootstrap';

import { Cell } from '../../core/model/Cell';
import './CellButton.css';

interface Props {
  cell: Cell;
  mouseDown: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const cellColor = (cell: Cell): string => {
  if (cell.isWall) return 'grey';
  else if (cell.isStart) return 'yellow';
  else if (cell.isFinish) return 'blue';
  else if (cell.isPath) return 'Chartreuse';
  // or tomato for brighter
  else if (cell.isActive) return 'crimson';
  else return 'azure';
};

const cssAnimation = (cell: Cell): string => {
  return cell.isPath ? 'finish' : cell.isActive ? 'visited' : '';
};

export const CellButton: React.FC<Props> = ({
  cell,
  mouseDown,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: Props) => {
  return (
    <Button
      className={`cell ${cssAnimation(cell)}`}
      style={{
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
