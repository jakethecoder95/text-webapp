import { takeLatest, call } from "redux-saga/effects";
import store from "store";

import { SIGN_IN, SIGN_OUT } from "../types";

function* signIn({ email, password }) {
  yield console.log("signing in");
}

function* signOut() {
  store.clearAll();
  yield console.log("signing out");
}

function* signUp(userInfo) {
  yield console.log("signing up...");
}

function createAuthSaga() {
  return [takeLatest(SIGN_IN, signIn), takeLatest(SIGN_OUT, signOut)];
}

export default createAuthSaga;
