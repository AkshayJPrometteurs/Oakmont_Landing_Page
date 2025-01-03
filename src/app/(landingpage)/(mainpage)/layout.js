"use client"
import React, { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import HeadingSlider from '@/components/sections/HeadingSlider';
import Footer from '@/components/Footer';

const MainPageLayout = ({children}) => {
    const pathname = usePathname();
    return (
        <Fragment>
            {pathname === '/' && <HeadingSlider />}
            <Header/>
            {children}
            <Footer/>
        </Fragment>
    )
}

export default MainPageLayout