import React from 'react';
import TwoStepVerification from '@/pages/authentication/TwoStepVerification';

export const metadata = {
    title: "Oakmont Athletic : Login Two Steps Verification",
    description: "Oakmont Athletic Login Two Steps Verification"
};

const page = () => {
    return(
        <TwoStepVerification
            submitURL={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/verify-login`}
            resendURL={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/resend-login-otp`}
            afterSubmitRedirect={process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}
            pageName={'login'}
        />
    )
}

export default page