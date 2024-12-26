"use client";
import { createTheme } from '@mui/material/styles';
import '@fontsource/dm-sans';

const theme = createTheme({
    palette: {
        primary: { main: '#0177FF' },
        secondary: { main: '#313131' },
    },
    typography: {
        primaryFont: 'DM Sans, Arial, sans-serif',
        secondaryFont: 'Base Runner, Arial, sans-serif',
        urbanistFont: 'Urbanist, Arial, sans-serif',
        interFont: 'Inter, Arial, sans-serif',
    },
});

export default theme;
