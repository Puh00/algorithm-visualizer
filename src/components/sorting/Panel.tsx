import React, { SetStateAction } from 'react';

import { Button } from 'react-bootstrap';

import { Bar } from '../../core/model/Bar';

interface Props {
  num: number;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sort: () => Promise<void>;
  reset: () => void;
  setBars: React.Dispatch<SetStateAction<Bar[]>>;
  delay: number;
  setDelay: React.Dispatch<SetStateAction<number>>;
}

export const Panel: React.FC<Props> = ({
  num,
  handleNumberChange,
  sort,
  reset,
  delay,
  setDelay,
}: Props) => {
  const renderRangeSlider = (): JSX.Element => (
    <label className="mx-2" style={{ width: '10%', textAlign: 'left' }}>
      Delay
      <input
        name="foo"
        type="range"
        min="1"
        max="100"
        value={delay}
        className="slider"
        onChange={(e) => setDelay(parseInt(e.target.value))}
      />
    </label>
  );

  return (
    <span>
      {renderRangeSlider()}
      <input
        className="input-number"
        name="no. bars"
        type="number"
        value={num}
        step={5}
        min="5"
        max="150"
        onChange={handleNumberChange}
        onKeyDown={(e) => e.preventDefault()}
      />
      <Button onClick={reset} className="mx-2" variant="danger">
        Reset
      </Button>
      <Button onClick={sort}>Sort</Button>
    </span>
  );
};
