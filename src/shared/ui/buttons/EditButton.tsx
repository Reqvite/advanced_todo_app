import {Button} from '@chakra-ui/button';
import {Icon} from '@chakra-ui/icon';
import {ButtonProps} from '@chakra-ui/react';
import {CiEdit} from 'react-icons/ci';
import {NavLink} from 'react-router-dom';
import {getRouteUpdateTodo} from '@/app/providers/AppRouter/routeConfig';

type Props = ButtonProps & {
  id: string;
};

export const EditButton = (props: Props) => {
  const {id, ...otherProps} = props;

  console.log(getRouteUpdateTodo(id));
  return (
    <Button as={NavLink} variant={'secondary'} to={getRouteUpdateTodo(id)} {...otherProps}>
      <Icon boxSize={6} as={CiEdit} />
    </Button>
  );
};
