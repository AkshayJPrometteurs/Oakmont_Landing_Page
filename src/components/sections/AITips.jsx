"use client";
import { ArrowDropDown, ArrowDropUp, ArrowUpward, BarChart } from '@mui/icons-material';
import { Avatar, Box, Divider, useTheme } from '@mui/material'
import React from 'react'

const AITips = () => {
    const theme = useTheme();
    return (
        <Box sx={{ px : { xs : 8, md: 16 }, py : {xs : 5, md: 10 }, bgcolor: '#262626', color: '#fff' }} id='ai-tips-section'>
            <section>
                <div className='text-center'>
                    <h1 className='text-3xl md:text-5xl uppercase tracking-wider leading-[1.3!important]' style={{ fontFamily : theme.typography.secondaryFont }}>AI Tips</h1>
                    <p className='my-3' style={{ fontFamily : theme.typography.interFont }}>Our AI Tip Bot is your personal advantage in the world of sports betting. Designed to find the best value across sportsbooks, our powerful AI scans the market 24/7 to identify two types of premium betting opportunities:</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-16'>
                    <div>
                        <h1 className='text-xl md:text-2xl uppercase tracking-wider leading-[1.3!important]' style={{ fontFamily : theme.typography.secondaryFont }}>Positive Expected Value (+EV) Tips</h1>
                        <p className='my-3' style={{ fontFamily : theme.typography.interFont }}>These tips are designed for long-term profitability. The AI hunts for bets where the odds offered by the sportsbook are higher than the actual likelihood of the outcome, giving you an edge over the house. With +EV tips, you’re not just betting, you’re investing in consistently profitable outcomes over time</p>
                    </div>
                    <div>
                        <h1 className='text-xl md:text-2xl uppercase tracking-wider leading-[1.3!important]' style={{ fontFamily : theme.typography.secondaryFont }}>Arbitrage Tips (ARB): </h1>
                        <p className='my-3' style={{ fontFamily : theme.typography.interFont }}>These are risk-free opportunities where the AI finds differing odds across sportsbooks, allowing you to cover all possible outcomes for a guaranteed profit. With Arbitrage tips, you don’t need luck—just a few clicks to secure steady, reliable returns.</p>
                    </div>
                </div>
                <Box sx={{ bgcolor : '#333333', p : 4, mt : 6, borderRadius : 1.5 }}>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='flex-1'>
                            <h1 className='text-xl md:text-3xl uppercase tracking-wider leading-[1.3!important]' style={{ fontFamily : theme.typography.secondaryFont }}>+EV</h1>
                            <Box sx={{ border : '1px solid white', py: 2, px: 3, borderRadius : 1.5, mt : 3, display : 'flex', justifyContent : 'space-between', alignItems : 'center' }}>
                                <div>
                                    <h1 className='text-2xl' style={{ fontFamily: theme.typography.interFont }}>50</h1>
                                    <p>Tips sent</p>
                                </div>
                                <Avatar sx={{ bgcolor: theme.palette.primary.main }}><ArrowUpward /></Avatar>
                            </Box>
                            <div className='grid grid-cols-2 items-center gap-10'>
                                <Box sx={{ border : '1px solid white', py: 2, px: 3, borderRadius : 1.5, mt : 3 }}>
                                    <div className='flex items-end'>
                                        <h1 className='text-2xl' style={{ fontFamily: theme.typography.interFont }}>+40</h1>
                                        <ArrowDropUp sx={{ color: '#00D95F', fontSize : '2rem', marginBottom : '-0.4rem', marginLeft : '-0.5rem' }}/>
                                    </div>
                                    <p>Units Win</p>
                                </Box>
                                <Box sx={{ border : '1px solid white', py: 2, px: 3, borderRadius : 1.5, mt : 3 }}>
                                    <h1 className='text-2xl' style={{ fontFamily: theme.typography.interFont }}>90%</h1>
                                    <p>Win Percentage</p>
                                </Box>
                            </div>
                        </div>
                        <Divider orientation="vertical" sx={{ borderColor : '#525252', display : { xs: 'none', md: 'block'} }} flexItem />
                        <Divider orientation="horizontal" sx={{ borderColor : '#525252', display : { xs: 'block', md: 'none'} }} flexItem />
                        <div className='flex-1'>
                            <h1 className='text-xl md:text-3xl uppercase tracking-wider leading-[1.3!important]' style={{ fontFamily : theme.typography.secondaryFont }}>ARB</h1>
                            <Box sx={{ border : '1px solid white', py: 2, px: 3, borderRadius : 1.5, mt : 3, display : 'flex', justifyContent : 'space-between', alignItems : 'center' }}>
                                <div>
                                    <h1 className='text-2xl' style={{ fontFamily: theme.typography.interFont }}>60</h1>
                                    <p>Tips sent</p>
                                </div>
                                <Avatar sx={{ bgcolor: theme.palette.primary.main }}><ArrowUpward /></Avatar>
                            </Box>
                            <Box sx={{ border : '1px solid white', py: 2, px: 3, borderRadius : 1.5, mt : 3, display : 'flex', justifyContent : 'space-between', alignItems : 'center' }}>
                                <div>
                                    <div className='flex items-end'>
                                        <h1 className='text-2xl' style={{ fontFamily: theme.typography.interFont }}>-40</h1>
                                        <ArrowDropDown sx={{ color: '#FE3434', fontSize : '2rem', marginBottom : '-0.4rem', marginLeft : '-0.5rem' }}/>
                                    </div>
                                    <p>Units Loss</p>
                                </div>
                                <Avatar sx={{ bgcolor: theme.palette.primary.main }}><BarChart /></Avatar>
                            </Box>
                        </div>
                    </div>
                </Box>
            </section>
        </Box>
    )
}

export default AITips