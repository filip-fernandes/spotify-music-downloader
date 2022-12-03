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

    const searchAndDownload = () => {
      return (
        <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search or Download"
                  className="me-auto"
                  aria-label="Search"
                  onChange={props.handleSearchBar}
                />
                <Button href={"/spotify/download?q=" + props.directDownload} variant="primary" size="sm" >Download</Button>
              </Form>
        </Navbar.Collapse>
      )
    }

    return (
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Music Downloader</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          {props.isAuthenticated ? <Button href="" onClick={logoff} variant="secondary">Sign off</Button>
          : <Button variant="success" href={props.url}>Sign in</Button>}
          {searchAndDownload()}
        </Container>
      </Navbar>
    );
}