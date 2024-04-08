import {Switch, SwitchProps, useDisclosure} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {ConfirmModal} from '../modal/ConfirmModal';

type Props = SwitchProps & {
  onConfirm: () => void;
  isChecked?: boolean;
};

export const SwitchButton = ({onConfirm, isDisabled, isChecked, ...otherProps}: Props): ReactElement => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Switch isDisabled={isDisabled} isChecked={isChecked} onChange={onOpen} {...otherProps} />
      {isOpen && <ConfirmModal title="Confirm status update" isOpen={isOpen} onConfirm={onConfirm} onClose={onClose} isDisabled={isDisabled} />}
    </>
  );
};
