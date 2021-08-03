import React from 'react';

import { Col, Container, Row, ToggleButton } from 'react-bootstrap';

import { Grid } from './Grid';

export const PathfindingVisualizer: React.FC = () => {
  const [gridSize, setGridSize] = React.useState<number>(20);

  return (
    <Container fluid={true} style={{ padding: '0' }}>
      <Row className="justify-content-center">
        <Col md="auto">
          <Grid SIZE={gridSize} />
        </Col>
      </Row>
    </Container>
  );
};
