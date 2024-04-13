import { AuthActionType } from "../enums/Auth";
import { AuthStateAndLoading, AuthStateType } from "../types/Auth";

type AuthAction = 
| {type: AuthActionType.SET_AUTH; payload: AuthStateType}
| {type: AuthActionType.SET_IS_SUBMITTING; payload?: never}
| {type: AuthActionType.SET_DONE; payload?: never}

export const authReducer = (state: AuthStateAndLoading, action: AuthAction) => {
  const {
    type,
    payload,
  } = action;
  switch (type) {
    case AuthActionType.SET_AUTH:
      return {
        ...state,
        authLoading: false,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };
    case AuthActionType.SET_IS_SUBMITTING:
      return {
        ...state,
        isSubmitting: true,
      };
    case AuthActionType.SET_DONE:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
};
