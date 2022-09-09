import * as React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core"


export default function Music(props) {
    return (
        <Card>
            <CardMedia
                component="img"
                width="200"
                height="200"
                image={props.image}
                alt={props.name}
            />
            <CardContent className="music-text">
                <Typography className="name-text" gutterBottom>
                    {props.name}
                </Typography>
                <Typography className="artists-text">
                    {props.artists.join(", ")}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={"/spotify/download?q=" + props.name} size="large" color="primary">Download</Button>
            </CardActions>      
        </Card>
    )
};

