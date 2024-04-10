import {Switch, SwitchProps, useDisclosure, useMediaQuery} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {MEDIA_QUERY} from '@/shared/const';
import {ConfirmModal} from '../modal/ConfirmModal';

type Props = SwitchProps & {
  onConfirm: () => void;
  isChecked?: boolean;
};

export const SwitchButton = ({onConfirm, isDisabled, isChecked, ...otherProps}: Props): ReactElement => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isLargerThan900] = useMediaQuery(MEDIA_QUERY.MIN_WIDTH_TABLET, {
    ssr: false
  });
  const buttonSize = isLargerThan900 ? 'md' : 'sm';

  return (
    <>
      <Switch size={buttonSize} isDisabled={isDisabled} isChecked={isChecked} onChange={onOpen} {...otherProps} />
      {isOpen && <ConfirmModal title="Confirm status update" isOpen={isOpen} onConfirm={onConfirm} onClose={onClose} isDisabled={isDisabled} />}
    </>
  );
};
