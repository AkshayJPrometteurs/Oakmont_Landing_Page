"use client";
import React, { useState } from 'react';
import { Alert, Button, Checkbox, DatePicker, Form, Input } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import PasswordWithIcon from '@/components/utils/forms/PasswordWithIcon';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import Axios from '@/components/utils/Axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import GuestLayout from '@/layouts/GuestLayout';
import Image from 'next/image';
import MarketingEmoji from '../../../../public/assets/images/emoji/Marketing.png';

const SignUp = () => {
    const router = useRouter();

    const [formValues, setFormValues] = useState({first_name: '',last_name: '',contact_number: '',password:''});
    const [isFormNext, setIsFormNext] = useState(false);
    const [isApiErrors, setIsApiErrors] = useState('');
    const [isApiLoader, setIsApiLoader] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const formatOnlyNumber = (value) => { return value.replace(/\D/g, ""); }
    const formatOnlyAlphabetsAndSpace = (value) => { return value.replace(/[^a-zA-Z\s]/g, ""); };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        (name === 'first_name' || name == 'last_name') && (formattedValue = formatOnlyAlphabetsAndSpace(value));
        (name === 'contact_number') && (formattedValue = formatOnlyNumber(value));
        setFormValues({ ...formValues, [name]: formattedValue });
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        setIsFormNext(true);
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        const allFilled = Object.entries(formData).every(([key, value]) => {
            if (key === 'affiliate_code') return true;
            if (key === 'termsandconditions') return true;
            return value.trim() !== '';
        });

        if (allFilled) {
            setIsApiLoader(true);
            const formattedDob = new Date(formData.dob).toLocaleDateString('en-GB');
            try {
                const response = await Axios.post('/users/register',{...formData, dob: formattedDob, user_type: 2, membership_type: 'free' });
                if(response?.data?.status_code === 200 && response?.data?.success){
                    setIsVisible(false);
                    router.push(`/signup/two-step-verification?id=${response?.data?.data?.user?.id}&email=${response?.data?.data?.user?.email}`);
                    toast(<Alert color='success' title={response?.data?.message} description="Verification code sent on your email-id"/>, {closeButton:false});
                }
            } catch (error) {
                setIsApiErrors(error?.response?.data?.message);
                setIsVisible(true);
            } finally { setIsApiLoader(false); }
        }
    };

    return (
        (<GuestLayout
            header={'Welcome to Oakmont Athletic!'}
            headerIcon={<Image src={MarketingEmoji} height={5} width={25} alt='emoji'/>}
            headerPara={"Please sign-up to your account and start the adventure"}
            alertVisibility = {{ description : isApiErrors, type : 'danger', visible : isVisible }}
        >
            <Form validationBehavior="native" onSubmit={onSubmit}>
                <div className={`w-full ${isFormNext ? 'hidden' : ''}`}>
                    <h1 className='font-bold text-gray-600 mb-4'>Personal Information</h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
                        <Input label="First Name" type="text" name="first_name" isRequired errorMessage="Please enter your first name" placeholder="e.g Sam" value={formValues.first_name} onChange={handleChange} autoComplete="off" />
                        <Input label="Last Name" type="text" name="last_name" isRequired errorMessage="Please enter your last name" placeholder="e.g Morgan" value={formValues.last_name} onChange={handleChange} autoComplete="off" />
                    </div>

                    <Input label="Email" type="email" name="email" className='mb-3' isRequired placeholder="e.g sam@example.com" autoComplete="off" validate={(value) => {
                        if (value === '') return "Please enter your email";
                        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                        if (!emailRegex.test(value)) return "Invalid email address";
                        return null;
                    }} />

                    <DatePicker label="Date of birth" name='dob' className='mb-1.5' isRequired maxValue={today(getLocalTimeZone())} errorMessage="Please enter your date of birth"/>

                    <Input label="Contact Number" type="text" name="contact_number" className='mb-2' isRequired errorMessage="Please enter your contact no." placeholder="e.g 7865646656" value={formValues.contact_number} onChange={handleChange} autoComplete="off" />
                </div>
                <div className={`w-full ${isFormNext ? '' : 'hidden'}`}>
                    <h1 className='font-bold text-gray-600 mb-4'>User Information</h1>

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

                    <Input label="Paste Affilate Code" type="text" name="affiliate_code" className='mb-4' autoComplete="off" />
                </div>

                <Checkbox className='mb-1 text-sm'>Agree to terms and conditions</Checkbox>

                <Button type="submit" color='primary' className='w-full' isLoading={isFormNext && isApiLoader}>
                    {isFormNext ? isApiLoader ? 'Please wait...' : 'Verify' : 'Next'}
                </Button>
            </Form>
            <div className='mt-3 flex justify-center items-center gap-2'>
                <IoIosArrowBack className='text-primaryColor'/>
                <Link href={'/login'} className='text-primaryColor'>Back to login</Link>
            </div>
        </GuestLayout>)
    );
}

export default SignUp