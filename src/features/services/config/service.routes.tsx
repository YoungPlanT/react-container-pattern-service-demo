import type { RouteObject } from "react-router-dom";
import ServiceDetail from "../components/ServiceDetail/ServiceDetail";


const serviceRoutes: RouteObject[] = [
  {
    path: "/services/:slug",
    element: <ServiceDetail />
  }
];

export default serviceRoutes;