"use client";
import React from "react";
import SectionLayout from "../SectionLayout";
import { Inter } from "next/font/google";
import { Button } from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] });
const BecomeAMVPMember = ({onpress}) => {
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

    return (
        <SectionLayout id="become-a-mvp-member-section" bgcolor="#fff" color="#000" headingText="Become A MVP Member">
            <div className="flex flex-col md:flex-row justify-center gap-6 p-4 mt-6">
                {plans.map((plan) => (
                    <div key={plan.title} className={`w-full md:w-96 shadow-xl rounded-xl text-center p-6 border ${inter.className}`}>
                        <h6 className="font-semibold">{plan.title}</h6>
                        <div className="flex justify-center my-4">
                            <sup className="text-xl mt-2">$</sup>
                            <span className="text-5xl text-primaryColor font-bold">{plan.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">/{plan.billing}</p>
                        <ul style={{ listStyle:'circle' }} className="text-left ml-5 become-mv-member-ul">
                            {plan.features.map((feature) => <li key={feature} className="my-2">{feature}</li>)}
                        </ul>
                        <Button color="primary" className="mt-5" onPress={onpress}>Get Started</Button>
                    </div>
                ))}
            </div>
        </SectionLayout>
    );
};

export default BecomeAMVPMember;
