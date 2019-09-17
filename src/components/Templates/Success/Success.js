import "./Success.scss";
import React from "react";

const Success = ({ children }) => {
  const childElements = React.Children.map(children, child =>
    React.cloneElement(child)
  );
  return (
    <div className="page-content success-page text-success">
      <div className="success-wrapper text-center">
        <i className="fa fa-check-circle" />
        {childElements}
      </div>
    </div>
  );
};

export default Success;
