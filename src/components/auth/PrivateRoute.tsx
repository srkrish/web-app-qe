import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "@utils/Credentials";
import { ROUTES } from "@utils/Constants";

const PrivateRoute = () => {
  const authenticated = isLoggedIn();
  
  console.log('PrivateRoute render, authenticated:', authenticated);

  if (authenticated === false) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  console.log('Authenticated, rendering outlet');
  return <Outlet />;
};

export default PrivateRoute;