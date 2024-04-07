import 'react-toastify/dist/ReactToastify.css';
import {useColorMode} from '@chakra-ui/system';
import {ReactElement} from 'react';
import {ToastContainer} from 'react-toastify';

export const Alert = (): ReactElement => {
  const theme = useColorMode();

  return <ToastContainer autoClose={2000} position="top-center" theme={theme.colorMode} />;
};
