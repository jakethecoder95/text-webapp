import React from "react";
import Modal from "react-bootstrap/Modal";

import Overview from "./Overview";

const ConfirmSendModal = props => (
  <Modal
    show={props.show}
    onHide={props.handleClose}
    centered
    style={{ color: "#000" }}
  >
    <Modal.Header>
      <h2 style={{ width: "100%", textAlign: "center" }}>Please Confirm</h2>
    </Modal.Header>
    <Modal.Body>
      <Overview
        message={props.message}
        password={props.password}
        onPasswordChange={props.onPasswordChange}
      />
    </Modal.Body>
    <Modal.Footer>
      <button className="btn" onClick={props.handleClose}>
        Nah
      </button>
      <button className="btn btn-primary" onClick={props.handleClose}>
        Send It!
      </button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmSendModal;
