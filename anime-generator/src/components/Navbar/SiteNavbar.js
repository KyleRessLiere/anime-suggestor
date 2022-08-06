import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'
import "./css/SiteNavbar.css"
import "../../shared/styles.css"
function SiteNavbar() {
  return (
    <Navbar className="navbar" expand="lg">
    <Container>
    <LinkContainer to="/">
      <Navbar.Brand href="#home">AnimeGenerator</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="about">
          <Nav.Link>About Me</Nav.Link>
          </LinkContainer>
         
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default SiteNavbar;
