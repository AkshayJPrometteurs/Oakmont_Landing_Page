import React from 'react'
import { Card, CardBody, User } from "@heroui/react";
import { RiDoubleQuotesL } from "react-icons/ri";
import SectionLayout from '@/layouts/SectionLayout';

const Testimonials = () => {
    const testimonalsData = [
        {
            contents : 'Lorem ipsum dolor sit amet consectetur. Et interdum odio adipiscing in fames sagittis rhoncus fermentum. Amet tincidunt facilisi magna accumsan in.',
            image : 'tm-1.png', name : 'Jordan Stevenson', username : '@jordans12689'
        },
        {
            contents : 'Lorem ipsum dolor sit amet consectetur. Mauris eu luctus fermentum justo massa aliquet diam nisl. Elementum nulla auctor blandit turpis tristique. Praesent proin vestibulum viverra et quam nunc molestie. Scelerisque ut natoque nisl quam.',
            image : 'tm-2.png', name : 'Jordan Stevenson', username : '@jordans12689'
        },
        {
            contents : 'Lorem ipsum dolor sit amet consectetur. Et interdum odio adipiscing in fames sagittis rhoncus fermentum. Amet tincidunt facilisi magna accumsan in.',
            image : 'tm-3.png', name : 'Jordan Stevenson', username : '@jordans12689'
        },
        {
            contents : 'Lorem ipsum dolor sit amet consectetur. Et interdum odio adipiscing in fames sagittis rhoncus fermentum. Amet tincidunt facilisi magna accumsan in.',
            image : 'tm-4.png', name : 'Jordan Stevenson', username : '@jordans12689'
        },
        {
            contents : 'Lorem ipsum dolor sit amet consectetur. Mauris eu luctus fermentum justo massa aliquet diam nisl. Elementum nulla auctor blandit turpis tristique. Praesent proin vestibulum viverra et quam nunc molestie. Scelerisque ut natoque nisl quam.',
            image : 'tm-5.png', name : 'Jordan Stevenson', username : '@jordans12689'
        },
        {
            contents : 'Lorem ipsum dolor sit amet consectetur. Et interdum odio adipiscing in fames sagittis rhoncus fermentum. Amet tincidunt facilisi magna accumsan in.',
            image : 'tm-6.png', name : 'Jordan Stevenson', username : '@jordans12689'
        },
    ];
    return (
        <SectionLayout id="testimonials-section" headingText={'What Our Members Are Saying'}>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
                {testimonalsData.map((data,index) => { return(
                    <Card key={index} className='shadow w-full h-fit p-3'>
                        <CardBody>
                            <RiDoubleQuotesL color='#0177FF' size={'3rem'}/>
                            <p className='my-4'>{data.contents}</p>
                            <User className='justify-start' avatarProps={{ src : `assets/images/testimonials/${data.image}` }} description={data.username} name={data.name} />
                        </CardBody>
                    </Card>
                )})}
            </div>
        </SectionLayout>
    )
}

export default Testimonials