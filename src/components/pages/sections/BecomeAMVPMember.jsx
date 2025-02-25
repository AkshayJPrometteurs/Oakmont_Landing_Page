"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Button, useDisclosure } from "@heroui/react";
import Link from "next/link";
import SectionLayout from "@/layouts/SectionLayout";
import Modals from "@/components/utils/Modals";
import PaymentPage from "@/components/pages/PaymentForm";

const inter = Inter({ subsets: ['latin'] });
const BecomeAMVPMember = ({ isModalOpen, linkPath, contents, loading}) => {
    const plans = [{
        title: "Weekly",
        price: 17,
        billing: "Billed weekly",
        features: ["Arbitrage bot", "+EV bot", "Fantasy tournaments", "News and analysis", "Team events"],
    },
    {
        title: "Monthly",
        price: 67,
        billing: "Billed Monthly",
        features: ["Arbitrage bot", "+EV bot", "Fantasy tournaments", "News and analysis", "Team events"],
    }];

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [planName, setPlanName] = useState();
    const [planPrice, setPlanPrice] = useState();

    const handlePriceDetails = (plan, price) => {
        setPlanName(plan);
        setPlanPrice(price);
        onOpen();
    }

    return (
        <SectionLayout id="become-a-mvp-member-section" bgcolor="#fff" color="#000" headingText="Become A MVP Member">
            <div className="flex flex-col md:flex-row justify-center gap-6 p-4 mt-6">
                {plans.map((plan) => (
                    <div key={plan.title} className={`w-full md:w-96 shadow-xl rounded-xl text-center p-6 border ${inter.className}`}>
                        <h6 className="font-semibold text-lg md:text-xl">{plan.title}</h6>
                        <div className="flex justify-center my-4">
                            <sup className="text-xl mt-2">$</sup>
                            <span className="text-5xl text-primaryColor font-bold">{plan.price}</span>
                        </div>

                        <p className="text-sm text-gray-600">{"/"+plan.billing}</p>
                        <ul style={{ listStyle:'circle' }} className="text-left ml-8 mb-10 become-mv-member-ul">
                            {plan.features.map((feature) => <li key={feature} className="my-2">{feature}</li>)}
                        </ul>

                        {isModalOpen ? (
                            <Button type="button" color="primary" onPress={() => handlePriceDetails(plan.title,plan.price)}>Get Started</Button>
                        ) : (
                            <Link href={linkPath} className="bg-primaryColor px-6 py-2.5 rounded-xl text-white text-sm">Get Started</Link>
                        )}
                    </div>
                ))}
            </div>

            <Modals modalSize="5xl" isOpen={isOpen} onOpenChange={onOpenChange} modalBodyClass={'p-0'}>
                <PaymentPage planName={planName} planPrice={planPrice} contents={contents} loading={loading}/>
            </Modals>
        </SectionLayout>
    );
};

export default BecomeAMVPMember;
