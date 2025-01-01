import React from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/react";

const Modals = ({modalSize,modalHeader,children,modalFooter,isOpen,onOpenChange,classes,modalHeaderClass,modalBodyClass,modalFooterClass, scrollBehavior}) => {
    return (
        <Modal backdrop='blur' isOpen={isOpen} size={modalSize} onOpenChange={onOpenChange} placement='center' scrollBehavior={scrollBehavior} className={classes}>
            <ModalContent>
                {(onClose) => (
                    <ModalBody className='p-0'>
                        {modalHeader && <ModalHeader className={modalHeaderClass}>{modalHeader}</ModalHeader>}
                        <ModalBody className={modalBodyClass}>{children}</ModalBody>
                        {modalFooter && <ModalFooter className={modalFooterClass}>{modalFooter}</ModalFooter>}
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    )
}

export default Modals