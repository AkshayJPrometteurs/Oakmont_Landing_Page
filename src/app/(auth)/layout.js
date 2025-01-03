import React from 'react';
import Image from 'next/image';
import FooterImage from '../../../public/assets/images/footer-logo.png';
import { Inter } from 'next/font/google';

const inter = Inter({subsets : ['latin']});
const GuestLayout = ({children}) => {
    return (
        <section className={`grid grid-cols-1 md:grid-cols-2 items-center gap-4 p-4 ${inter.className}`}>
            <section style={{ backgroundImage: 'url(/assets/images/authentication.jpg)', backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className='w-full h-[95vh] rounded-xl hidden md:flex flex-col justify-center items-center relative'>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1, }} className='absolute top-0 left-0 w-full h-full rounded-xl'></div>
                <div className="relative z-10 flex flex-col justify-center items-center">
                    <Image src={FooterImage} alt="authentication" className='w-auto h-auto'/>
                    <p className='font-urbanist text-center text-white w-3/5 my-5'>Lorem ipsum dolor sit amet consectetur. Quis euismod pellentesque vestibulum ornare eget. Suscipit congue dictum metus facilisis fermentum auctor dictum.</p>
                </div>
            </section>
            <section className='w-full p-4'>
                {children}
            </section>
        </section>
    )
}

export default GuestLayout