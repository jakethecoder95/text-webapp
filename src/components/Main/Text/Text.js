import "./Text.scss";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MessageInput from "./MessageInput/MessageInput";
import CharacterCnt from "./CharacterCnt/CharacterCnt";
import SendTextBtn from "./SendTextBtn/SendTextBtn";
import HandleSendModal from "./HandleSendModal/HandleSendModal";
import MessageDefaultsInput from "./MessageDefaultsInput/MessageDefaultsInput";
import { UPDATE_GROUP } from "../../../redux/types";
import TextHistory from "./TextHistory/TextHistory";

const initialState = { message: "" };

const Text = props => {
  const { people } = props.group,
    [message, setMessage] = useState(initialState.message),
    [maxTextCharLength] = useState(160),
    [firstSendBtnClicked, setFirstSendBtnClicked] = useState(false),
    [textareaFocused, setTextareaFocused] = useState(false);

  useEffect(() => {
    return function cleanup() {
      initialState.message = message;
    };
  });

  if (people.length === 0) {
    return (
      <div className="page-content text-center">
        <div className="no-people">
          <h2>GROUP EMPTY</h2>
          <h1>
            <i className="fa fa-plus" />
          </h1>
          <Link className="btn btn-primary" to="/group">
            Add Someone
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-content container">
        <div
          className={`text-screen-container ${
            textareaFocused ? "textarea_focus" : ""
          }`}
        >
          <TextHistory groupId={props.group._id} />
          <div className="text__content">
            <MessageInput
              message={message}
              onMessageChange={msg => setMessage(msg)}
              handleTextareaFocus={setTextareaFocused}
            />
            <MessageDefaultsInput value={"[text 2 to unsubscribe]"} />
            <div className="text-under">
              <CharacterCnt
                message={message + "\n[text 2 to unsubscribe]"}
                maxTextCharLength={maxTextCharLength}
              />
              <SendTextBtn
                message={message}
                handleBtnClicked={() => setFirstSendBtnClicked(true)}
              />
            </div>
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

const mapStateToProps = ({ group, user }) => ({
  group: group.activeGroup,
  user
});

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: UPDATE_GROUP, payload: group })
});

export default connect(mapStateToProps, mapDispatchToProps)(Text);
