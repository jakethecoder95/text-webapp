import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Text from "./Text/Text";
import Group from "./Group/Group";
import Settings from "./Settings/Settings";
import Error404 from "../Errors/404";
import NoGroupPage from "../NoGroupPage/NoGroupPage";
import AddGroup from "./AddGroup/AddGroup";
import history from "../../history";

const LoggedInPage = ({ hasActiveGroup }) => {
  const renderIfActiveGroup = Component => {
    return hasActiveGroup ? <Component /> : <NoGroupPage />;
  };
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={() => renderIfActiveGroup(Text)} />
        <Route
          exact
          path="/group"
          component={() => renderIfActiveGroup(Group)}
        />
        <Route
          path="/settings"
          component={() => renderIfActiveGroup(Settings)}
        />
        <Route exact path="/group/add-group" component={AddGroup} />
        <Route default component={Error404} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({ group }) => ({
  hasActiveGroup: group.activeGroup !== null
});

export default connect(mapStateToProps)(LoggedInPage);
