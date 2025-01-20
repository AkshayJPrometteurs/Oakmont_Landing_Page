import React, { Fragment } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@heroui/react";

const Modals = ({
    modalSize,modalHeader,children,modalFooter,isOpen,onOpenChange,classes,modalHeaderClass,modalBodyClass,modalFooterClass, scrollBehavior,hideCloseButton,isDismissable
}) => {
    return (
        <Modal
            backdrop='blur'
            isOpen={isOpen}
            size={modalSize}
            onOpenChange={onOpenChange}
            placement='center'
            scrollBehavior={scrollBehavior}
            className={classes}
            hideCloseButton={hideCloseButton}
            isDismissable={isDismissable}
        >
            <ModalContent>
                {(onClose) => (
                    <Fragment>
                        {modalHeader && <ModalHeader className={modalHeaderClass}>{modalHeader}</ModalHeader>}
                        <ModalBody className={modalBodyClass}>{children}</ModalBody>
                        {modalFooter && <ModalFooter className={modalFooterClass}>{modalFooter}</ModalFooter>}
                    </Fragment>
                )}
            </ModalContent>
        </Modal>
    )
}

export default Modals