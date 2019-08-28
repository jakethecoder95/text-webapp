import { INIT_USER, SIGN_OUT } from "../types";

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_USER:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};
