import React from 'react';

import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface Algorithm {
  name: string;
  value: string;
}

interface Props {
  defaultAlgorithm: string;
  algorithms: Algorithm[];
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
}

export const AlgorithmButtonGroup: React.FC<Props> = ({
  defaultAlgorithm,
  algorithms,
  setAlgorithm,
}: Props) => {
  return (
    <ButtonGroup className="p-3">
      {algorithms.map((alg) => (
        <ToggleButton
          key={alg.value}
          type="radio"
          variant="outline-warning"
          value={alg.value}
          checked={defaultAlgorithm === alg.value}
          onChange={(e) => setAlgorithm(e.currentTarget.value)}
        >
          {alg.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};
