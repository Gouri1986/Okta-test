import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/authentication/Login";
import HomeDashboard from "../pages/home/Home";
import IAMDashboard from "../pages/iam/Dashboard";
import ENCSDashboard from "../pages/metadata/environmentCatelogue/Dashboard";
import SCOSDashboard from "../pages/metadata/securityCompliance/Dashboard";
import ComplianceDashboard from "../pages/features/cloud-goverance/complianceDashboard/Dashboard";
import { Navbar } from "../shared/components/common";
import { RequireAuth } from "./utils";

const AppRouter = () => {
  const { user: token } = useSelector((state) => state.userReducer);

  return (
    <div className='flex-r hp-100'>
      {token && (
        <div>
          <Navbar />
        </div>
      )}
      <Switch>
        <Route path={"/"} exact>
          <RequireAuth>
            <HomeDashboard />
          </RequireAuth>
        </Route>
        <Route path={"/login"}>
          <Login />
        </Route>
        <Route path='/iam'>
          <RequireAuth>
            <IAMDashboard />
          </RequireAuth>
        </Route>
        <Route path='/environment-catalogue'>
          <RequireAuth>
            <ENCSDashboard />
          </RequireAuth>
        </Route>
        <Route path='/security-compliance'>
          <RequireAuth>
            <SCOSDashboard />
          </RequireAuth>
        </Route>
        <Route path='/compliance-dashboard'>
          <RequireAuth>
            <ComplianceDashboard />
          </RequireAuth>
        </Route>
      </Switch>
    </div>
  );
};

export default AppRouter;
