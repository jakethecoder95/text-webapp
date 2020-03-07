import "./PeopleList.scss";
import React from "react";
import { connect } from "react-redux";

import Person from "./Person";
import { UPDATE_GROUP } from "../../../../redux/types";
import ScrollableListShadow from "../../../Templates/ScrollableListShadow";

const PeopleList = ({ people, updateGroup, setAlerts, groupId }) => {
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
        groupId={groupId}
      />
    );
  });

  return (
    <ScrollableListShadow>
      <ul className="people-list scrollbar" style={{ paddingLeft: 0 }}>
        {peopleList}
      </ul>
    </ScrollableListShadow>
  );
};

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: UPDATE_GROUP, payload: group })
});

export default connect(null, mapDispatchToProps)(PeopleList);
