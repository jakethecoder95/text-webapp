import "./Settings.scss";
import React from "react";

import PersonalInfo from "./PersonalInfo/PersonalInfo";
import NexmoInfo from "./NexmoInfo/NexmoInfo";

const Settings = props => {
  return (
    <div className="page-content">
      <div className="settings">
        <PersonalInfo />
        <NexmoInfo />
      </div>
    </div>
  );
};

export default Settings;
