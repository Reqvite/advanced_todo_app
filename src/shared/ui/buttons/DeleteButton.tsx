import {Button} from '@chakra-ui/button';
import {Icon} from '@chakra-ui/icon';
import {ButtonProps} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {MdDelete} from 'react-icons/md';

type Props = ButtonProps;

export const DeleteButton = ({...otherProps}: Props): ReactElement => {
  return (
    <Button variant={'error'} {...otherProps}>
      <Icon boxSize={5} as={MdDelete} />
    </Button>
  );
};
