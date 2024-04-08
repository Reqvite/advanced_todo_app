import {Button} from '@chakra-ui/button';
import {Modal as ChakraModal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from '@chakra-ui/modal';
import {ReactElement, ReactNode, useState} from 'react';

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
  const [isLoading, setLoading] = useState(false);

  const handleConfirmAction = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title || 'Confirm your action'}</ModalHeader>
        <ModalCloseButton disabled={isLoading} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="secondary" mr={3} onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button isDisabled={isDisabled || isLoading} variant="primary" onClick={handleConfirmAction} isLoading={isLoading}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
