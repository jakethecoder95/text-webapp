import "./CircleBackground.scss";
import React from "react";

const CircleBackground = ({ iconClass, message }) => {
  const renderMessage = () =>
    message.split(" ").map((word, i) => (
      <span key={i}>
        {word} <br />
      </span>
    ));

  return (
    <div className="circle-bg">
      <div className="icon-wrapper">
        <div className="slogan-and-icon">
          <i className={`fa ${iconClass}`}></i>
          <h1>{renderMessage()}</h1>
        </div>
      </div>
    </div>
  );
};

export default CircleBackground;
