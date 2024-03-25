import {
  type configureStore,
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { PersistPartial } from "redux-persist/lib/persistReducer";

import { reducer as todoReducer } from "@/slices/todo";

import { store } from "./store";

type RootReducer = {
  todo: ReturnType<typeof todoReducer> & PersistPartial;
};

type ExtraArguments = {
  // extra arguments if exists
};

type StoreInstance = ReturnType<
  typeof configureStore<
    RootReducer,
    UnknownAction,
    Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
  >
>;

type StorePackage = {
  extraArguments: ExtraArguments;
};

type StoreSchema = typeof store.instance.getState;
type StoreInstanceDispatch = typeof store.instance.dispatch;

export {
  type ExtraArguments,
  type RootReducer,
  type StoreInstance,
  type StoreInstanceDispatch,
  type StorePackage,
  type StoreSchema,
};
