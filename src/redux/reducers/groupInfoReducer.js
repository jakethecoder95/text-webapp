import { SIGN_IN_SUCCESS, SIGN_OUT } from "../types";

export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};
