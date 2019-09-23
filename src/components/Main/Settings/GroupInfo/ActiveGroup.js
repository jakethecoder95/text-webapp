import React from "react";
import { connect } from "react-redux";

const ActiveGroup = ({ group }) => (
  <div>
    <h2>
      Group: {group.name.toUpperCase()}
      {group.activated ? (
        <span className="badge badge-success">activated</span>
      ) : (
        <span className="badge badge-danger">deactivated</span>
      )}
    </h2>
    <p className="text-danger">{group.deactivatedMessage}</p>
  </div>
);

const mapStateToProps = ({ group }) => ({
  group: group.activeGroup
});

export default connect(mapStateToProps)(ActiveGroup);
