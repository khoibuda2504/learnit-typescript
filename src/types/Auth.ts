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
};
export type ResponseLogin = {
  message?: string;
  success?: boolean;
  accessToken?: string
}