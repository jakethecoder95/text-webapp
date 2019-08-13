import React from "react";
import { connect } from "react-redux";

const Error = ({ name, number, message, index }) => {
  return (
    <li className="list-group-item list-group-item-danger">
      <div
        data-toggle="collapse"
        href={`#colapsableInner${index}`}
        role="button"
        aria-expanded="false"
        aria-controls={`colapsableInner${index}`}
        style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr" }}
      >
        <div className="error-name">{name}</div>
        <div className="error-name">{number}</div>
        <div className="error-expand-icon">
          <i className="fa fa-angle-down" />
        </div>
      </div>
      <div
        className="collapse"
        id={`colapsableInner${index}`}
        style={{ padding: "10px 20px 0 20px" }}
      >
        <div className="text-center">
          <i className="fa fa-times-circle" style={{ fontSize: "44px" }} />
          <br />
          <strong>{message}</strong>
        </div>
      </div>
    </li>
  );
};

const mapStateToProps = ({ group }) => ({
  people: group.people
});

export default connect(mapStateToProps)(Error);
