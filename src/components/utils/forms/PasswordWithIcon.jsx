import React, { useState } from 'react';
import { Input } from "@heroui/react";
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const PasswordWithIcon = ({
    className, name, onChange, label, errorMessage, isRequired, validate, value
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
        <Input
            value={value}
            classNames={{ innerWrapper : 'group-data-[has-label=true]:items-center', input : 'mt-5' }} className={className}
            name={name}
            isRequired={isRequired}
            onChange={onChange}
            endContent={
                <button className="focus:outline-none" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} >
                    {isPasswordVisible ? (
                        <RiEyeOffLine className="text-xl pointer-events-none" />
                    ) : (
                        <RiEyeLine className="text-xl pointer-events-none" />
                    )}
                </button>
            }
            label={label} type={isPasswordVisible ? "text" : "password"}
            errorMessage={errorMessage}
            validate={validate}
        />
    )
}

export default PasswordWithIcon