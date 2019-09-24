import { INITIALIZED_APP, SIGN_OUT, INIT_APP, SIGN_IN_SUCCESS } from "../types";

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
    case SIGN_IN_SUCCESS:
      return { ...state, appInitialized: false };
    default:
      return state;
  }
};
