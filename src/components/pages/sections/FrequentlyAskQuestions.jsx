"use client"
import React, { useEffect, useState } from 'react';
import {Accordion, AccordionItem, Button, Skeleton} from "@heroui/react";
import { IoIosArrowForward } from "react-icons/io";
import { Inter } from 'next/font/google';
import Axios from '@/components/utils/Axios';
import SectionLayout from '@/layouts/SectionLayout';

const inter = Inter({ subsets : ['latin']});
const FrequentlyAskQuestions = () => {
    const [faqs, setFaqs] = useState([]);
    const [faqsLoader, setFaqsLoader] = useState(false);

    const getFAQsList = async() => {
        setFaqsLoader(true)
        try {
            const { data } = await Axios.get('faqs');
            setFaqs(data?.data);
            setFaqsLoader(false);
        } catch (error) { console.log(error); setFaqsLoader(false) }
    }

    useEffect(() => { getFAQsList() },[])

    return (
        <SectionLayout id={'faqs-section'} headingText={'Frequently Asked Questions'}>
            <p className='font-urbanist my-10 text-center mx-auto w-full md:w-[70%]'>Our Frequently Asked Questions (FAQs) address common inquiries about our services. Here you'll find essential information on terminology, manage your membership, and make the most of your experience with Oakmont Athletic.</p>

            {faqsLoader ? (
                <div className='px-2'>
                    <Skeleton className="rounded-lg bg-gray-300 h-14 mb-1.5"/>
                    <Skeleton className="rounded-lg bg-gray-300 h-14 mb-1.5"/>
                    <Skeleton className="rounded-lg bg-gray-300 h-14 mb-1.5"/>
                </div>
            ) : (
                <Accordion variant="splitted">
                    {faqs?.map((data,index) => {
                        return(<AccordionItem className={`shadow rounded-md font-bold ${inter.className}`} key={index} aria-label={data.question} title={data.question}>
                            <p className={`font-normal ${inter.className}`}>{data.answer}</p>
                        </AccordionItem>)
                    })}
                </Accordion>
            )}

            {/*<div className='text-center'>*/}
            {/*    <Button color="primary" className={`mt-6 rounded-lg ${inter.className}`}>Ask A Question <IoIosArrowForward/></Button>*/}
            {/*</div>*/}
        </SectionLayout>
    )
}

export default FrequentlyAskQuestions