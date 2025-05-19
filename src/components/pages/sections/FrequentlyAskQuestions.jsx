"use client"
import React, { useEffect, useState } from 'react';
import {Accordion, AccordionItem, Alert, Button, Form, Input, Skeleton, Textarea, useDisclosure} from "@heroui/react";
import { IoIosArrowForward } from "react-icons/io";
import { Inter } from 'next/font/google';
import Axios from '@/components/utils/Axios';
import SectionLayout from '@/layouts/SectionLayout';
import Modals from '@/components/utils/Modals';
import { useAuthServiceContext } from '@/contexts/AuthServiceProvider';
import { toast } from 'react-toastify';

const inter = Inter({ subsets : ['latin']});
const FrequentlyAskQuestions = () => {
    const [faqs, setFaqs] = useState([]);
    const [faqsLoader, setFaqsLoader] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { user, isAuthenticated } = useAuthServiceContext();
    const [formData, setFormData] = useState({
        first_name: isAuthenticated ? user?.first_name : '',
        last_name: isAuthenticated ? user?.last_name : '',
        mobile_number: isAuthenticated ? user?.contact_number : '',
        email: isAuthenticated ? user?.email : '',
        message: ''
    });
    const [loader, setLoader] = useState(false);
    const [mobInputError, setMobInputError] = useState('');

    const formatOnlyNumber = (value) => { return value.replace(/\D/g, ""); }
    const formatOnlyAlphabetsAndSpace = (value) => { return value.replace(/[^a-zA-Z\s]/g, ""); };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        name === 'first_name' && (formattedValue = formatOnlyAlphabetsAndSpace(value));
        name === 'last_name' && (formattedValue = formatOnlyAlphabetsAndSpace(value));
        name === 'mobile_number' && (formattedValue = formatOnlyNumber(value));
        setFormData({...formData,[name]: formattedValue});
        setMobInputError('');
    };

    const getFAQsList = async() => {
        setFaqsLoader(true)
        try {
            const { data } = await Axios.get('faqs');
            setFaqs(data?.data);
            setFaqsLoader(false);
        } catch (error) { console.log(error); setFaqsLoader(false) }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const { data } = await Axios.post('/users/contact-us', formData);
            toast(<Alert color='success' title={data.message} />, {closeButton:false});
            onClose();
            setFormData({ first_name: '', last_name: '', mobile_number: '', email: '', message: '' });
        } catch (error) {
            console.log(error?.response?.data?.data?.errors?.mobile_number);
            setMobInputError(error?.response?.data?.data?.errors?.mobile_number);
        } finally { setLoader(false); }
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
                            <div dangerouslySetInnerHTML={{ __html : data.answer }} className={`font-normal ${inter.className}`} />
                        </AccordionItem>)
                    })}
                </Accordion>
            )}

            <div className='text-center'>
               <Button
                    color="primary"
                    onPress={onOpen}
                    className={`mt-6 rounded-lg ${inter.className}`}
                    isModalOpen={true}
                >
                    Ask A Question <IoIosArrowForward/>
                </Button>
               <Modals
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    modalHeaderClass={'text-xl'}
                    isDismissable={true}
                    modalHeader="Ask a Question"
                    modalSize={'3xl'}
                >
                    <Form className={`${inter.className}`} validationBehavior="native" onSubmit={onSubmit}>
                        {Boolean(mobInputError) && <Alert color='danger' className='mb-3' title={mobInputError} />}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                            <Input
                                label="First Name"
                                type="first_name"
                                name="first_name"
                                className='mb-1'
                                isRequired
                                autoComplete="off"
                                errorMessage="Please enter your first name"
                                onChange={handleChange}
                                value={formData.first_name}
                            />

                            <Input
                                label="Last Name"
                                type="last_name"
                                name="last_name"
                                className='mb-1'
                                isRequired
                                autoComplete="off"
                                errorMessage="Please enter your last name"
                                onChange={handleChange}
                                value={formData.last_name}
                            />

                            <Input
                                label="Mobile No."
                                type="text"
                                name="mobile_number"
                                className='mb-3'
                                isRequired
                                autoComplete="off"
                                errorMessage="Please enter your mobile number"
                                onChange={handleChange}
                                value={formData.mobile_number}
                            />

                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                className='mb-3'
                                isRequired
                                autoComplete="off"
                                validate={(value) => {
                                    if (value === '') return "Please enter your email";
                                    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                                    if (!emailRegex.test(value)) return "Invalid email address";
                                    return null;
                                }}
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                        <Textarea
                            className="w-full"
                            label="Message"
                            name='message'
                            isRequired
                            onChange={handleChange}
                            value={formData.message}
                            validate={(value) => {
                                if (value === '') return "Please enter your message";
                                const wordCount = value.trim().split(/\s+/).length;
                                if (wordCount > 250) return "Message must be 250 words or fewer";
                                return null;
                            }}
                        />
                        <Button
                            color="primary"
                            type="submit"
                            className={`${inter.className} mt-5 mx-auto`}
                            isLoading={loader}
                            isDisabled={loader}
                        >
                            Submit
                        </Button>
                    </Form>
                </Modals>
            </div>
        </SectionLayout>
    )
}

export default FrequentlyAskQuestions