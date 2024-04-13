import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import Input from "./Input";
import Button from "../layout/Button";

const LoginForm = () => {
  const {
    loginUser,
    authState: { isSubmitting },
  } = useAuthContext();
  const [alert, setAlert] = useState("");
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;
  const onChangeLoginForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginUser(loginForm);
      if (!res.success) {
        setAlert("Tài khoản hoặc mật khẩu không chính xác");
        const timeout = setTimeout(() => {
          setAlert("");
          clearTimeout(timeout);
        }, 2000);
      }
    } catch (error) {
      console.log("loginForm error: ", error);
    }
  };

  return (
    <>
      {alert ? <div className="text-red-500">{alert}</div> : null}
      <form className="my-4 w-1/3" onSubmit={login}>
        <div className="mb-3">
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
            required
          />
        </div>
        <Button variant="primary" className="mt-3" type="submit" disabled={isSubmitting}>
          Login
        </Button>
      </form>
      <p>
        <span className="text-white">Don't have an account?</span>
        <Link to="/register">
          <Button className="ml-2" variant="secondary">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
