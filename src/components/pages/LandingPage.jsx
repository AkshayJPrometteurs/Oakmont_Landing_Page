"use client";

import React from 'react';
import MainPageLayout from '@/layouts/MainPageLayout';
import AITips from '@/components/pages/sections/AITips';
import BannerContents from '@/components/pages/sections/BannerContents';
import BecomeAMVPMember from '@/components/pages/sections/BecomeAMVPMember';
import DownloadApp from '@/components/pages/sections/DownloadApp';
import FrequentlyAskQuestions from '@/components/pages/sections/FrequentlyAskQuestions';
import ReferFriendsAndEarn from '@/components/pages/sections/ReferFriendsAndEarn';
import SupportedBookmarks from '@/components/pages/sections/SupportedBookmarks';
import Testimonials from '@/components/pages/sections/Testimonials';
import Tournaments from '@/components/pages/sections/Tournaments';
import WhatsIncluded from '@/components/pages/sections/WhatsIncluded';
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
                <BecomeAMVPMember linkPath={isAuthenticated ? '/manage-subscription' : '/signup'}/>
                <WhatsIncluded/>
                <Testimonials/>
                <ReferFriendsAndEarn/>
                <FrequentlyAskQuestions/>
            </section>
        </MainPageLayout>
    )
}

export default LandingPage