import {IconButton} from '@chakra-ui/button';
import {ReactElement} from 'react';
import {IoReturnDownBack} from 'react-icons/io5';
import {useNavigate} from 'react-router-dom';

export const BackButton = (): ReactElement => {
  const navigate = useNavigate();
  return <IconButton my={2} variant="secondary" aria-label="back" icon={<IoReturnDownBack />} onClick={() => navigate(-1)} />;
};
