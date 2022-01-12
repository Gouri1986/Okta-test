import Login from "../pages/authentication/Login";
import ENCSDashboard from "../pages/metadata/environmentCatelogue/Dashboard";
import IAMDashboard from "../pages/iam/Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RequireAuth } from "./utils";
import HomeDashboard from "../pages/home/Home";

const Redirect = ({ to }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};

export const appRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Redirect to='/environmentcatelogue/' />,
  },
  {
    path: "/iam/*",
    element: (
      <RequireAuth>
        <IAMDashboard />
      </RequireAuth>
    ),
  },

  {
    path: "/environmentcatelogue/*",
    element: (
      <RequireAuth>
        <ENCSDashboard />
      </RequireAuth>
    ),
  },
];
