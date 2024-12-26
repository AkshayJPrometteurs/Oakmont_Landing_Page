import AITips from '@/components/sections/AITips'
import BannerContents from '@/components/sections/BannerContents'
import DownloadApp from '@/components/sections/DownloadApp'
import SupportedBookmarks from '@/components/sections/SupportedBookmarks';
import { Box, Toolbar } from '@mui/material'
import React from 'react';

const page = () => {
    return (
        <Box component="main">
            <Toolbar />
            <BannerContents/>
            <DownloadApp/>
            <AITips/>
            <SupportedBookmarks/>
        </Box>
)
}

export default page