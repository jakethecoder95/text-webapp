import { INIT_GROUP, SIGN_OUT, UPDATE_GROUP } from "../types";

const initialState = {
  activeGroup: null,
  groups: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GROUP:
      return { ...state, ...action.payload };
    case INIT_GROUP:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
