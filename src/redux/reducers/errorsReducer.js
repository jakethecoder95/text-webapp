import { ERROR_LOGIN, ERROR_SIGNUP, SIGN_IN_SUCCESS } from "../types";

const INITIAL_STATE = {
  signin: null,
  signup: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR_LOGIN:
      return { ...state, signin: { ...action.payload } };
    case ERROR_SIGNUP:
      return { ...state, signup: { ...action.payload } };
    case SIGN_IN_SUCCESS:
      return { ...state, signin: null, signup: null };
    default:
      return state;
  }
};
