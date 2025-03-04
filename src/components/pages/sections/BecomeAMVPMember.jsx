"use client";

import React, {useEffect, useState} from "react";
import { Button, useDisclosure } from "@heroui/react";
import Link from "next/link";
import SectionLayout from "@/layouts/SectionLayout";
import Modals from "@/components/utils/Modals";
import Axios from "@/components/utils/Axios";
import PaymentForm from "@/components/pages/stripe/PaymentForm";
import {Inter} from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

const BecomeAMVPMember = ({isModalOpen, linkPath, contents, loading}) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [planID, setPlanID] = useState();
    const [planPrice, setPlanPrice] = useState();
    const [planName, setPlanName] = useState();
    const [plans, setPlans] = useState([]);
    const [modalSize, setModalSize] = useState("5xl");

    const getPlanDetailsList = async () => {
        try {
            const { data } = await Axios.get('subscription/user/get_plans_list');
            setPlans(data?.data);
        }catch (e) {
            console.log(e);
        }
    }

    const handlePriceDetails = (plan_id, name, price) => {
        setPlanID(plan_id);
        setPlanName(name);
        setPlanPrice(price);
        onOpen();
    }

    useEffect(() => { getPlanDetailsList(); }, [planPrice]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setModalSize("md");
            } else if (window.innerWidth <= 768) {
                setModalSize("2xl");
            } else {
                setModalSize("5xl");
            }
        };
    
        handleResize(); 
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <SectionLayout id="become-a-mvp-member-section" bgcolor="#fff" color="#000" headingText="Become A MVP Member">
            <div className="flex flex-col md:flex-row justify-center gap-6 p-4 mt-6">
                {plans.map((plan, keyIndex) => (
                    <div key={keyIndex} className={`w-full md:w-96 shadow-xl rounded-xl text-center p-6 border ${inter.className}`}>
                        <h6 className="font-semibold text-lg md:text-xl">{plan.plan_name}</h6>
                        <div className="flex justify-center my-4">
                            <sup className="text-xl mt-2">$</sup>
                            <span className="text-5xl text-primaryColor font-bold">{plan.plan_price}</span>
                        </div>

                        <p className="text-sm text-gray-600 capitalize">{"/"+plan.plan_duration}</p>
                        <ul style={{ listStyle:'circle' }} className="text-left ml-8 mb-10 become-mv-member-ul">
                            {plan.plan_feature.map((feature) => <li key={feature} className="my-2">{feature}</li>)}
                        </ul>

                        {isModalOpen ? (
                            <Button type="button" color="primary" onPress={() => handlePriceDetails(plan._id,plan.plan_name,plan.plan_price)}>Get Started</Button>
                        ) : (
                            <Link href={linkPath} className="bg-primaryColor px-6 py-2.5 rounded-xl text-white text-sm">Get Started</Link>
                        )}
                    </div>
                ))}
            </div>

            <Modals modalSize={modalSize} isOpen={isOpen} onOpenChange={onOpenChange} modalBodyClass={'p-0 max-h-screen overflow-y-auto'}>
                <PaymentForm countryLoader={loading} contents={contents} planName={planName} planPrice={planPrice} planID={planID} onClose={onClose}/>
            </Modals>
        </SectionLayout>
    )
};

export default BecomeAMVPMember;
