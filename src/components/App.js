import "./global.scss";
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { INIT_APP } from "../redux/types";

import Main from "./Main/Main";
import StarterPage from "./StarterPage/StarterPage";
import Loading from "./Loading/Loading";
import Admin from "./Admin/Admin";
import Navbar from "./Nav/Navbar/Navbar";
import history from "../history";
import Sidebar from "./Nav/Sidebar/Sidebar";

const dtScreenWidth = window.innerWidth >= 1000;

class App extends React.Component {
  state = { showSidebar: dtScreenWidth };

  componentDidMount() {
    this.props.initApp();
    if (history.location.pathname !== "/" && this.props.isSignedIn === false) {
      history.push("/");
    }
  }

  renderPage = () => {
    if (!this.props.appInitialized) {
      return <Loading />;
    }
    if (this.props.isSignedIn === false) {
      return <StarterPage />;
    }
    return <Main />;
  };

  onSidebarToggled = bool => this.setState({ showSidebar: bool });

  render() {
    const { showSidebar } = this.state;
    const { appInitialized, isSignedIn } = this.props;
    return (
      <div className="wrapper">
        <Router history={history}>
          {appInitialized && isSignedIn ? (
            <Sidebar
              toggled={showSidebar}
              setToggled={this.onSidebarToggled}
              dtScreenWidth={dtScreenWidth}
            />
          ) : null}
          <div className="content">
            <Navbar
              toggled={showSidebar}
              setToggled={this.onSidebarToggled}
              dtScreenWidth={dtScreenWidth}
            />
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/">
                <main id="main">{this.renderPage()}</main>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, group, app }) => ({
  isSignedIn: auth.isSignedIn,
  activeGroup: group.activeGroup,
  appInitialized: app.appInitialized
});

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch({ type: INIT_APP })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
