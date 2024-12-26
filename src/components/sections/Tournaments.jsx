"use client";
import { Box, useTheme } from '@mui/material';
import React from 'react'

const Tournaments = () => {
    const theme = useTheme();
    return (
        <Box sx={{ px : { xs : 8, md: 16 }, py : {xs : 5, md: 10 }, bgcolor : '#f7f7f7' }} id="supported-bookmarks-section">
            <h1 className='text-3xl md:text-5xl uppercase tracking-wider leading-[1.3!important] text-center' style={{ fontFamily : theme.typography.secondaryFont }}>Tournaments</h1>
            <p style={{ fontFamily : theme.typography.urbanistFont, color : '#707070' }} className='py-5'>Our fantasy tournaments' are designed to be the ultimate challenge for sports punters with no money down and no risk. This isn't about luck; you will be rewarded for making smart selections, managing your points wisely, and outscoring other members to claim the top spot.</p>
        </Box>
    )
}

export default Tournaments