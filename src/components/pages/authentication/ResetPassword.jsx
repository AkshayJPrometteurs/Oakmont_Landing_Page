"use client";

import React, { useState } from 'react';
import { Alert, Form } from "@heroui/react";
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import PasswordWithIcon from '@/components/utils/forms/PasswordWithIcon';
import { useRouter } from 'next/navigation';
import Axios from '@/components/utils/Axios';
import { toast } from 'react-toastify';
import GuestLayout from '@/layouts/GuestLayout';
import Image from 'next/image';
import PasswordEmoji from '../../../../public/assets/images/emoji/Password.png';
import ButtonComponent from '@/components/utils/forms/ButtonComponent';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const ResetPassword = () => {
    const router = useRouter();
    const [isApiErrors, setIsApiErrors] = useState('');
    const [isApiLoader, setIsApiLoader] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [formValues, setFormValues] = useState({ new_password: '' });

    const decryptData = (cipherText) => {
        const encryptedText = Cookies.get(cipherText);
        if (encryptedText) {
            const decryptedData = CryptoJS.AES.decrypt(encryptedText, "OakMontResetParams").toString(CryptoJS.enc.Utf8);
            return decryptedData ? JSON.parse(decryptedData) : { email: '' };
        }
        return { email: '' };
    };

    const params = decryptData('_om_rpr');
    const handleChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });
    const onSubmit = async(e) => {
        e.preventDefault();
        setIsApiLoader(true);

        const formData = Object.fromEntries(new FormData(e.currentTarget));
        try {
            const { data } = await Axios.post('/users/forgot-password/',
                { ...formData, reset_token: params?.rt },
                { params : { email : params?.email }
            });
            if(data?.status_code === 200 && data?.success){
                setIsVisible(false);
                Cookies.remove('_om_rpr');
                router.push('/login');
                toast(<Alert color='success' title={data?.message} />, {closeButton:false});
            }
        } catch ({response}) {
            setIsApiErrors(response?.data?.message);
            setIsVisible(true);
        } finally { setIsApiLoader(false); }
    };

    return (
        <GuestLayout
            header={'Reset Password'}
            headerIcon={<Image src={PasswordEmoji} height={5} width={25} alt='emoji'/>}
            headerPara={"Your new password must be different from previously used passwords"}
            alertVisibility = {{ description : isApiErrors, type : 'danger', visible : isVisible }}
        >
            <Form validationBehavior="native" onSubmit={onSubmit}>
                <PasswordWithIcon className={'mb-3'} name='new_password' isRequired={true} onChange={handleChange} label="New Password" errorMessage="Please enter your password"/>

                <PasswordWithIcon className={'mb-3'} name='confirm_new_password' isRequired={true} onChange={handleChange} label="Confirm Password" validate={(value) => {
                    if(value === '') return "Please enter your confirm password";
                    if(value !== formValues.new_password) return "Password and confirm password does not match";
                }}/>

                <ButtonComponent type="submit" color='primary' isLoading={isApiLoader} text={'Set New Password'}/>
            </Form>
            <div className='my-2 flex justify-center items-center gap-2'>
                <IoIosArrowBack className='text-primaryColor'/>
                <Link href={'/login'} className='text-primaryColor'>Back to login</Link>
            </div>
        </GuestLayout>
    )
}

export default ResetPassword