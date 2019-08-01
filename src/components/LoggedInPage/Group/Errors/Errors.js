import React from "react";
import _ from "lodash";

const Errors = props => {
  const screenWidth = window.innerWidth;

  const style = {
    width: "700px",
    margin: "1rem auto"
  };

  const renderNumberErrors = () => {
    if (props.errors.number && screenWidth >= 990) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>{props.errors.number}</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => props.setErrors(_.omit(props.errors, "number"))}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
  };

  return <div style={style}>{renderNumberErrors()}</div>;
};

export default Errors;
