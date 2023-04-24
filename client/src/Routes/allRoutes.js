import React from "react";
import { Navigate } from "react-router-dom";

import DashboardCrypto from "../pages/DashboardCrypto";

const authProtectedRoutes = [
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
];

const publicRoutes = [
  // { path: "/index", component: <DashboardEcommerce /> },
  { path: "/", component: <DashboardCrypto /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/" />,
  },
  { path: "*", component: <Navigate to="/" /> },

];

export { authProtectedRoutes, publicRoutes };