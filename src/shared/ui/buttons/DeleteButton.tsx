import {Button} from '@chakra-ui/button';
import {Icon} from '@chakra-ui/icon';
import {ButtonProps} from '@chakra-ui/react';
import {MdDelete} from 'react-icons/md';

type Props = ButtonProps;

export const DeleteButton = (props: Props) => {
  const {...otherProps} = props;
  return (
    <Button variant={'error'} {...otherProps}>
      <Icon boxSize={5} as={MdDelete} />
    </Button>
  );
};
