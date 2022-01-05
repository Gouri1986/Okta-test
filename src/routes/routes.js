import Login from "../pages/authentication/Login";
import Dashboard from "../pages/encs/dashboard/Dashboard";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Redirect = ({ to }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};

const RequireAuth = ({ children }) => {
  const { user } = useSelector((state) => state.userReducer);
  if (user) {
    return children;
  }

  return <Navigate to='/login' replace />;
};

export const appRoutes = [
  /**
   * Naming Convention = feature/feature-table-name
   */

  {
    path: "/",
    element: <Redirect to='/encs/tech-category-master' />,
  },
  {
    path: "/encs",
    element: <Redirect to='/encs/tech-category-master' />,
  },

  /**
   * Naming Convention = feature_name/feature_landing_page
   */

  {
    path: "/encs/*",
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
];
