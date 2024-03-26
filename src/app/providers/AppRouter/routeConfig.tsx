import {RouteProps} from 'react-router-dom';
import {MainPageAsync} from '@/pages';

export enum AppRoutes {
  MAIN = 'main',
  NOT_FOUND = 'not-found'
}

export type AppRoutesProps = RouteProps & {
  needAuth?: boolean;
};

export const getRouteMain = () => '/';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPageAsync />,
    needAuth: true
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <MainPageAsync />
  }
};
