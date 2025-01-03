import React, { Fragment } from 'react';
import Header from '@/components/Header';
import HeadingSlider from '@/components/sections/HeadingSlider';
import Footer from '@/components/Footer';

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