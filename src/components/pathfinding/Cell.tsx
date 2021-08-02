import React from 'react';

interface Props {
  mouseDown: boolean;
  draw: boolean;
}

export const Cell: React.FC<Props> = ({ mouseDown, draw }: Props) => {
  const [colored, setColored] = React.useState(false);

  return (
    <button
      style={{
        width: '40px',
        height: '40px',
        background: colored ? 'red' : 'none',
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
