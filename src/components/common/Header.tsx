import React from 'react';

import {
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import logo from '../../assets/github.png';

export const Header = (): JSX.Element => {
  return (
    <Navbar expand="md" bg="dark" variant="dark" className="app-vanish">
      <Container>
        <Navbar.Brand href="https://github.com/Puh00/algorithm-visualizer">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tip">View Project</Tooltip>}
          >
            <img src={logo} alt="github logo" />
          </OverlayTrigger>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/sorting">Sorting</Nav.Link>
            <Nav.Link href="/pathfinding">Pathfinding</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
