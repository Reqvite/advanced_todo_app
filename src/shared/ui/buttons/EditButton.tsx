import {Button} from '@chakra-ui/button';
import {Icon} from '@chakra-ui/icon';
import {ButtonProps} from '@chakra-ui/react';
import {ReactElement} from 'react';
import {CiEdit} from 'react-icons/ci';
import {NavLink} from 'react-router-dom';
import {getRouteUpdateTask} from '@/app/providers/AppRouter/routeConfig';

type Props = ButtonProps & {
  id: string;
};

export const EditButton = (props: Props): ReactElement => {
  const {id, ...otherProps} = props;

  return (
    <Button as={NavLink} variant="secondary" to={getRouteUpdateTask(id)} {...otherProps}>
      <Icon boxSize={6} as={CiEdit} />
    </Button>
  );
};
