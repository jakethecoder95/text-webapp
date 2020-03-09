import React from "react";

import Message from "./Message";

export default function MessageList({ messageList }) {
  const messages = messageList.map((message, i) => (
    <Message message={message} key={i} />
  ));

  return (
    <ul className="fadeIn" style={{ paddingRight: "20px", paddingLeft: "0" }}>
      {messages}
    </ul>
  );
}
