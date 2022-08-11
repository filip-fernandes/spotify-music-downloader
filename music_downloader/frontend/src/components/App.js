import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ShowMusics from "./ShowMusics";
import AppNavbar from "./Navbar";
import PublicHomepage from "./PublicHomepage";


export default function App(props) {
    const [logged, setLogged] = useState(0);

    useEffect(async() => {
        return fetch("/spotify/is-authenticated")
        .then((response) => response.json())
        .then((data) => {
            setLogged(data.status)
        });
    }, []);

    return (
        <React.Fragment>
            <AppNavbar/>
            {logged ? <ShowMusics /> : <PublicHomepage />}
        </React.Fragment>
    )
}

const container = document.getElementById('app');

const root = ReactDOM.createRoot(container);

root.render(<App />);