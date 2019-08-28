import { takeLatest, put } from "redux-saga/effects";
import store from "store";

import { INIT_GROUP, SIGN_IN_SUCCESS } from "../types";

function* initGroup({ payload }) {
  let activeGroupId = store.get("activeGroupId"),
    activeGroup = null;
  if (activeGroupId) {
    activeGroup = payload.groups.find(group => group._id === activeGroupId);
  } else if (payload.groups.length > 0) {
    activeGroup = payload.groups[0];
    store.set("activeGroupId", activeGroup._id);
  }
  yield put({
    type: INIT_GROUP,
    payload: { groups: payload.groups, activeGroup }
  });
}

function createGroupSaga() {
  return [takeLatest(SIGN_IN_SUCCESS, initGroup)];
}

export default createGroupSaga;
