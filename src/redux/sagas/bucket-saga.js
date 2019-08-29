import { takeLatest, put, select } from "redux-saga/effects";
import { INIT_BUCKET, INIT_BUCKET_SAGA } from "../types";
import store from "store";

import server from "../../api/server";

function* initBucket() {
  const state = yield select();
  const activeGroup = state.group.activeGroup;
  if (activeGroup) {
    if (activeGroup.bucket)
      return yield put({ type: INIT_BUCKET, bucket: activeGroup.bucket });
  }
  const token = store.get("token");
  const authString = `Bearer ${token}`;
  try {
    const response = yield server.get("/user/fetch-bucket", {
      headers: { Authorization: authString }
    });
    const bucket = response.data.bucket;
    console.log(bucket);
    yield put({ type: INIT_BUCKET, bucket });
  } catch (err) {
    console.log(err);
  }
}

function createBucketSaga() {
  return [takeLatest(INIT_BUCKET_SAGA, initBucket)];
}

export default createBucketSaga;
