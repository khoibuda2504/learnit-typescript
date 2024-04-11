import { AuthActionType } from "../constants";

type AuthStateType = {
  isAuthenticated: boolean;
  user: null | object;
};
type AuthStateAndLoading = AuthStateType & {
  authLoading: boolean;
};

// An interface for our actions
type AuthAction = {
  type: AuthActionType;
  payload: AuthStateType;
};
export const authReducer = (state: AuthStateAndLoading, action: AuthAction) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;
  switch (type) {
    case AuthActionType.SET_AUTH:
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };
    default:
      return state;
  }
};
