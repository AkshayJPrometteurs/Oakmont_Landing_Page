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
            <p className='py-5 text-gray-500 font-urbanist text-center'>Our fantasy tournaments' are designed to be the ultimate challenge for sports punters with no money down and no risk. This isn't about luck; you will be rewarded for making smart selections, managing your points wisely, and outscoring other members to claim the top spot.</p>
            <div className='flex flex-col md:flex-row font-urbanist text-gray-500'>
                <Image src={TournamentMobileOne} className='w-full block md:hidden' alt='TournamentMobileOne'/>
                <div className='w-full md:w-[30%]'>
                    <div className='md:h-20'></div>
                    <div>
                        <h4 className='font-bold mb-3 text-black'>Tournaments Features</h4>
                        <p>Oakmont Athletic’s Points Challenge tournaments are packed with features that make every tournament exciting, strategic, and competitive.</p>
                        <ul style={{ paddingInlineStart: 15 }}>
                            <li>Multi-sport format: AFL, NBA, NFL, EPL, NRL & more.</li>
                            <li>Each tournament has a set starting points balance.</li>
                            <li>Use points to place picks across Line, Head-to-Head, and Total markets.</li>
                            <li>Real-time leaderboard tracking.</li>
                            <li>Stat tracking and performance history.</li>
                            <li>Easy-to-use interface for quick selections.</li>
                        </ul>
                    </div>
                    <div className='md:h-9'></div>
                    <div>
                        <h4 className='font-bold mb-3 text-black'>Tournaments Rewards</h4>
                        <p>Compete for your share of prizes in every tournament.</p>
                        <ul style={{ paddingInlineStart: 15 }}>
                            <li>Prize pool amounts are listed prior to kick off.</li>
                            <li>Top finishers share in the rewards — the better you pick, the bigger your payout.</li>
                            <li>Earn more points by increasing your stake or choosing higher odds.</li>
                            <li>Payouts are based on final leaderboard position.</li>
                            <li>Points are your in-game currency to allocate as you see fit</li>
                        </ul>
                    </div>
                </div>
                <Image src={TournamentMainImage} className='w-[75%] -mx-28 hidden md:block' alt='TournamentMainImage'/>
                <Image src={TournamentMobileSecond} className='w-full block md:hidden' alt='TournamentMobileSecond'/>
                <div className='w-full md:w-[26%] '>
                    <div className='md:h-36'></div>
                    <h4 className='font-bold mb-5 text-black'>How It Works</h4>
                    <ul style={{ paddingInlineStart: 15 }} className='pl-10'>
                        <li className='mb-5'>Get started in just a few taps and climb the leaderboard with winning selections.</li>
                        <li className='mb-5'>Join an active tournament and receive your starting points</li>
                        <li className='mb-5'>Browse upcoming matches and choose your picks.</li>
                        <li className='mb-5'>Choose your strategy, do you stake more points for a bigger return but also bigger risk or stake smaller amounts across a wider range of markets?</li>
                        <li className='mb-5'>Points earned = stake x odds (e.g., 10 pts on 1.5 odds = 15 pts return).</li>
                        <li className='mb-5'>Track results live on the leaderboard as games conclude.</li>
                        <li className='mb-5'>The highest point scorers at the end of the tournament win a share of the prize pool.</li>
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