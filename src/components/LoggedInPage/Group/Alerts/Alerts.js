import React from "react";
import _ from "lodash";

const Alerts = props => {
  const screenWidth = window.innerWidth;

  const style = {
    width: "700px",
    margin: "1rem auto"
  };

  const renderNumberErrors = () => {
    if (props.alerts.number && screenWidth >= 990) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>{props.alets.number}</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => props.setAlerts(_.omit(props.errors, "number"))}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
  };

  return <div style={style}>{renderNumberErrors()}</div>;
};

export default Alerts;
