import React, { useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import store from "store";

import isPhoneNumber from "../../../../util/validatePhone";

import server from "../../../../api/server";
import { UPDATE_GROUP } from "../../../../redux/types";

const AddPerson = props => {
  const [fullName, setFullName] = useState("");
  const [number, setNumber] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    if (!isPhoneNumber(number)) {
      return props.setAlerts({ warning: "Phone number invalid" });
    }
    props.setAlerts(_.omit(props.alerts, "warning"));
    const token = store.get("token");
    const authString = `Bearer ${token}`;
    let name = fullName.length > 0 ? fullName : "Unknown";
    try {
      const response = await server.put(
        "/manage/add-person",
        { name, number, groupId: props.group._id },
        { headers: { Authorization: authString } }
      );
      setFullName("");
      setNumber("");
      props.setAlerts({ success: "Person added successfully!" });
      props.updateGroup(response.data.group);
    } catch (err) {
      if (err.response.status === 401) {
        props.setAlerts({ warning: err.response.data.message });
      }
      console.log(err.response);
    }
  };

  const screenWidth = window.innerWidth;
  const isValid = number.length > 0;

  const onNumberChange = e => {
    if (props.alerts.warning) {
      props.setAlerts(_.omit(props.alerts, "warning"));
    }
    setNumber(e.target.value);
  };

  return (
    <>
      <hr className="hr" />
      <form className="form" onSubmit={onSubmit}>
        <div className="new-person__form">
          <input
            className="form-control"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
          {props.alerts.warning && screenWidth < 990 && (
            <div style={{ color: "red" }}>* {props.alerts.warning}</div>
          )}
          <input
            className="phone-number__input form-control"
            placeholder="Phone Number"
            value={number}
            onChange={onNumberChange}
          />
          <button
            type="submit"
            className="btn btn-info add-btn"
            disabled={!isValid}
          >
            Add
          </button>
          <button
            type="button"
            className="btn btn-outline-success upload-btn"
            onClick={() => props.showDownloadForm()}
          >
            <i className="fa fa-download"></i>Upload
          </button>
        </div>
      </form>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: UPDATE_GROUP, payload: group })
});

const mapStateToProps = ({ group }) => ({
  group: group.activeGroup
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPerson);
