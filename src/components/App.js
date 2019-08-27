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

class App extends React.Component {
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

  render() {
    return (
      <div className="wrapper">
        <Router history={history}>
          {this.props.isSignedIn ? <Nav /> : null}
          <div className="content">
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
                <main>{this.renderPage()}</main>
              </Route>
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isSignedIn: auth.isSignedIn
});

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch({ type: INIT_APP })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
