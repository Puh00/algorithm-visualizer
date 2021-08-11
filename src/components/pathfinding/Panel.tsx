import React from 'react';

import { Button, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';

interface NameValue {
  name: string;
  value: string;
}

interface Props {
  AlgorithmButtonGroup: React.ReactNode;
  resetGrid: () => void;
  removePath: () => void;
  search: () => Promise<void>;
  mazes: NameValue[];
  generateMaze: (algorithmType: string) => Promise<void>;
}

export const Panel: React.FC<Props> = ({
  AlgorithmButtonGroup,
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
      <Button onClick={search} variant="primary" className="m-1">
        Search!
      </Button>
      {AlgorithmButtonGroup}
    </div>
  );
};
