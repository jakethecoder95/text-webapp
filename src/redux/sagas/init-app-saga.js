import { takeLatest, put } from "redux-saga/effects";
import store from "store";

import server from "../../api/server";
import { INIT_APP, SIGN_IN_SUCCESS, SIGN_OUT } from "../types";

export default () =>
  takeLatest(INIT_APP, function*() {
    const token = store.get("token");
    if (!token) {
      return yield put({ type: SIGN_OUT });
    }
    const authString = `Bearer ${token}`;
    try {
      const response = yield server.get("/auth/init-group", {
        headers: { Authorization: authString }
      });
      yield put({ type: SIGN_IN_SUCCESS, payload: response.data.group });
    } catch (err) {
      alert(
        "Looks like there was an issue logging you back in.  Please log back in."
      );
      yield put({ type: SIGN_OUT });
      console.log(err.response);
    }
  });
