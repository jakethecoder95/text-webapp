import "./TextHistory.scss";
import React, { useState, useEffect, useRef } from "react";
import store from "store";

import server from "../../../../api/server";
import Spinner from "../../../Loading/Spinner";
import MessageList from "./MessageList";

const initialState = { textHistory: null };

const getTextHistory = groupId => {
  const token = store.get("token");
  const authString = `Bearer ${token}`;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await server.get("/group/fetch-text-history", {
        headers: { Authorization: authString },
        params: { groupId }
      });
      resolve(response.data.textHistory);
    } catch (err) {
      reject(err);
    }
  });
};

const TextHistory = props => {
  const [textHistory, setTextHistory] = useState(initialState.textHistory);

  const DOMRef = useRef(null);

  useEffect(() => {
    if (!initialState.textHistory) {
      (async () => {
        setTextHistory(await getTextHistory(props.groupId));
        initialState.textHistory = textHistory;
      })();
    }

    if (DOMRef.current) {
      DOMRef.current.scrollTop = DOMRef.current.scrollHeight;
    }
  }, [props.groupId, textHistory]);

  const renderContent = () => {
    if (!textHistory) {
      return (
        <div className="centered-container">
          <Spinner message="Getting your messages" />
        </div>
      );
    }
    if (textHistory.length === 0) {
      return (
        <div className="centered-container">
          <h1 className="text-center" style={{ marginBottom: "2rem" }}>
            No messages yet.
          </h1>
        </div>
      );
    }
    return <MessageList messageList={[...textHistory].reverse()} />;
  };

  return (
    <div className="text-history_container scrollbar" ref={DOMRef}>
      {renderContent()}
    </div>
  );
};

export default TextHistory;
