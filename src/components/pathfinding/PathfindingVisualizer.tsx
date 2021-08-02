import React from 'react';

import { Col, Container, Row, ToggleButton } from 'react-bootstrap';

import { Grid } from './Grid';

export const PathfindingVisualizer: React.FC = () => {
  const [draw, setDraw] = React.useState<boolean>(true);
  const [gridSize, setGridSize] = React.useState<number>(5);

  return (
    <Container fluid={true} style={{ padding: '0' }}>
      <Row className="justify-content-center">
        <Col md="auto">
          <ToggleButton
            className="mb-2"
            type="checkbox"
            variant="outline-primary"
            checked={draw}
            value="1"
            onChange={(e) => setDraw(e.currentTarget.checked)}
          >
            Draw
          </ToggleButton>
          <Grid SIZE={gridSize} draw={draw} />
        </Col>
      </Row>
    </Container>
  );
};
