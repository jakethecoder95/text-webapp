import "./MessageInput.scss";
import React from "react";

const MessageInput = props => (
  <div className="message-input">
    <textarea
      value={props.message}
      className="scrollbar scrollbar-dark"
      onChange={e => props.onMessageChange(e.target.value)}
      onFocus={() => props.handleTextareaFocus(true)}
      placeholder="Type here..."
    />
  </div>
);

export default MessageInput;
