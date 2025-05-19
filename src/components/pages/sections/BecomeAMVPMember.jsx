"use client";

import React, {useEffect, useState} from "react";
import { Inter } from "next/font/google";
import {Alert, Button, Divider, Form, Input, Select, SelectItem, Spinner, useDisclosure} from "@heroui/react";
import Link from "next/link";
import SectionLayout from "@/layouts/SectionLayout";
import Modals from "@/components/utils/Modals";
import Axios from "@/components/utils/Axios";
import {loadStripe} from "@stripe/stripe-js";
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaCircleCheck } from "react-icons/fa6";

const inter = Inter({ subsets: ['latin'] });
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const BecomeAMVPMemberExternal = ({ isModalOpen, linkPath, contents, isCountryLoading, getSubscriptionDetails }) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [planPrice, setPlanPrice] = useState(0);
    const [planTax, setPlanTax] = useState(0);
    const [zipCodeLength, setZipCodeLength] = useState(6);
    const [zipCodePlaceholder, setZipCodePlaceholder] = useState("e.g 123456");
    const [plans, setPlans] = useState([]);
    const [stripeErrors, setStripeErrors] = useState("");
    const [stripeLoader, setStripeLoader] = useState(false);
    const [stripePriceID, setStripePriceID] = useState(null);
    const [stripePaymentStart, setStripePaymentStart] = useState(false);
    const [stripePaymentSuccess, setStripePaymentSuccess] = useState(false);
    const [stripePaymentSuccessMsg, setStripePaymentSuccessMsg] = useState("");
    const [formValues ,setFormValues] = useState({ email: '', country: '', zipcode: '', fullname: '', discount_code : "" });
    const [discountCode, setDiscountCode] = useState("");
    const [applyDiscountCode, setApplyDiscountCode] = useState(false);
    const [discountCodeMessage, setDiscountCodeMessage] = useState("");
    const [discountCodeInputColor, setDiscountCodeInputColor] = useState("default");
    const [discountData, setDiscountData] = useState([]);

    const stripe = useStripe();
    const elements = useElements();

    const handlePriceDetails = (stripePriceID, price) => {
        setStripePriceID(stripePriceID);
        setPlanPrice(price);
        onOpen();
    }

    const formatOnlyAlphabetsAndSpace = (value) => { return value.replace(/[^a-zA-Z\s]/g, ""); };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        name === 'fullname' && (formattedValue = formatOnlyAlphabetsAndSpace(value));

        if(name === 'country'){
            const selectedCountry = contents.find((c) => c.name === value);
            setZipCodeLength(selectedCountry.zipCodeLength);
            let zipCodePlaceholder = "";
            for (let i = 0; i < selectedCountry.zipCodeLength; i++) {
                zipCodePlaceholder += Math.floor(Math.random() * 10);
            }
            setZipCodePlaceholder("e.g "+zipCodePlaceholder);
        }
        setFormValues({...formValues,[name]: formattedValue});
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setStripeLoader(true);
        if (!stripe || !elements) {
            setStripeErrors("Stripe failed to load.");
            setStripeLoader(false);
            return;
        }

        await elements.submit();
        setStripeErrors('');

        const cardElement = elements.getElement(CardNumberElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement });

        if (error) {
            setStripeErrors(error.message);
            setStripeLoader(false);
            return;
        }

        try {
            setStripePaymentStart(true);
            const { data } = await Axios.post('user_subscription/create-subscription', {
                plan_id : stripePriceID,
                payment_method_id : paymentMethod.id,
                coupon_code: discountCode
            });

            const clientSecret = data?.data?.client_secret;
            if(clientSecret){
                const {paymentIntent, error} = await stripe.confirmCardPayment(
                    clientSecret, {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                name: formValues.fullname,
                                email: formValues.email,
                                address: { postal_code: formValues.zipcode }
                            },
                        },
                    },
                );

                if (error) { console.error("Payment failed:", error.message); return; }

                if(paymentIntent.status === "succeeded") {
                    setStripePaymentSuccess(true);
                    setStripePaymentSuccessMsg('Payment successfully');
                    setStripePaymentStart(false);
                    setTimeout(() => { modalOnOpenChange(); location.reload(); }, 2000);
                }
            }else{
                setStripePaymentSuccess(true);
                setStripePaymentSuccessMsg('Subscribed successfully');
                setStripePaymentStart(false);
                setTimeout(() => { modalOnOpenChange(); location.reload(); }, 2000);
            }
            await getSubscriptionDetails();
        }catch (error) {
            setStripeErrors(error?.response?.data?.message);
            setStripeLoader(false);
        }
    };

    const getPlanDetailsList = async () => {
        try {
            const { data } = await Axios.get('subscription/user/get_plans_list');
            setPlans(data?.data);
        }catch (e) { console.log(e); }
    }

    const handleDiscountCode = (code) => {
        setApplyDiscountCode(code.length > 0);
        setDiscountCodeInputColor("default");
        setDiscountCodeMessage("");
        setDiscountCode(code);
        setDiscountData([]);
    }

    const handleApplyDiscountCode = async() => {
        try {
            const { data } = await Axios.get(`discounts/validate/${discountCode}`);
            setDiscountCodeMessage(data?.message);
            setDiscountCodeInputColor("success");
            setApplyDiscountCode(false);
            setDiscountData(data?.data);
        }catch (error) {
            setDiscountCodeInputColor("danger");
            setDiscountCodeMessage(error?.response?.data?.message)
        }
    }

    const modalOnOpenChange = () => {
        onOpenChange();
        setStripeErrors('');
        setStripeLoader(false);
        setStripePaymentStart(false);
        setStripePaymentSuccess(false);
        setStripePaymentSuccessMsg('');
        setStripePriceID(null);
        setPlanPrice(0);
        setPlanTax(0);
        setFormValues({ email: '', country: '', zipcode: '', fullname: '', discount_code : "" });
        setDiscountCode("");
        setApplyDiscountCode(false);
        setDiscountCodeMessage("");
        setDiscountCodeInputColor("default");
        setDiscountData([]);
    }

    useEffect(() => { getPlanDetailsList(); }, []);

    return (
        <SectionLayout id="become-a-mvp-member-section" bgcolor="#fff" color="#000" headingText="Become A MVP Member">
            <div className="flex flex-col md:flex-row justify-center gap-6 p-4 mt-6">
                {plans.length > 0 && plans?.map((plan) => (
                    <div key={plan.plan_name} className={`w-full md:w-96 shadow-xl rounded-xl text-center p-6 border flex flex-col h-full min-h-[450px] ${inter.className}`}>
                        <h6 className="font-semibold text-lg md:text-xl">{plan.plan_name}</h6>

                        <div className="flex justify-center my-4">
                            <sup className="text-xl mt-2">$</sup>
                            <span className="text-5xl text-primaryColor font-bold">{plan.plan_price}</span>
                        </div>

                        <p className="text-sm text-gray-600">{"/" + plan.plan_duration}</p>

                        <ul style={{ listStyle: 'circle' }} className="text-left flex-grow">
                            {plan.plan_feature.map((feature) => (
                                <li key={feature} className="my-2">{feature}</li>
                            ))}
                        </ul>

                        <div className="mt-auto pb-2">
                            {isModalOpen ? (
                                <Button type="button" color="primary" onPress={() => handlePriceDetails(plan.stripe_price_id, plan.plan_price)}>
                                    Get Started
                                </Button>
                            ) : (
                                <Link href={linkPath} className="bg-primaryColor px-6 py-2.5 rounded-xl text-white text-sm">
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Modals
                modalSize={stripePaymentStart || stripePaymentSuccess ? 'lg' : '5xl'}
                isOpen={isOpen}
                onOpenChange={modalOnOpenChange}
                modalBodyClass={'p-0'}
                hideCloseButton={stripePaymentStart || stripePaymentSuccess}
                isDismissable={false}
            >
                {(stripePaymentSuccess && !stripeErrors) && (
                    <div className={`grid justify-center items-center px-5 py-10 text-center ${inter.className}`}>
                        <div className="flex-none relative w-20 h-20 rounded-full grid place-items-center bg-success-50 dark:bg-success-100 border-success-100 shadow-small border-1 mx-auto">
                            <FaCircleCheck className="text-success-500 fill-success text-5xl"/>
                        </div>
                        <h3 className="text-3xl mt-10 capitalize">{stripePaymentSuccessMsg}</h3>
                    </div>
                )}

                {(stripePaymentStart && !stripeErrors) && (
                    <div className={`grid justify-center items-center px-5 py-10 text-center ${inter.className}`}>
                        <Spinner size="lg" color="success" classNames="mt-4 text-4xl h-16 w-16" variant="gradient"/>
                        <h3 className="text-3xl mt-10 mb-7 capitalize">Payment being processed...</h3>
                        <p className="text-lg">Please do not close this window or refresh the page</p>
                    </div>
                )}

                {stripeErrors && (stripePaymentStart || stripePaymentSuccess) && (
                    <div className={`grid justify-center items-center p-5 text-center ${inter.className}`}>
                        <div role="alert" data-visible="true" data-has-title="true" className="flex flex-grow flex-col gap-4 justify-center items-center w-full py-3 px-4 gap-x-1 rounded-medium text-danger-600 dark:text-danger-500 bg-danger-50 dark:bg-danger-50/50 text-2xl" title={stripeErrors}>
                            <div className="flex-none relative w-16 h-16 rounded-full grid place-items-center bg-danger-50 dark:bg-danger-100 border-danger-100 shadow-small border-1">
                                <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" className="fill-current w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <path d="M17.51 3.85L11.57 0.42C10.6 -0.14 9.4 -0.14 8.42 0.42L2.49 3.85C1.52 4.41 0.919998 5.45 0.919998 6.58V13.42C0.919998 14.54 1.52 15.58 2.49 16.15L8.43 19.58C9.4 20.14 10.6 20.14 11.58 19.58L17.52 16.15C18.49 15.59 19.09 14.55 19.09 13.42V6.58C19.08 5.45 18.48 4.42 17.51 3.85ZM9.25 5.75C9.25 5.34 9.59 5 10 5C10.41 5 10.75 5.34 10.75 5.75V11C10.75 11.41 10.41 11.75 10 11.75C9.59 11.75 9.25 11.41 9.25 11V5.75ZM10.92 14.63C10.87 14.75 10.8 14.86 10.71 14.96C10.52 15.15 10.27 15.25 10 15.25C9.87 15.25 9.74 15.22 9.62 15.17C9.49 15.12 9.39 15.05 9.29 14.96C9.2 14.86 9.13 14.75 9.07 14.63C9.02 14.51 9 14.38 9 14.25C9 13.99 9.1 13.73 9.29 13.54C9.39 13.45 9.49 13.38 9.62 13.33C9.99 13.17 10.43 13.26 10.71 13.54C10.8 13.64 10.87 13.74 10.92 13.87C10.97 13.99 11 14.12 11 14.25C11 14.38 10.97 14.51 10.92 14.63Z"></path>
                                </svg>
                            </div>
                            <div className="h-full flex-grow min-h-10 ms-2 flex flex-col box-border text-inherit justify-center items-center">
                                <div className="text-lg w-full font-medium block text-inherit leading-5">{stripeErrors}</div>
                            </div>
                        </div>
                        <Button className="mt-4" onPress={modalOnOpenChange}>Close this window</Button>
                    </div>
                )}

                <Form className={`${stripePaymentStart ? "hidden" : ""} ${stripePaymentSuccess ? "hidden" : ""} ${inter.className}`} validationBehavior="native" onSubmit={onSubmit}>
                    <div className='flex flex-col md:flex-row'>
                        <div className='w-full md:w-3/5 px-5 py-8'>
                            <div className="mb-4">
                                {stripeErrors && <Alert color="danger" className="mb-3" title={stripeErrors}/>}
                                <h1 className='mb-3 text-lg font-bold'>Billing Details</h1>

                                <Input
                                    label="Email"
                                    type="email"
                                    name="email"
                                    className='mb-3'
                                    isRequired
                                    placeholder="e.g sam@example.com"
                                    onChange={handleChange}
                                    value={formValues.email}
                                    autoComplete="off"
                                    validate={(value) => {
                                        if (value.trim() === '') return "Please enter your email";
                                        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                                        if (!emailRegex.test(value)) return "Invalid email address";
                                        return null;
                                    }}
                                />

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <Select
                                        isLoading={isCountryLoading}
                                        label="Billing Country"
                                        name="country"
                                        onChange={handleChange}
                                        value={formValues.country}
                                        isRequired
                                        errorMessage="Please choose country"
                                        placeholder="e.g. US">
                                        {contents?.map(({name}) => <SelectItem key={name}>{name}</SelectItem>)}
                                    </Select>

                                    <Input
                                        label="Billing Zip/Postal Code"
                                        type="text"
                                        maxLength={zipCodeLength}
                                        name="zipcode"
                                        className='mb-3'
                                        onChange={handleChange}
                                        value={formValues.zipcode}
                                        isRequired
                                        placeholder={zipCodePlaceholder}
                                        autoComplete="off"
                                        validate={(value) => {
                                            if (value.trim() === '') return `Please enter ${zipCodeLength} digit zip/postal code`;
                                            if (value.length < zipCodeLength) return `Please must enter ${zipCodeLength} digit zip/postal code`;
                                            return null;
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <h1 className='mb-3 text-lg font-bold'>Credit Card Details</h1>

                                <Input
                                    label="Full Name"
                                    type="text"
                                    name="fullname"
                                    className='mb-3'
                                    isRequired
                                    placeholder="e.g Sam Morgan"
                                    value={formValues.fullname}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    validate={(value) => {
                                        if (value.trim() === '') return "Please enter your full name";
                                        return null;
                                    }}
                                />

                                <div className="w-full bg-default-100 mb-3 py-2 px-3 rounded-2xl">
                                    <label className="text-xs text-default-600">Card Number</label>
                                    <CardNumberElement
                                        options={{
                                            style:{
                                                base: {
                                                    fontSize: "1rem",
                                                    fontFamily: "'Inter', 'Inter Fallback'",
                                                    fontStyle: 'normal'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <div className="w-full bg-default-100 py-2 px-3 rounded-2xl">
                                        <label className="text-xs text-default-600">Expiry Date</label>
                                        <CardExpiryElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: "1rem",
                                                        fontFamily: "'Inter', 'Inter Fallback'",
                                                        fontStyle: 'normal'
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="w-full bg-default-100 py-2 px-3 rounded-2xl">
                                        <label className="text-xs text-default-600">CVC</label>
                                        <CardCvcElement options={{
                                            style: {
                                                base: {
                                                    fontSize: "1rem",
                                                    fontFamily: "'Inter', 'Inter Fallback'",
                                                    fontStyle: 'normal'
                                                }
                                            }
                                        }}/>
                                    </div>
                                </div>
                                <div>
                                    <div className={`flex items-center mb-1 ${applyDiscountCode && 'gap-4'}`}>
                                        <Input
                                            label="Discount Code"
                                            type="text"
                                            color={discountCodeInputColor}
                                            name="discount_code"
                                            onKeyUp={(e) => handleDiscountCode(e.target.value)}
                                            autoComplete="off"
                                        />
                                        {applyDiscountCode && <Button color="primary" onPress={handleApplyDiscountCode}>Apply</Button>}
                                    </div>
                                    {discountCodeMessage && (
                                        <div className={`text-tiny ${discountCodeInputColor === 'success' ? 'text-success' : 'text-danger'} ml-2`}>{discountCodeInputColor === 'success' ? 'Applied discount code!' : 'Invalid discount code'}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Divider orientation='vertical' className='h-auto'/>

                        <div className='w-full md:w-2/5 px-5 py-8 text-[#707070]'>
                            <h1 className='mb-3 text-lg font-bold text-black'>Summary</h1>
                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Urna consectetur pretium ornare tincidunt ipsum orci dolor.</p>

                            <div className='bg-[#F7F7F7] py-4 px-6 my-4 rounded-md'>
                                <p className="mb-2">Lorem ipsum dolor sit amet</p>
                                <h1 className="text-2xl md:text-4xl text-black">${planPrice}.00</h1>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <p>Prize</p>
                                <p className="text-black">${planPrice}.00</p>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <p>Tax</p>
                                <p className="text-black">${planTax}.00</p>
                            </div>

                            {discountData?.is_valid && (
                                <div className="flex justify-between items-center">
                                    <p>Discount</p>
                                    <p className="text-black">
                                        ${(planPrice * discountData?.discount_code_details?.discount_percentage / 100).toFixed(2)}
                                    </p>
                                </div>
                            )}

                            <Divider className="my-3"/>

                            <div className="flex justify-between items-center mb-4">
                                <p>Total</p>
                                <p className="text-black">
                                    ${(discountData?.is_valid ? (planPrice - (planPrice * discountData?.discount_code_details?.discount_percentage / 100)) : (planPrice + planTax)).toFixed(2)}
                                </p>
                            </div>

                            <Button isLoading={stripeLoader} isDisabled={stripeLoader} type="submit" color="success" className="w-full text-white">{stripeLoader ? 'Please wait...' : 'Make Payment'}</Button>

                            <p className="mt-6 text-sm">Lorem ipsum dolor sit amet consectetur. Urna consectetur pretium ornare tincidunt ipsum orci dolor laoreet.</p>
                        </div>
                    </div>
                </Form>
            </Modals>
        </SectionLayout>
    );
};

export default function BecomeAMVPMember ({ isModalOpen, linkPath, contents, isCountryLoading, getSubscriptionDetails }) {
    return (
        <Elements stripe={stripePromise}>
            <BecomeAMVPMemberExternal
                isModalOpen={isModalOpen}
                linkPath={linkPath}
                contents={contents}
                isCountryLoading={isCountryLoading}
                getSubscriptionDetails={getSubscriptionDetails}
            />
        </Elements>
    );
};
