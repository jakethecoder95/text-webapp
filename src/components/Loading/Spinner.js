import React from "react";

const Spinner = ({ message }) => (
  <div className="spin text-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <p>
      <small>{message || "Loading..."}</small>
    </p>
  </div>
);

export default Spinner;
