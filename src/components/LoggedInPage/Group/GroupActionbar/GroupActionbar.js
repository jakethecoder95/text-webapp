import "./GroupActionbar.scss";
import React from "react";

import AddPerson from "./AddPerson";

const GroupActionbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search for a person"
          aria-label="Search"
        />
      </form>
      <button
        className="btn btn-md btn-circle navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa fa-plus" />
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
        style={{ maxWidth: "500px" }}
      >
        <AddPerson errors={props.errors} setErrors={props.setErrors} />
      </div>
    </nav>
  );
};

export default GroupActionbar;
