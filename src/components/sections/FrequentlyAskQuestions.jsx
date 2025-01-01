"use client"
import React from 'react';
import SectionLayout from '../SectionLayout';
import {Accordion, AccordionItem, Button} from "@nextui-org/react";
import { IoIosArrowForward } from "react-icons/io";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets : ['latin']});
const FrequentlyAskQuestions = () => {
    const faqs = [
        {
            title : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed?',
            description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea'
        },
        {
            title : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed?',
            description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea'
        },
        {
            title : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed?',
            description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea'
        },
        {
            title : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed?',
            description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea'
        },
        {
            title : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed?',
            description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea'
        },
        {
            title : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed?',
            description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea'
        },
        {
            title : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed?',
            description : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea'
        },
    ]
    return (
        <SectionLayout id={'faqs-section'} headingText={'Frequently Asked Questions'}>
            <p className='font-urbanist my-10 text-center mx-auto w-full md:w-[70%]'>Our Frequently Asked Questions (FAQs) address common inquiries about our services. Here you'll find essential information on terminology, manage your membership, and make the most of your experience with Oakmont Athletic.</p>
            <Accordion variant="splitted">
                {faqs.map((data,index) => {
                    return(<AccordionItem className={`shadow rounded-md font-bold ${inter.className}`} key={index} aria-label={data.title} title={data.title}>
                        <p className={`font-normal ${inter.className}`}>{data.description}</p>
                    </AccordionItem>)
                })}
            </Accordion>
            <div className='text-center'>
                <Button color="primary" className={`mt-6 rounded-lg ${inter.className}`}>Ask A Question <IoIosArrowForward/></Button>
            </div>
        </SectionLayout>
    )
}

export default FrequentlyAskQuestions