import React from 'react';
import TwoStepVerification from '@/components/pages/authentication/TwoStepVerification';

export const metadata = {
    title: "Oakmont Athletic : Forget Password Two Steps Verification",
    description: "Oakmont Athletic Forget Password Two Steps Verification"
};

const page = () => {
    return(
        <TwoStepVerification
            submitURL={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/forgot_pwd_otp_ver`}
            resendURL={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/request-password-reset`}
            afterSubmitRedirect={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/login`}
            pageName={'forgetPassword'}
        />
    )
}

export default page