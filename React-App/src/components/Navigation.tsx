import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  // Extract the active link text based on the current path
  const activeNavLinkText = (link: JSX.Element) => {
    const linkPath = (link.props as any).to;
    const currentPath = location.pathname;
    return linkPath === currentPath ? (link.props as any).children : null;
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">IAMA</Navbar.Brand>
          <Nav defaultActiveKey="/" as="ul" className="me-auto">
            <Nav.Link as={NavLink} to="/">Search</Nav.Link>
            <Nav.Link as={NavLink} to="/LostandFound">Lost and Found</Nav.Link>
            <NavDropdown title="Proceedures" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/">
                Default
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <h3>{React.Children.map((Nav as any).children, activeNavLinkText)}</h3>
    </div>
  );
}

export default Navigation;
