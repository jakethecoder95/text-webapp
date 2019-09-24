import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import store from "store";

import server from "../../../../api/server";
import Spinner from "../../../Loading/Spinner";

const DeleteGroupModal = props => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setDeleting(true);
    setError(null);
    const authString = `Bearer ${store.get("token")}`;
    try {
      await server.delete("/group/delete-group", {
        data: {
          groupId: props.group._id,
          authString,
          password
        }
      });
      props.deletedGroup();
      handleClose();
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      }
      console.log(err.response);
    }
    setDeleting(false);
  };

  const handleClose = () => {
    props.closeModal();
    setPassword("");
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
        {error && <p className="alert alert-danger">{error}</p>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Please enter your password:</label>
            <input
              className="form-control text-center"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            className="btn btn-danger"
            disabled={password.length < 1 || deleting}
          >
            {deleting ? <Spinner /> : "Delete"}
          </button>
        </form>
        <p className="text-danger text-center">
          WARNING: This will perminantely delete your group.
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteGroupModal;
