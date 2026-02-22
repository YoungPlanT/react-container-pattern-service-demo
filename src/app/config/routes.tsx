import type { RouteObject } from "react-router-dom";
import serviceRoutes from "../../features/services/config/service.routes";
import MainLayout from "../layout/MainLayout";
import HomePage from "../../pages/HomePage/HomePage";

const createAppRoutes = (): RouteObject[] => {
  const appRoutes: RouteObject[] = [
    {
      element: <MainLayout />,
      children: [
        {index: true, element: <HomePage />},

        ...serviceRoutes,

        // {path: '*', element: <NotFoundPage />}
      ]
    }
  ];

  return appRoutes;
};

export default createAppRoutes;