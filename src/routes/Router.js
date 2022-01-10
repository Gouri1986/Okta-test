import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";

const AppRouter = () => {
  const Routes = useRoutes(appRoutes);
  return Routes;
};
export default AppRouter;
