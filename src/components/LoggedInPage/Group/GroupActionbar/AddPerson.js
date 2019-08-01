import React, { useState } from "react";
import _ from "lodash";
import store from "store";

import isPhoneNumber from "../../../../util/validatePhone";

import server from "../../../../api/server";

const AddPerson = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    if (!isPhoneNumber(number)) {
      return props.setErrors({ number: "Phone number invalid" });
    }
    props.setErrors(_.omit(props.errors, "number"));
    const token = store.get("token");
    const authString = `Bearer ${token}`;
    const name = `${firstName} ${lastName}`;
    try {
      const response = await server.put(
        "/manage/add-person",
        { name, number },
        { headers: { Authorization: authString } }
      );
      setFirstName("");
      setLastName("");
      setNumber("");
      console.log(response);
    } catch (err) {
      console.log("error");
    }
  };

  const screenWidth = window.innerWidth;
  const isValid =
    number.length > 0 && lastName.length > 0 && firstName.length > 0;

  const onNumberChange = e => {
    if (props.errors.number) {
      props.setErrors(_.omit(props.errors, "number"));
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
          <div>
            {props.errors.number && screenWidth < 990 && (
              <div style={{ color: "red" }}>* {props.errors.number}</div>
            )}
            <input
              className="phone-number__input form-control"
              placeholder="Phone Number"
              value={number}
              onChange={onNumberChange}
            />
          </div>
          <button className="btn btn-outline-info" disabled={!isValid}>
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPerson;
