"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import FooterImage from '../../public/assets/images/footer-logo.png';
import { Inter } from 'next/font/google';
import AlertComponent from '@/components/utils/forms/AlertComponent';
import { useAuthServiceContext } from '../contexts/AuthServiceProvider';
import { useRouter } from 'next/navigation';

const inter = Inter({subsets : ['latin']});
const GuestLayout = ({
    children, header, headerIcon, headerPara, headerParaText, alertVisibility
}) => {
    const router = useRouter();
    const { isAuthenticated } = useAuthServiceContext();
    useEffect(() => { if(isAuthenticated){ router.push('/'); } },[isAuthenticated,router])
    return (
        <section className={`grid grid-cols-1 md:grid-cols-2 items-center gap-4 p-4 h-screen ${inter.className}`}>
            <section className='guest-layout flex-col justify-center items-center w-full rounded-xl relative'>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1, }} className='absolute top-0 left-0 w-full h-full rounded-xl'></div>
                <div className="relative z-10 flex flex-col justify-center items-center" style={{ width: '65%' }}>
                    <Image src={FooterImage} alt="authentication" className='w-auto h-auto'/>
                    <p className='font-urbanist text-center text-white w-3/5 my-5'>Lorem ipsum dolor sit amet consectetur. Quis euismod pellentesque vestibulum ornare eget. Suscipit congue dictum metus facilisis fermentum auctor dictum.</p>
                </div>
            </section>
            <section className='w-full p-4'>
                <h1 className='text-[#262B43E5] text-xl md:text-2xl font-bold flex gap-2 items-center'>{header}{headerIcon}</h1>
                <p className='text-gray-500 mt-1 mb-4'>{headerPara}</p>
                {headerParaText && <p className='mb-6'>{headerParaText}</p>}

                {alertVisibility.description && (
                    <AlertComponent type={alertVisibility.type} variant={'flat'} description={alertVisibility.description} isVisible={alertVisibility.visible} />
                )}

                {children}
            </section>
        </section>
    )
}

export default GuestLayout