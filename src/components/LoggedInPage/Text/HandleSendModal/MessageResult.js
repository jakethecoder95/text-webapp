import React from "react";

const MessageResult = ({ sending, messageWasSuccessfull, errors }) => {
  if (sending) {
    return (
      <div className="text-center">
        <div
          className="spinner-grow"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (errors.nexmo) {
    return (
      <div className="text-center alert alert-danger">
        <i className="fa fa-times-circle" style={{ fontSize: "44px" }} />
        <br />
        {errors.nexmo}
      </div>
    );
  }

  if (messageWasSuccessfull) {
    return (
      <div className="text-center alert alert-success">
        <i className="fa fa-check-circle" style={{ fontSize: "44px" }} />
        <br />
        Message sent successfully
      </div>
    );
  }

  return <></>;
};

export default MessageResult;
