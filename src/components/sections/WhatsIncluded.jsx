"use client"
import React from 'react';
import SectionLayout from '../SectionLayout';
import { LuBot } from "react-icons/lu";
import { Card, CardBody } from '@nextui-org/react';
import { RiBasketballLine } from "react-icons/ri";
import { TbDeviceAnalytics } from "react-icons/tb";

const WhatsIncluded = () => {
    const items = [
        { icon : <LuBot color='#FE7234' size={'3rem'}/>, title : 'AI Tip Bot', description : 'Get winning insights with real-time, AI-powered betting tips on both Arbitrage and Positive Expected Value opportunities.' },
        { icon : <RiBasketballLine color='#FE7234' size={'3rem'}/>, title : 'Access To Tournaments', description : 'Compete against the community in the fantasy tournaments for a chance to win big prizes.' },
        { icon : <TbDeviceAnalytics color='#FE7234' size={'3rem'}/>, title : 'Access To News & Analysis ', description : 'Stay informed with up-to-date sports news, analysis, and team updates, all in one place.' },
    ]
    return (
        <SectionLayout id={'whats-included-section'} headingText={"What's Included"}>
            <p className='font-urbanist my-10'>Maximise your returns and unlock the full range of benefits with Oakmont Athletic. Our membership is the perfect solution for punters who want convenience and results. Get access to expert insights, AI-powered betting tips, exclusive tournaments, and the latest sports news—all in one place.</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 font-urbanist'>
                {items.map((data) => {
                    return(<Card key={data.title} className='shadow-none bg-[#262626] p-4 text-white'>
                        <CardBody>
                            <div className='bg-white rounded-full p-4 w-20 mx-auto'>{data.icon}</div>
                            <h3 className='text-center text-xl font-bold my-4'>{data.title}</h3>
                            <p className='text-gray-400'>{data.description}</p>
                        </CardBody>
                    </Card>)
                })}
            </div>
        </SectionLayout>
    )
}

export default WhatsIncluded