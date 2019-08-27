import React from "react";

const sendTextBtn = props => (
  <div>
    <button
      className="btn btn-md btn-circle"
      onClick={props.handleBtnClicked}
      disabled={props.message.length === 0}
    >
      <i className="fa fa-paper-plane" />
    </button>
  </div>
);

export default sendTextBtn;
