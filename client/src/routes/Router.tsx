import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import { AppLayout } from "../components/AppLayout/AppLayout";
import { CollectDataPage } from "../components/pages/CollectData/CollectDataPage";
import { MainPage } from "../components/pages/Main/MainPage";
import { routesList } from "./routesList";

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: routesList.root.main, element: <MainPage /> },
      { path: routesList.collectData.main, element: <CollectDataPage /> },
    ],
  },
];

export const Router: React.FC = () => {
  return useRoutes(routesConfig);
};
