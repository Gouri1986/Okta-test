import Login from "../pages/authentication/Login";
import ENCSDashboard from "../pages/metadata/environmentCatelogue/Dashboard";
import IAMDashboard from "../pages/iam/Dashboard";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { RequireAuth } from "./utils";

const Redirect = ({ to }) => {
  let history = useHistory();
  useEffect(() => {
    history.push(to);
  });
  return null;
};

export const appRoutes = [
  {
    path: "/login",
    Element: <Login />,
  },
  {
    path: "/",
    Element: <Redirect to='/environmentcatelogue/' />,
  },
  {
    path: "/iam/*",
    Element: (
      <RequireAuth>
        <IAMDashboard />
      </RequireAuth>
    ),
  },

  {
    path: "/environmentcatelogue/:subpath",
    Element: <h1>Helllo</h1>,
  },
];
