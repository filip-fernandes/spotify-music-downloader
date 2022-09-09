import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container  from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

export default function AppNavbar(props) {

    const logoff = () => {
      fetch("/spotify/logoff")
    };

    return (
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Music Downloader</Navbar.Brand>
          {props.isAuthenticated ? <Button href="" onClick={logoff}>Logoff</Button>
          : <Button variant="success" href={props.url}>Login with Spotify</Button>}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 "
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
          </Navbar.Collapse>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={props.handleSearchBar}
            />
          </Form>
        </Container>
      </Navbar>
    );
}