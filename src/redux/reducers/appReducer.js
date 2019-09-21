import {
  INITIALIZED_APP,
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  INIT_APP
} from "../types";

const initialState = {
  appInitialized: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_APP:
      return { ...state, appInitialized: false };
    case INITIALIZED_APP:
      return { ...state, appInitialized: true };
    case SIGN_OUT:
      return { ...state, appInitialized: true };
    case SIGN_IN:
      return { ...state, appInitialized: false };
    case SIGN_UP:
      return { ...state, appInitialized: false };
    default:
      return state;
  }
};
