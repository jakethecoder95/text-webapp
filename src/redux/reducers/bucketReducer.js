import { INIT_BUCKET } from "../types";

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_BUCKET:
      return { ...state, ...action.bucket };
    default:
      return state;
  }
};
