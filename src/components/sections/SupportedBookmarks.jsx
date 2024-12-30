"use client";
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import SectionLayout from '../SectionLayout';

const SupportedBookmarks = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const sliderImages = ['sb-slider-1','sb-slider-2','sb-slider-3','sb-slider-4','sb-slider-5','sb-slider-6','sb-slider-7'];
    return (
        <SectionLayout id={'supported-bookmarks-section'} bgcolor={'#fff'} color={'#000'} headingText={'Supported Bookmarks'}>
            <div className="slider-container mt-20">
                <Slider {...settings}>
                    {sliderImages.map((images) => {
                        return(
                            <div key={images}>
                                <img src={`assets/images/supported-bookmarks/${images}.png`} alt={images} loading="lazy" />
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </SectionLayout>
    )
}

export default SupportedBookmarks