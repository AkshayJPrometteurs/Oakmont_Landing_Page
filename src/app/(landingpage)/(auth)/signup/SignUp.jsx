"use client";
import React, { useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input } from '@nextui-org/react';
import { getLocalTimeZone, today } from "@internationalized/date";
import PasswordWithIcon from '@/components/forms/PasswordWithIcon';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';

const SignUp = () => {
    const [formValues, setFormValues] = useState({fullname: '',contactno: '',password:''});
    const [isFormNext, setIsFormNext] = useState(false);
    const formatOnlyNumber = (value) => { return value.replace(/\D/g, ""); }
    const formatOnlyAlphabetsAndSpace = (value) => { return value.replace(/[^a-zA-Z\s]/g, ""); };
    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        name === 'fullname' && (formattedValue = formatOnlyAlphabetsAndSpace(value));
        (name === 'contactno') && (formattedValue = formatOnlyNumber(value));
        setFormValues({ ...formValues, [name]: formattedValue });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setIsFormNext(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        const allFilled = Object.entries(data).every(([key, value]) => {
            if (key === 'affilatecode') return true;
            if (key === 'termsandconditions') return true;
            return value.trim() !== '';
        });

        if (allFilled) { console.log('Form is valid:', data); }
    };
    return (
        <div className='p-4'>
            <h1 className='text-[#262B43E5] text-xl md:text-2xl font-bold'>Welcome to Oakmont Athletic! 👋🏻</h1>
            <p className='text-gray-500 my-1'>Please sign-up to your account and start the adventure</p>
            <div className='mt-4'>
                <Form validationBehavior="native" onSubmit={onSubmit}>
                    <div className={`w-full ${isFormNext ? 'hidden' : ''}`}>
                        <p className='font-bold text-gray-600 mb-4'>Personal Information</p>

                        <Input label="Full Name" type="text" name="fullname" className='mb-3' isRequired errorMessage="Please enter your full name" placeholder="e.g Sam Morgan" value={formValues.fullname} onChange={handleChange} autoComplete="off" />

                        <Input label="Email" type="email" name="email" className='mb-3' isRequired placeholder="e.g sam@example.com" autoComplete="off" validate={(value) => {
                            if (value === '') return "Please enter your email";
                            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                            if (!emailRegex.test(value)) return "Invalid email address";
                            return null;
                        }} />

                        <DatePicker label="Date of birth" name='dob' className='mb-1.5' isRequired maxValue={today(getLocalTimeZone())} autoComplete="off" errorMessage="Please enter your date of birth"/>

                        <Input label="Contact Number" type="text" name="contactno" className='mb-2' isRequired errorMessage="Please enter your contact no." placeholder="e.g 7865646656" value={formValues.contactno} onChange={handleChange} autoComplete="off" />
                    </div>
                    <div className={`w-full ${isFormNext ? '' : 'hidden'}`}>
                        <p className='font-bold text-gray-600 mb-4'>User Information</p>

                        <Input label="Create Username" type="text" name="username" className='mb-3' isRequired={isFormNext} errorMessage="Please create your username" placeholder="e.g sam1234" autoComplete="off" />

                        <PasswordWithIcon className={'mb-3'} name='password' isRequired={isFormNext} onChange={handleChange} label="Password" validate={(value) => {
                            if(isFormNext && value === '') return "Please enter and create your password";
                            if(isFormNext && value.length < 6) return "Password must be 6 characters or more.";
                            if(isFormNext && (value.match(/[A-Z]/g) || []).length < 1) return "Password must include at least 1 upper case letter";
                            if(isFormNext && (value.match(/[^a-z]/gi) || []).length < 1) return "Password must include at least 1 symbol.";
                        }}/>

                        <PasswordWithIcon className={'mb-3'} isRequired={isFormNext} onChange={handleChange} label="Confirm Password" validate={(value) => {
                            if(isFormNext && value === '') return "Please enter your confirm password";
                            if(isFormNext && value !== formValues.password) return "Password and confirm password does not match";
                        }}/>

                        <Input label="Paste Affilate Code" type="text" name="affilatecode" className='mb-4' autoComplete="off" />
                    </div>

                    <Checkbox classNames={{ label: "text-small" }} className='mb-1 text-sm'>Agree to terms and conditions</Checkbox>

                    <Button type="submit" color='primary' className='w-full'>{isFormNext ? 'Verify' : 'Next'}</Button>
                </Form>
                <div className='mt-3 flex justify-center items-center gap-2'>
                    <IoIosArrowBack className='text-primaryColor'/>
                    <Link href={'/login'} className='text-primaryColor'>Back to login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp