import React from "react";

import PersonalInfoForm from "./PersonalInfoForm";
import ChangePassword from "./ChangePassword";

const PersonalInfo = props => {
  return (
    <div className="page-content container">
      <div className="settings">
        <PersonalInfoForm />
        <ChangePassword />
      </div>
    </div>
  );
};

export default PersonalInfo;
