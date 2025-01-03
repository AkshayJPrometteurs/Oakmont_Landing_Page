import React, { useState } from 'react';
import { Input } from '@nextui-org/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const PasswordWithIcon = ({className,name,onChange,label,errorMessage,isRequired,validate}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return <Input classNames={{ innerWrapper : 'group-data-[has-label=true]:items-center', input : 'mt-5' }} className={className} name={name} isRequired={isRequired} onChange={onChange} endContent={
            <button className="focus:outline-none" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} >
                {isPasswordVisible ? ( <FaEyeSlash className="text-xl pointer-events-none" /> ) : ( <FaEye className="text-xl pointer-events-none" /> )}
            </button>
        }
        label={label} type={isPasswordVisible ? "text" : "password"}
        errorMessage={errorMessage}
        validate={validate}
    />
}

export default PasswordWithIcon