import { PostType } from "./Post";

export type LoginForm = {
  username: string;
  password: string;
};
export type RegisterForm = LoginForm & {
  confirmPassword: string;
};
type User = {
  username: string;
};
export type AuthStateType = {
  isAuthenticated: boolean;
  user: User | null;
};
export type AuthStateAndLoading = AuthStateType & {
  authLoading: boolean;
  isSubmitting: boolean;
};
export type Response = {
  message?: string;
  success?: boolean;
};
export type ResponseLogin = Response & {
  accessToken?: string;
};
export type ResponsePost = Response & {
  post?: PostType;
};
