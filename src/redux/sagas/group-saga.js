import { takeLatest, put } from "redux-saga/effects";
import store from "store";

import server from "../../api/server";
import { INIT_GROUP, INIT_GROUP_SAGA } from "../types";

function* initGroup({ groups }) {
  let activeGroupId = store.get("activeGroupId"),
    activeGroup = null;
  if (!activeGroupId && groups.length > 0) {
    activeGroupId = groups[0]._id;
    store.set("activeGroupId", activeGroupId._id);
  }
  const token = store.get("token");
  const authString = `Bearer ${token}`;
  if (activeGroupId) {
    try {
      const response = yield server.get("/group/fetch-group", {
        headers: { Authorization: authString },
        params: { groupId: activeGroupId }
      });
      activeGroup = response.data.group;
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        console.log(err.response);
        return alert(
          "Looks like there was a problem connecting you to a group. If you are a group admin please contact the group owner. If the problem persists please call or email me at 530-401-8932, 95jacob07@gmail.com"
        );
      }
      console.log(err);
    }
  }
  yield put({
    type: INIT_GROUP,
    payload: { groups, activeGroup }
  });
}

function createGroupSaga() {
  return [takeLatest(INIT_GROUP_SAGA, initGroup)];
}

export default createGroupSaga;
