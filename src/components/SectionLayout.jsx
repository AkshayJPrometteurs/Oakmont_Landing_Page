
import React from 'react'

const SectionLayout = ({id,children,bgcolor,color,headingText}) => {
    return (
        <section id={id} className='px-10 py-16 md:px-32 md:py-16' style={{ backgroundColor : bgcolor, color : color }}>
            <h1 className='text-3xl md:text-5xl uppercase tracking-wider leading-[1.3!important] text-center font-base-runner'>{headingText}</h1>
            {children}
        </section>
    )
}

export default SectionLayout