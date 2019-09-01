import "./global.scss";
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { INIT_APP } from "../redux/types";

import Main from "./Main/Main";
import StarterPage from "./StarterPage/StarterPage";
import Loading from "./Loading/Loading";
import Admin from "./Admin/Admin";
import history from "../history";
import Nav from "./Nav/Nav";

const dtScreenWidth = window.innerWidth >= 1000;

class App extends React.Component {
  state = { showSidebar: dtScreenWidth };

  componentDidMount() {
    this.props.initApp();
    if (history.location.pathname !== "/" && !this.props.isSignedIn) {
      history.push("/");
    }
  }

  renderPage = () => {
    if (this.props.isSignedIn === null) {
      return <Loading />;
    }
    if (this.props.isSignedIn === false) {
      return <StarterPage />;
    }
    return <Main />;
  };

  contentClickEvent = () => {
    const isMobileView = window.innerWidth <= 800;
    if (isMobileView) {
      this.onSidebarToggled(false);
    }
  };

  onSidebarToggled = bool => this.setState({ showSidebar: bool });

  render() {
    const { showSidebar } = this.state;
    return (
      <div className="wrapper">
        <Router history={history}>
          {this.props.isSignedIn ? (
            <Nav
              toggled={showSidebar}
              setToggled={this.onSidebarToggled}
              dtScreenWidth={dtScreenWidth}
            />
          ) : null}
          <div className="content" onClick={this.contentClickEvent}>
            <div
              className={`logo ${
                this.props.isSignedIn ? "logo__signed-in" : ""
              }`}
            >
              Group<span>Text</span>
            </div>
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

const mapStateToProps = ({ auth, group }) => ({
  isSignedIn: auth.isSignedIn,
  activeGroup: group.activeGroup
});

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch({ type: INIT_APP })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
