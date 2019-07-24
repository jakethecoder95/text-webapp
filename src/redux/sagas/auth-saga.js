import { takeLatest, put } from "redux-saga/effects";
import store from "store";

import {
  ERROR_LOGIN,
  ERROR_SIGNUP,
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_SUCCESS,
  SIGN_UP
} from "../types";
import server from "../../api/server";

function* signin({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield server.post("/auth/login", { email, password });
    store.set("token", response.data.token);
    store.set("groupId", response.data.group._id);
    yield put({ type: SIGN_IN_SUCCESS, payload: response.data.group });
  } catch (err) {
    if (err.response.status === 401) {
      yield put({ type: ERROR_LOGIN, payload: err.response.data });
    }
    console.log(err.response);
  }
}

function* signup({ payload }) {
  try {
    const response = yield server.put("/auth/signup", { ...payload });
    store.set("token", response.data.token);
    store.set("groupId", response.data.group._id);
    yield put({ type: SIGN_IN_SUCCESS, payload: response.data.group });
  } catch (err) {
    if (err.response.status === 422) {
      yield put({ type: ERROR_SIGNUP, payload: err.response.data });
    }
    console.log(err.response);
  }
}

function* signout() {
  store.clearAll();
  yield console.log("signing out");
}

function createAuthSaga() {
  return [
    takeLatest(SIGN_IN, signin),
    takeLatest(SIGN_OUT, signout),
    takeLatest(SIGN_UP, signup)
  ];
}

export default createAuthSaga;