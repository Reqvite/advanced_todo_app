import {Button, Flex, Icon} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {IoIosCreate} from 'react-icons/io';
import {NavLink} from 'react-router-dom';
import {getRouteCreateTodo} from '@/app/providers/AppRouter/routeConfig';
import {BlurBox} from '@/shared/ui';

export const Navbar = (): ReactElement => {
  return (
    <BlurBox as={'header'} position="fixed" w="100%" padding={3} zIndex={'navbar'}>
      <Flex gap={5} justifyContent={'space-between'} alignItems={'center'}>
        <NavLink to={'/'}>Logo</NavLink>
        <Button as={NavLink} to={getRouteCreateTodo()} variant={'primary'}>
          <Icon boxSize={5} as={IoIosCreate} /> Add new todo
        </Button>
      </Flex>
    </BlurBox>
  );
};
