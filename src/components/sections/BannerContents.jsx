"use client";
import { Box, useTheme } from '@mui/material'
import React from 'react'

const BannerContents = () => {
    const theme = useTheme();
    return (
        <Box sx={{ backgroundImage: 'url(/assets/images/banner-one.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems :'center', height : {xs : 'auto', md: '630px'}, px : { xs : 8, md: 16 }, py : {xs : 5, md: 10 } }}>
                <div className='w-full md:w-[50%]'>
                    <h1 className='text-3xl md:text-5xl uppercase tracking-wider leading-[1.3!important] text-white' style={{ fontFamily : theme.typography.secondaryFont }}>Become the ultimate punter faster and easier than ever before.</h1>
                    <p className='text-[#CCCCCC] mt-8 text-lg md:text-xl w-full md:w-[73%] font-extralight' style={{ fontFamily : theme.typography.urbanistFont }}>Unlock greater returns thanks to our proven AI Tip Bot. We are your ultimate partner in sports tipping, news and competitions.</p>
                </div>
            </Box>
        </Box>
    )
}

export default BannerContents