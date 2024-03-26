import {Button} from '@chakra-ui/button';
import {Icon} from '@chakra-ui/icon';
import {MdDelete} from 'react-icons/md';

export const DeleteButton = () => {
  return (
    <Button variant={'error'}>
      <Icon boxSize={5} as={MdDelete} />
    </Button>
  );
};
