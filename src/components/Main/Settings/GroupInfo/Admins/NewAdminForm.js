import React, { useState } from "react";
import store from "store";
import { connect } from "react-redux";

import isEmail from "../../../../../util/validateEmail";
import server from "../../../../../api/server";
import { UPDATE_GROUP } from "../../../../../redux/types";

const NewAdminForm = props => {
  const [email, setEmail] = useState("");
  const [visited, setVisited] = useState(false);
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const authString = `Bearer ${store.get("token")}`;
    try {
      const response = await server.post(
        "/manage/add-admin",
        { newAdminEmail: email.trim(), groupId: props.group._id },
        { headers: { Authorization: authString } }
      );
      props.updateGroup(response.data.group);
      setEmail("");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          setError(err.response.data.message);
        }
      }
    }
    setSubmitting(false);
  };

  const onEmailChange = value => {
    setEmail(value);
    validate(value);
  };

  const validate = value => {
    if (value.length === 0) {
      setError("Required");
      setInvalid(true);
    } else if (!isEmail(value)) {
      setError("Invalid email");
      setInvalid(true);
    } else {
      setError("");
      setInvalid(false);
    }
  };

  return (
    <form className="form-row" onSubmit={onSubmit}>
      <div className="col-10">
        <input
          className="form-control"
          placeholder="Admin Email"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          onBlur={() => setVisited(true)}
        />
        <p className="text-danger">{visited && error}</p>
      </div>
      <div className="col-2">
        <button className="btn btn-primary" disabled={invalid || submitting}>
          {submitting && (
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          Add
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = ({ group }) => ({
  group: group.activeGroup
});

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: UPDATE_GROUP, payload: group })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAdminForm);
