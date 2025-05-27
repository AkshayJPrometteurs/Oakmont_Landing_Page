"use client"

import React, { useEffect, useState } from 'react';
import MainPageLayout from "@/layouts/MainPageLayout";
import {Divider} from "@heroui/react";
import Axios from '../utils/Axios';

const PrivacyPolicy = () => {
    const [privacyPolicy, setPrivacyPolicy] = useState(null);
    const getPrivacyPolicy = async () => {
        try {
            const { data } = await Axios.get('/users/content-policy?type=privacy_policy');
            setPrivacyPolicy(data?.data?.content);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getPrivacyPolicy(); }, []);
    return (
        <MainPageLayout>
            <section className="max-w-7xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl uppercase tracking-widest text-center font-dharma-gothic-c-italic font-bold my-6">Privacy Policy</h1>
                <Divider orientation="horizontal"/>
                <div className="my-6 font-dm-sans">
                    <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
                </div>
            </section>
        </MainPageLayout>
    );
};

export default PrivacyPolicy;
