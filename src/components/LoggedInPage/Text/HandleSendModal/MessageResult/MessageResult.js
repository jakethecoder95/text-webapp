import "./MessageResult.scss";
import React from "react";

import Error from "./Error";

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

  if (errors.nexmo) {
    const errorList = errors.nexmo.map((err, i) => (
      <Error
        name={err.name}
        number={err.number}
        message={err.message}
        index={i}
        key={i}
      />
    ));

    return (
      <div className="alert alert-danger error-list">
        <div
          className="error-row"
          data-toggle="collapse"
          href="#colapsableOuter"
          role="button"
          aria-expanded="false"
          aria-controls="colapsableOuter"
        >
          <strong>
            {errors.nexmo.length} out of {people.length} texts failed
            <i className="fa fa-angle-down" />
          </strong>
        </div>
        <ul className="list-group collapse" id="colapsableOuter">
          <hr className="error-hr" />
          {errorList}
        </ul>
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
