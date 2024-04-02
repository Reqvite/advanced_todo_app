import {type configureStore, type ThunkMiddleware, type Tuple, type UnknownAction} from '@reduxjs/toolkit';
import {tasksApi} from '@/slices/task/task.rtk';
import {store} from './store';

type RootReducer = {
  [tasksApi.reducerPath]: ReturnType<typeof tasksApi.reducer>;
};

type ExtraArguments = {
  // extra arguments if exists
};

type StoreInstance = ReturnType<
  typeof configureStore<RootReducer, UnknownAction, Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>>
>;

type StorePackage = {
  extraArguments: ExtraArguments;
};

type StoreSchema = typeof store.instance.getState;
type StoreInstanceDispatch = typeof store.instance.dispatch;

export {type ExtraArguments, type RootReducer, type StoreInstance, type StoreInstanceDispatch, type StorePackage, type StoreSchema};
