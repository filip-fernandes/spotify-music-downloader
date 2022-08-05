import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container  from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { TextField, Grid, Typography } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'


export default function AppNavbar(props) {

  const [url, setUrl] = useState(0);
  const [loggedIn, setLoggedIn] = useState(0);

  useEffect(() => {
      fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn(data.status)
        console.log(loggedIn)
      });
      fetch("/spotify/get-auth-url")
        .then((response) => response.json())
        .then((data) => {
          setUrl(data.url)
      })
    }, []);

    const logoff = () => {
      fetch("/spotify/logoff")
    };

    return (
      <Navbar expand="lg">
      <Container fluid>
      <Navbar.Brand href="#">Music Downloader</Navbar.Brand>
      {loggedIn ? <Button href="" onClick={logoff}>Logoff</Button>
      : <Button variant="success" href={url}>Login with Spotify</Button>}
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 "
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
      );
}