import "./PeopleList.scss";
import React from "react";
import { connect } from "react-redux";
import Person from "./Person";
import { UPDATE_GROUP } from "../../../../redux/types";

const PeopleList = ({ people, updateGroup, searchString }) => {
  if (people.length === 0) {
    return <div>No people</div>;
  }

  const searchStringRegex = new RegExp("5", "gi");
  const peopleList = people
    .filter(person => {
      if (searchStringRegex.test(person.number)) {
        return true;
      }
      if (searchStringRegex.test(person.name)) {
        return true;
      }
      return false;
    })
    .map(person => {
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

const mapStateToProps = ({ group }) => ({
  people: group.people
});

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: UPDATE_GROUP, payload: group })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleList);
