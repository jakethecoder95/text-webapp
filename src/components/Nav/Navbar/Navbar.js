import "./Navbar.scss";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import MenuToggle from "../MenuToggle/MenuToggle";

import { SIGN_OUT } from "../../../redux/types";
import Dropdown from "./Dropdown";

const Navbar = ({
  toggled,
  setToggled,
  logout,
  appInitialized,
  isSignedIn,
  groups,
  activeGroup,
  dtScreenWidth
}) => {
  if (!appInitialized || !isSignedIn || groups.length === 0) {
    return (
      <div className={`logo`}>
        Group<span>Text</span>
      </div>
    );
  }
  return (
    <nav className="top-navbar navbar navbar-dark">
      <div className="form-inline">
        {!toggled && <MenuToggle toggled={toggled} setToggled={setToggled} />}
        <Dropdown />
        {dtScreenWidth && (
          <p className="nav-contact-amount">
            There are <Link to="/group">{activeGroup.people.length}</Link>{" "}
            contacts in your group.
          </p>
        )}
      </div>
      {dtScreenWidth && (
        <div className="form-inline">
          <Link to="/group/add-group" className="btn btn-primary">
            <i className="fa fa-plus"></i> New
          </Link>
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = ({ app, auth, group }) => ({
  appInitialized: app.appInitialized,
  isSignedIn: auth.isSignedIn,
  groups: group.groups,
  activeGroup: group.activeGroup
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: SIGN_OUT })
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
