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
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Settings
            <i className="fa fa-chevron-down"></i>
          </a>
          <div
            className={`sub-nav-list ${
              active !== "/settings/group" && active !== "/settings/user"
                ? "collapse"
                : ""
            }`}
            id="collapseExample"
          >
            <Link
              to="/settings/group"
              className={`nav-link ${
                active === "/settings/group" ? "active" : ""
              }`}
              onClick={() => onPageChange("/settings/group")}
            >
              Group
            </Link>
            <Link
              to="/settings/user"
              className={`nav-link ${
                active === "/settings/user" ? "active" : ""
              }`}
              onClick={() => onPageChange("/settings/user")}
            >
              Personal
            </Link>
          </div>
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
