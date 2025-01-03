import React from 'react'
import AITips from '@/components/sections/AITips'
import BannerContents from '@/components/sections/BannerContents'
import BecomeAMVPMember from '@/components/sections/BecomeAMVPMember'
import DownloadApp from '@/components/sections/DownloadApp'
import SupportedBookmarks from '@/components/sections/SupportedBookmarks'
import Tournaments from '@/components/sections/Tournaments'
import MainPageLayout from './layout'
import WhatsIncluded from '@/components/sections/WhatsIncluded'
import ReferFriendsAndEarn from '@/components/sections/ReferFriendsAndEarn'
import FrequentlyAskQuestions from '@/components/sections/FrequentlyAskQuestions'
import Testimonials from '@/components/sections/Testimonials'

const page = () => {
    return (
        <MainPageLayout>
            <section>
                <BannerContents/>
                <DownloadApp/>
                <AITips/>
                <SupportedBookmarks/>
                <Tournaments/>
                <BecomeAMVPMember href={'/manage-subscription'}/>
                <WhatsIncluded/>
                <Testimonials/>
                <ReferFriendsAndEarn/>
                <FrequentlyAskQuestions/>
            </section>
        </MainPageLayout>
    )
}

export default page