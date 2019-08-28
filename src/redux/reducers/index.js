import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import errorsReducer from "./errorsReducer";
import groupReducer from "./groupReducer";
import bucketRecucer from "./bucketReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  errors: errorsReducer,
  group: groupReducer,
  bucket: bucketRecucer
});
