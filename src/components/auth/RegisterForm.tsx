import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import Input from "./Input";
import Button from "../layout/Button";

const RegisterForm = () => {
  const { registerUser, authState: { isSubmitting } } = useAuthContext();
  const [alert, setAlert] = useState("");
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { username, password, confirmPassword } = registerForm;
  const onChangeRegisterForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };
  const clearAlert = (ms = 2000) => {
    setAlert("");
    const timeout = setTimeout(() => {
      setAlert("");
      clearTimeout(timeout);
    }, ms);
  };
  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Mật khẩu không trùng khớp");
      clearAlert();
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert(registerData.message as string);
        clearAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {alert ? <div className="text-red-500">{alert}</div> : null}
      <form className="my-4 w-1/3" onSubmit={register}>
        <div className="mb-3">
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeRegisterForm}
            required
          />
        </div>
        <div className="mb-3">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeRegisterForm}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeRegisterForm}
            required
          />
        </div>
        <Button variant="primary" className="mt-3" type="submit" disabled={isSubmitting}>
          Register
        </Button>
      </form>
      <p>
        <span className="text-white">Already have an account?</span>
        <Link to="/login">
          <Button className="ml-2" variant="secondary">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
