import React, { Fragment } from 'react';
import Footer from '@/components/utils/Footer';
import Header from '@/components/utils/Header';
import HeadingSlider from '@/components/pages/sections/HeadingSlider';

const MainPageLayout = ({children}) => {
    return (
        <Fragment>
            <HeadingSlider />
            <Header/>
            {children}
            <Footer/>
        </Fragment>
    )
}

export default MainPageLayout