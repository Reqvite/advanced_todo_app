import {Button, Flex, Icon, Text} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {IoAdd} from 'react-icons/io5';
import {NavLink} from 'react-router-dom';
import {BlurBox} from '@/shared/ui';

export const Navbar = (): ReactElement => {
  return (
    <BlurBox as={'header'} position="fixed" w="100%" padding={3} zIndex={'navbar'}>
      <Flex gap={5} justifyContent={'space-between'} alignItems={'center'}>
        <Text>Logo</Text>
        <Button as={NavLink} variant={'primary'}>
          <Icon boxSize={8} as={IoAdd} /> Add new Todo
        </Button>
      </Flex>
    </BlurBox>
  );
};
