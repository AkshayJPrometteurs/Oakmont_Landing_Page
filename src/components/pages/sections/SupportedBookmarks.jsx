"use client";
import SectionLayout from '@/layouts/SectionLayout';
import React from 'react';
import Marquee from "react-fast-marquee";

const SupportedBookmarks = () => {
    const sliderImages = ['sb-slider-1','sb-slider-2','sb-slider-7','sb-slider-3','sb-slider-4','sb-slider-5','sb-slider-6'];
    return (
        <SectionLayout id={'supported-bookmarks-section'} headingText={"Supported Bookmarks"} bgcolor={'#fffff'} color={'#000000'}>
            <div className='mt-10 md:mt-16'>
                <Marquee pauseOnHover={true}>
                    {sliderImages.map((images) => {
                        return(
                            <div key={images} className='px-10'>
                                <img src={`assets/images/supported-bookmarks/${images}.png`} alt={images} loading="lazy" className='mx-auto px-8 py-4 bg-[#F6F6F6] rounded-md max-w-full' />
                            </div>
                        )
                    })}
                </Marquee>
            </div>
        </SectionLayout>
    )
}

export default SupportedBookmarks