import { INIT_GROUP, SIGN_OUT, UPDATE_GROUP } from "../types";

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GROUP:
      return { ...state, ...action.payload };
    case INIT_GROUP:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};
