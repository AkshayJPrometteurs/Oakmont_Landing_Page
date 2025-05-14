"use client";
import React, {useEffect, useState} from 'react';
import {Alert, Button, Checkbox, DatePicker, Divider, Form, Input, useDisclosure} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import PasswordWithIcon from '@/components/utils/forms/PasswordWithIcon';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import Axios from '@/components/utils/Axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import GuestLayout from '@/layouts/GuestLayout';
import Image from 'next/image';
import MarketingEmoji from '../../../../public/assets/images/emoji/Marketing.png';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import moment from "moment";
import Modals from "@/components/utils/Modals";
import { FaInfoCircle } from "react-icons/fa";

const SignUp = () => {
	const router = useRouter();

	const [formValues, setFormValues] = useState({
		first_name: '', last_name: '', contact_number: '', password:''
	});
	const [isFormNext, setIsFormNext] = useState(false);
	const [isApiErrors, setIsApiErrors] = useState('');
	const [isApiLoader, setIsApiLoader] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [isValidTermsAndConditions, setIsValidTermsAndConditions] = useState(false);
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const [activeTermsAndCondition, setActiveTermsAndCondition] = useState("");
	const [acceptedTermsAndConditionID, setAcceptedTermsAndConditionID] = useState("");

	const formatOnlyNumber = (value) => { return value.replace(/\D/g, ""); }
	const formatOnlyAlphabetsAndSpace = (value) => { return value.replace(/[^a-zA-Z\s]/g, ""); };

	const handleChange = (e) => {
		const { name, value } = e.target;
		let formattedValue = value;
		(name === 'first_name' || name === 'last_name') && (formattedValue = formatOnlyAlphabetsAndSpace(value));
		(name === 'contact_number') && (formattedValue = formatOnlyNumber(value));
		setFormValues({ ...formValues, [name]: formattedValue });
	}

	const onSubmit = async(e) => {
		e.preventDefault();
		const formData = Object.fromEntries(new FormData(e.currentTarget));

		if(formData.terms_and_condition === ''){
			setIsFormNext(true);
		}else{
            setIsValidTermsAndConditions(true);
        }

		const allFilled = Object.entries(formData).every(([key, value]) => {
            console.log(key, value)
			if (key === 'affiliate_referral_code' || key === 'terms_and_condition') return true;
			return value.trim() !== '';
		});

        console.log(allFilled)

		if (allFilled) {
			setIsApiLoader(true);
			try {
				const { data } = await Axios.post('/users/register',{
					...formData,
                    dob: moment(formData.dob).format('YYYY-MM-DD'),
                    user_type: 2,
                    membership_type: 'free',
                    accepted_terms_id : acceptedTermsAndConditionID
				});

				if(data?.success && data?.status_code === 200){
					setIsVisible(false);

					Cookies.set('_om_pr',
						CryptoJS.AES.encrypt(JSON.stringify({
							id : data?.data?.user?.id, email : formData?.email
						}), "OakMontParams").toString(),{
							expires: 1, secure: true
						}
					);

					router.push(`/signup/two-step-verification`);
					toast(
						<Alert
							color='success'
							title={data?.message}
							description="Verification code sent on your email-id"
						/>, {closeButton:false}
					);
				}
			} catch ({response}) {
				setIsApiErrors(response?.data?.message);
				setIsVisible(true);
			} finally {
				setIsApiLoader(false);
			}
		}
	};

	const getActiveTermsAndCondition = async() => {
		try {
			const { data } = await Axios.get('/terms_and_conditions/user/terms-and-conditions');
            setAcceptedTermsAndConditionID(data?.data?.id);
			setActiveTermsAndCondition(data?.data?.content);
		} catch (error) { console.log(error); }
	}

	useEffect(() => { getActiveTermsAndCondition(); }, []);

	return (
		(<GuestLayout
			header="Welcome to Oakmont Athletic!"
			headerIcon={<Image src={MarketingEmoji} height={5} width={25} alt='emoji'/>}
			headerPara={"Please sign-up to your account and start the adventure"}
			alertVisibility = {{ description : isApiErrors, type : 'danger', visible : isVisible }}
		>
			<Form validationBehavior="native" onSubmit={onSubmit}>
				<div className={`w-full ${isFormNext ? 'hidden' : ''}`}>
					<h1 className='font-bold text-gray-600 mb-4'>Personal Information</h1>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
						<Input
							label="First Name"
							type="text"
							name="first_name"
							isRequired
							errorMessage="Please enter your first name"
							placeholder="e.g Sam"
							value={formValues.first_name}
							onChange={handleChange}
							autoComplete="off"
						/>
						<Input
							label="Last Name"
							type="text"
							name="last_name"
							isRequired
							errorMessage="Please enter your last name"
							placeholder="e.g Morgan"
							value={formValues.last_name}
							onChange={handleChange}
							autoComplete="off"
						/>
					</div>

					<Input
						label="Email"
						type="email"
						name="email"
						className='mb-3'
						isRequired
						placeholder="e.g sam@example.com"
						autoComplete="off"
						validate={(value) => {
							if (value === '') return "Please enter your email";
							const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,}$/i;
							if (!emailRegex.test(value)) return "Invalid email address";
							return null;
						}}
					/>

					<DatePicker
						label="Date of birth"
						name="dob"
						className="mb-2.5"
						isRequired
						maxValue={today(getLocalTimeZone())}
						errorMessage={(value) => {
							return value.isInvalid && !value.validationDetails.customError ?
								"Please enter your date of birth" :
								value.validationErrors[0];
						}}
						validate={(value) => {
							const selectedDate = moment(value).toDate();
							const minValidDate = moment(today(getLocalTimeZone())).subtract(18, 'years').toDate();
							return selectedDate > minValidDate ? "You must be at least 18 years old." : null;
						}}
					/>

					<Input
						label="Contact Number"
						type="text"
						name="contact_number"
						className='mb-2'
						isRequired
						errorMessage="Please enter your contact no."
						placeholder="e.g 7865646656"
						value={formValues.contact_number}
						onChange={handleChange}
						autoComplete="off"
						maxLength={10}
					/>
				</div>
				<div className={`w-full ${isFormNext ? '' : 'hidden'}`}>
					<h1 className='font-bold text-gray-600 mb-4'>User Information</h1>

					<Input
						label="Create Username"
						type="text"
						name="username"
						className='mb-3'
						isRequired={isFormNext}
						errorMessage="Please create your username"
						placeholder="e.g sam1234"
						autoComplete="off"
					/>

					<PasswordWithIcon
						className={'mb-3'}
						name='password'
						isRequired={isFormNext}
						onChange={handleChange}
						label="Password"
						validate={(value) => {
							if(isFormNext && value === '') return "Please enter and create your password";
							if(isFormNext && value.length < 6) return "Password must be 6 characters or more.";
							if(isFormNext && (value.match(/[A-Z]/g) || []).length < 1) return "Password must include at least 1 upper case letter";
							if(isFormNext && (value.match(/[^a-z]/gi) || []).length < 1) return "Password must include at least 1 symbol.";
						}}
					/>

					<PasswordWithIcon
						className={'mb-3'}
						isRequired={isFormNext}
						onChange={handleChange}
						label="Confirm Password"
						validate={(value) => {
							if(isFormNext && value === '') return "Please enter your confirm password";
							if(isFormNext && value !== formValues.password) return "Password and confirm password does not match";
						}}
					/>

					<Input
						label="Paste Affilate Code"
						type="text"
						name="affiliate_referral_code"
						className='mb-4'
						autoComplete="off"
					/>
				</div>

				<div className="flex items-center gap-3 mb-1">
					<Checkbox
						isInvalid={isValidTermsAndConditions}
						className='text-sm'
						name='terms_and_condition'
						onChange={(e) => setIsValidTermsAndConditions(!e.target.checked)}
					>Agree to terms and conditions</Checkbox>
					<FaInfoCircle className="text-lg cursor-pointer" onClick={onOpen}/>
				</div>

				<Button type="submit" color='primary' className='w-full' isLoading={isFormNext && isApiLoader}>
					{isFormNext ? isApiLoader ? 'Please wait...' : 'Verify' : 'Next'}
				</Button>
			</Form>
			<div className='mt-3 flex justify-center items-center gap-2'>
				<IoIosArrowBack className='text-primaryColor'/>
				<Link href="/login" className='text-primaryColor'>Back to login</Link>
			</div>
			<Modals
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				modalSize='4xl'
				modalHeader='Terms and Conditions'
				modalHeaderClass="border-b border-gray-200"
				hideCloseButton={false}
				modalBodyClass="p-3"
			>
				<div className="h-[32rem] overflow-y-auto" dangerouslySetInnerHTML={{ __html: activeTermsAndCondition }}></div>
			</Modals>
		</GuestLayout>)
	);
}

export default SignUp