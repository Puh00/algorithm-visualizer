import React from 'react';

import { Cell } from './Cell';

interface Props {
  SIZE: number;
  draw: boolean;
}

export const Grid: React.FC<Props> = ({ SIZE, draw }: Props) => {
  const [mouseDown, setMouseDown] = React.useState<boolean>(false);

  return (
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
      {[...Array(SIZE)].map((key) => (
        <div key={key}>
          {[...Array(SIZE)].map((key) => (
            <Cell mouseDown={mouseDown} draw={draw} key={key} />
          ))}
        </div>
      ))}
    </div>
  );
};
