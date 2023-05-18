import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import Resident from './Resdident';
import { useEffect, useState } from 'react';

export default function Location({ name, type, dimension, residents }) {
    const [dataResidents, setDataResidents] = useState(null);
    const getResidents = async (urls) =>
        await Promise.all(
            urls.map((url) =>
                fetch(url).then((res) => res.json().catch(() => null))
            )
        ).then((res) => res.filter((v) => v !== null));

    useEffect(() => {
        getResidents(residents).then((listResidents) =>
            setDataResidents(listResidents)
        );
    }, [residents]);

    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
                {name}
            </Typography>

            <Grid
                container
                sx={{ mt: 1, textAlign: { xs: 'left', md: 'center' } }}
            >
                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1">
                        <strong>Type: </strong> {type}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1">
                        <strong>Dimension: </strong> {dimension}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1">
                        <strong>Population: </strong> {residents.length}
                    </Typography>
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Typography variant="h2">Residents</Typography>

                {!dataResidents ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {dataResidents.map((resident, index) => (
                            <Resident key={index} {...resident} />
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
}
