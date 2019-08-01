import React, { useState } from "react";
import { connect } from "react-redux";

import GroupActionbar from "./GroupActionbar/GroupActionbar";
import Errors from "./Errors/Errors";
import PeopleList from "./PeopleList/PeopleList";

const Group = props => {
  const [errors, setErrors] = useState({});

  return (
    <div className="group-page page-content">
      <GroupActionbar errors={errors} setErrors={setErrors} />
      <Errors errors={errors} setErrors={setErrors} />
      <PeopleList />
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  people: group.people
});

export default connect(mapStateToProps)(Group);
