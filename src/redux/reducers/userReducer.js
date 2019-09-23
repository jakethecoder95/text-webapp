import { INIT_USER, SIGN_OUT, UPDATE_USER } from "../types";

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_USER:
      return { ...state, ...action.userInfo };
    case UPDATE_USER:
      return { ...state, ...action.updatedUser };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};
