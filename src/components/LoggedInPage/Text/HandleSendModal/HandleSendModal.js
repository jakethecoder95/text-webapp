import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import store from "store";
import { connect } from "react-redux";

import Overview from "./Overview";
import MessageResult from "./MessageResult/MessageResult";
import server from "../../../../api/server";

const HandleSendModal = props => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [messageWasSuccessfull, setMessageWasSuccessfull] = useState(null);

  const sendTexts = async () => {
    setSending(true);
    const token = store.get("token");
    const authString = `Bearer ${token}`;
    try {
      const response = await server.post(
        "/send-text",
        {
          password,
          ...props.group,
          message: props.message
        },
        { headers: { Authorization: authString } }
      );
      if (response.data.failedTxts.length > 0) {
        console.log(response);
        setErrors({
          nexmo: response.data.failedTxts
        });
      } else {
        setMessageWasSuccessfull(true);
        props.clearMessage();
        setErrors({});
      }
    } catch (err) {
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
        />
        <MessageResult
          people={props.group.people}
          sending={sending}
          messageWasSuccessfull={messageWasSuccessfull}
          errors={errors}
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
              onClick={sendTexts}
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
  group
});

export default connect(mapStateToProps)(HandleSendModal);
