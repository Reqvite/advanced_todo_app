import {Button} from '@chakra-ui/button';
import {Icon} from '@chakra-ui/icon';
import {ButtonProps, useColorModeValue, useDisclosure} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {MdDelete} from 'react-icons/md';
import {ConfirmModal} from '../modal/ConfirmModal';

type Props = ButtonProps & {
  onConfirm: () => void;
};

export const DeleteButton = ({onConfirm, isDisabled, ...otherProps}: Props): ReactElement => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const iconColor = useColorModeValue('black', 'white');

  return (
    <>
      <Button variant="error" onClick={onOpen} {...otherProps} size={{lg: 'md', xl: 'md'}}>
        <Icon boxSize={5} as={MdDelete} color={iconColor} />
      </Button>
      {isOpen && <ConfirmModal title="Confirm deleting the task" isOpen={isOpen} onConfirm={onConfirm} onClose={onClose} isDisabled={isDisabled} />}
    </>
  );
};
