import React from "react";
import { connect } from "react-redux";

import GroupActionbar from "./GroupActionbar/GroupActionbar";

const Group = props => {
  return (
    <div className="group-page page-content">
      <GroupActionbar />
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  people: group.people
});

export default connect(mapStateToProps)(Group);
