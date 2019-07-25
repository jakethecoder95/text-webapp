import { SIGN_IN_SUCCESS, SIGN_OUT } from "../types";

const INITIAL_STATE = {
  isSignedIn: null,
  groupId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};
