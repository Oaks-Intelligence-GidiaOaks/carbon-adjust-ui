import { createBrowserRouter } from "react-router-dom";
import { _503 } from "@/pages/public";
import { publicRoutes } from "./public.router";
import { homeOwnerRoutes } from "./home-owner.router";
import { merchantRoutes } from "./merchant.router";
import { organisationRoutes } from "./organisation.router";
import { adminRoutes } from "./admin.router";
import { staffRoutes } from "./staff.router";

const Router = createBrowserRouter([
  {
    path: "/", 
    errorElement: <_503/>,
    children: [
      ...publicRoutes,
      ...homeOwnerRoutes,
      ...merchantRoutes,
      ...staffRoutes,
      ...adminRoutes,
      ...organisationRoutes,
    ],
  },
]);

export default Router;
