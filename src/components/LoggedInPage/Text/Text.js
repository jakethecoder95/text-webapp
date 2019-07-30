import "./Text.scss";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import MessageInput from "./MessageInput/MessageInput";
import CharacterCnt from "./CharacterCnt/CharacterCnt";
import SendTextBtn from "./SendTextBtn/SendTextBtn";
import HandleSendModal from "./HandleSendModal/HandleSendModal";

const initialState = { message: "" };

const Text = props => {
  const [message, setMessage] = useState(initialState.message);
  const [maxTextCharLength] = useState(160);
  const [firstSendBtnClicked, setFirstSendBtnClicked] = useState(false);

  useEffect(() => {
    return function cleanup() {
      initialState.message = message;
    };
  });

  if (props.people.length === 0) {
    return (
      <div className="page-content text-center">
        <div className="no-people">
          <h2>GROUP EMPTY</h2>
          <h1>
            <i className="fa fa-plus" />
          </h1>
          <button
            className="btn btn-primary"
            onClick={() => props.setActive("group")}
          >
            Add Someone
          </button>
        </div>
      </div>
    );
  }

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
      <HandleSendModal
        show={firstSendBtnClicked}
        handleFirstSendBtnClicked={setFirstSendBtnClicked}
        message={message}
        clearMessage={() => setMessage("")}
      />
    </>
  );
};

const mapStateToProps = ({ group }) => ({
  people: group.people
});

export default connect(mapStateToProps)(Text);
