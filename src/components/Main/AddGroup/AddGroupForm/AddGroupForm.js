import React, { useState } from "react";

const AddGroupForm = props => {
  const [name, setName] = useState("");
  const onSubmit = () => {
    console.log(name);
  };
  return (
    <div className="add-group-form">
      <div className="form-group">
        <label>What would you like your group name to be?</label>
        <input
          placeholder="Name"
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Create Group
      </button>
    </div>
  );
};

export default AddGroupForm;
