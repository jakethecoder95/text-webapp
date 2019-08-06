import React, { useState } from "react";
import { connect } from "react-redux";

import GroupActionbar from "./GroupActionbar/GroupActionbar";
import Alerts from "./Alerts/Alerts";
import PeopleList from "./PeopleList/PeopleList";
import Pagination from "./Pagination/Pagination";

const Group = props => {
  const [alerts, setAlerts] = useState({});
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);

  const peopleToBeRendered = props.people
    // Sort Alphabetically
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    // Pageination
    .slice((page - 1) * 10, 10)
    // Filter out strings that don't match searchString
    .filter(person => {
      if (new RegExp(searchString, "gi").test(person.number)) {
        return true;
      }
      if (new RegExp(searchString, "gi").test(person.name)) {
        return true;
      }
      return false;
    });

  return (
    <div className="group-page page-content">
      <GroupActionbar
        alerts={alerts}
        setAlerts={setAlerts}
        searchString={searchString}
        onSearchStringChange={setSearchString}
      />
      <Alerts errors={alerts} setAlerts={setAlerts} />
      <PeopleList searchString={searchString} page={page} />
      {props.people.length > 10 && (
        <Pagination
          page={page}
          onPageChange={setPage}
          people={peopleToBeRendered}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  people: group.people
});

export default connect(mapStateToProps)(Group);
