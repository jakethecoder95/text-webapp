import React from "react";

const Success = ({ name, number, message, index }) => {
  return (
    <li className="list-group-item list-group-item-success">
      <div
        data-toggle="collapse"
        href={`#colapsableInner${index}`}
        role="button"
        aria-expanded="false"
        aria-controls={`colapsableInner${index}`}
        style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr" }}
      >
        <div className="success-name">{name}</div>
        <div className="success-name">{number}</div>
        <div className="success-expand-icon">
          <i className="fa fa-angle-down" />
        </div>
      </div>
      <div
        className="collapse"
        id={`colapsableInner${index}`}
        style={{ padding: "10px 20px 0 20px" }}
      >
        <div className="text-center">
          <i className="fa fa-check-circle" style={{ fontSize: "44px" }} />
          <br />
          Message sent successfully
        </div>
      </div>
    </li>
  );
};

export default Success;
