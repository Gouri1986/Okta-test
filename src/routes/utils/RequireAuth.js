import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useSelector((state) => state.userReducer);
  if (user) {
    return children;
  }

  return <Navigate to='/login' replace />;
};

export default RequireAuth;
