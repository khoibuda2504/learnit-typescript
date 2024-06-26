import { createContext, useReducer, useEffect, useContext } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import { LoginForm, RegisterForm, ResponseLogin } from "../types/Auth";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { AuthActionType } from "../enums/Auth";
import { AuthStateAndLoading } from "../types/Auth";
type Context = {
  loginUser: (loginForm: LoginForm) => Promise<ResponseLogin>;
  authState: AuthStateAndLoading;
  registerUser: (registerForm: RegisterForm) => Promise<ResponseLogin>;
  logoutUser: () => void;
};
const initialState: AuthStateAndLoading = {
  authLoading: true,
  isAuthenticated: false,
  user: null,
  isSubmitting: false,
};
const AuthContext = createContext<Context | null>(null);
const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: AuthActionType.SET_AUTH,
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (err) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: AuthActionType.SET_AUTH,
        payload: { isAuthenticated: false, user: null },
      });
    }
  };
  const registerUser = async (registerForm: RegisterForm) => {
    dispatch({
      type: AuthActionType.SET_IS_SUBMITTING,
    });
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        registerForm
      );
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        dispatch({
          type: AuthActionType.SET_AUTH,
          payload: { isAuthenticated: true, user: response.data.user },
        });
        await loadUser();
        return response.data;
      }
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      dispatch({
        type: AuthActionType.SET_DONE,
      });
    }
  };
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: AuthActionType.SET_AUTH,
      payload: { isAuthenticated: false, user: null },
    });
  };
  useEffect(() => {
    loadUser();
  }, []);
  const loginUser = async (loginForm: LoginForm) => {
    dispatch({
      type: AuthActionType.SET_IS_SUBMITTING,
    });
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        await loadUser();
        return response.data;
      }
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      dispatch({
        type: AuthActionType.SET_DONE,
      });
    }
  };
  const authContentData = { loginUser, authState, registerUser, logoutUser };
  return (
    <AuthContext.Provider value={authContentData}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext) as Context;
export default AuthContextProvider;
