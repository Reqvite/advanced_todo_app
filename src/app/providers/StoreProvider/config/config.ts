import {configureStore, ReducersMapObject} from '@reduxjs/toolkit';
import {tasksApi} from '@/slices/task/task.rtk';
import {ExtraArguments, RootReducer, StoreInstance, StorePackage} from './types';

class Store implements StorePackage {
  #instance: StoreInstance;

  public get instance(): StoreInstance {
    return this.#instance;
  }

  public constructor() {
    const rootReducer: ReducersMapObject<RootReducer> = {
      [tasksApi.reducerPath]: tasksApi.reducer
    };
    this.#instance = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(tasksApi.middleware)
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      // extra arguments if exists
    };
  }
}

export {Store};
