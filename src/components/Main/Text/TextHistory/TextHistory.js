import "./TextHistory.scss";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Spinner from "../../../Loading/Spinner";
import MessageList from "./MessageList";
import getTextHistory from "./get-text-history";

const initialState = { textHistory: null };

const TextHistory = props => {
  const [textHistory, setTextHistory] = useState(initialState.textHistory);

  const DOMRef = useRef(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (!initialState.textHistory) {
      (async () => {
        setTextHistory(await getTextHistory(props.groupId, source.token));
        initialState.textHistory = textHistory;
      })();
    }

    if (DOMRef.current) {
      DOMRef.current.scrollTop = DOMRef.current.scrollHeight;
    }

    return () => {
      source.cancel("Operation canceled by the user.");
    };
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
