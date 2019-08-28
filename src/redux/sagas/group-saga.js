import { takeLatest, put } from "redux-saga/effects";
import store from "store";

import { INIT_GROUP, SIGN_IN_SUCCESS } from "../types";

function* initGroup({ payload }) {
  const activeGroupId = store.get("activeGroupId");
  let activeGroup = null;
  if (activeGroupId) {
    activeGroup = payload.groups.find(group => group._id === activeGroupId);
  } else if (payload.groups.length > 0) {
    activeGroup = payload.groups[0];
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
