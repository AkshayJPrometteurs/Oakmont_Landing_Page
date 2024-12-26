"use client";
import { Box, useTheme } from '@mui/material';
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const SupportedBookmarks = () => {
    const theme = useTheme();
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <Box sx={{ px : { xs : 8, md: 16 }, py : {xs : 5, md: 10 }, }} id="supported-bookmarks-section">
            <h1 className='text-3xl md:text-5xl uppercase tracking-wider leading-[1.3!important] text-center' style={{ fontFamily : theme.typography.secondaryFont }}>Supported Bookmarks</h1>
            <div className="slider-container">
                <Slider {...settings}>
                    <div>
                    <h3>1</h3>
                    </div>
                    <div>
                    <h3>2</h3>
                    </div>
                    <div>
                    <h3>3</h3>
                    </div>
                    <div>
                    <h3>4</h3>
                    </div>
                    <div>
                    <h3>5</h3>
                    </div>
                    <div>
                    <h3>6</h3>
                    </div>
                </Slider>
            </div>
        </Box>
    )
}

export default SupportedBookmarks