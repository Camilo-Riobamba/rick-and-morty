import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import 'normalize.css';
import './App.css';

import {
    Box,
    Container,
    Skeleton,
    Typography,
    Avatar,
    TextField,
    Grid,
    Button
} from '@mui/material';
import Location from './Location';

function App() {
    const [location, setLocation] = useState(null);
    const changeLocation = (id) => {
        fetch(`https://rickandmortyapi.com/api/location/${id}`)
            .then((res) => res.json())
            .then((data) => setTimeout(() => setLocation(data), 1000));
    };

    useEffect(() => changeLocation(Math.floor(Math.random() * 126) + 1), []);

    const { control, handleSubmit } = useForm();
    const searchLocation = handleSubmit(({ location }) =>
        changeLocation(location)
    );

    if (!location)
        return (
            <Box
                sx={{
                    height: '100vh',

                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box sx={{ maxWidth: '300px', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ m: 1 }}>
                            <Skeleton variant="circular">
                                <Avatar />
                            </Skeleton>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Skeleton width="100%">
                                <Typography>.</Typography>
                            </Skeleton>
                        </Box>
                    </Box>
                    <Skeleton variant="rectangular" width="100%">
                        <Box sx={{ p: 5 }} />
                    </Skeleton>
                    <Skeleton variant="rectangular" width="100%">
                        <Box sx={{ p: 5, mt: 1 }} />
                    </Skeleton>
                </Box>

                <Typography variant="body2" color="GrayText" sx={{ mt: 2 }}>
                    Cargando...
                </Typography>
            </Box>
        );

    return (
        <Container sx={{ p: 2 }}>
            <Box component="form" noValidate onSubmit={searchLocation}>
                <Controller
                    control={control}
                    name="location"
                    defaultValue=""
                    rules={{
                        required: true,
                        validate: (value) => {
                            if (isNaN(value)) return false;

                            const idLocation = parseInt(value);
                            if (idLocation < 1 || idLocation > 126)
                                return false;
                        }
                    }}
                    render={({
                        field: { ref, ...field },
                        fieldState: { error }
                    }) => (
                        <TextField
                            variant="outlined"
                            label="Search location by number (enter to search)"
                            inputRef={ref}
                            {...field}
                            fullWidth
                            error={!!error}
                        />
                    )}
                />
            </Box>

            <Location {...location} />
        </Container>
    );
}

export default App;
