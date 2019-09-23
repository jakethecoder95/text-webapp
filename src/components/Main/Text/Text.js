import "./Text.scss";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import store from "store"; // To Delete
import server from "../../../api/server"; // To Delete
import Spinner from "../../Loading/Spinner"; // To Delete

import MessageInput from "./MessageInput/MessageInput";
import CharacterCnt from "./CharacterCnt/CharacterCnt";
import SendTextBtn from "./SendTextBtn/SendTextBtn";
import HandleSendModal from "./HandleSendModal/HandleSendModal";
import MessageDefaultsInput from "./MessageDefaultsInput/MessageDefaultsInput";
import { UPDATE_GROUP } from "../../../redux/types";

const initialState = { message: "" };

const Text = props => {
  const { people, name } = props.group,
    [message, setMessage] = useState(initialState.message),
    [maxTextCharLength] = useState(160),
    [firstSendBtnClicked, setFirstSendBtnClicked] = useState(false),
    [preMessageStr, setPreMessageStr] = useState(`${name} GroupText:`),
    [postMessageStr, setPostMessageStr] = useState(
      "[No Reply. Text 2 to exit Group]"
    ),
    finalMessage = `${preMessageStr}\n${message}\n${postMessageStr}`;

  useEffect(() => {
    return function cleanup() {
      initialState.message = message;
    };
  });

  /*  To Delete */
  const [syncing, setSyncing] = useState(false);
  const sync = async path => {
    setSyncing(true);
    const authString = `Bearer ${store.get("token")}`;
    try {
      const response = await server.post(
        path,
        { groupId: props.group._id },
        { headers: { Authorization: authString } }
      );
      props.updateGroup(response.data.group);
    } catch (err) {
      console.log(err);
    }
    setSyncing(false);
  };
  /*  To Delete */
  const actionButton = () => {
    if (syncing) {
      return <Spinner />;
    }

    if (props.user.email === "armory@crossroadslive.com") {
      return (
        <button
          className="btn btn-primary"
          onClick={() => {
            sync("/manage/merge-armory");
          }}
        >
          Sync Armory
        </button>
      );
    }
    if (props.user.email === "hsm@crossroadslive.com") {
      return (
        <button
          className="btn btn-primary"
          onClick={() => {
            sync("/manage/merge-hsm");
          }}
        >
          Sync HSM
        </button>
      );
    }

    return (
      <Link className="btn btn-primary" to="/group">
        Add Someone
      </Link>
    );
  };
  /*  To Delete */

  if (people.length === 0) {
    return (
      <div className="page-content text-center">
        <div className="no-people">
          <h2>GROUP EMPTY</h2>
          <h1>
            <i className="fa fa-plus" />
          </h1>
          {actionButton()}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-content container">
        <div className="text__content">
          <MessageDefaultsInput
            value={preMessageStr}
            onValueChange={setPreMessageStr}
          />
          <MessageInput
            message={message}
            onMessageChange={msg => setMessage(msg)}
          />
          <MessageDefaultsInput
            value={postMessageStr}
            onValueChange={setPostMessageStr}
          />
          <div className="text-under">
            <CharacterCnt
              preMessageStr={preMessageStr}
              postMessageStr={postMessageStr}
              message={finalMessage}
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
        message={finalMessage}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Text);
