import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import { AppLayout } from "../components/AppLayout/AppLayout";
import { CollectDataPage } from "../components/pages/CollectData/CollectDataPage";
import { DashboardPage } from "../components/pages/Dashboard/DashboardPage";
import { routesList } from "./routesList";

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: routesList.root.main, element: <CollectDataPage /> },
      { path: routesList.dashboard.main, element: <DashboardPage /> },
    ],
  },
];

export const Router: React.FC = () => {
  return useRoutes(routesConfig);
};
