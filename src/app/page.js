import AITips from '@/components/sections/AITips'
import BannerContents from '@/components/sections/BannerContents'
import BecomeAMVPMember from '@/components/sections/BecomeAMVPMember';
import DownloadApp from '@/components/sections/DownloadApp'
import SupportedBookmarks from '@/components/sections/SupportedBookmarks';
import Tournaments from '@/components/sections/Tournaments';
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
            <Tournaments/>
            <BecomeAMVPMember/>
        </Box>
    )
}

export default page