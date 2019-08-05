import React, { useState } from "react";
import { connect } from "react-redux";

import GroupActionbar from "./GroupActionbar/GroupActionbar";
import Errors from "./Errors/Errors";
import PeopleList from "./PeopleList/PeopleList";

const Group = props => {
  const [errors, setErrors] = useState({});
  const [searchString, setSearchString] = useState("");

  return (
    <div className="group-page page-content">
      <GroupActionbar
        errors={errors}
        setErrors={setErrors}
        searchString={searchString}
        onSearchStringChange={setSearchString}
      />
      <Errors errors={errors} setErrors={setErrors} />
      <PeopleList searchString={searchString} />
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  people: group.people
});

export default connect(mapStateToProps)(Group);
