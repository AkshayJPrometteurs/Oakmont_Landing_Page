import React from 'react';
import { Button } from "@heroui/react"

const ButtonComponent = ({ type, color, isLoading, text }) => {
    return (
        <Button
            type={type}
            color={color}
            className='w-full'
            isLoading={isLoading}
        >
            {isLoading ? 'Please wait...' : text}
        </Button>
    )
}

export default ButtonComponent