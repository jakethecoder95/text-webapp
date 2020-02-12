import store from "store";
import server from "../../../api/server";

export default async (searchType, searchValue) => {
  const authString = `Bearer ${store.get("token")}`;
  try {
    const response = await server.get("/group/fetch-numbers-list", {
      headers: { Authorization: authString },
      params: {
        searchType,
        searchValue
      }
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response.data;
    }
  }
};
