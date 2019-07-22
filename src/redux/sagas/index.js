import { all } from "redux-saga/effects";
import initAppSaga from "./init-app-saga";
import createAuthSaga from "./auth-saga";
import createUserSettingsSaga from "user-settings-saga";

export default function* sagas() {
  yield all([initAppSaga, ...createAuthSaga(), ...createUserSettingsSaga()]);
}
