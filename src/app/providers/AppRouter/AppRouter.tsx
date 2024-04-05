import {Container} from '@chakra-ui/layout';
import {Suspense, useCallback} from 'react';
import {Route, Routes, useMatch} from 'react-router-dom';
import {BackButton} from '@/shared/ui';
import {AppRoutesProps, getRouteMain, routeConfig} from './routeConfig';

export const AppRouter = () => {
  const isMatchMainPath = useMatch(getRouteMain());
  const renderWithWrapper = useCallback(
    (route: AppRoutesProps) => {
      const element = (
        <Suspense fallback={null}>
          <Container as="main" maxW="1240px" paddingTop="var(--chakra-sizes-headerHeight)">
            {!isMatchMainPath && <BackButton />}
            {route.element}
          </Container>
        </Suspense>
      );

      return <Route key={route.path} path={route.path} element={element} />;
    },
    [isMatchMainPath]
  );

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
