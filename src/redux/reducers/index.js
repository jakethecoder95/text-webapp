import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import errorsReducer from "./errorsReducer";
import groupReducer from "./groupReducer";
import bucketRecucer from "./bucketReducer";
import appReducer from "./appReducer";

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  errors: errorsReducer,
  group: groupReducer,
  bucket: bucketRecucer
});
