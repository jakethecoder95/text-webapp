import React, { useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import store from "store";

import isPhoneNumber from "../../../../util/validatePhone";

import server from "../../../../api/server";
import { UPDATE_GROUP } from "../../../../redux/types";

const AddPerson = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    if (!isPhoneNumber(number)) {
      return props.setAlerts({ number: "Phone number invalid" });
    }
    props.setAlerts(_.omit(props.alerts, "number"));
    const token = store.get("token");
    const authString = `Bearer ${token}`;
    const name = `${firstName} ${lastName}`;
    try {
      const response = await server.put(
        "/manage/add-person",
        { name, number, groupId: props.group._id },
        { headers: { Authorization: authString } }
      );
      setFirstName("");
      setLastName("");
      setNumber("");
      props.setAlerts({ success: "Person added successfully!" });
      props.updateGroup(response.data.group);
    } catch (err) {
      if (err.response.status === 401) {
        props.setAlerts({ number: err.response.data.message });
      }
      console.log(err.response);
    }
  };

  const screenWidth = window.innerWidth;
  const isValid =
    number.length > 0 && lastName.length > 0 && firstName.length > 0;

  const onNumberChange = e => {
    if (props.alerts.number) {
      props.setAlerts(_.omit(props.alerts, "number"));
    }
    setNumber(e.target.value);
  };

  return (
    <>
      <hr className="hr" />
      <form className="form" onSubmit={onSubmit}>
        <div className="new-person__form">
          <div className="names">
            <input
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          {props.alerts.number && screenWidth < 990 && (
            <div style={{ color: "red" }}>* {props.alerts.number}</div>
          )}
          <input
            className="phone-number__input form-control"
            placeholder="Phone Number"
            value={number}
            onChange={onNumberChange}
          />
          <button className="btn btn-info" disabled={!isValid}>
            Add
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPerson);
