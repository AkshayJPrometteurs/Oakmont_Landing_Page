import React from 'react';
import { Alert } from "@heroui/react";

const AlertComponent = ({ type, variant, onClose, title, description, isVisible }) => {
    return(
        <Alert
            classNames={{ base:'items-center py-2 px-2.5 mb-4', mainWrapper:'min-h-[auto!important]', closeButton:'translate-y-0', description:'text-sm' }}
            title={title}
            color={type}
            description={description}
            isVisible={isVisible}
            variant={variant}
            onClose={onClose}
        />
    )
}

export default AlertComponent