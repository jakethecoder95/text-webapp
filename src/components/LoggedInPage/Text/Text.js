import React, { useState } from "react";

import MessageInput from "./MessageInput/MessageInput";

const Text = props => {
  const [message, setMessage] = useState("");
  return (
    <div className="page-content">
      <div className={"logged-in-page"}>
        <MessageInput
          message={message}
          onMessageChange={msg => setMessage(msg)}
        />
      </div>
    </div>
  );
};

export default Text;
