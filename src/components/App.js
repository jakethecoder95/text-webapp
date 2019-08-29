import "./global.scss";
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { INIT_APP } from "../redux/types";

import Main from "./Main/Main";
import StarterPage from "./StarterPage/StarterPage";
import Loading from "./Loading/Loading";
import Footer from "./Footer/Footer";
import Admin from "./Admin/Admin";
import history from "../history";
import Nav from "./Nav/Nav";
import NoGroupPage from "./NoGroupPage/NoGroupPage";

const dtScreenWidth = window.innerWidth >= 1000;

class App extends React.Component {
  state = { showSidebar: dtScreenWidth };

  componentDidMount() {
    this.props.initApp();
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
    const { isSignedIn, activeGroup } = this.props;
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
            {!isSignedIn || activeGroup ? (
              <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/">
                  <main id="main">{this.renderPage()}</main>
                </Route>
              </Switch>
            ) : (
              <NoGroupPage />
            )}
            <Footer />
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
