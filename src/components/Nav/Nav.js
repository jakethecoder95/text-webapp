import "./Nav.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import history from "../../history";

const initialActive = history.location.pathname;
const dtScreenWidth = window.innerWidth >= 1000;

const Nav = () => {
  const [active, setActive] = useState(initialActive);
  const [toggled, setToggled] = useState(dtScreenWidth);

  const onPageChange = newPath => {
    setActive(newPath);
    setToggled(dtScreenWidth);
  };

  return (
    <div className={`sidebar ${toggled ? "show" : ""}`} id="sidebar-wrapper">
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
      <div>
        <div
          className="navbar-toggler ml-auto"
          onClick={() => setToggled(toggled === true ? false : true)}
        >
          <i className="fa fa-bars" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
