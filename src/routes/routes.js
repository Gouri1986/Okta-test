import Login from "../pages/authentication/Login";
import Dashboard from "../pages/encs/dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Redirect = ({ to }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};

export const appRoutes = [
  /**
   * Naming Convention = feature/feature-table-name
   */

  {
    path: "/",
    element: <Redirect to='/encs/tech-master' />,
  },
  {
    path: "/encs",
    element: <Redirect to='/encs/tech-master' />,
  },

  /**
   * Naming Convention = feature_name/feature_landing_page
   */

  {
    path: "/encs/*",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
