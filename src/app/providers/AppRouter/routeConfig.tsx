import {RouteProps} from 'react-router-dom';
import {CreateTaskPage, MainPage, UpdateTaskPage} from '@/pages';

export enum AppRoutes {
  MAIN = 'main',
  NOT_FOUND = 'not-found',
  CREATE = 'create-task',
  UPDATE = 'update-task'
}

export type AppRoutesProps = RouteProps & {
  needAuth?: boolean;
};

export const getRouteMain = () => '/';
export const getRouteCreateTask = () => '/tasks/new';
export const getRouteUpdateTask = (id: string) => `/tasks/${id}`;

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />
  },
  [AppRoutes.CREATE]: {
    path: getRouteCreateTask(),
    element: <CreateTaskPage />
  },
  [AppRoutes.UPDATE]: {
    path: getRouteUpdateTask(':id'),
    element: <UpdateTaskPage />
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <MainPage />
  }
};
