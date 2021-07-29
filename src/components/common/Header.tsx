import React from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap';

export const Header = (): JSX.Element => {
  return (
    <Navbar expand="md" bg="dark" variant="dark" className="app-vanish">
      <Container>
        <Navbar.Brand href="/">〽️</Navbar.Brand>
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
