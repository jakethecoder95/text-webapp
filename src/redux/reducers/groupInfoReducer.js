import { SIGN_IN_SUCCESS, SIGN_OUT, UPDATE_GROUP } from "../types";

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GROUP:
      return { ...state, ...action.payload };
    case SIGN_IN_SUCCESS:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};
