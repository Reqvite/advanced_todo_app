import {useDispatch} from 'react-redux';

import {StoreInstanceDispatch} from '@/app/providers/StoreProvider/config/types';

const useAppDispatch: () => StoreInstanceDispatch = () => {
  return useDispatch<StoreInstanceDispatch>();
};

export {useAppDispatch};
