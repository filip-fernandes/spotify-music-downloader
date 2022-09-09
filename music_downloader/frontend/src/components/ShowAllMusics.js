import React, { useEffect, useState } from "react";
import Music from "./Music";
import { Grid } from "@material-ui/core";


function ShowAllMusics(props) {
    const [data, setData] = useState({})
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

    const showAll = () => {
        return (
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
        )
    }

    const showSearch = (search) => {
        return (
        Object.keys(data).map(d => {
            if (data[d].name.toLowerCase().includes(props.isSearching.toLowerCase()) || 
            data[d].artists.join(", ").toLowerCase().includes(props.isSearching.toLowerCase())) {
                return (
                    <Grid item xs={4} sm={2}>
                        <Music 
                            name={data[d].name} 
                            image={data[d].image} 
                            artists={data[d].artists} 
                        />
                    </Grid>
                )
            }
        })
        )
    }
    
    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
        >
            <React.Fragment>
                {!props.isSearching ? showAll() : showSearch()}
            </React.Fragment>
        </Grid>
    )
} export default ShowAllMusics;