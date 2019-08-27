import "./MessageInput.scss";
import React from "react";

const MessageInput = props => (
  <div className="message-input">
    <textarea
      value={props.message}
      onChange={e => props.onMessageChange(e.target.value)}
      placeholder="Type here..."
    />
  </div>
);

export default MessageInput;
