import "./Group.scss";
import React, { useState } from "react";
import Alerts from "./Alerts/Alerts";
import { connect } from "react-redux";

import GroupActionbar from "./GroupActionbar/GroupActionbar";
import PeopleList from "./PeopleList/PeopleList";
import Pagination from "./Pagination/Pagination";

const pageListLength = 15;

const Group = props => {
  const [alerts, setAlerts] = useState({});
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);

  const peopleToBeRendered = props.people
    // Filter out strings that don't match searchString
    .filter(person => {
      if (new RegExp(searchString, "gi").test(person.number)) {
        return true;
      }
      if (new RegExp(searchString, "gi").test(person.name)) {
        return true;
      }
      return false;
    })
    // Sort Alphabetically
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    // Pageination
    .slice(
      (page - 1) * pageListLength,
      (page - 1) * pageListLength + pageListLength
    );

  const onSearchStringChange = str => {
    setPage(1);
    setSearchString(str);
  };

  return (
    <div className="group-page page-content container">
      <GroupActionbar
        alerts={alerts}
        setAlerts={setAlerts}
        searchString={searchString}
        onSearchStringChange={onSearchStringChange}
      />
      <PeopleList
        searchString={searchString}
        page={page}
        people={peopleToBeRendered}
        alerts={alerts}
        setAlerts={setAlerts}
        groupId={props.groupId}
      />
      {props.people.length > pageListLength && (
        <Pagination
          page={page}
          onPageChange={setPage}
          people={props.people}
          maxLength={pageListLength}
        />
      )}
      <Alerts alerts={alerts} setAlerts={setAlerts} />
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  people: group.activeGroup.people,
  groupId: group.activeGroup._id
});

export default connect(mapStateToProps)(Group);
