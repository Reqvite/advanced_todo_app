import persistStore from 'redux-persist/es/persistStore';
import {Store} from './config';

const store = new Store();

export const persistor = persistStore(store.instance);
export {store};
