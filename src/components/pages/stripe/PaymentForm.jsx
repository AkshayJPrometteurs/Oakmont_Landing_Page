import React, {Fragment, useEffect, useState} from 'react';
import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {Alert, Button, Divider, Form, Input, Select, SelectItem} from "@heroui/react";
import {useAuthServiceContext} from "@/contexts/AuthServiceProvider";
import Axios from "@/components/utils/Axios";
import {Inter} from "next/font/google";
import axios from "axios";
import {toast} from "react-toastify";

const inter = Inter({ subsets: ['latin'] });
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentFormExternal = ({clientSecret, planID, planName, planPrice, onClose }) => {
    const [paymentBtnLoader, setPaymentBtnLoader] = useState(false);
    const [zipCodeLength, setZipCodeLength] = useState(6);
    const [zipCodePlaceholder, setZipCodePlaceholder] = useState("e.g 123456");
    const [planTax, setPlanTax] = useState(0);
    const [countries, setCountries] = useState([]);
    const [isCountryLoading, setIsCountryLoading] = useState(false);
    const [formValues ,setFormValues] = useState({ email: '', country: '', zipcode: '' });
    const [paymentTime, setPaymentTime] = useState(0);
    const [paymentTimeLoader, setPaymentTimeLoader] = useState(false);
    const [paymentIntentID, setPaymentIntentID] = useState(null);

    const { user } = useAuthServiceContext();
    const stripe = useStripe();
    const elements = useElements();

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if(name === 'country'){
            const selectedCountry = countries.find((c) => c.name === value);
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
        setPaymentBtnLoader(true);
        try {
            await elements.submit();
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements, clientSecret,
                confirmParams: { return_url: `${window.location.origin}/payment/success` },
                redirect: "if_required",
            });

            if (paymentIntent.status === "succeeded") {
                setPaymentTime(180);
                setPaymentTimeLoader(true);
                try {
                    const { data } = await Axios.post('payment/create-payment-intent', {
                        email : formValues.email,
                        country : formValues.country,
                        zipcode : formValues.zipcode,
                        user_id : user.user_id,
                        amount : planPrice,
                        currency : 'aud',
                        subscription_id : planID
                    });
                    setPaymentIntentID(data?.data?.payment_intent_id);
                    // setPaymentTimeLoader(false);
                }catch (error) {
                    setPaymentTime(0);
                    toast(<Alert color='danger' title={error.response.data.message} />, {closeButton:false});
                    onClose();
                }
            }else{
                setPaymentTime(0);
                toast(<Alert color='danger' title={error} />, {closeButton:false});
                onClose();
            }
        }catch (error) {
            setPaymentTime(0);
            toast(<Alert color='danger' title={error.response.data.message} />, {closeButton:false});
        } finally {
            setPaymentBtnLoader(false);
        }
    };

    const getCountriesData = async() => {
        setIsCountryLoading(true);
        try{
            const response = await axios.get('/api/countries');
            setCountries(response.data);
            setIsCountryLoading(false);
        }catch(error){ console.error(error); }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => { getCountriesData(); },[]);

    useEffect(() => {
        if (paymentTime > 0) {
            const intervalId = setInterval(() => {
                setPaymentTime((prevTime) => prevTime - 1);
                axios.get(`https://api.stripe.com/v1/payment_intents/${paymentIntentID}`, {
                    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}` }
                }).then((response) => {
                    if (response.data.status === 'succeeded') {
                        clearInterval(intervalId);
                        onClose();
                    }
                })
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [paymentTime]);

    return (
        <Fragment>
            {paymentTimeLoader ? (
                <div className="px-5 py-8 flex flex-col items-center justify-center">
                    <span className="text-4xl border-2 rounded-full p-10 w-36 h-36">{formatTime(paymentTime)}</span>
                    <span className="text-3xl">Please wait...</span>
                </div>
            ) : (
                <Form className={inter.className} validationBehavior="native" onSubmit={onSubmit}>
                    <div className='flex flex-col md:flex-row'>
                        <div className='w-full md:w-3/5 px-5 py-8'>
                            <div className="mb-4">
                                <h1 className='mb-3 text-lg font-bold'>Billing Details</h1>

                                <Input label="Email" type="email" name="email" className='mb-3' isRequired placeholder="e.g sam@example.com" onChange={handleChange} value={formValues.email} autoComplete="off" validate={(value) => {
                                    if (value === '') return "Please enter your email";
                                    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                                    if (!emailRegex.test(value)) return "Invalid email address";
                                    return null;
                                }}/>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <Select isLoading={isCountryLoading} label="Billing Country" name="country" onChange={handleChange} value={formValues.country} isRequired errorMessage="Please choose country" placeholder="e.g. US">
                                        {countries?.map(({name}) => <SelectItem key={name}>{name}</SelectItem> )}
                                    </Select>

                                    <Input label="Billing Zip/Postal Code" type="text" maxLength={zipCodeLength} name="zipcode" className='mb-3' onChange={handleChange} value={formValues.zipcode} isRequired placeholder={zipCodePlaceholder} autoComplete="off" validate={(value) => {
                                        if (value === '') return `Please enter ${zipCodeLength} digit zip/postal code`;
                                        if (value.length < zipCodeLength) return `Please must enter ${zipCodeLength} digit zip/postal code`;
                                        return null;
                                    }} />
                                </div>
                            </div>

                            <div>
                                <h1 className='mb-3 text-lg font-bold'>Credit Card Details</h1>
                                <PaymentElement/>
                            </div>
                        </div>

                        <Divider orientation='vertical' className='h-auto' />

                        <div className='w-full md:w-2/5 px-5 py-8 text-[#707070]'>
                            <h1 className='mb-3 text-lg font-bold text-black'>Summary</h1>
                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Urna consectetur pretium ornare tincidunt ipsum orci dolor.</p>

                            <div className='bg-[#F7F7F7] py-4 px-6 my-4 rounded-md'>
                                <p className="mb-2">{planName}</p>
                                <h1 className="text-2xl md:text-4xl text-black">${planPrice}.00</h1>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <p>Prize</p>
                                <p className="text-black">${planPrice}.00</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <p>Tax</p>
                                <p className="text-black">${planTax}.00</p>
                            </div>

                            <Divider className="my-3"/>

                            <div className="flex justify-between items-center mb-4">
                                <p>Total</p>
                                <p className="text-black">${Number(planPrice) + Number(planTax)}.00</p>
                            </div>

                            <Button isLoading={paymentBtnLoader} isDisabled={paymentBtnLoader} type="submit" color="success" className="w-full text-white">{paymentBtnLoader ? 'Please wait...' : 'Make Payment'}</Button>

                            <p className="mt-6 text-sm">Lorem ipsum dolor sit amet consectetur. Urna consectetur pretium ornare tincidunt ipsum orci dolor laoreet.</p>
                        </div>
                    </div>
                </Form>
            )}
        </Fragment>
    )
}

export default function PaymentForm({ planPrice, planTax, planName, planID, onClose }) {
    const [clientSecret, setClientSecret] = useState(null);
    const getClientSecret = async() => {
        try {
            const response = await axios.post('/api/checkout',{ amount: planPrice, currency: 'aud' });
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => { if(planPrice) { getClientSecret(); } },[planPrice])
    const elementOptions = clientSecret ? { clientSecret, appearance: { theme: "stripe" }, layout : 'accordion+' } : null;
    return (
        <Fragment>
            {clientSecret ? (
                <Elements options={elementOptions} stripe={stripePromise}>
                    <PaymentFormExternal
                        clientSecret={clientSecret}
                        planPrice={planPrice}
                        planTax={planTax}
                        planName={planName}
                        planID={planID}
                        onClose={onClose}
                    />
                </Elements>
            ) : (
                <div className="px-5 py-8 flex flex-col items-center justify-center">
                    <span className="text-3xl">Please wait...</span>
                </div>
            )}
        </Fragment>
    );
};