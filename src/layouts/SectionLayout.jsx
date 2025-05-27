"use client";

import React from 'react'

const SectionLayout = ({ id, children, bgcolor, color, headingText }) => {
    return (
        <section id={id} className='p-10 md:px-32 md:py-16' style={{ backgroundColor : bgcolor, color : color }}>
            <h1 className='text-5xl md:text-7xl uppercase tracking-widest text-center font-dharma-gothic-c-italic font-bold'>{headingText}</h1>
            {children}
        </section>
    )
}

export default SectionLayout