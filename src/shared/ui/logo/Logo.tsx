import {Image} from '@chakra-ui/react';
import {NavLink} from 'react-router-dom';
import {getRouteMain} from '@/app/providers/AppRouter/routeConfig';
import logo from '../../../../public/logoFull.jpg';

export const Logo = () => {
  return (
    <NavLink to={getRouteMain()}>
      <Image src={logo} w="100px" h="45px" />
    </NavLink>
  );
};
