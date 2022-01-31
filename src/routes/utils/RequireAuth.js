import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useSelector((state) => state.userReducer);
  // if (user) {
  return children;
  // }

  // return <Redirect to='/login' />;
};

export default RequireAuth;
