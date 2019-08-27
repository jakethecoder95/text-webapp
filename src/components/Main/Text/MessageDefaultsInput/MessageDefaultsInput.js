import "./MessageDefaultsInput.scss";
import React from "react";

const MessageDefaultsInput = props => (
  <div className="message-defaults">
    <input
      onChange={e => props.onValueChange(e.target.value)}
      value={props.value}
      placeholder="Empty"
    />
  </div>
);

export default MessageDefaultsInput;
