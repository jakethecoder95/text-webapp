import "./Settings.scss";
import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import PersonalInfo from "./PersonalInfo/PersonalInfo";
import GroupInfo from "./GroupInfo/GroupInfo";
import history from "../../../history";

const Settings = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/settings/group" component={GroupInfo} />
        <Route exact path="/settings/user" component={PersonalInfo} />
      </Switch>
    </Router>
  );
};

export default Settings;
