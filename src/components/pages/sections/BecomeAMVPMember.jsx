"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Button, Divider, Form, Input, Select, SelectItem, useDisclosure } from "@heroui/react";
import Link from "next/link";
import SectionLayout from "@/layouts/SectionLayout";
import Modals from "@/components/utils/Modals";

const inter = Inter({ subsets: ['latin'] });
const BecomeAMVPMember = ({ isModalOpen, linkPath, contents, loading}) => {
    const plans = [{
        title: "Weekly",
        price: 17,
        billing: "Billed weekly",
        features: ["Arbitrage bot", "+EV bot", "Fantasy tournaments", "News and analysis", "Team events"],
    },
    {
        title: "Monthly",
        price: 67,
        billing: "Billed Monthly",
        features: ["Arbitrage bot", "+EV bot", "Fantasy tournaments", "News and analysis", "Team events"],
    }];

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [planName, setPlanName] = useState();
    const [planPrice, setPlanPrice] = useState();
    const [planTax, setPlanTax] = useState(0);
    const [zipCodeLength, setZipCodeLength] = useState(6);
    const [zipCodePlaceholder, setZipCodePlaceholder] = useState("e.g 123456");

    const handlePriceDetails = (plan, price) => {
        setPlanName(plan);
        setPlanPrice(price);
        onOpen();
    }

    const [formValues ,setFormValues] = useState({
        email: '', country: '', zipcode: '', fullname: '', creditcard: '', expiration: '', cvv:''
    });

    const formatOnlyNumber = (value) => { return value.replace(/\D/g, ""); }
    const formatOnlyAlphabetsAndSpace = (value) => { return value.replace(/[^a-zA-Z\s]/g, ""); };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        name === 'creditcard' && (formattedValue = formatOnlyNumber(value).replace(/(.{4})/g, "$1 ").trim());
        (name === 'zipcode' || name === 'cvv') && (formattedValue = formatOnlyNumber(value));
        name === 'fullname' && (formattedValue = formatOnlyAlphabetsAndSpace(value));

        if(name === 'country'){
            const selectedCountry = contents.find((c) => c.name === value);
            setZipCodeLength(selectedCountry.zipCodeLength);
            let zipCodePlaceholder = "";
            for (let i = 0; i < selectedCountry.zipCodeLength; i++) {
                zipCodePlaceholder += Math.floor(Math.random() * 10);
            }
            console.log(zipCodePlaceholder)
            setZipCodePlaceholder("e.g "+zipCodePlaceholder);
        }

        if (name === 'expiration') {
            const sanitizedValue = formatOnlyNumber(e.target.value);
            if (sanitizedValue.length <= 2) { formattedValue = sanitizedValue;
            } else {
                const month = sanitizedValue.substring(0, 2);
                const year = sanitizedValue.substring(2, 6);
                formattedValue = `${month}/${year}`;
            }
        }
        setFormValues({...formValues,[name]: formattedValue});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formSubmitValues = { ...formValues, planName, planPrice };
        console.log(formSubmitValues);
        setFormValues({
            email: '', country: '', zipcode: '', fullname: '', creditcard: '', expiration: '', cvv: ''
        });
        onClose();
    };

    return (
        <SectionLayout id="become-a-mvp-member-section" bgcolor="#fff" color="#000" headingText="Become A MVP Member">
            <div className="flex flex-col md:flex-row justify-center gap-6 p-4 mt-6">
                {plans.map((plan) => (
                    <div key={plan.title} className={`w-full md:w-96 shadow-xl rounded-xl text-center p-6 border ${inter.className}`}>
                        <h6 className="font-semibold text-lg md:text-xl">{plan.title}</h6>
                        <div className="flex justify-center my-4">
                            <sup className="text-xl mt-2">$</sup>
                            <span className="text-5xl text-primaryColor font-bold">{plan.price}</span>
                        </div>

                        <p className="text-sm text-gray-600">{"/"+plan.billing}</p>
                        <ul style={{ listStyle:'circle' }} className="text-left ml-8 mb-10 become-mv-member-ul">
                            {plan.features.map((feature) => <li key={feature} className="my-2">{feature}</li>)}
                        </ul>

                        {isModalOpen ? (
                            <Button type="button" color="primary" onPress={() => handlePriceDetails(plan.title,plan.price)}>Get Started</Button>
                        ) : (
                            <Link href={linkPath} className="bg-primaryColor px-6 py-2.5 rounded-xl text-white text-sm">Get Started</Link>
                        )}
                    </div>
                ))}
            </div>

            <Modals modalSize="5xl" isOpen={isOpen} onOpenChange={onOpenChange} modalBodyClass={'p-0'}>
                <Form className={inter.className} validationBehavior="native" onSubmit={onSubmit}>
                    <div className='flex flex-col md:flex-row'>
                        <div className='w-full md:w-3/5 px-5 py-8'>
                            <div className="mb-4">
                                <h1 className='mb-3 text-lg font-bold'>Billing Details</h1>

                                <Input label="Email" type="email" name="email" className='mb-3' isRequired placeholder="e.g sam@example.com" onChange={handleChange} value={formValues.email} autoComplete="off" validate={(value) => {
                                    if (value === '') return "Please enter your email";
                                    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                                    if (!emailRegex.test(value)) return "Invalid email address";
                                    return null;
                                }}/>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <Select isLoading={loading} label="Billing Country" name="country" onChange={handleChange} value={formValues.country} isRequired errorMessage="Please choose country" placeholder="e.g. US">
                                        {contents?.map(({name}) => <SelectItem key={name}>{name}</SelectItem> )}
                                    </Select>

                                    <Input label="Billing Zip/Postal Code" type="text" maxLength={zipCodeLength} name="zipcode" className='mb-3' onChange={handleChange} value={formValues.zipcode} isRequired placeholder={zipCodePlaceholder} autoComplete="off" validate={(value) => {
                                        if (value === '') return `Please enter ${zipCodeLength} digit zip/postal code`;
                                        if (value.length < zipCodeLength) return `Please must enter ${zipCodeLength} digit zip/postal code`;
                                        return null;
                                    }} />
                                </div>
                            </div>

                            <div>
                                <h1 className='mb-3 text-lg font-bold'>Credit Card Details</h1>

                                <Input label="Full Name" type="text" name="fullname" className='mb-3' isRequired errorMessage="Please enter full name" placeholder="e.g Sam Morgan" value={formValues.fullname} onChange={handleChange} autoComplete="off" />

                                <Input label="Credit Card Number" type="text" name="creditcard" className='mb-3' isRequired value={formValues.creditcard} onChange={handleChange} maxLength="19" placeholder="e.g 1234 5678 9123 4567" autoComplete="off" validate={(value) => {
                                    if (value === '') return "Please enter your credit card no.";
                                    if (value.length < 19) return "Please must enter 16 digit credit card no.";
                                    return null;
                                }}/>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <Input label="Expiration Month & Year" type="text" className='mb-3' name="expiration" isRequired onChange={handleChange} value={formValues.expiration} maxLength={7} placeholder="10/2024" autoComplete="off" validate={(value) => {
                                        if (value === '') return "Please enter card expiry month & year";
                                        const [month, year] = value.split("/").map(Number);
                                        const currentYear = new Date().getFullYear();
                                        const currentMonth = new Date().getMonth() + 1;
                                        if (!month || !year) {
                                            return "Invalid format. Use YYYY/MM.";
                                        } else if (year < currentYear) {
                                            return "Year cannot be less than the current year.";
                                        } else if (year === currentYear && month < currentMonth) {
                                            return "Month cannot be earlier than the current month in the current year.";
                                        } else if (month < 1 || month > 12) {
                                            return "Month must be between 01 and 12.";
                                        }
                                        return null;
                                    }}/>

                                    <Input label="CVV" type="text" name="cvv" maxLength={3} className='mb-3' value={formValues.cvv} isRequired onChange={handleChange} placeholder="e.g 123" autoComplete="off" validate={(value) => {
                                        if (value === '') return "Please enter your card CVV no.";
                                        if (value.length < 3) return "Please must enter 3 digit card CVV no.";
                                        return null;
                                    }} />
                                </div>
                            </div>
                        </div>

                        <Divider orientation='vertical' className='h-auto' />

                        <div className='w-full md:w-2/5 px-5 py-8 text-[#707070]'>
                            <h1 className='mb-3 text-lg font-bold text-black'>Summary</h1>
                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Urna consectetur pretium ornare tincidunt ipsum orci dolor.</p>

                            <div className='bg-[#F7F7F7] py-4 px-6 my-4 rounded-md'>
                                {/* <p className="mb-2">{planName}</p> */}
                                <p className="mb-2">Lorem ipsum dolor sit amet</p>
                                <h1 className="text-2xl md:text-4xl text-black">${planPrice}.00</h1>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <p>Prize</p>
                                <p className="text-black">${planPrice}.00</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <p>Tax</p>
                                <p className="text-black">${planTax}.00</p>
                            </div>

                            <Divider className="my-3"/>

                            <div className="flex justify-between items-center mb-4">
                                <p>Total</p>
                                <p className="text-black">${planPrice + planTax}.00</p>
                            </div>

                            <Button type="submit" color="success" className="w-full text-white">Make Payment</Button>

                            <p className="mt-6 text-sm">Lorem ipsum dolor sit amet consectetur. Urna consectetur pretium ornare tincidunt ipsum orci dolor laoreet.</p>
                        </div>
                    </div>
                </Form>
            </Modals>
        </SectionLayout>
    );
};

export default BecomeAMVPMember;
