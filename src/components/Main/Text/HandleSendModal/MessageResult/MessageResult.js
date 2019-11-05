import "./MessageResult.scss";
import React from "react";

import ErrorList from "./ErrorList/ErrorList";
import SuccessList from "./SuccessList/SuccessList";

const MessageResult = ({
  sending,
  messageWasSuccessfull,
  errors,
  resendTexts
}) => {
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

  return (
    <>
      {messageWasSuccessfull && (
        <div className="text-center alert alert-success">
          <i className="fa fa-check-circle" style={{ fontSize: "44px" }} />
          <br />
          Messages sent successfully
        </div>
        // <SuccessList nexmoErrors={errors.nexmo || []} />
      )}
      {errors.nexmo && (
        <ErrorList resendTexts={resendTexts} nexmoErrors={errors.nexmo} />
      )}
    </>
  );
};

export default MessageResult;
