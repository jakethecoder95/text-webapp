import "./PeopleList.scss";
import React from "react";
import { connect } from "react-redux";

import Person from "./Person";
import { UPDATE_GROUP } from "../../../../redux/types";

const PeopleList = ({ people, updateGroup }) => {
  if (people.length === 0) {
    return <div>No people</div>;
  }

  const peopleList = people.map(person => {
    return (
      <Person person={person} key={person._id} updateGroup={updateGroup} />
    );
  });

  return (
    <ul className="people-list" style={{ paddingLeft: 0 }}>
      {peopleList}
    </ul>
  );
};

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: UPDATE_GROUP, payload: group })
});

export default connect(
  null,
  mapDispatchToProps
)(PeopleList);
