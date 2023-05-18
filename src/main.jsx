import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';

import customTheme from './theme/index.js';
import { ThemeProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={customTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
