import React from "react";

const Nav = props => {
  return (
    <div className="navigation">
      <div
        onClick={() => props.setActive("text")}
        className={props.active === "text" ? "active" : ""}
      >
        Text
      </div>
      <div
        onClick={() => props.setActive("group")}
        className={props.active === "group" ? "active" : ""}
      >
        My Group
      </div>
      <div
        onClick={() => props.setActive("settings")}
        className={props.active === "settings" ? "active" : ""}
      >
        Settings
      </div>
    </div>
  );
};

export default Nav;
