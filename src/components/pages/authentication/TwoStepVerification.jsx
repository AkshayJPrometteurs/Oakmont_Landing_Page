"use client";

import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, InputOtp } from "@heroui/react";
import { useRouter, useSearchParams } from 'next/navigation';
import Axios from '@/components/utils/Axios';
import { toast } from 'react-toastify';
import { useAuthServiceContext } from '@/contexts/AuthServiceProvider';
import GuestLayout from '@/layouts/GuestLayout';
import Image from 'next/image';
import MessageEmoji from '../../../../public/assets/images/emoji/Message.png';
import ButtonComponent from '@/components/utils/forms/ButtonComponent';

const TwoStepVerification = ({submitURL, resendURL, afterSubmitRedirect, pageName}) => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    const router = useRouter();
    const { setToken } = useAuthServiceContext();

    const [isApiErrors, setIsApiErrors] = useState({});
    const [isApiLoader, setIsApiLoader] = useState(false);
    const [isResendCodeLoader, setIsResendCodeLoader] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [resendTime, setResendTime] = useState(0);

    function obfuscateEmail(email) {
        const [localPart, domain] = email.split("@");
        const hiddenLocalPart = localPart[0] + "*".repeat(localPart.length - 2) + localPart[localPart.length - 1];
        return `${hiddenLocalPart}@${domain}`;
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        setIsApiLoader(true);

        const formData = Object.fromEntries(new FormData(e.currentTarget));
        let additionalFormData;

        if(pageName === 'forgetPassword'){
            additionalFormData = { reset_otp: formData.code, email : email };
        }else{
            additionalFormData = {...formData, user_id : id }
        }

        try {
            const { data } = await Axios.post(submitURL,additionalFormData);
            if(data?.status_code === 200 && data?.success){
                setIsVisible(false);

                if(pageName === 'login'){
                    setToken(
                        data?.data?.access_token,
                        data?.data?.user_data
                    );
                    router.push('/');
                }

                if(pageName === 'forgetPassword'){
                    router.push(`/reset-password/?email=${encodeURIComponent(email)}&rt=${data?.data?.reset_token}`);
                }else{ router.push(afterSubmitRedirect); }

                toast(<Alert color='success' title={data?.message} />, {closeButton:false});
            }
        } catch (error) {
            setIsApiErrors({message: error?.response?.data?.message, type: 'danger'});
            setIsVisible(true);
        } finally{ setIsApiLoader(false); }
    };

    const handleResendCode = async() => {
        setIsResendCodeLoader(true);
        try {
            const { data } = await Axios.post(resendURL,{ email: email });
            if(data?.status_code === 200 && data?.success){
                setIsVisible(true);
                setResendTime(20);
                setIsApiErrors({ message: 'Security code resend on your email', type: 'success' });
            }
        } catch (error) {
            setIsApiErrors({ message: error?.response?.data?.message, type: 'danger' });
            setIsVisible(true);
        } finally { setIsResendCodeLoader(false); }
    }

    useEffect(() => {
        if (resendTime > 0) {
            const intervalId = setInterval(() => {
                setResendTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [resendTime]);

    return (
        <GuestLayout
            header={'Two Step Verification'}
            headerIcon={<Image src={MessageEmoji} height={5} width={25} alt='emoji'/>}
            headerPara={"We sent a verification code to your email. Enter the code from the email in the field below."}
            headerParaText={email && obfuscateEmail(email)}
            alertVisibility = {{ description : isApiErrors?.message, type : isApiErrors?.type, visible : isVisible }}
        >
            <Form validationBehavior="native" onSubmit={onSubmit}>
                <p className="text-default-500 text-small">Type your 6 digit security code</p>

                <InputOtp length={6} isRequired errorMessage="Please enter security code" classNames={{ segment : 'w-full', segmentWrapper: 'w-full gap-x-3' }} variant='bordered' name='code' size='lg' fullWidth/>

                <ButtonComponent type="submit" color='primary' isLoading={isApiLoader} text="Verify"/>
            </Form>
            <div className='flex justify-center gap-2 items-center mt-4'>
                <h1 className='text-gray-500 text-center'>{`Didn't get the mail?`}</h1>

                <Button type='button' size='small' color="primary" variant="light" className='text-base' onPress={handleResendCode} isLoading={isResendCodeLoader} isDisabled={resendTime > 0}>
                    {!isResendCodeLoader && resendTime > 0 ? `${resendTime} secs` : 'Resend'}
                </Button>
            </div>
        </GuestLayout>
    )
}

export default TwoStepVerification