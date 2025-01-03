"use client";
import React from 'react';
import { Button, Checkbox, Form, Input } from '@nextui-org/react';
import Link from 'next/link';
import PasswordWithIcon from '@/components/forms/PasswordWithIcon';
import { IoIosArrowForward } from 'react-icons/io';

const Login = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        console.log('Form is valid:', data);
    };
    return (
        <div className='p-4'>
            <h1 className='text-[#262B43E5] text-xl md:text-2xl font-bold'>Welcome to Oakmont Athletic! 👋🏻</h1>
            <p className='text-gray-500 my-1'>Please sign-in to your account and start the adventure</p>
            <div className='mt-4'>
                <Form validationBehavior="native" onSubmit={onSubmit}>
                    <Input label="Email" type="email" name="email" className='mb-2' autoComplete="off" isRequired validate={(value) => {
                        if (value === '') return "Please enter your email";
                        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                        if (!emailRegex.test(value)) return "Invalid email address";
                        return null;
                    }}/>
                    <PasswordWithIcon className={'mb-3'} name='password' isRequired={true} label="Password" errorMessage="Please enter your password"/>
                    <div className='flex justify-between items-center gap-4 mb-4 w-full'>
                        <Checkbox classNames={{ label: "text-small" }}>Remember Me</Checkbox>
                        <Link href={'/forget-password'} className='text-primaryColor text-sm'>Forget Password?</Link>
                    </div>
                    <Button type="submit" color='primary' className='w-full'>Login</Button>
                </Form>
                <div className='my-5 flex justify-center items-center gap-2'>
                    <Link href={'/signup'} className='text-primaryColor'>Create new account</Link>
                    <IoIosArrowForward className='text-primaryColor'/>
                </div>
            </div>
        </div>
    )
}

export default Login