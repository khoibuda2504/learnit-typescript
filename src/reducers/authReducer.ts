import { AuthActionType } from "../enums/Auth";
import { AuthStateAndLoading, AuthStateType } from "../types/Auth";

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
