import {ReactElement, ReactNode} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '../config/store';

type Props = {
  children: ReactNode;
};

export const StoreProvider = (props: Props): ReactElement => {
  const {children} = props;

  return (
    <Provider store={store.instance}>
      <PersistGate loading={undefined} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
