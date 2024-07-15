import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import { AppLayout } from "../components/AppLayout/AppLayout";
import { routesList } from "./routesList";

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: routesList.root.main, element: <div>Home</div> }],
  },
];

export const Router: React.FC = () => {
  return useRoutes(routesConfig);
};
