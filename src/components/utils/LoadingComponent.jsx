import React from 'react';
import { Spinner } from "@heroui/react";
import { Inter } from 'next/font/google';
import Image from 'next/image';
import LoadingImage from '../../../public/assets/images/logo.svg';

const inter = Inter({subsets : ['latin']});
const LoadingComponent = () => {
    return (
        <section className='h-screen z-50 bg-white flex flex-col gap-4 justify-center items-center'>
            <Image src={LoadingImage} alt={LoadingImage} width={300}/>
            <Spinner />
            <h1 className={`text-2xl ${inter.className}`}>Please wait</h1>
        </section>
    )
}

export default LoadingComponent