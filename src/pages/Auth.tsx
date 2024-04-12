import { LoginForm, RegisterForm } from "../components/auth";
import { AuthType } from "../enums/Auth";
// import landing from "../assets/landing.jpg";
const Auth = ({ authRoute }: { authRoute: AuthType }) => {
  const ActiveComp = authRoute === AuthType.LOGIN ? LoginForm : RegisterForm;
  // console.log('landing:::::', landing)
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(/src/assets/landing.jpg)`
      }}
    >
      <div className="h-full bg-black bg-opacity-50">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          <ActiveComp />
        </div>
      </div>
    </div>
  );
};

export default Auth;
