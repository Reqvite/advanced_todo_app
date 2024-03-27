import {Button, Flex, Icon} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {IoIosCreate} from 'react-icons/io';
import {NavLink} from 'react-router-dom';
import {getRouteCreateTask} from '@/app/providers/AppRouter/routeConfig';
import {BlurBox} from '@/shared/ui';

export const Navbar = (): ReactElement => {
  return (
    <BlurBox as="header" position="fixed" w="100%" padding={3} zIndex="navbar">
      <Flex gap={5} justifyContent="space-between" alignItems="center">
        <NavLink to={'/'}>Logo</NavLink>
        <Button as={NavLink} to={getRouteCreateTask()} variant={'primary'}>
          <Icon boxSize={5} as={IoIosCreate} /> Add new task
        </Button>
      </Flex>
    </BlurBox>
  );
};
