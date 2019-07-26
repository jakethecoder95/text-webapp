import "./Text.scss";
import React, { useState } from "react";

import MessageInput from "./MessageInput/MessageInput";
import CharacterCnt from "./CharacterCnt/CharacterCnt";
import SendTextBtn from "./SendTextBtn/SendTextBtn";

const Text = props => {
  const [message, setMessage] = useState("");
  const [maxTextCharLength] = useState(160);

  return (
    <div className="page-content">
      <div className={"logged-in-page__content"}>
        <MessageInput
          message={message}
          onMessageChange={msg => setMessage(msg)}
        />
        <div className="text-under">
          <CharacterCnt
            message={message}
            maxTextCharLength={maxTextCharLength}
          />
          <SendTextBtn />
        </div>
      </div>
    </div>
  );
};

export default Text;
