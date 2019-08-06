import "./PeopleList.scss";
import React from "react";
import { connect } from "react-redux";

import Person from "./Person";
import { UPDATE_GROUP } from "../../../../redux/types";

const PeopleList = ({ people, updateGroup, setAlerts }) => {
  if (people.length === 0) {
    return (
      <h1 className="text-center" style={{ marginBottom: "2rem" }}>
        ...No people found
      </h1>
    );
  }

  const peopleList = people.map(person => {
    return (
      <Person
        person={person}
        key={person._id}
        updateGroup={updateGroup}
        setAlerts={setAlerts}
      />
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
