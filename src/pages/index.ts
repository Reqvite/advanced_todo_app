import {lazy} from 'react';

export const MainPage = lazy(() => import('@/pages/MainPage/MainPage'));
export const CreateTaskPage = lazy(() => import('@/pages/CreateTaskPage/CreateTaskPage'));
export const UpdateTaskPage = lazy(() => import('@/pages/UpdateTaskPage/UpdateTaskPage'));
export {ErrorPage} from './ErrorPage/ErrorPage';
