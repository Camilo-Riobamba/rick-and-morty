import { Divider, Grid, Paper, Typography } from '@mui/material';

export default function Resident({ name, image, status, origin, episode }) {
    return (
        <Grid item xs={6} md={4} lg={3}>
            <Paper elevation={8} sx={{ p: 2 }}>
                <Paper
                    component="img"
                    src={image}
                    alt={name}
                    sx={{ width: '100%' }}
                />

                <Typography variant="subtitle1">
                    <strong>{name}</strong>
                </Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />

                <Typography variant="body1">Status: {status}</Typography>
                <Typography variant="body1">From: {origin.name}</Typography>
                <Typography variant="body1">
                    Appearances: {episode.length}
                </Typography>
            </Paper>
        </Grid>
    );
}
