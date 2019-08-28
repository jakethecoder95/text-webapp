import React from "react";
import { connect } from "react-redux";

import Error from "./Error";

const ErrorList = ({ nexmoErrors, group, resendTexts }) => {
  const { people } = group;
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
        href="#collapsibleErrorOuter"
        role="button"
        aria-expanded="false"
        aria-controls="collapsibleErrorOuter"
      >
        <strong>
          {nexmoErrors.length} out of {people.length} texts failed
          <i className="fa fa-angle-down" />
        </strong>
      </div>
      <ul className="list-group collapse" id="collapsibleErrorOuter">
        <hr className="error-hr" />
        {errorList}
      </ul>
      <div className="text-center" style={{ marginTop: "1rem" }}>
        <button
          className="btn btn-danger"
          onClick={() => resendTexts({ ...group, people: nexmoErrors })}
        >
          Resend Failed Texts
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  group: group.activeGroup
});

export default connect(mapStateToProps)(ErrorList);
