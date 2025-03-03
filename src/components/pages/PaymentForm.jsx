"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {Alert, Button, Divider, Form, Input, Select, SelectItem} from "@heroui/react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({planName, planPrice, contents, countryLoader}) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const [planTax, setPlanTax] = useState(0);
    const [zipCodeLength, setZipCodeLength] = useState(6);
    const [zipCodePlaceholder, setZipCodePlaceholder] = useState("e.g 123456");
    const [clientSecret, setClientSecret] = useState("");

    const [formValues ,setFormValues] = useState({
        email: '', country: '', zipcode: '', fullname: '', creditcard: '', expiration: '', cvv:''
    });

    const formatOnlyNumber = (value) => { return value.replace(/\D/g, ""); }
    const formatOnlyAlphabetsAndSpace = (value) => { return value.replace(/[^a-zA-Z\s]/g, ""); };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        name === 'creditcard' && (formattedValue = formatOnlyNumber(value).replace(/(.{4})/g, "$1 ").trim());
        (name === 'zipcode' || name === 'cvv') && (formattedValue = formatOnlyNumber(value));
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

        if (name === 'expiration') {
            const sanitizedValue = formatOnlyNumber(e.target.value);
            if (sanitizedValue.length <= 2) { formattedValue = sanitizedValue;
            } else {
                const month = sanitizedValue.substring(0, 2);
                const year = sanitizedValue.substring(2, 6);
                formattedValue = `${month}/${year}`;
            }
        }
        setFormValues({...formValues,[name]: formattedValue});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formSubmitValues = { ...formValues, planName, planPrice };
        setLoading(true);
        setError(null);
        setMessage("");

        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 8500, currency: "usd" }), // Example amount ($10.00)
        });

        const data = await response.json();
        if (!response.ok) {
            setError(data.error);
            setLoading(false);
            return;
        }

        const { clientSecret } = data;
        setClientSecret(clientSecret);

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: elements.getElement(CardElement) },
        });

        if (error) {
            setError(error.message);
        } else if (paymentIntent.status === "succeeded") {
            setMessage("Payment successful!");
        }

        setLoading(false);
    };

    return (
        <Form validationBehavior="native" onSubmit={onSubmit}>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-3/5 px-5 py-8'>
                    <div className="mb-3">
                        {error && <Alert color="danger" title={error} />}
                        {message && <Alert color="success" title={message}/>}
                    </div>
                    <div className="mb-4">
                        <h1 className='mb-3 text-lg font-bold'>Billing Details</h1>

                        <Input label="Email" type="email" name="email" className='mb-3' isRequired placeholder="e.g sam@example.com" onChange={handleChange} value={formValues.email} autoComplete="off" validate={(value) => {
                            if (value === '') return "Please enter your email";
                            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                            if (!emailRegex.test(value)) return "Invalid email address";
                            return null;
                        }}/>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <Select isLoading={countryLoader} label="Billing Country" name="country" onChange={handleChange} value={formValues.country} isRequired errorMessage="Please choose country" placeholder="e.g. US">
                                {contents?.map(({name}) => <SelectItem key={name}>{name}</SelectItem> )}
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
                        <CardElement className="p-2 border rounded-md" />
                    </div>
                </div>

                <Divider orientation='vertical' className='h-auto' />

                <div className='w-full md:w-2/5 px-5 py-8 text-[#707070]'>
                    <h1 className='mb-3 text-lg font-bold text-black'>Summary</h1>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Urna consectetur pretium ornare tincidunt ipsum orci dolor.</p>

                    <div className='bg-[#F7F7F7] py-4 px-6 my-4 rounded-md'>
                        {/* <p className="mb-2">{planName}</p> */}
                        <p className="mb-2">Lorem ipsum dolor sit amet</p>
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
                        <p className="text-black">${planPrice + planTax}.00</p>
                    </div>

                    <Button type="submit" disabled={!stripe || loading} color="success" className="w-full text-white">{loading ? "Processing..." : "Make Payment"}</Button>

                    <p className="mt-6 text-sm">Lorem ipsum dolor sit amet consectetur. Urna consectetur pretium ornare tincidunt ipsum orci dolor laoreet.</p>
                </div>
            </div>
        </Form>
    );
}

export default function PaymentPage({planName, planPrice, contents, loading}) {
    return (
        <Elements options={{ layout: "accordion" }} stripe={stripePromise}>
            <CheckoutForm planName={planName} planPrice={planPrice} contents={contents} countryLoader={loading}/>
        </Elements>
    );
}