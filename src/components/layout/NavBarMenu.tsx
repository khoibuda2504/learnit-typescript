import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { useAuthContext } from "../../contexts/AuthContext";
import Button from "./Button";

const NavBarMenu = () => {
  const { authState, logoutUser } = useAuthContext();
  const logout = () => {
    logoutUser();
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-[#78c2ad] p-2">
        <div className="flex items-center text-white font-bold text-2xl">
          <img
            src={learnItLogo}
            alt="learnItLogo"
            width="32"
            height="32"
            className="mr-2"
          />
          Learn It
        </div>
        <div className="flex items-center text-white font-bold">
          <span>Welcome {authState?.user?.username}</span>
          <Button className="ml-2" variant="red" onClick={logout}>
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </div>
      </nav>
    </>
  );
};

export default NavBarMenu;
