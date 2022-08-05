import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ShowMusics from "./ShowMusics";
import { Link } from "react-router-dom";
import AppNavbar from "./Navbar";

function PublicHomepage(props) {

    return (
        <div align="center">
            <h2>
                Welcome to the Spotify Playlist Downloader, please log in to use it.
            </h2>
        </div>
    )
} export default PublicHomepage;