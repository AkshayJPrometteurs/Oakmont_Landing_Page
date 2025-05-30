import React from 'react';
import { Button } from "@heroui/react";
import { Inter } from 'next/font/google';
import Link from "next/link";
import {useAuthServiceContext} from "@/contexts/AuthServiceProvider";

const inter = Inter({ subsets: ['latin'] });
const ReferFriendsAndEarn = () => {
    const { isAuthenticated } = useAuthServiceContext();
    return (
        <section id="download-app-section" className="p-10 md:px-32 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 justify-center items-center bg-[#F7F7F7]">
            <div>
                <h1 className="uppercase text-5xl md:text-7xl text-center md:text-left font-dharma-gothic-c-italic tracking-widest font-bold">Refer friends and earn</h1>
                <p className='font-urbanist my-6 md:my-8'>All members have the opportunity to refer unlimited new members and earn up to 50% of their membership fee ongoing! It's as simple as sharing your referral code and we take care of the rest!</p>
                {!isAuthenticated && (
                    <Link href="/login">
                        <Button color="primary" className={`w-full md:w-auto ${inter.className}`}>Sign In to Affiliate</Button>
                    </Link>
                )}
            </div>
            <div className='text-center'>
                <h1 className="uppercase text-5xl md:text-7xl font-base-runner text-primaryColor">$10,500.00</h1>
                <p className='text-gray-500 text-xl font-urbanist my-6'>Referrals Paid</p>
            </div>
        </section>
    )
}

export default ReferFriendsAndEarn