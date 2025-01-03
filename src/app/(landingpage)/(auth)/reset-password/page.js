"use client";

import React, { useState } from 'react';
import { Button, Form, Input } from '@nextui-org/react';
// import { useSearchParams } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import PasswordWithIcon from '@/components/forms/PasswordWithIcon';

const ResetPassword = () => {
    // const searchParams = useSearchParams();
    const email ='email'
    const [formValues, setFormValues] = useState({password:''});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const onSubmit = (e) => { e.preventDefault(); };
    return (
        <div className='p-4'>
            <h1 className='text-[#262B43E5] text-xl md:text-2xl font-bold'>Two Step Verification 💬</h1>
            <p className='text-gray-500 mt-4'>We sent a verification code to your email. Enter the code from the email in the field below.</p>
            <p className='text-gray-500 mb-4'>{email && email}</p>
            <div className='mt-4'>
                <Form validationBehavior="native" onSubmit={onSubmit}>
                    <PasswordWithIcon className={'mb-3'} name='password' isRequired={true} onChange={handleChange} label="Password" errorMessage="Please enter your password"/>

                    <PasswordWithIcon className={'mb-3'} isRequired={true} onChange={handleChange} label="Confirm Password" validate={(value) => {
                        if(value === '') return "Please enter your confirm password";
                        if(value !== formValues.password) return "Password and confirm password does not match";
                    }}/>

                    <Button type="submit" color='primary' className='w-full mb-3'>Set New Password</Button>
                </Form>
                <div className='my-2 flex justify-center items-center gap-2'>
                    <IoIosArrowBack className='text-primaryColor'/>
                    <Link href={'/login'} className='text-primaryColor'>Back to login</Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword