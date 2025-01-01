"use client";
import React from "react";
import { Avatar, Divider } from "@nextui-org/react";
import SectionLayout from "../SectionLayout";
import { Inter } from "next/font/google";
import { FaArrowUp } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoBarChartSharp } from "react-icons/io5";

const inter = Inter({ subsets: ['latin'] });
const AITips = () => {
    return (
        <SectionLayout id={"ai-tips-section"} headingText={"AI Tips"} bgcolor={"#262626"} color={"#fff"}>
            <section>
                <h1 className="my-3 text-center font-urbanist">
                    Our AI Tip Bot is your personal advantage in the world of sports betting. Designed to find
                    the best value across sportsbooks, our powerful AI scans the market 24/7 to identify two
                    types of premium betting opportunities:
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                    <div>
                        <h1 className="uppercase tracking-wider font-base-runner text-xl md:text-2xl">Positive Expected Value (+EV) Tips</h1>
                        <h1 className={`my-5 ${inter.className}`}>
                            These tips are designed for long-term profitability. The AI hunts for bets where the
                            odds offered by the sportsbook are higher than the actual likelihood of the outcome,
                            giving you an edge over the house. With +EV tips, you’re not just betting, you’re
                            investing in consistently profitable outcomes over time.
                        </h1>
                    </div>
                    <div>
                        <h1 className="uppercase tracking-wider font-base-runner text-xl md:text-2xl">Arbitrage Tips (ARB):</h1>
                        <h1 className={`my-5 ${inter.className}`}>
                            These are risk-free opportunities where the AI finds differing odds across
                            sportsbooks, allowing you to cover all possible outcomes for a guaranteed profit.
                            With Arbitrage tips, you don’t need luck—just a few clicks to secure steady, reliable
                            returns.
                        </h1>
                    </div>
                </div>
                <div>
                    <div className={`flex flex-col md:flex-row gap-5 bg-[#333333] p-5 rounded-lg ${inter.className}`}>
                        <div className="flex-1">
                            <h1 className="uppercase tracking-wider font-base-runner text-2xl md:text-3xl mb-4">+EV</h1>
                            <div className="border border-white px-5 py-3 rounded-xl flex items-center justify-between mb-6">
                                <div><h1 className="text-xl md:text-2xl">50</h1><h1>Tips sent</h1></div>
                                <div className="p-3 bg-primaryColor rounded-full"><FaArrowUp /></div>
                            </div>
                            <div className="grid grid-col-1 md:grid-cols-2 items-center gap-6 md:gap-8">
                                <div className="border border-white px-5 py-3 rounded-xl">
                                    <div className="flex items-end">
                                        <h1 className="text-xl md:text-2xl">+40</h1>
                                        <IoMdArrowDropup color="#00D95F" size={'2rem'} className="-ml-1.5 -mb-1.5"/>
                                    </div>
                                    <h1>Units Win</h1>
                                </div>
                                <div className="border border-white px-5 py-3 rounded-xl">
                                    <h1 className="text-xl md:text-2xl">90%</h1>
                                    <h1>Win Percentage</h1>
                                </div>
                            </div>
                        </div>
                        <Divider className="bg-[#525252] border h-auto block md:hidden"/>
                        <Divider className="bg-[#525252] border h-auto hidden md:block" orientation="vertical"/>
                        <div className="flex-1">
                            <h1 className="uppercase tracking-wider font-base-runner text-2xl md:text-3xl mb-4">ARB</h1>
                            <div className="border border-white px-5 py-3 rounded-xl flex items-center justify-between mb-6">
                                <div><h1 className="text-xl md:text-2xl">60</h1><h1>Tips sent</h1></div>
                                <div className="p-3 bg-primaryColor rounded-full"><FaArrowUp /></div>
                            </div>
                            <div className="border border-white px-5 py-3 rounded-xl flex items-center justify-between mb-6">
                                <div>
                                    <div className="flex items-end">
                                        <h1 className="text-xl md:text-2xl">-40</h1>
                                        <IoMdArrowDropdown color="#00D95F" size={'2rem'} className="-ml-1.5 -mb-1.5"/>
                                    </div>
                                    <h1>Units Win</h1>
                                </div>
                                <div className="p-3 bg-primaryColor rounded-full"><IoBarChartSharp /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SectionLayout>
    );
};

export default AITips;
