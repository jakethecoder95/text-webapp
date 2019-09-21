import "./MenuToggle.scss";
import React from "react";

const MenuToggle = ({ setToggled, toggled }) => {
  return (
    <div
      className={`nav-toggler ${toggled ? "is-toggled" : ""}`}
      onClick={() => setToggled(!toggled)}
    >
      <i className="fa fa-bars" />
    </div>
  );
};

export default MenuToggle;
