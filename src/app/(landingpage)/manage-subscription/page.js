/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { Fragment } from 'react';
import BecomeAMVPMember from '@/components/sections/BecomeAMVPMember';
import { Button, Checkbox, Divider, Input, ModalHeader, Select, SelectItem } from '@nextui-org/react';
import { Inter } from 'next/font/google';
import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";

const inter = Inter({subsets:['latin']});
const page = () => {
    const planBenifits = ['Arbitrage bot','+EV bot','Fantasy Tournaments','News and Analysis','Team Events'];
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const countries = [
        { key: "us", label: "United States" },
        { key: "ca", label: "Canada" },
        { key: "gb", label: "United Kingdom" },
        { key: "fr", label: "France" },
        { key: "de", label: "Germany" },
        { key: "in", label: "India" },
        { key: "cn", label: "China" },
        { key: "jp", label: "Japan" },
        { key: "au", label: "Australia" },
        { key: "br", label: "Brazil" },
        { key: "za", label: "South Africa" },
        { key: "ru", label: "Russia" },
        { key: "it", label: "Italy" },
        { key: "es", label: "Spain" },
        { key: "mx", label: "Mexico" },
        { key: "kr", label: "South Korea" },
        { key: "id", label: "Indonesia" },
        { key: "ar", label: "Argentina" },
        { key: "sa", label: "Saudi Arabia" },
        { key: "eg", label: "Egypt" },
    ];
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
            <BecomeAMVPMember onpress={onOpen} />
            <Modal backdrop='blur' size='4xl' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" hideCloseButton={false}>
                <ModalContent>
                    {(onClose) => (
                        <Fragment>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <form className={inter.className}>
                                    <div className='flex flex-col md:flex-row'>
                                        <div className='w-full md:w-3/5'>
                                            <div>
                                                <h1 className='mb-3 text-lg font-bold'>Billing Details</h1>
                                                <Input label="Email" type="email" className='mb-3' />
                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                    <Select className="max-w-xs" label="Billing Country">
                                                        {countries.map((country) => <SelectItem key={country.key}>{country.label}</SelectItem> )}
                                                    </Select>
                                                    <Input label="Billing Zip / Postal Code" type="text" maxLength={6} className='mb-3' />
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className='mb-3 text-lg font-bold'>Credit Card Details</h1>
                                                <Input label="Full name" type="text" className='mb-3' />
                                                <Input label="Credit Card Number" type="text" className='mb-3' />
                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                    <Input label="Expiration month & Year" type="text" className='mb-3' />
                                                    <Input label="CVC*" type="text" maxLength={3} className='mb-3' />
                                                </div>
                                            </div>
                                        </div>
                                        <Divider orientation='vertical' className='h-auto mx-4' />
                                        <div className='w-full md:w-2/5'>
                                            <h1 className='mb-3 text-lg font-bold'>Summary</h1>
                                            <p>Lorem ipsum dolor sit amet consectetur. Urna consectetur pretium ornare tincidunt ipsum orci dolor.</p>
                                        </div>
                                    </div>
                                </form>
                            </ModalBody>
                        </Fragment>
                    )}
                </ModalContent>
            </Modal>
        </section>
    )
}

export default page