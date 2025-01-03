"use client";
import React from 'react';
import BecomeAMVPMember from '@/components/sections/BecomeAMVPMember';
import { Button, Checkbox, Divider } from '@nextui-org/react';
import { Inter } from 'next/font/google';

const inter = Inter({subsets:['latin']});
const ManageSubscription = () => {
    const planBenifits = ['Arbitrage bot','+EV bot','Fantasy Tournaments','News and Analysis','Team Events'];
    return (
        <section className='p-10 md:px-32 md:py-16'>
            <h1 className='text-3xl md:text-5xl uppercase tracking-wider leading-[1.3!important] font-base-runner'>Weekly Subscription plans</h1>
            <p className='my-6 font-urbanist'>Lorem ipsum dolor sit amet consectetur. Id non aliquet sed nulla purus dictum in in blandit. Porta suspendisse nunc enim faucibus bibendum quis urna augue.</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center font-urbanist font-semibold'>
                <div>
                    <p className='my-3'>Current Plan</p>
                    <p className='text-primaryColor'>Monthly Subscription Plan</p>
                </div>
                <div>
                    <p className='my-3'>Next plan renewal cycle</p>
                    <p>30-Nov-2024</p>
                </div>
                <Button color="primary" variant="flat" className='mx-auto font-dm-sans' style={{ fontWeight : 'bold' }}>Manage Billing</Button>
            </div>
            <Divider className='my-6' />
            <div className={inter.className}>
                <h6 className='font-bold'>Plan Benefits:</h6>
                <div className='flex flex-wrap items-center gap-6 my-6'>
                    {planBenifits.map((data,index) => <Checkbox className='opacity-100 font-normal' key={index} defaultSelected isDisabled>{data}</Checkbox>)}
                </div>
            </div>
            <BecomeAMVPMember isModalOpen={true} />
        </section>
    )
}

export default ManageSubscription