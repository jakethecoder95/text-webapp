import store from "store";

import server from "../../../api/server";

export default async file => {
  const authString = `Bearer ${store.get("token")}`;
  return new Promise(async (resolve, reject) => {
    try {
      const res = await server.post("/manage/upload-to-group", file, {
        headers: {
          Authorization: authString,
          "Content-Type": "multipart/form-data"
        }
      });
      const data = res.data;
      resolve(data);
    } catch (err) {
      reject(err.response);
    }
  });
};
