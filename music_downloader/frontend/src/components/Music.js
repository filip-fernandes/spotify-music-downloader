import * as React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core"


export default function Music(props) {
    return (
        <Card class="music">
            <CardMedia
                component="img"
                width="200"
                height="200"
                image={props.image}
                alt={props.name}
            />
            <CardContent className="music-text">
                <Typography xs={{ fontSize: 12 }} className="music-text" color="text.secondary" gutterBottom>
                    {props.artists[0]}
                </Typography>
                <Typography variant="h9" component="div">
                    {props.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={"/spotify/download?q=" + props.name} size="large" color="primary">Download</Button>
            </CardActions>      
        </Card>
    )
};

