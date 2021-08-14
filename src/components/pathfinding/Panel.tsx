import React from 'react';

import {
  Button,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  SplitButton,
} from 'react-bootstrap';

import { popover } from './Popover';

interface NameValue {
  name: string;
  value: string;
}

interface Props {
  algorithm: string;
  AlgorithmButtonGroup: React.ReactNode;
  heuristic: string;
  heuristics: NameValue[];
  setHeuristic: React.Dispatch<React.SetStateAction<string>>;
  resetGrid: () => void;
  removePath: () => void;
  search: () => Promise<void>;
  mazes: NameValue[];
  generateMaze: (algorithmType: string) => Promise<void>;
}

export const Panel: React.FC<Props> = ({
  algorithm,
  AlgorithmButtonGroup,
  heuristic,
  heuristics,
  setHeuristic,
  resetGrid,
  removePath,
  search,
  mazes,
  generateMaze,
}: Props) => {
  return (
    <div className="app-center">
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
      <OverlayTrigger placement="right" overlay={popover}>
        <DropdownButton
          alignRight={true}
          className="m-1"
          variant="secondary"
          title={heuristic.charAt(0).toUpperCase() + heuristic.slice(1)}
          disabled={algorithm !== 'astar'}
        >
          {heuristics.map((h) => (
            <Dropdown.Item
              as="button"
              key={h.value}
              onClick={() => setHeuristic(h.value)}
            >
              {h.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </OverlayTrigger>
    </div>
  );
};
