import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { SecureRoute, Security, LoginCallback } from "@okta/okta-react";
import { Route, Switch, useHistory } from "react-router-dom";
import { oktaConfig, oktaSignInConfig } from "../okta-config";
import Auth from "../pages/authentication/Auth";
import Login from "../pages/authentication/Login";
import Ologin from "../pages/authentication/Ologin";
import Register from "../pages/authentication/Register";
import IAMDashboard from "../pages/iam/Dashboard";
import ENCSDashboard from "../pages/metadata/environmentCatelogue/Dashboard";

import { RequireAuth } from "./utils";

const oktaAuth = new OktaAuth(oktaConfig);

const AppRouter = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) =>
    history?.replace(toRelativeUrl(originalUri || "/", window.location.origin));

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Route path={"/"} exact>
        <Auth />
      </Route>
      <Route path={"/register"} exact>
        <Register />
      </Route>
      <Route
        path='/o_login'
        render={() => <Ologin config={oktaSignInConfig} />}
      />
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
    </Security>
  );
};

export default AppRouter;
