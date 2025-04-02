"use client"

import React from 'react';
import MainPageLayout from "@/layouts/MainPageLayout";
import {Divider} from "@heroui/react";

const PrivacyPolicy = () => {
    return (
        <MainPageLayout>
            <section className="max-w-7xl mx-auto px-6">
                <h1 className="text-3xl md:text-5xl uppercase tracking-wider leading-[1.3!important] text-center font-base-runner my-6">Privacy Policy</h1>
                <Divider orientation="horizontal"/>
                <div className="my-6 font-dm-sans">
                    <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. We collect below information from you,</p>

                    <ul>
                        <li><strong>Personal Information:</strong> When you use our services, we may collect personal information such as your name, email address, phone number, and payment details.</li>
                        <li><strong>Usage Data:</strong> We collect information about how you interact with our website, including IP address, browser type, and device information.</li>
                        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance user experience and analyze website traffic.</li>
                    </ul>

                    <h2 className="font-bold">How We Use Your Information</h2>
                    <ul>
                        <li>Provide and maintain our services.</li>
                        <li>Improve user experience and website functionality.</li>
                        <li>Process transactions securely.</li>
                        <li>Send updates, promotional materials, and important notifications.</li>
                        <li>Comply with legal obligations.</li>
                    </ul>

                    <h2 className="font-bold mb-1">Sharing Your Information</h2>
                    <p>We do not sell your personal data. However, we may share your information with third parties in the following cases:</p>
                    <ul>
                        <li>Service providers assisting in website operations.</li>
                        <li>Legal and regulatory requirements.</li>
                        <li>Business transfers, such as mergers or acquisitions.</li>
                    </ul>

                    <h2 className="font-bold mb-1">Data Security</h2>
                    <p className="mb-4">We take appropriate security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.</p>

                    <ul>
                        <li>Access, update, or delete your personal information.</li>
                        <li>Opt-out of marketing communications.</li>
                        <li>Restrict or object to data processing under certain conditions.</li>
                    </ul>

                    <h2 className="font-bold mb-1">Third-Party Links</h2>
                    <p className="mb-4">Our website may contain links to third-party sites. We are not responsible for their privacy policies and encourage you to review them.</p>

                    <h2 className="font-bold mb-1">Changes to This Privacy Policy</h2>
                    <p className="mb-20">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
                </div>
            </section>
        </MainPageLayout>
    );
};

export default PrivacyPolicy;
