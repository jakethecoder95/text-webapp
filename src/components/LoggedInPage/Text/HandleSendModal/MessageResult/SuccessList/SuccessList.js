import React from "react";
import { connect } from "react-redux";

import Success from "./Success";

const SuccessList = ({ nexmoErrors, people }) => {
  const list = people
    .filter(person => !nexmoErrors.find(err => err.number === person.number))
    .map((err, i) => (
      <Success
        name={err.name}
        number={err.number}
        message={err.message}
        index={i}
        key={i}
      />
    ));

  return (
    <div className="alert alert-success success-list">
      <div
        className="success-row"
        data-toggle="collapse"
        href="#collapsibleSuccessOuter"
        role="button"
        aria-expanded="false"
        aria-controls="collapsibleSuccessOuter"
      >
        <strong>
          {nexmoErrors.length === 0
            ? "All messages successfull"
            : `${list.length} out of ${people.length} sent successfully`}
          <i className="fa fa-angle-down" />
        </strong>
      </div>
      <ul className="list-group collapse" id="collapsibleSuccessOuter">
        <hr className="success-hr" />
        {list}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  people: group.people
});

export default connect(mapStateToProps)(SuccessList);
