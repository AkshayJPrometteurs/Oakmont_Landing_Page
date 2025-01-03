"use client";

import React from 'react';
import { Button, Form, InputOtp } from '@nextui-org/react';

const TwoStepVerification = () => {
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className='p-4'>
            <h1 className='text-[#262B43E5] text-xl md:text-2xl font-bold'>Two Step Verification 💬</h1>
            <p className='text-gray-500 mt-4'>We sent a verification code to your email ******12@gmail.com</p>
            <p className='text-gray-500 mb-4'>Enter the code from the email in the field below.</p>
            <div className='mt-4'>
                <Form validationBehavior="native" onSubmit={onSubmit}>
                    <div>
                        <p className="text-default-500 text-small mb-2">Type your 6 digit security code</p>
                        <InputOtp length={6} isRequired errorMessage="Please enter OTP" classNames={{ segment : 'md:w-24', segmentWrapper : 'gap-4' }} variant='bordered' size='lg'/>
                    </div>
                    <Button type="submit" color='primary' className='w-full my-4'>Verify</Button>
                </Form>
                <p className='text-gray-500 text-center'>{`Didn't get the mail?`}<Button type='button' color="primary" variant="light" className='text-base'>Resend</Button></p>
            </div>
        </div>
    )
}

export default TwoStepVerification