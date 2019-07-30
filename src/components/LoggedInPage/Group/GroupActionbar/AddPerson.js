import React from "react";

const AddPerson = props => {
  return (
    <form className="form">
      <div className="new-person__form">
        <div className="names">
          <input className="form-control" placeholder="First Name" />
          <input className="form-control" placeholder="Last Name" />
        </div>
        <input
          className="phone-number__input form-control"
          placeholder="Phone Number"
        />
        <button className="btn btn-outline-info">Add</button>
      </div>
    </form>
  );
};

export default AddPerson;
