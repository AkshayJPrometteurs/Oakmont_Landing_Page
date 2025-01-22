"use client";
import React, { useState } from 'react';
import { Alert, Form, Input } from "@heroui/react";
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Axios from '@/components/utils/Axios';
import GuestLayout from '@/layouts/GuestLayout';
import Image from 'next/image';
import PasswordEmoji from '../../../../public/assets/images/emoji/Password.png';
import ButtonComponent from '@/components/utils/forms/ButtonComponent';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const ForgetPassword = () => {
    const router = useRouter();

    const [isApiErrors, setIsApiErrors] = useState('');
    const [isApiLoader, setIsApiLoader] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const onSubmit = async(e) => {
        e.preventDefault();
        setIsApiLoader(true);

        const formData = Object.fromEntries(new FormData(e.currentTarget));
        try {
            const { data } = await Axios.post('/users/request-password-reset',formData);
            if(data?.status_code === 200 && data?.success){
                setIsVisible(false);

                Cookies.set('_om_pr', CryptoJS.AES.encrypt(
                    JSON.stringify({ email : formData?.email
                }), "OakMontParams").toString(), { expires: 1, secure: true });

                router.push(`/forget-password/two-step-verification`);
                toast(<Alert color='success' title={data?.message} />, {closeButton:false});
            }
        } catch ({response}) {
            setIsApiErrors(response?.data?.message);
            setIsVisible(true);
        } finally { setIsApiLoader(false); }
    };

    return (
        (<GuestLayout
            header={'Forgot Password'}
            headerIcon={<Image src={PasswordEmoji} height={5} width={25} alt='emoji'/>}
            headerPara={"Enter your email and we'll send you instructions to reset your password"}
            alertVisibility = {{ description : isApiErrors, type : 'danger', visible : isVisible }}
        >
            <Form validationBehavior="native" onSubmit={onSubmit}>
                <Input label="Email" type="email" name="email" className='mb-3' isRequired autoComplete="off" validate={(value) => {
                    if (value === '') return "Please enter your email";
                    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                    if (!emailRegex.test(value)) return "Invalid email address";
                    return null;
                }}/>

                <ButtonComponent type="submit" color="primary" isLoading={isApiLoader} text="Send Reset Link"/>
            </Form>
            <div className='my-4 flex justify-center items-center gap-2'>
                <IoIosArrowBack className='text-primaryColor'/>
                <Link href={'/login'} className='text-primaryColor'>Back to login</Link>
            </div>
        </GuestLayout>)
    );
}

export default ForgetPassword