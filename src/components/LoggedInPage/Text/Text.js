import "./Text.scss";
import React, { useState, useEffect } from "react";

import MessageInput from "./MessageInput/MessageInput";
import CharacterCnt from "./CharacterCnt/CharacterCnt";
import SendTextBtn from "./SendTextBtn/SendTextBtn";
import ConfirmSendModal from "./ConfirmSendModal/ConfirmSendModal";

const initialState = { message: "" };

const Text = props => {
  const [message, setMessage] = useState(initialState.message);
  const [maxTextCharLength] = useState(160);
  const [firstSendBtnClicked, setFirstSendBtnClicked] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    return function cleanup() {
      initialState.message = message;
    };
  });

  return (
    <>
      <div className="page-content">
        <div className={"logged-in-page__content"}>
          <MessageInput
            message={message}
            onMessageChange={msg => setMessage(msg)}
          />
          <div className="text-under">
            <CharacterCnt
              message={message}
              maxTextCharLength={maxTextCharLength}
            />
            <SendTextBtn
              message={message}
              handleBtnClicked={() => setFirstSendBtnClicked(true)}
            />
          </div>
        </div>
      </div>
      <ConfirmSendModal
        show={firstSendBtnClicked}
        handleClose={() => {
          setPassword("");
          setFirstSendBtnClicked(false);
        }}
        message={message}
        password={password}
        onPasswordChange={setPassword}
      />
    </>
  );
};

export default Text;
