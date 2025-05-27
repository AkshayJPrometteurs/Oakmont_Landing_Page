"use client";
import React, {Fragment, useEffect, useState} from 'react';
import {Button, Checkbox, Divider, useDisclosure, Alert, Chip} from "@heroui/react";
import { Inter } from 'next/font/google';
import MainPageLayout from '@/layouts/MainPageLayout';
import BecomeAMVPMember from "@/components/pages/sections/BecomeAMVPMember";
import axios from "axios";
import Axios from "@/components/utils/Axios";
import moment from "moment";
import { IoIosAlert } from "react-icons/io";
import Modals from "@/components/utils/Modals";
import {toast} from "react-toastify";

const inter = Inter({subsets:['latin']});
const ManageSubscription = () => {
    const planBenefits = ['Arbitrage bot','+EV bot','Fantasy Tournaments','News and Analysis','Team Events'];
    const [countries, setCountries] = useState([]);
    const [isCountryLoading, setIsCountryLoading] = useState(false);
    const [isSubscription, setIsSubscription] = useState(false);
    const [subscriptionDetails, setSubscriptionDetails] = useState(false);
    const [subscriptionCancelLoader, setSubscriptionCancelLoader] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const getCountriesData = async() => {
        setIsCountryLoading(true);
        try{
            const response = await axios.get('/api/countries');
            setCountries(response.data);
            setIsCountryLoading(false);
        }catch(error){ console.error(error); }
    }

    const getSubscriptionDetails = async() => {
        try {
            const { data } = await Axios.get('user_subscription/subscription-details');
            setIsSubscription(data?.status_code === 400);
            setSubscriptionDetails(data?.data);
        }catch (error){
            setIsSubscription(error?.response?.data?.status_code === 400);
        }
    }

    const handleCancelSubscription = async() => {
        setSubscriptionCancelLoader(true);
        try {
            const { data } = await Axios.post('user_subscription/cancel-subscription');
            onClose();
            toast(<Alert color="success" title={data?.message} />, {closeButton:false});
            // setTimeout(() => { location.reload(); },1500);
            await getSubscriptionDetails();
        }catch (error){
            console.log(error);
        }
    }

    // const formatDateText = (inputText) => {
    //     const dateMatch = inputText?.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC/);
    //     if (!dateMatch) return inputText;
    //     const dateString = dateMatch[0].split(" ")[0];
    //     const date = new Date(dateString);
    //     const options = { day: "2-digit", month: "short", year: "numeric" };
    //     const formattedDate = date.toLocaleDateString("en-GB", options);
    //     return inputText.replace(dateMatch[0], formattedDate);
    // }

    const formatDateText = (inputText) => {
        return inputText.replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC/g, (match) => {
            const dateString = match.split(" ")[0];
            const date = new Date(dateString);
            const options = { day: "2-digit", month: "short", year: "numeric" };
            return date.toLocaleDateString("en-GB", options);
        });
    };

    useEffect(() => { getCountriesData(); getSubscriptionDetails(); },[]);

    return (
        <MainPageLayout>
            <section className='p-10 md:px-32 md:py-16'>
                <h1 className='text-5xl md:text-7xl uppercase tracking-widest font-dharma-gothic-c-italic font-bold'>
                    {isSubscription ? 'Free' : subscriptionDetails?.plan_interval} Subscription plans
                </h1>

                <p className='my-6 font-urbanist'>
                    Lorem ipsum dolor sit amet consectetur. Id non aliquet sed nulla purus dictum in in blandit. Porta suspendisse nunc enim faucibus bibendum quis urna augue.
                </p>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center font-urbanist font-semibold'>
                    <div>
                        <p className='my-3'>Current Plan</p>
                        <p className='text-primaryColor'>
                            {isSubscription ? 'Free Plan' : subscriptionDetails?.plan_name}
                        </p>
                    </div>
                    <div>
                        <p className='my-3'>Next plan renewal cycle</p>
                        <p>
                            {isSubscription ? 'Free' : subscriptionDetails?.next_renewal_date ? moment(subscriptionDetails?.next_renewal_date).format('DD-MMM-YYYY') : '-'}
                        </p>
                    </div>
                    {!isSubscription && (subscriptionDetails?.status === 'active' || subscriptionDetails?.status === 'resubscribe_pending') && (
                        <Button
                            onPress={onOpen}
                            color="primary"
                            variant="flat"
                            className='mx-auto font-dm-sans'
                            style={{ fontWeight : 'bold' }}
                        >Cancel Subscription</Button>
                    )}
                </div>

                {!isSubscription && (subscriptionDetails?.status === 'canceled' || subscriptionDetails?.status === 'resubscribe_pending') && (
                    <Chip
                        radius="full"
                        variant="dot"
                        color={'danger'}
                        className={'mt-6 text-danger whitespace-normal h-auto p-4 border-0 md:p-1.5'}
                    >{formatDateText(subscriptionDetails?.message)}</Chip>
                )}

                <Divider className='my-6' />

                {!isSubscription && (
                    <div className={inter.className}>
                        <h6 className='font-bold'>Plan Benefits:</h6>
                        <div className='flex flex-wrap items-center justify-between gap-6 my-6'>
                            {subscriptionDetails?.plan_features?.map((data,index) => <Checkbox className='opacity-100 font-normal' key={index} defaultSelected isDisabled>{data}</Checkbox>)}
                        </div>
                    </div>
                )}

                <BecomeAMVPMember contents={countries} isCountryLoading={isCountryLoading} isModalOpen={true} getSubscriptionDetails={getSubscriptionDetails}/>
            </section>
            <Modals isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} modalBodyClass={'p-0'} isDismissable={false}>
                <div className={`text-center py-6 px-4 ${inter.className}`}>
                    <IoIosAlert className="text-warning text-4xl md:text-5xl mx-auto"/>
                    <h1 className="text-2xl font-bold mt-6 mb-2">Cancel Subscription</h1>
                    <p>Are you sure you would like to cancel subscription?</p>
                </div>
                <div className={`bg-gray-100 flex items-center gap-4 justify-center py-4 px-2 ${inter.className}`}>
                    {subscriptionCancelLoader ? (
                        <Button color="primary" disabled isLoading className="px-6">Please wait...</Button>
                    ):(
                        <Fragment>
                            <Button type="button" color="default" className="px-6" onPress={onOpenChange}>No</Button>
                            <Button type="button" color="primary" className="px-6" onPress={handleCancelSubscription}>Yes</Button>
                        </Fragment>
                    )}
                </div>
            </Modals>
        </MainPageLayout>
    )
}

export default ManageSubscription