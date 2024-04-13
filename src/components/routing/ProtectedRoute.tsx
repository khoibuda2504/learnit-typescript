import { Navigate, Outlet } from "react-router-dom";
import NavBarMenu from "../layout/NavBarMenu";
import { useAuthContext } from "../../contexts/AuthContext";
import Skeleton from "../layout/Skeleton";

const ProtectedRoute = () => {
  const {
    authState: { authLoading, isAuthenticated }
  } = useAuthContext();
  if (authLoading) {
    return <Skeleton />
  }
  return isAuthenticated ? (
    <>
      <NavBarMenu />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
