import "./Loading.scss";
import React from "react";

const Loading = props => (
  <div className="loading">
    <div className="text-center text-dark">
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
);

export default Loading;
