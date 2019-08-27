import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Text from "./Text/Text";
import Group from "./Group/Group";
import Settings from "./Settings/Settings";
import history from "../../history";
import Error404 from "../Errors/404";

const LoggedInPage = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Text} />
        <Route exact path="/group" component={Group} />
        <Route exact path="/settings" component={Settings} />
        <Route default component={Error404} />
      </Switch>
    </Router>
  );
};

export default LoggedInPage;
