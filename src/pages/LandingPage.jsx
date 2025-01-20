"use client";

import React from 'react';
import MainPageLayout from '@/layouts/MainPageLayout';
import AITips from '@/pages/sections/AITips';
import BannerContents from '@/pages/sections/BannerContents';
import BecomeAMVPMember from '@/pages/sections/BecomeAMVPMember';
import DownloadApp from '@/pages/sections/DownloadApp';
import FrequentlyAskQuestions from '@/pages/sections/FrequentlyAskQuestions';
import ReferFriendsAndEarn from '@/pages/sections/ReferFriendsAndEarn';
import SupportedBookmarks from '@/pages/sections/SupportedBookmarks';
import Testimonials from '@/pages/sections/Testimonials';
import Tournaments from '@/pages/sections/Tournaments';
import WhatsIncluded from '@/pages/sections/WhatsIncluded';
import { useAuthServiceContext } from '@/contexts/AuthServiceProvider';

const LandingPage = () => {
    const { isAuthenticated } = useAuthServiceContext();
    return (
        <MainPageLayout>
            <section>
                <BannerContents/>
                <DownloadApp/>
                <AITips/>
                <SupportedBookmarks/>
                <Tournaments/>
                <BecomeAMVPMember href={isAuthenticated ? '/manage-subscription' : '/signup'}/>
                <WhatsIncluded/>
                <Testimonials/>
                <ReferFriendsAndEarn/>
                <FrequentlyAskQuestions/>
            </section>
        </MainPageLayout>
    )
}

export default LandingPage