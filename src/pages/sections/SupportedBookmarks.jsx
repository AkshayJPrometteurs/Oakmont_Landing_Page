"use client";
import React from 'react';
import Marquee from "react-fast-marquee";

const SupportedBookmarks = () => {
    const sliderImages = ['sb-slider-1','sb-slider-2','sb-slider-7','sb-slider-3','sb-slider-4','sb-slider-5','sb-slider-6'];
    return (
        <section id={'supported-bookmarks-section'} className='px-4 py-16'>
            <h1 className='text-3xl md:text-5xl uppercase tracking-wider leading-[1.3!important] text-center font-base-runner mb-10'>Supported Bookmarks</h1>
            <Marquee pauseOnHover={true}>
                {sliderImages.map((images) => {
                    return(
                        <div key={images} className='px-10'>
                            <img src={`assets/images/supported-bookmarks/${images}.png`} alt={images} loading="lazy" className='mx-auto px-8 py-4 bg-[#F6F6F6] rounded-md max-w-full' />
                        </div>
                    )
                })}
            </Marquee>
        </section>
    )
}

export default SupportedBookmarks