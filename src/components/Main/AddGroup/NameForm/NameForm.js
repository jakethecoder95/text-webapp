import "./NameForm.scss";
import React from "react";

const AddGroupForm = ({ name, handleNameChange, handleNameSubmit }) => {
  const onSubmit = () => handleNameSubmit();

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="add-name-form" onSubmit={handleSubmit}>
      <h3 className="form-title">What would you like your group name to be?</h3>
      <div className="input-wrapper">
        <input
          placeholder="Name"
          className="form-control"
          value={name}
          onChange={e => handleNameChange(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={name.length === 0}
        >
          Go
        </button>
      </div>
    </form>
  );
};

export default AddGroupForm;
