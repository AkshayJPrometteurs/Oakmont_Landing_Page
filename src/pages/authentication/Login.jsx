"use client";

import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Checkbox, Form, Input } from "@heroui/react";
import Link from 'next/link';
import PasswordWithIcon from '@/components/forms/PasswordWithIcon';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Axios from '@/components/Axios';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import GuestLayout from '@/layouts/GuestLayout';
import Image from 'next/image';
import MarketingEmoji from '../../../public/assets/images/emoji/Marketing.png';
import ButtonComponent from '@/components/forms/ButtonComponent';

const Login = () => {
    const router = useRouter();

    const [isApiErrors, setIsApiErrors] = useState('');
    const [isApiLoader, setIsApiLoader] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isRememberMe, setIsRememberMe] = useState(false);
    const [formValues, setFormValues] = useState({ email: '', password: '' });

    const decryptData = (cipherText) => {
        const encryptedText = Cookies.get(cipherText);
        if (encryptedText) {
            const decryptedData = CryptoJS.AES.decrypt(encryptedText, "OakMontRemember").toString(CryptoJS.enc.Utf8);
            return decryptedData ? JSON.parse(decryptedData) : { email: '', password: '', rememberMe: false };
        }
        return { email: '', password: '', rememberMe: false };
    };

    const handleChange = (e) => setFormValues({...formValues,[e.target.name]:e.target.value});

    const onSubmit = async(e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget));

        if(isRememberMe){
            Cookies.set('_om_rm', CryptoJS.AES.encrypt(JSON.stringify({
                email : formData.email,
                password : formData.password,
                rememberMe : true
            }), "OakMontRemember").toString(), { expires: 3, secure: true });
        }else{ Cookies.remove('_om_rm'); }

        try {
            const { data } = await Axios.post('/users/login',formData);
            if(data?.status_code === 200 && data?.success){
                setIsVisible(false);
                router.push(`/login/two-step-verification?id=${data?.data?.user_id}&email=${formData?.email}`);
                toast(<Alert color='success' title={data?.message} />, {closeButton:false});
            }
        } catch (error) {
            setIsApiErrors(error?.response?.data?.message);
            setIsVisible(true);
        } finally { setIsApiLoader(false); }
    };

    useEffect(() => {
        setFormValues(decryptData('_om_rm'));
        setIsRememberMe(decryptData('_om_rm').rememberMe)
    },[])

    return (
        (<GuestLayout
            header={'Welcome to Oakmont Athletic!'}
            headerIcon={<Image src={MarketingEmoji} height={5} width={25} alt='emoji'/>}
            headerPara={'Please sign-in to your account and start the adventure'}
            alertVisibility = {{
                description : isApiErrors, type : isApiErrors === 'Account is not verified. Please verify your account before logging in.' ? 'warning' : 'danger', visible : isVisible
            }}
        >
            <Form validationBehavior="native" onSubmit={onSubmit}>
                <Input label="Email" type="email" name="email" className='mb-2' value={formValues?.email} autoComplete="off" onChange={handleChange} isRequired validate={(value) => {
                    if (value === '') return "Please enter your email";
                    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                    if (!emailRegex.test(value)) return "Invalid email address";
                    return null;
                }}/>

                <PasswordWithIcon className={'mb-3'} name='password' value={formValues?.password} isRequired={true} label="Password" errorMessage="Please enter your password" onChange={handleChange}/>

                <div className='flex justify-between items-center gap-4 mb-4 w-full'>
                    {isRememberMe ? (
                        <Fragment>
                            <Checkbox defaultSelected onValueChange={setIsRememberMe}>Remember Me</Checkbox>
                        </Fragment>
                    ): ( <Checkbox onValueChange={setIsRememberMe}>Remember Me</Checkbox> )}
                    <Link href={'/forget-password'} className='text-primaryColor'>Forget Password?</Link>
                </div>

                <ButtonComponent type="submit" color="primary" isLoading={isApiLoader} text="Login"/>
            </Form>
            <div className='my-5 flex justify-center items-center gap-2'>
                <h1 className='text-gray-500'>Don't have account?</h1>
                <Link href={'/signup'} className='text-primaryColor'>Sign Up</Link>
            </div>
        </GuestLayout>)
    );
}

export default Login