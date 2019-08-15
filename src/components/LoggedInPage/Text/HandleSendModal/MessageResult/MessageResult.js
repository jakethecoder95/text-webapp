import "./MessageResult.scss";
import React from "react";

import ErrorList from "./ErrorList/ErrorList";
import SuccessList from "./SuccessList/SuccessList";

const MessageResult = ({ sending, messageWasSuccessfull, errors, people }) => {
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
        <SuccessList nexmoErrors={errors.nexmo || []} />
      )}
      {errors.nexmo && <ErrorList nexmoErrors={errors.nexmo} />}
    </>
  );
};

export default MessageResult;
