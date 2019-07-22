import { SIGN_IN_SUCCESS, SIGN_OUT } from "../types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state = { INITIAL_STATE }, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
