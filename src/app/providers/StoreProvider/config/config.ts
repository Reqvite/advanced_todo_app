import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import { reducer as todoReducer } from "@/slices/todo";

import { ExtraArguments, RootReducer, StoreInstance, StorePackage } from "./types";

const todoPersistConfig = {
  key: "todo",
  storage,
  blacklist: [],
};

class Store implements StorePackage {
  #instance: StoreInstance;

  public get instance(): StoreInstance {
    return this.#instance;
  }

  public constructor() {
    const rootReducer: ReducersMapObject<RootReducer> = {
      todo: persistReducer(todoPersistConfig, todoReducer),
    };
    this.#instance = configureStore({
      reducer: rootReducer,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      // extra arguments if exists
    };
  }
}

export { Store };
