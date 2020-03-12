import "./MessageDefaultsInput.scss";
import React from "react";

const MessageDefaultsInput = props => (
  <div className="message-defaults">
    <input value={props.value} placeholder="Empty" disabled />
  </div>
);

export default MessageDefaultsInput;
