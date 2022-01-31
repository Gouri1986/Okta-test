import { Route, Switch } from "react-router-dom";
import Login from "../pages/authentication/Login";
import IAMDashboard from "../pages/iam/Dashboard";
import ENCSDashboard from "../pages/metadata/environmentCatelogue/Dashboard";

import { RequireAuth } from "./utils";

const AppRouter = () => {
  return (
    <Switch>
      <Route path={"/"} exact>
        <Login />
      </Route>
      <Route path={"/login"}>
        <Login />
      </Route>
      <Route path='/iam'>
        <RequireAuth>
          <IAMDashboard />
        </RequireAuth>
      </Route>
      <Route path='/environmentcatelogue'>
        <RequireAuth>
          <ENCSDashboard />
        </RequireAuth>
      </Route>
    </Switch>
  );
};

export default AppRouter;
