import "./global.scss";
import React from "react";
import { connect } from "react-redux";
import { INIT_APP } from "../redux/types";

import LoggedInPage from "./LoggedInPage/LoggedInPage";
import StarterPage from "./StarterPage/StarterPage";

class App extends React.Component {
  componentDidMount() {
    this.props.initApp();
  }

  renderPage = () => {
    if (!this.props.isLoggedIn) {
      return <StarterPage />;
    }
    return <LoggedInPage />;
  };

  render() {
    return (
      <div>
        <div className="logo">
          Group<span>Text</span>
        </div>
        <main className="container">{this.renderPage()}</main>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch({ type: INIT_APP })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
