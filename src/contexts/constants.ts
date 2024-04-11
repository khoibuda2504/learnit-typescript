export const LOCAL_STORAGE_TOKEN_NAME = "learn-it";
export const apiUrl = "https://mern-learnit-backend.vercel.app/api";
export type LoginForm = {
  username: string;
  password: string;
};
export type RegisterForm = LoginForm & {
  confirmPassword: string;
};