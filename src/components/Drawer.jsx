import React, { Fragment } from 'react';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@nextui-org/react';

const DrawerModule = ({isOpen,onOpenChange,placement,size,className,classNames,header,footer,headerClassName,bodyClassName,footerClassName,children}) => {
    return (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement={placement} size={size} className={className} classNames={{ classNames }}>
            <DrawerContent>
                {(onClose) => (
                    <Fragment>
                        {header && <DrawerHeader className={headerClassName}>{header}</DrawerHeader>}
                        <DrawerBody className={bodyClassName}>{children}</DrawerBody>
                        {footer && <DrawerFooter className={footerClassName}>{footer}</DrawerFooter>}
                    </Fragment>
                )}
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerModule