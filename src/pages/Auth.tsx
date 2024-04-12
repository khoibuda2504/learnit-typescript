import { LoginForm, RegisterForm } from "../components/auth";
import { AuthType } from "../enums/Auth";
import landing from "../assets/landing.jpg";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loading, Skeleton } from "../components";
const Auth = ({ authRoute }: { authRoute: AuthType }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useAuthContext();

  const ActiveComp = authRoute === AuthType.LOGIN ? LoginForm : RegisterForm;
  return <Skeleton />
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${landing})`,
      }}
    >
      <div className="h-full bg-black bg-opacity-50">
        <div className="flex items-center justify-center flex-col h-full text-center">
          <h1 className="text-white font-600 text-3xl">LearnIt</h1>
          <h4 className="text-white text-2xl font-500">
            Keep track of what you are learning
          </h4>
          {authLoading ? (
           <Loading />
          ) : (
            <ActiveComp />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
