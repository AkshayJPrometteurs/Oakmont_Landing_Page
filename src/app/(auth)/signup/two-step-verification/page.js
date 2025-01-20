import React from 'react';
import TwoStepVerification from '@/components/pages/authentication/TwoStepVerification';

export const metadata = {
    title: "Oakmont Athletic : Sign Up Two Steps Verification",
    description: "Oakmont Athletic Sign Up Two Steps Verification"
};

const page = () => {
    return(
        <TwoStepVerification
            submitURL={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/verify-signup-code`}
            resendURL={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/resend-signup-code`}
            afterSubmitRedirect={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/login`}
            pageName={'signup'}
        />
    )
}

export default page