import React, { SetStateAction } from 'react';

import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  SplitButton,
  ToggleButton,
} from 'react-bootstrap';

interface NameValue {
  name: string;
  value: string;
}

interface Props {
  mode: string;
  setMode: React.Dispatch<SetStateAction<string>>;
  modes: NameValue[];
  resetGrid: () => void;
  removePath: () => void;
  search: () => Promise<void>;
  mazes: NameValue[];
  generateMaze: (algorithmType: string) => Promise<void>;
}

export const Panel: React.FC<Props> = ({
  mode,
  modes,
  setMode,
  resetGrid,
  removePath,
  search,
  mazes,
  generateMaze,
}: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DropdownButton variant="success" title="Mazes" menuAlign="left">
        {mazes.map((m, i) => (
          <Dropdown.Item
            as="button"
            key={i}
            onClick={() => generateMaze(m.value)}
          >
            {m.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <SplitButton
        id="reset"
        className="m-2"
        variant="danger"
        title={'Reset'}
        toggleLabel=""
        onClick={resetGrid}
      >
        <Dropdown.Item onClick={removePath}>Clear path</Dropdown.Item>
      </SplitButton>
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
    </div>
  );
};
