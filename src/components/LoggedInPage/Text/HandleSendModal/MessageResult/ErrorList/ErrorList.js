import React from "react";
import { connect } from "react-redux";

import Error from "./Error";

const ErrorList = ({ nexmoErrors, people }) => {
  const errorList = nexmoErrors.map((err, i) => (
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
          {nexmoErrors.length} out of {people.length} texts failed
          <i className="fa fa-angle-down" />
        </strong>
      </div>
      <ul className="list-group collapse" id="colapsableOuter">
        <hr className="error-hr" />
        {errorList}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  people: group.people
});

export default connect(mapStateToProps)(ErrorList);
