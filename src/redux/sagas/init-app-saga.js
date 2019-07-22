import { takeLatest, put } from "redux-saga/effects";
import store from "store";
import { INIT_APP, SIGN_IN_SUCCESS, SIGN_OUT } from "../types";

export default () =>
  takeLatest(INIT_APP, function*() {
    console.log("initializing...");
    const token = store.get("token");
    if (!token) {
      return yield put({ type: SIGN_OUT });
    }
    yield put({ type: SIGN_IN_SUCCESS });
  });
