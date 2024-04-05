import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

export const Alert = () => {
  return <ToastContainer autoClose={2000} position="top-center" theme="dark" />;
};
