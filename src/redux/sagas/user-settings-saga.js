import { takeLatest, put } from "redux-saga/effects";
import { INIT_USER, SIGN_IN_SUCCESS } from "../types";

function* initUser({ payload }) {
  yield put({ type: INIT_USER, payload: payload.user });
}

function createUserSettingsSaga() {
  return [takeLatest(SIGN_IN_SUCCESS, initUser)];
}

export default createUserSettingsSaga;
