import {Button} from '@chakra-ui/button';
import {Icon} from '@chakra-ui/icon';
import {ButtonProps, useColorModeValue} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {MdDelete} from 'react-icons/md';

type Props = ButtonProps;

export const DeleteButton = ({...otherProps}: Props): ReactElement => {
  const iconColor = useColorModeValue('black', 'white');

  return (
    <Button variant="error" {...otherProps} size={{lg: 'md', xl: 'md'}}>
      <Icon boxSize={5} as={MdDelete} color={iconColor} />
    </Button>
  );
};
