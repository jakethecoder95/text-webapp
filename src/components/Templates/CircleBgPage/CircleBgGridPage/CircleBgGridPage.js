import "./CircleBgGridPage.scss";
import React from "react";

import CircleBackground from "../CircleBackground/CircleBackground";

const CircleBgGridPage = ({ children, iconClass, message }) => {
  const childElements = React.Children.map(children, child =>
    React.cloneElement(child)
  );

  return (
    <div className="circle-bg_grid-page">
      <div className="circle-bg_grid-content">
        <div className="circle-bg_grid-left">{childElements}</div>
        <CircleBackground iconClass={iconClass} message={message} />
      </div>
    </div>
  );
};

export default CircleBgGridPage;
