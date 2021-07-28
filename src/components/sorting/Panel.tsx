import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  num: number;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  sort: () => Promise<void>;
}

// TODO: maybe move AlgorithmButton to here instead of directly in SortingVisualizer
export const Panel: React.FC<Props> = ({
  num,
  handleNumberChange,
  reset,
  sort,
}) => {
  return (
    <span>
      <input
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
