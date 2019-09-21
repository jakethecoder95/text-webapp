import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CHANGE_ACTIVE_GROUP } from "../../../redux/types";

const Dropdown = ({ activeGroup, groups, changeActiveGroup }) => {
  const renderDropdownMenu = () => {
    if (groups.length <= 1) {
      return <div className="dropdown-item">...No more groups</div>;
    }
    return groups
      .filter(group => group._id !== activeGroup._id)
      .map(group => (
        <Link
          to="#"
          className="dropdown-item"
          key={group._id}
          onClick={() => changeActiveGroup(group._id, groups)}
        >
          <b>{group.name}</b>
        </Link>
      ));
  };

  const renderBtnContent = () => {
    if (!activeGroup) {
      return "No Active Group";
    }
    return (
      <>
        <b>{activeGroup.name}</b> -{" "}
        <small>
          {" "}
          {activeGroup.monthlySms.limit - activeGroup.monthlySms.count} texts
          left
        </small>
      </>
    );
  };

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle text-center"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {renderBtnContent()}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {renderDropdownMenu()}
        <Link to="/group/add-group" className="dropdown-item">
          <i className="fa fa-plus-circle"></i> Add a Group
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  activeGroup: group.activeGroup,
  groups: group.groups
});

const mapDispatchToProps = dispatch => ({
  changeActiveGroup: (groupId, groups) =>
    dispatch({ type: CHANGE_ACTIVE_GROUP, payload: { groupId, groups } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown);
