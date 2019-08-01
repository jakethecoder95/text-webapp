import "./PeopleList.scss";
import React from "react";
import { connect } from "react-redux";
import Person from "./Person";

const PeopleList = ({ people }) => {
  if (people.length === 0) {
    return <div>No people</div>;
  }

  const peopleList = people.map(person => {
    return <Person person={person} key={person._id} />;
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

export default connect(mapStateToProps)(PeopleList);
