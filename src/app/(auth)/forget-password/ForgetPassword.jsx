"use client";
import React from 'react';
import { Button, Form, Input } from '@nextui-org/react';
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';

const ForgetPassword = () => {
    const router = useRouter()
    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        console.log('Form is valid:', data);
        router.push('/reset-password?email='+data.email);
    };
    return (
        <div className='p-4'>
            <h1 className='text-[#262B43E5] text-xl md:text-2xl font-bold'>Forgot Passwoard 🔒</h1>
            <p className='text-gray-500 my-1'>{"Enter your email and we'll send you instructions to reset your password"}</p>
            <div className='mt-4'>
                <Form validationBehavior="native" onSubmit={onSubmit}>
                    <Input label="Email" type="email" name="email" className='mb-3' isRequired autoComplete="off" validate={(value) => {
                        if (value === '') return "Please enter your email";
                        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                        if (!emailRegex.test(value)) return "Invalid email address";
                        return null;
                    }}/>
                    <Button type="submit" color='primary' className='w-full'>Send Reset Link</Button>
                </Form>
                <div className='my-4 flex justify-center items-center gap-2'>
                    <IoIosArrowBack className='text-primaryColor'/>
                    <Link href={'/login'} className='text-primaryColor'>Back to login</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword