import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PublicHomepage from "./PublicHomepage";
import Navbar from "./Navbar"
import ShowAllMusics from "./ShowAllMusics";


export default function App(props) {

    const [url, setUrl] = useState(0);
    const [loggedIn, setLoggedIn] = useState(0);
    const [search, setSearch] = useState(0);

    useEffect(async() => {
        fetch("/spotify/is-authenticated")
            .then((response) => response.json())
            .then((data) => {
                setLoggedIn(data.status)
            });
        fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
                setUrl(data.url)
        })
    }, []);

    const handleSearchBar = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setSearch(lowerCase);
    }

    return (
        <React.Fragment>
            <Navbar 
                isAuthenticated={loggedIn} 
                url={url} 
                handleSearchBar={handleSearchBar}
                directDownload={search}
            />
            {loggedIn ? <ShowAllMusics isSearching={search}/> : <PublicHomepage />}
        </React.Fragment>
    )
}

const container = document.getElementById('app');

const root = ReactDOM.createRoot(container);

root.render(<App />);