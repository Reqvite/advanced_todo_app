import {ReactElement, ReactNode} from 'react';
import {Provider} from 'react-redux';
import {store} from '../config/store';

type Props = {
  children: ReactNode;
};

export const StoreProvider = (props: Props): ReactElement => {
  const {children} = props;

  return <Provider store={store.instance}>{children}</Provider>;
};
