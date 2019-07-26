import React from "react";

const CharacterCnt = props => (
  <div>
    {props.message.length > props.maxTextCharLength && (
      <span className="page-cnt" style={{ marginRight: "5px" }}>
        {Math.floor(props.message.length / props.maxTextCharLength)} &
      </span>
    )}
    <span className="character-cnt">
      {props.message.length % props.maxTextCharLength} /{" "}
      {props.maxTextCharLength}
    </span>
  </div>
);

export default CharacterCnt;
