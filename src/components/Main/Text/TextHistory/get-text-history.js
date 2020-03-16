import store from "store";

import server from "../../../../api/server";

const getTextHistory = (groupId, cancelToken) => {
  const token = store.get("token");
  const authString = `Bearer ${token}`;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await server.get("/group/fetch-text-history", {
        headers: { Authorization: authString },
        params: { groupId },
        cancelToken
      });
      resolve(response.data.textHistory);
    } catch (err) {
      reject(err);
    }
  });
};

export default getTextHistory;
