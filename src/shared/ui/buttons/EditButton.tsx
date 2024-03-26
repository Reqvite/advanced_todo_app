import {Button} from '@chakra-ui/button';
import {Icon} from '@chakra-ui/icon';
import {CiEdit} from 'react-icons/ci';

export const EditButton = () => {
  return (
    <Button variant={'secondary'}>
      <Icon boxSize={6} as={CiEdit} />
    </Button>
  );
};
