import {lazy} from 'react';

export const MainPageAsync = lazy(() => import('@/pages/MainPage/MainPage'));
export const CreateTodoPageAsync = lazy(() => import('@/pages/CreateTodoPage/CreateTodoPage'));
export const UpdateTodoPageAsync = lazy(() => import('@/pages/UpdateTodoPage/UpdateTodoPage'));
export {ErrorPage} from './ErrorPage/ErrorPage';
