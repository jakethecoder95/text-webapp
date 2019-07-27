import React from "react";
import Modal from "react-bootstrap/Modal";

const ConfirmSendModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose} centered style={{ color: "#000" }}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    <Modal.Footer>
      <button className="btn" onClick={handleClose}>
        Close
      </button>
      <button className="btn btn-primary" onClick={handleClose}>
        Save Changes
      </button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmSendModal;
