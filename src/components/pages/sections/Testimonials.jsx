import React from 'react'
import { Card, CardBody, User } from "@heroui/react";
import { RiDoubleQuotesL } from "react-icons/ri";
import SectionLayout from '@/layouts/SectionLayout';

const Testimonials = () => {
    const testimonalsData = [
        {
            contents : "I've always followed sport and had a punt on the weekend, but this app has completely changed how I do both. The tournaments are unreal and actually make watching games more fun. I've even won a bit, which is a bonus. It's now a part of my weekly routine.",
            image : 'tm-1.png', name : 'Josh. P', username : '@6778josh'
        },
        {
            contents : "Didn't think I'd be into this stuff, but the app makes it so easy to follow.",
            image : 'tm-2.png', name : 'Chris. G', username : '@gscris89777'
        },
        {
            contents : "Honestly didn’t expect to get this hooked. The bot finds value I’d never notice and it’s helped me stop placing dumb bets like 10 eg multis. The layout’s clean, everything’s easy to find, and the Clubhouse updates are good as well",
            image : 'tm-3.png', name : 'Tom. O', username : '@tom87652'
        },
        {
            contents : "I was sceptical at first, but I’ve been using the app for a few weeks now and it’s bloody impressive. The tipping comps are proper competitive, and I love that you can track your performance. Makes betting feel more strategic instead of just throwing money around. Feels like I’m part of a community too, not just another user.",
            image : 'tm-4.png', name : 'Mitch. M', username : '@89887mm'
        },
        {
            contents : "Loving the AI tips — saves me heaps of time and actually hitting winners.",
            image : 'tm-5.png', name : 'Mick. T', username : '@mickt98672131'
        },
        {
            contents : "Oakmont’s been unreal. The tips actually make sense, I’ve hit a few solid wins, and the tournaments add a bit of fun during the week. Easily one of the better apps I’ve used for sport and punting.",
            image : 'tm-6.png', name : 'Marco. D', username : '@35576569marcod'
        },
    ];
    return (
        <SectionLayout id="testimonials-section" headingText={'What Our Members Are Saying'}>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
                {testimonalsData.map((data,index) => { return(
                    <Card key={index} className='shadow w-full h-fit p-3'>
                        <CardBody>
                            <RiDoubleQuotesL color='#321fb7' size={'3rem'}/>
                            <p className='my-4'>{data.contents}</p>
                            {/* <User className='justify-start' description={data.username} name={data.name} /> */}
                            <span className='text-small text-inherit'>{data.name}</span>
                            {/* <span className='text-tiny text-foreground-400'>{data.username}</span> */}
                        </CardBody>
                    </Card>
                )})}
            </div>
        </SectionLayout>
    )
}

export default Testimonials