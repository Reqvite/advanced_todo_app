import {Button} from '@chakra-ui/button';
import {Modal as ChakraModal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from '@chakra-ui/modal';
import {ReactElement, ReactNode} from 'react';

interface Props {
  isDisabled?: boolean;
  isOpen: boolean;
  children?: ReactNode;
  title?: string;
  modalFooter?: ReactNode;
  onConfirm: () => void;
  onClose: () => void;
  onOpen?: () => void;
}

export const ConfirmModal = ({children, isDisabled, isOpen, title, onClose, onConfirm}: Props): ReactElement => {
  const onConfirmAction = () => {
    onConfirm();
    onClose();
  };
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBody>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title ? title : 'Confirm your action'}</ModalHeader>
          <ModalCloseButton />
          {children && <ModalBody>{children}</ModalBody>}
          <ModalFooter>
            <Button variant="secondary" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button isDisabled={isDisabled} variant="primary" onClick={onConfirmAction}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </ChakraModal>
  );
};
