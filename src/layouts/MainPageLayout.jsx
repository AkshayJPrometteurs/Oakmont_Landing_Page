import React, { Fragment } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeadingSlider from '@/pages/sections/HeadingSlider';

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