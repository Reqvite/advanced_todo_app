import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import { AppRoutesProps, routeConfig } from "./routeConfig";

export const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={null}>
        <main>{route.element}</main>
      </Suspense>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
