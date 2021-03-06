import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import store from "store";
import { connect } from "react-redux";

import Overview from "./Overview";
import MessageResult from "./MessageResult/MessageResult";
import server from "../../../../api/server";
import { UPDATE_GROUP } from "../../../../redux/types";

const HandleSendModal = props => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [messageWasSuccessfull, setMessageWasSuccessfull] = useState(null);

  const sendTexts = async people => {
    setSending(true);
    const token = store.get("token");
    const authString = `Bearer ${token}`;
    try {
      const response = await server.post(
        "/sms/send-group",
        {
          password,
          ...people,
          message: props.message,
          groupId: props.group._id
        },
        { headers: { Authorization: authString } }
      );
      if (response.data.failedTexts.length > 0) {
        setErrors({
          nexmo: response.data.failedTxts
        });
      } else {
        props.clearMessage();
        setErrors({});
      }
      props.updateActiveGroup(response.data.group);
      setMessageWasSuccessfull(true);
    } catch (err) {
      console.log(err);
      setMessageWasSuccessfull(false);
      if (err.response.status === 401) {
        setErrors({ ...errors, password: "Incorrect password" });
      }
      console.log(err.response);
    }
    setSending(false);
  };

  const handleClose = () => {
    setPassword("");
    setMessageWasSuccessfull(null);
    setErrors({});
    props.handleFirstSendBtnClicked(false);
  };

  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      centered
      style={{ color: "#000" }}
    >
      <Modal.Header>
        <h2 style={{ width: "100%", textAlign: "center" }}>Please Confirm</h2>
      </Modal.Header>
      <Modal.Body>
        <Overview
          message={props.message}
          password={password}
          onPasswordChange={setPassword}
          sending={sending}
          errors={errors}
					maxTextCharLength={props.maxTextCharLength}
        />
        <MessageResult
          sending={sending}
          messageWasSuccessfull={messageWasSuccessfull}
          errors={errors}
          resendTexts={sendTexts}
        />
      </Modal.Body>
      <Modal.Footer>
        <div
          className="text-center"
          style={{ width: "100%", textAlign: "center" }}
        >
          {!messageWasSuccessfull && (
            <button
              className="btn btn-primary"
              disabled={password.length === 0 || sending}
              onClick={() => sendTexts(props.group)}
              style={{ width: "100%", marginBottom: "5px" }}
            >
              Send It!
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={handleClose}
            disabled={sending}
            style={{ width: "100%" }}
          >
            {messageWasSuccessfull ? "Continue" : "Cancel"}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = ({ group }) => ({
  group: group.activeGroup
});

const mapDispatchToProps = dispatch => ({
  updateActiveGroup: group => dispatch({ type: UPDATE_GROUP, payload: group })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandleSendModal);
