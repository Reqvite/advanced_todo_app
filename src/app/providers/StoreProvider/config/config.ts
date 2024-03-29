import {configureStore, ReducersMapObject} from '@reduxjs/toolkit';
import {rtkApi} from '@/shared/api';
import {ExtraArguments, RootReducer, StoreInstance, StorePackage} from './types';

class Store implements StorePackage {
  #instance: StoreInstance;

  public get instance(): StoreInstance {
    return this.#instance;
  }

  public constructor() {
    const rootReducer: ReducersMapObject<RootReducer> = {
      [rtkApi.reducerPath]: rtkApi.reducer
    };
    this.#instance = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(rtkApi.middleware)
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      // extra arguments if exists
    };
  }
}

export {Store};
