import "./Sidebar.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import history from "../../../history";
import { SIGN_OUT } from "../../../redux/types";
import MenuToggle from "../MenuToggle/MenuToggle";

const initialActive = history.location.pathname;

const Sidebar = ({
  toggled,
  setToggled,
  dtScreenWidth,
  logout,
  activeGroup
}) => {
  const [active, setActive] = useState(initialActive);

  const onPageChange = newPath => {
    setActive(newPath);
    setToggled(dtScreenWidth);
  };

  return (
    <div className={`sidebar ${toggled ? "show" : ""}`} id="sidebar-wrapper">
      <div className="sidebar-nav">
        <div className="nav-top">
          <Link to="/" className="nav-link">
            <div className="logo">
              Group<span>Text</span>
            </div>
          </Link>
          {activeGroup && (
            <MenuToggle toggled={toggled} setToggled={setToggled} />
          )}
        </div>
        <hr className="hr" />
        <div className="sidebar-list_group">
          <Link
            to="/"
            className={`nav-link ${active === "/" ? "active" : ""}`}
            onClick={() => onPageChange("/")}
          >
            Text
          </Link>
          <Link
            to="/group"
            className={`nav-link ${active === "/group" ? "active" : ""}`}
            onClick={() => onPageChange("/group")}
          >
            My Group
          </Link>
          <Link
            to="settings"
            className={`nav-link ${active === "/settings" ? "active" : ""}`}
            onClick={() => onPageChange("/settings")}
          >
            Settings
          </Link>
        </div>
      </div>
      {!dtScreenWidth || !activeGroup ? (
        <div className="form-inline">
          <Link to="/group/add-group" className="btn btn-primary">
            <i className="fa fa-plus"></i> New
          </Link>
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  activeGroup: group.activeGroup
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: SIGN_OUT })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
