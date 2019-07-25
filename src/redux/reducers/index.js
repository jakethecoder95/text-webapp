import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import groupInfoReducer from "./groupInfoReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  group: groupInfoReducer
});
