import React from 'react';

import { Button } from 'react-bootstrap';

interface Props {
  resetGrid: () => void;
  search: () => Promise<void>;
}

export const Panel: React.FC<Props> = ({ resetGrid, search }: Props) => {
  return (
    <span>
      <Button className="m-2" variant="danger" onClick={() => resetGrid()}>
        Reset
      </Button>
      <Button onClick={search} variant="primary">
        Search!
      </Button>
    </span>
  );
};
