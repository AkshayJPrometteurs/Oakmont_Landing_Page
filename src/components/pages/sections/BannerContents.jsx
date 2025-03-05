"use client";

import React from 'react';

const BannerContents = () => {
    return (
        <div style={{ backgroundImage: 'url(/assets/images/banner-one.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%' }} id='home-section'>
            <div className="md:h-[630px] p-10 md:px-32 md:py-16 flex items-center">
                <div className="banner-width w-full  md:w-[50%] ">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl uppercase tracking-wider md:leading-[1.3!important] text-white " style={{ fontFamily: 'Base Runner' }}>
                        Become the ultimate punter faster and easier than ever before.
                    </h1>
                    <p className="text-gray-300 mt-8 text-lg md:text-xl w-full md:w-[73%] font-extralight font-urbanist">
                        Unlock greater returns thanks to our proven AI Tip Bot. We are your ultimate partner in sports tipping, news and competitions.
                    </p>
                </div>
            </div>
        </div>


    );
};

export default BannerContents;
