import "./Spinner.scss";
import React from "react";

const Spinner = ({ message, size }) => (
  <div
    className={`spin text-center ${size === "large" ? "spinner-large" : ""}`}
  >
    <div className="spinner-border" role="status">
      <span className="sr-only" role="status">
        Loading...
      </span>
    </div>
    <p>
      <small>{message}</small>
    </p>
  </div>
);

export default Spinner;
