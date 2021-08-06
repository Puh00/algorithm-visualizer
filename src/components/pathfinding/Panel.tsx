import React, { SetStateAction } from 'react';

import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

interface Mode {
  name: string;
  value: string;
}

interface Props {
  mode: string;
  setMode: React.Dispatch<SetStateAction<string>>;
  modes: Mode[];
  resetGrid: () => void;
  search: () => Promise<void>;
  generateMaze: () => Promise<void>;
}

export const Panel: React.FC<Props> = ({
  mode,
  modes,
  setMode,
  resetGrid,
  search,
  generateMaze,
}: Props) => {
  return (
    <span>
      <Button variant="success" onClick={generateMaze}>
        Generate Maze
      </Button>
      <Button className="m-2" variant="danger" onClick={() => resetGrid()}>
        Reset
      </Button>
      <Button onClick={search} variant="primary">
        Search!
      </Button>
      <ButtonGroup className="p-3">
        {modes.map((m) => (
          <ToggleButton
            key={m.value}
            type="radio"
            variant="outline-warning"
            value={m.value}
            checked={mode === m.value}
            onChange={(e) => setMode(e.currentTarget.value)}
          >
            {m.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </span>
  );
};
