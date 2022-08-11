import React, { useEffect, useState } from "react";
import Music from "./Music";
import { Grid } from "@material-ui/core";


function ShowMusics(props) {
    const [data, setData] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(async() => {
        return fetch("/spotify/get-playlists")
        .then((response) => response.json())
        .then((data) => {
            setData(data)
            setLoading(false)
        });
    }, []);

    if (loading) {
        return (
            <div align="center">
                <h2> Loading... </h2>
            </div>
        )
    }
    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
        >
        {
            Object.keys(data).map(d => {
                return (
                    <Grid item xs={4} sm={2}>
                        <Music 
                            name={data[d].name} 
                            image={data[d].image} 
                            artists={data[d].artists} 
                        />
                    </Grid>
                )
            })
        }
        </Grid>
    )
} export default ShowMusics;