import React from "react";

export default props => {
  if (props.error) {
    return (
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong>{props.error}</strong>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => props.setAlerts({ error: null, success: null })}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }

  if (props.success) {
    return (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>{props.success}</strong>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => props.setAlerts({ error: null, success: null })}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }

  return null;
};
