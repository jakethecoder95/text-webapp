import { takeLatest, call } from "redux-saga/effects";
import store from "store";

import { SIGN_IN, SIGN_OUT } from "../types";

function* signIn({ email, password }) {
  yield console.log("here");
}

function* signOut() {
  store.clearAll();
  yield console.log("here");
}

function createAuthSaga() {
  return [takeLatest(SIGN_IN, signIn), takeLatest(SIGN_OUT, signOut)];
}

export default createAuthSaga;
