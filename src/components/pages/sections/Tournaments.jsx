"use client";
import React from 'react';
import Image from 'next/image';
import SectionLayout from '@/layouts/SectionLayout';
import TournamentMainImage from '../../../../public/assets/images/tournaments.png';
import TournamentMobileOne from '../../../../public/assets/images/tournament-mobile-1.png';
import TournamentMobileSecond from '../../../../public/assets/images/tournament-mobile-2.png';

const Tournaments = () => {
    return (
        <SectionLayout id={'tournaments-section'} bgcolor={'#F7F7F7'} color={'#000'} headingText={'Tournaments'}>
            <p className='py-5 text-gray-500 font-urbanist'>Our fantasy tournaments' are designed to be the ultimate challenge for sports punters with no money down and no risk. This isn't about luck; you will be rewarded for making smart selections, managing your points wisely, and outscoring other members to claim the top spot.</p>
            <div className='flex flex-col md:flex-row font-urbanist text-gray-500'>
                <Image src={TournamentMobileOne} className='w-full block md:hidden' alt='TournamentMobileOne'/>
                <div className='w-full md:w-[26%]'>
                    <div className='md:h-24'></div>
                    <div>
                        <h4 className='font-bold mb-3 text-black'>Tournaments Features</h4>
                        <p>Lorem ipsum dolor sit amet consectetur. Faucibus morbi interdum gravida sed auctor amet vitae. Eu turpis volutpat interdum mattis purus. Aliquam aliquam varius eget est faucibus viverra.</p>
                    </div>
                    <div className='md:h-40'/>
                    {/* <div className='md:h-56'></div> */}
                    <div>
                        <h4 className='font-bold mb-3 text-black'>Tournaments Rewards</h4>
                        <p>Lorem ipsum dolor sit amet consectetur. Faucibus morbi interdum gravida sed auctor amet vitae. Eu turpis volutpat interdum mattis purus. Aliquam aliquam varius eget est faucibus viverra.</p>
                    </div>
                </div>
                <Image src={TournamentMainImage} className='w-[68%] -mx-28 hidden md:block' alt='TournamentMainImage'/>
                <Image src={TournamentMobileSecond} className='w-full block md:hidden' alt='TournamentMobileSecond'/>
                <div className='w-full md:w-[26%] '>
                    <div className='md:h-36'></div>
                    <h4 className='font-bold mb-5 text-black pl-8'>How It Works</h4>
                    <ul style={{ listStyle: 'disc' }} className='pl-16'>
                        <li className='mb-5'>Lorem ipsum dolor sit amet consectetur. Et vulputate lorem scelerisque in feugiat etiam cras. Molestie euismod arcu pretium in. </li>
                        <li className='mb-5'>Venenatis elit sed vestibulum urna sed. Turpis elit mattis ullamcorper porta sit. </li>
                        <li className='mb-5'>Convallis gravida pellentesque laoreet risus nibh bibendum ipsum egestas.</li>
                        <li className='mb-5'>Amet a aliquam placerat diam neque scelerisque. Rhoncus nunc nibh nulla eget eget diam lorem.</li>
                    </ul>
                </div>
            </div>
            <div className='text-center mt-14 md:mt-0'>
                <h1 className="uppercase text-5xl md:text-7xl font-base-runner text-primaryColor">$10,500.00</h1>
                <p className='text-gray-500 text-xl my-6 font-urbanist'>Tournaments Payout</p>
            </div>
        </SectionLayout>
    )
}

export default Tournaments