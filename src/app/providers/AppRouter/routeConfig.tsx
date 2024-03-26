import {RouteProps} from 'react-router-dom';
import {CreateTodoPageAsync, MainPageAsync, UpdateTodoPageAsync} from '@/pages';

export enum AppRoutes {
  MAIN = 'main',
  NOT_FOUND = 'not-found',
  CREATE = 'create-todo',
  UPDATE = 'update-todo'
}

export type AppRoutesProps = RouteProps & {
  needAuth?: boolean;
};

export const getRouteMain = () => '/';
export const getRouteCreateTodo = () => '/todos/new';
export const getRouteUpdateTodo = (id: string) => `/todos/${id}`;

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPageAsync />
  },
  [AppRoutes.CREATE]: {
    path: getRouteCreateTodo(),
    element: <CreateTodoPageAsync />
  },
  [AppRoutes.UPDATE]: {
    path: getRouteUpdateTodo(':id'),
    element: <UpdateTodoPageAsync />
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <MainPageAsync />
  }
};
